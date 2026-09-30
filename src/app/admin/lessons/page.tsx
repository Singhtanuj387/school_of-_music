import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role, LessonSource } from "@prisma/client";
import { AdminLessonsManager, AdminLessonItem } from "./AdminLessonsManager";
import { formatInViewerTimezone } from "@/lib/timezone";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { getLessonTrackingId } from "@/lib/lesson-tracking";

export const metadata = {
  title: "Global Lessons | Admin Portal | Gandharva School of Music",
  description: "Global schedule inspector across all faculty members and enrolled students.",
};

export default async function AdminLessonsPage() {
  await requireRole(Role.ADMIN);

  const dbLessons = await db.lesson.findMany({
    include: {
      teacher: { select: { name: true, email: true } },
      student: { select: { name: true, email: true } },
    },
    orderBy: { startsAt: "desc" },
  });

  const formattedLessons: AdminLessonItem[] = dbLessons.map((l) => ({
    id: l.id,
    trackingCode: getLessonTrackingId(l),
    startsAt: l.startsAt.toISOString(),
    formattedTime: formatInViewerTimezone(
      l.startsAt,
      "UTC",
      "MMM d, yyyy 'at' h:mm a zzz",
    ),
    durationMinutes: l.durationMinutes,
    instrument: l.instrument,
    status: l.status,
    lessonSource: l.lessonSource || LessonSource.TRIAL,
    teacherName: l.teacher?.name || "Teacher",
    studentName: l.student?.name || "Student",
    studentEmail: l.student?.email || "",
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent-dark font-mono">
          Classroom Monitoring
        </span>
        <SplitHeading
          firstClause="Global Lesson"
          accentClause="Operations"
          as="h1"
          size="lg"
          className="mt-1"
        />
        <p className="text-sm text-body mt-1">
          Monitor all scheduled, delivered, and cancelled live video lessons. Audit attendance or intervene as administrative host.
        </p>
      </div>

      <AdminLessonsManager initialLessons={formattedLessons} />
    </div>
  );
}
