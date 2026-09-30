import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { AdminCoursesManager, AdminCourseItem } from "./AdminCoursesManager";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "Course Catalog Management | Admin Portal | Gandharva School of Music",
  description: "Create and edit academy music courses, syllabi, tuition pricing, and accreditation.",
};

export default async function AdminCoursesPage() {
  await requireRole(Role.ADMIN);

  const [dbCourses, dbTeachers] = await Promise.all([
    db.course.findMany({
      include: {
        _count: {
          select: { enrollments: true, lessons: true },
        },
        teachers: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                teacherProfile: {
                  select: { instruments: true },
                },
              },
            },
          },
        },
        lessons: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { lessonNumber: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.user.findMany({
      where: { role: Role.TEACHER, isActive: true },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        teacherProfile: {
          select: { instruments: true },
        },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  const formattedTeachers = dbTeachers.map((t) => ({
    id: t.id,
    name: t.name,
    email: t.email,
    instruments: t.teacherProfile?.instruments || [],
  }));

  const formattedCourses: AdminCourseItem[] = dbCourses.map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    discipline: c.discipline,
    instrument: c.instrument,
    level: c.level,
    accreditation: c.accreditation,
    description: c.description,
    syllabusSummary: c.syllabusSummary,
    priceMinorUnits: c.priceMinorUnits,
    sessionCount: c.sessionCount,
    durationWeeks: c.durationWeeks,
    startDate: c.startDate ? c.startDate.toISOString() : null,
    endDate: c.endDate ? c.endDate.toISOString() : null,
    isPublished: c.isPublished,
    enrollmentsCount: c._count.enrollments,
    lessonsCount: c._count.lessons,
    allottedTeachers: c.teachers.map((ct) => ({
      id: ct.teacher.id,
      name: ct.teacher.name,
      email: ct.teacher.email,
      instruments: ct.teacher.teacherProfile?.instruments || [],
    })),
    lessons: c.lessons.map((l) => ({
      id: l.id,
      lessonNumber: l.lessonNumber,
      title: l.title,
      description: l.description,
      durationMinutes: l.durationMinutes,
      scheduledStartsAt: l.scheduledStartsAt ? l.scheduledStartsAt.toISOString() : null,
      teacherId: l.teacherId,
      teacherName: l.teacher?.name || null,
    })),
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-sans">
          Academy Curriculum
        </span>
        <SplitHeading
          firstClause="Course Catalog"
          accentClause="Management"
          as="h1"
          size="lg"
        />
        <p className="text-xs text-body mt-1 max-w-2xl">
          Define curriculum packages, accreditation boards (Trinity, ABRSM, Gandharva Mahavidyalaya), session allotments, and tuition pricing.
        </p>
      </div>

      <AdminCoursesManager
        initialCourses={formattedCourses}
        facultyTeachers={formattedTeachers}
      />
    </div>
  );
}
