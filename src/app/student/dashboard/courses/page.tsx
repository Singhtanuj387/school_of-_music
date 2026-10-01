import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role, EnrollmentStatus } from "@prisma/client";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { TrialStatusStrip } from "@/components/dashboard/TrialStatusStrip";
import { SplitHeading } from "@/components/ui/SplitHeading";
import {
  StudentEnrolledCoursesSection,
  type EnrolledCourseItem,
  type CourseRequestItem,
} from "@/components/courses/StudentEnrolledCoursesSection";

export const metadata = {
  title: "Course Catalog | Student Portal | Gandharva School of Music",
  description:
    "Explore accredited diploma and certificate courses in classical instruments, vocals, and dance.",
};

export default async function StudentCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ discipline?: string }>;
}) {
  const user = await requireRole(Role.STUDENT);
  const { discipline } = await searchParams;

  const [trialStatus, activeEnrollment, courses, allMyEnrollments, myRequests] = await Promise.all([
    db.studentTrialStatus.findUnique({
      where: { studentId: user.id },
    }),
    db.enrollment.findFirst({
      where: {
        studentId: user.id,
        status: EnrollmentStatus.ACTIVE,
      },
      include: { course: true },
      orderBy: { startedAt: "desc" },
    }),
    db.course.findMany({
      where: {
        isPublished: true,
        ...(discipline
          ? { discipline: discipline.toUpperCase() as any }
          : {}),
      },
      orderBy: { priceMinorUnits: "asc" },
    }),
    db.enrollment.findMany({
      where: { studentId: user.id },
      include: { course: true },
      orderBy: { startedAt: "desc" },
    }),
    db.courseEnrollmentRequest.findMany({
      where: { studentId: user.id },
      include: { course: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const teacherIds = allMyEnrollments
    .map((e) => e.teacherId)
    .filter(Boolean) as string[];

  const dbTeachers =
    teacherIds.length > 0
      ? await db.user.findMany({
          where: { id: { in: teacherIds } },
          select: { id: true, name: true },
        })
      : [];

  const teacherMap = new Map<string, string>();
  for (const t of dbTeachers) {
    teacherMap.set(t.id, t.name || "Assigned Teacher");
  }

  const formattedEnrollments: EnrolledCourseItem[] = allMyEnrollments.map((e) => ({
    id: e.id,
    courseTitle: e.course.title,
    courseSlug: e.course.slug,
    discipline: e.course.discipline,
    instrument: e.course.instrument,
    sessionsTotal: e.course.sessionCount,
    sessionsRemaining: e.sessionsRemaining,
    status: e.status,
    paymentPlan: e.paymentPlan,
    emiStatus: e.emiStatus,
    teacherName: e.teacherId ? teacherMap.get(e.teacherId) || null : null,
    startedAt: e.startedAt.toISOString(),
  }));

  const formattedRequests: CourseRequestItem[] = myRequests.map((r) => ({
    id: r.id,
    courseTitle: r.course.title,
    courseSlug: r.course.slug,
    discipline: r.course.discipline,
    instrument: r.course.instrument,
    paymentPlan: r.paymentPlan,
    status: r.status,
    studentNotes: r.studentNotes,
    adminNotes: r.adminNotes,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      {/* Active Enrolled Courses & Course Requests Status */}
      <StudentEnrolledCoursesSection
        enrollments={formattedEnrollments}
        requests={formattedRequests}
      />

      {/* Trial / Session status indicator at top (high commercial conversion priority) */}
      <TrialStatusStrip
        data={{
          trialStatus: trialStatus
            ? {
                status: trialStatus.status,
                lessonsGranted: trialStatus.lessonsGranted,
                lessonsUsed: trialStatus.lessonsUsed,
              }
            : null,
          activeEnrollment: activeEnrollment
            ? {
                id: activeEnrollment.id,
                courseTitle: activeEnrollment.course.title,
                sessionsRemaining: activeEnrollment.sessionsRemaining,
                totalSessions: activeEnrollment.course.sessionCount,
              }
            : null,
        }}
      />

      {/* Header & Filter Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-muted/80 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
            Curriculum and Certifications
          </span>
          <SplitHeading
            as="h1"
            firstClause="Course"
            accentClause="Catalog"
            size="lg"
            className="mt-0.5"
          />
          <p className="text-xs sm:text-sm text-body mt-1 max-w-xl">
            Structured learning pathways from beginner foundations to Trinity College London and ABRSM accredited exam preparation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-surface-muted/80 rounded-xl shadow-xs">
            <a
              href="/student/dashboard/courses"
              className={`btn-tactile px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                !discipline
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              All Disciplines
            </a>
            <a
              href="/student/dashboard/courses?discipline=instrument"
              className={`btn-tactile px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                discipline === "instrument"
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              Instruments
            </a>
            <a
              href="/student/dashboard/courses?discipline=vocals"
              className={`btn-tactile px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                discipline === "vocals"
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              Vocals
            </a>
            <a
              href="/student/dashboard/courses?discipline=dance"
              className={`btn-tactile px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                discipline === "dance"
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              Dance
            </a>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-surface-muted rounded-2xl bg-bg-alt/20">
          <p className="text-heading font-bold">No courses found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              basePath="/student/dashboard/courses"
            />
          ))}
        </div>
      )}
    </div>
  );
}

