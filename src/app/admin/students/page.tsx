import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { AdminStudentsManager, StudentRecord } from "./AdminStudentsManager";

export const metadata = {
  title: "Students | Admin Portal | Gandharva School of Music",
  description: "Directory, learning records, billing context, and complete student timeline.",
};

export default async function AdminStudentsPage() {
  await requireRole(Role.ADMIN);

  // 1. Fetch real students from db with complete relational records
  const dbStudents = await db.user.findMany({
    where: {
      role: Role.STUDENT,
    },
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              teachers: {
                include: {
                  teacher: {
                    select: { name: true },
                  },
                },
              },
            },
          },
        },
        orderBy: { startedAt: "desc" },
      },
      lessonsAsStudent: {
        include: {
          teacher: {
            select: { name: true },
          },
        },
        orderBy: { startsAt: "desc" },
        take: 30,
      },
      payments: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      resourcesReceived: {
        include: {
          resource: true,
        },
        orderBy: { sharedAt: "desc" },
        take: 20,
      },
      trialRequestsAsStudent: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      notifications: {
        orderBy: { createdAt: "desc" },
        take: 15,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // 2. Fetch real active courses for enrollment modal
  const dbCourses = await db.course.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      title: true,
      instrument: true,
      level: true,
      sessionCount: true,
      priceMinorUnits: true,
    },
    orderBy: { title: "asc" },
  });

  // 3. Fetch real teachers for scheduling modal
  const dbTeachers = await db.user.findMany({
    where: {
      role: Role.TEACHER,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      teacherProfile: {
        select: {
          instruments: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  // Format student records cleanly for client state
  const formattedStudents: StudentRecord[] = dbStudents.map((s) => ({
    id: s.id,
    name: s.name || "Student",
    email: s.email,
    phone: s.phone,
    country: s.country,
    timezone: s.timezone || "Asia/Kolkata",
    guardianName: s.guardianName,
    guardianPhone: s.guardianPhone,
    age: s.age,
    gender: s.gender,
    address: s.address,
    createdAt: s.createdAt.toISOString(),
    isActive: s.isActive,
    enrollments: s.enrollments.map((e) => {
      const assignedTeacher =
        e.course.teachers[0]?.teacher?.name || null;
      return {
        id: e.id,
        courseId: e.courseId,
        courseTitle: e.course.title,
        courseLevel: e.course.level,
        courseInstrument: e.course.instrument,
        teacherName: assignedTeacher,
        sessionsRemaining: e.sessionsRemaining,
        totalSessions: e.course.sessionCount,
        status: e.status,
        startedAt: e.startedAt.toISOString(),
      };
    }),
    lessons: s.lessonsAsStudent.map((l) => ({
      id: l.id,
      instrument: l.instrument,
      startsAt: l.startsAt.toISOString(),
      durationMinutes: l.durationMinutes,
      status: l.status,
      teacherName: l.teacher?.name || null,
      trackingCode: l.trackingCode,
      recordingUrl: l.recordingUrl,
    })),
    payments: s.payments.map((p) => ({
      id: p.id,
      amountRupees: Math.round(p.amountMinorUnits / 100),
      status: p.status,
      gateway: p.gateway,
      gatewayPaymentId: p.gatewayPaymentId,
      createdAt: p.createdAt.toISOString(),
    })),
    resources: s.resourcesReceived.map((r) => ({
      id: r.id,
      title: r.resource.title,
      category: r.resource.category,
      fileUrl: r.resource.fileUrl,
      sharedAt: r.sharedAt.toISOString(),
    })),
    trials: s.trialRequestsAsStudent.map((t) => ({
      id: t.id,
      instrument: t.instrument,
      status: t.status,
      createdAt: t.createdAt.toISOString(),
      isConverted: t.isConverted,
    })),
    notifications: s.notifications.map((n) => ({
      id: n.id,
      title: n.title,
      message: n.body,
      type: n.type,
      createdAt: n.createdAt.toISOString(),
    })),
  }));

  const courseOptions = dbCourses.map((c) => ({
    id: c.id,
    title: c.title,
    instrument: c.instrument,
    level: c.level,
    sessionCount: c.sessionCount,
    priceMinorUnits: c.priceMinorUnits,
  }));

  const teacherOptions = dbTeachers.map((t) => ({
    id: t.id,
    name: t.name || "Teacher",
    instruments: t.teacherProfile?.instruments || [],
  }));

  return (
    <AdminStudentsManager
      initialStudents={formattedStudents}
      courses={courseOptions}
      teachers={teacherOptions}
    />
  );
}
