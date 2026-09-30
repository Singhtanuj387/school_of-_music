import { db } from "@/lib/db";
import {
  formatInViewerTimezone,
  projectTeacherSlotToUtc,
  getTimezoneAbbr,
  getLocalDateString,
} from "@/lib/timezone";
import { AVAILABILITY_WEEKS_AHEAD, SLOT_DURATION_MINUTES } from "@/types";
import { addDays } from "date-fns";

export interface ProjectedSlot {
  startsAt: string; // ISO 8601 UTC string
  timeFormatted: string; // e.g. "2:00 PM"
  timezoneAbbr: string; // e.g. "EDT"
}

export interface DaySlotsGroup {
  dateKey: string; // "YYYY-MM-DD" in viewer's timezone
  dateFormatted: string; // e.g. "Wednesday, September 16"
  isToday: boolean;
  slots: ProjectedSlot[];
}

export interface TeacherSlotAvailability {
  teacherProfileId: string;
  teacherName: string;
  teacherTimezone: string;
  viewerTimezone: string;
  hourlyRate: number; // in minor units (cents)
  instruments: string[];
  days: DaySlotsGroup[];
}

/**
 * Generate all bookable lesson slots for a teacher over the next 2 weeks,
 * projected into the viewer's local timezone.
 *
 * Rules applied:
 * - Recurring weekly rules in teacher's local time
 * - Date exceptions / holiday blocks
 * - Omission of past slots
 * - Omission of slots with existing SCHEDULED lessons
 */
export async function generateAvailableSlots(
  teacherProfileId: string,
  viewerTimezone: string,
): Promise<TeacherSlotAvailability | null> {
  const teacher = await db.teacherProfile.findUnique({
    where: { id: teacherProfileId },
    include: {
      user: {
        select: {
          name: true,
          timezone: true,
        },
      },
      availabilityRules: true,
      availabilityExceptions: true,
      lessonsAsTeacher: {
        where: {
          status: "SCHEDULED",
          startsAt: {
            gte: new Date(),
          },
        },
        select: {
          startsAt: true,
        },
      },
    },
  });

  if (!teacher || !teacher.isPublished || teacher.approvalStatus !== "APPROVED") {
    return null;
  }

  const teacherTimezone = teacher.user.timezone || "UTC";
  const now = new Date();
  const daysToProject = AVAILABILITY_WEEKS_AHEAD * 7; // 14 days

  // Set of UTC timestamps for already-scheduled lessons
  const scheduledTimestamps = new Set(
    teacher.lessonsAsTeacher.map((l) => l.startsAt.getTime()),
  );

  // Map of date exceptions by YYYY-MM-DD
  const exceptionsByDate = new Map<string, typeof teacher.availabilityExceptions>();
  for (const exc of teacher.availabilityExceptions) {
    const dateStr = exc.date.toISOString().split("T")[0];
    const list = exceptionsByDate.get(dateStr) || [];
    list.push(exc);
    exceptionsByDate.set(dateStr, list);
  }

  const rawAvailableSlots: Date[] = [];

  // Generate slots day-by-day across the 14-day projection window
  for (let offset = 0; offset < daysToProject; offset++) {
    const targetDate = addDays(now, offset);
    const teacherDateStr = getLocalDateString(targetDate, teacherTimezone);

    // Calculate day of week (0 = Sunday, 6 = Saturday) deterministically for teacherDateStr
    // Note: Never use localDateInstant.getDay() as that uses Node server host's OS timezone!
    const [year, month, day] = teacherDateStr.split("-").map(Number);
    const dayOfWeek = new Date(Date.UTC(year, month - 1, day)).getUTCDay();

    // Check full-day block exception
    const exceptions = exceptionsByDate.get(teacherDateStr);
    const isFullDayBlocked = exceptions?.some(
      (e) => e.isBlocked && e.startMinute === null,
    );
    if (isFullDayBlocked) {
      continue;
    }

    // Find availability rules for this day of week
    const dayRules = teacher.availabilityRules.filter(
      (r) => r.dayOfWeek === dayOfWeek,
    );

    for (const rule of dayRules) {
      for (
        let m = rule.startMinute;
        m + SLOT_DURATION_MINUTES <= rule.endMinute;
        m += SLOT_DURATION_MINUTES
      ) {
        // Check partial exception block
        const isMinuteBlocked = exceptions?.some(
          (e) =>
            e.isBlocked &&
            e.startMinute !== null &&
            e.endMinute !== null &&
            m >= e.startMinute &&
            m < e.endMinute,
        );
        if (isMinuteBlocked) {
          continue;
        }

        const slotUtc = projectTeacherSlotToUtc(
          teacherDateStr,
          m,
          teacherTimezone,
        );

        // Discard past slots (with a 2-minute buffer)
        if (slotUtc.getTime() <= now.getTime() + 2 * 60_000) {
          continue;
        }

        // Discard already booked slots
        if (scheduledTimestamps.has(slotUtc.getTime())) {
          continue;
        }

        rawAvailableSlots.push(slotUtc);
      }
    }
  }

  // Sort slots chronologically
  rawAvailableSlots.sort((a, b) => a.getTime() - b.getTime());

  // Group slots by viewer's local calendar date
  const viewerTodayKey = getLocalDateString(now, viewerTimezone);
  const groupsMap = new Map<string, DaySlotsGroup>();

  for (const slotDate of rawAvailableSlots) {
    const dateKey = getLocalDateString(slotDate, viewerTimezone);
    let group = groupsMap.get(dateKey);

    if (!group) {
      const dateFormatted = formatInViewerTimezone(
        slotDate,
        viewerTimezone,
        "EEEE, MMMM d",
      );
      group = {
        dateKey,
        dateFormatted,
        isToday: dateKey === viewerTodayKey,
        slots: [],
      };
      groupsMap.set(dateKey, group);
    }

    group.slots.push({
      startsAt: slotDate.toISOString(),
      timeFormatted: formatInViewerTimezone(slotDate, viewerTimezone, "h:mm a"),
      timezoneAbbr: getTimezoneAbbr(slotDate, viewerTimezone),
    });
  }

  return {
    teacherProfileId: teacher.id,
    teacherName: teacher.user.name || "Teacher",
    teacherTimezone,
    viewerTimezone,
    hourlyRate: teacher.hourlyRate,
    instruments: teacher.instruments,
    days: Array.from(groupsMap.values()),
  };
}
