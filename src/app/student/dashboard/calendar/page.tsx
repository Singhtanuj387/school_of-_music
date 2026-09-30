import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { formatInViewerTimezone, getTimezoneAbbr } from "@/lib/timezone";
import { CalendarView, CalendarLesson } from "@/components/dashboard/CalendarView";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "Lesson Calendar | Student Portal | Gandharva School of Music",
  description: "View and export your scheduled music lessons on an interactive month & week calendar.",
};

export default async function StudentCalendarPage() {
  const user = await requireRole(Role.STUDENT);
  const studentTimezone = user.timezone || "UTC";

  const [dbLessons, dbRegistrations] = await Promise.all([
    db.lesson.findMany({
      where: {
        studentId: user.id,
        status: "SCHEDULED",
      },
      include: {
        teacher: {
          select: {
            name: true,
            email: true,
            timezone: true,
          },
        },
        teacherProfile: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        startsAt: "asc",
      },
    }),
    db.eventRegistration.findMany({
      where: {
        studentId: user.id,
        event: {
          isPublished: true,
        },
      },
      include: {
        event: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
                teacherProfile: {
                  select: {
                    instruments: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        event: {
          startsAt: "asc",
        },
      },
    }),
  ]);

  const formattedLessons: CalendarLesson[] = dbLessons.map((l) => {
    const startsAtDate = new Date(l.startsAt);

    return {
      id: l.id,
      instrument: l.instrument,
      startsAt: startsAtDate.toISOString(),
      durationMinutes: l.durationMinutes,
      status: l.status,
      lessonSource: l.lessonSource,
      teacherName: l.teacher.name || "Teacher",
      teacherProfileId: l.teacherProfile.id,
      formattedTime: formatInViewerTimezone(
        startsAtDate,
        studentTimezone,
        "h:mm a",
      ),
      timezoneAbbr: getTimezoneAbbr(startsAtDate, studentTimezone),
    };
  });

  const formattedEvents = dbRegistrations.map((reg) => {
    const ev = reg.event;
    const startsAtDate = new Date(ev.startsAt);

    return {
      id: ev.id,
      title: ev.title,
      description: ev.description,
      type: ev.type,
      startsAt: startsAtDate.toISOString(),
      durationMinutes: ev.durationMinutes,
      capacity: ev.capacity,
      formattedTime: formatInViewerTimezone(
        startsAtDate,
        studentTimezone,
        "h:mm a",
      ),
      timezoneAbbr: getTimezoneAbbr(startsAtDate, studentTimezone),
      teacherName: ev.teacher?.name || null,
      teacherEmail: ev.teacher?.email || null,
      teacherInstruments: ev.teacher?.teacherProfile?.instruments || [],
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
          Schedule and Milestones
        </span>
        <SplitHeading
          as="h1"
          firstClause="Lesson"
          accentClause="Calendar"
          size="lg"
          className="mt-0.5"
        />
        <p className="text-xs sm:text-sm text-body mt-1">
          Click any date with a scheduled lesson to view details, join the classroom, or export to Apple or Google Calendar (.ics).
        </p>
      </div>

      <CalendarView
        lessons={formattedLessons}
        events={formattedEvents}
        userTimezone={studentTimezone}
      />
    </div>
  );
}

