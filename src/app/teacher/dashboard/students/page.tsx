import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { TeacherStudentsList, StudentItem } from "@/components/dashboard/TeacherStudentsList";
import { formatInViewerTimezone } from "@/lib/timezone";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "My Students | Faculty Studio | Gandharva School of Music",
  description: "View enrolled and trial students, curriculum progress, and private teaching notes.",
};

export default async function TeacherStudentsPage() {
  const user = await requireRole(Role.TEACHER);
  const teacherTimezone = user.timezone || "UTC";

  // 1. Enrolled students assigned to this teacher
  const enrollments = await db.enrollment.findMany({
    where: { teacherId: user.id },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          timezone: true,
        },
      },
      course: true,
      lessons: {
        orderBy: { startsAt: "asc" },
      },
    },
    orderBy: { startedAt: "desc" },
  });

  // 2. Trial students who had or have a lesson with this teacher
  const trialLessons = await db.lesson.findMany({
    where: {
      teacherId: user.id,
      lessonSource: "TRIAL",
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          timezone: true,
        },
      },
    },
    orderBy: { startsAt: "desc" },
  });

  const studentMap = new Map<string, StudentItem>();

  // Process enrolled students
  for (const enr of enrollments) {
    const totalSessions = enr.course.sessionCount;
    const completedSessions = enr.lessons.filter(
      (l) => l.status === "COMPLETED",
    ).length;

    const upcomingLesson = enr.lessons.find(
      (l) => l.status === "SCHEDULED" && new Date(l.startsAt) >= new Date(),
    );

    const nextFormatted = upcomingLesson
      ? formatInViewerTimezone(
          upcomingLesson.startsAt,
          teacherTimezone,
          "EEE, MMM d 'at' h:mm a",
        )
      : null;

    const key = `${enr.studentId}-${enr.courseId}`;
    studentMap.set(key, {
      studentId: enr.studentId,
      studentName: enr.student.name || "Student",
      studentEmail: enr.student.email,
      studentTimezone: enr.student.timezone,
      courseTitle: enr.course.title,
      type: "COURSE",
      sessionsCompleted: completedSessions,
      sessionsTotal: totalSessions,
      nextLessonFormatted: nextFormatted,
      instrument: enr.course.instrument,
    });
  }

  // Process trial students (only if not already listed or as trial card)
  for (const tl of trialLessons) {
    const key = `${tl.studentId}-trial`;
    if (!studentMap.has(key)) {
      const isCompleted = tl.status === "COMPLETED";
      const isUpcoming =
        tl.status === "SCHEDULED" && new Date(tl.startsAt) >= new Date();

      studentMap.set(key, {
        studentId: tl.studentId,
        studentName: tl.student.name || "Student",
        studentEmail: tl.student.email,
        studentTimezone: tl.student.timezone,
        courseTitle: "Free Trial Lesson",
        type: "TRIAL",
        sessionsCompleted: isCompleted ? 1 : 0,
        sessionsTotal: 1,
        nextLessonFormatted: isUpcoming
          ? formatInViewerTimezone(
              tl.startsAt,
              teacherTimezone,
              "EEE, MMM d 'at' h:mm a",
            )
          : null,
        instrument: tl.instrument,
      });
    }
  }

  const studentsList: StudentItem[] = Array.from(studentMap.values());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-sans">
            Studio Roster
          </span>
          <SplitHeading
            firstClause="My Students &"
            accentClause="Learning Progress"
            as="h1"
            size="lg"
          />
          <p className="text-xs text-body mt-1 max-w-2xl">
            Track enrolled course students and trial attendees, monitor session completion, and maintain private lesson notes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-border-default shadow-xs text-body">
          <span>Total Active Roster:</span>
          <span className="text-primary font-bold font-numeric text-sm">{studentsList.length}</span>
        </div>
      </div>

      <TeacherStudentsList students={studentsList} teacherId={user.id} />
    </div>
  );
}
