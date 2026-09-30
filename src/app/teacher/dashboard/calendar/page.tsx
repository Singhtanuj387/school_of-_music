import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { TeacherCalendarView } from "@/components/dashboard/TeacherCalendarView";
import { formatInViewerTimezone } from "@/lib/timezone";

export const metadata = {
  title: "Studio Calendar | Faculty Studio | Gandharva School of Music",
  description: "Interactive monthly schedule with availability overlay and booked lessons.",
};

export default async function TeacherCalendarPage() {
  const user = await requireRole(Role.TEACHER);

  const [dbUser, dbEvents] = await Promise.all([
    db.user.findUnique({
      where: { id: user.id },
      include: {
        teacherProfile: {
          include: {
            availabilityRules: true,
            availabilityExceptions: {
              orderBy: { date: "asc" },
            },
            lessonsAsTeacher: {
              include: {
                student: {
                  select: {
                    name: true,
                  },
                },
              },
              orderBy: { startsAt: "asc" },
            },
          },
        },
      },
    }),
    db.event.findMany({
      where: {
        teacherId: user.id,
        isPublished: true,
      },
      include: {
        registrations: {
          include: {
            student: {
              select: {
                name: true,
                email: true,
              },
            },
          },
          orderBy: { registeredAt: "asc" },
        },
      },
      orderBy: { startsAt: "asc" },
    }),
  ]);

  const profile = dbUser?.teacherProfile;
  const teacherTimezone = user.timezone || "UTC";

  const rules = (profile?.availabilityRules || []).map((r) => ({
    dayOfWeek: r.dayOfWeek,
    startMinute: r.startMinute,
    endMinute: r.endMinute,
  }));

  const exceptions = (profile?.availabilityExceptions || []).map((e) => ({
    id: e.id,
    date: e.date.toISOString().split("T")[0],
    isBlocked: e.isBlocked,
    startMinute: e.startMinute,
    endMinute: e.endMinute,
  }));

  const lessons = (profile?.lessonsAsTeacher || []).map((l) => ({
    id: l.id,
    startsAt: l.startsAt.toISOString(),
    durationMinutes: l.durationMinutes,
    instrument: l.instrument,
    studentName: l.student.name || "Student",
    lessonSource: l.lessonSource as "TRIAL" | "ENROLLMENT",
    status: l.status,
    formattedTime: formatInViewerTimezone(
      l.startsAt,
      teacherTimezone,
      "h:mm a",
    ),
  }));

  const formattedEvents = dbEvents.map((ev) => ({
    id: ev.id,
    title: ev.title,
    description: ev.description,
    type: ev.type,
    startsAt: ev.startsAt.toISOString(),
    durationMinutes: ev.durationMinutes,
    capacity: ev.capacity,
    formattedTime: formatInViewerTimezone(
      ev.startsAt,
      teacherTimezone,
      "h:mm a",
    ),
    registrations: ev.registrations.map((r) => ({
      studentName: r.student.name || "Student",
      studentEmail: r.student.email,
    })),
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-accent-dark font-sans">
          Schedule and Timeline
        </span>
        <h1 className="font-serif text-3xl font-bold text-heading mt-1">
          <span className="text-heading">Studio </span>
          <span className="text-accent">Calendar</span>
        </h1>
        <p className="text-xs sm:text-sm text-body mt-1">
          Visual monthly schedule showing regular working blocks (green), booked student lessons (purple), and exceptions/time-off (red).
        </p>
      </div>

      <TeacherCalendarView
        rules={rules}
        exceptions={exceptions}
        lessons={lessons}
        events={formattedEvents}
        teacherTimezone={teacherTimezone}
      />
    </div>
  );
}
