import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import {
  AdminEnrollmentsManager,
  EnrollmentRecord,
  CourseCatalogOption,
  FacultyOption,
  StudentOption,
  TrialLeadOption,
} from "./AdminEnrollmentsManager";
import { Suspense } from "react";

export const metadata = {
  title: "Create Enrollment & 1:1 Scheduling | Admin Portal | Gandharva School of Music",
  description: "Convert qualified trials into scheduled billable learning plans, allot faculty, and manage 1-on-1 timetables.",
};

export default async function AdminEnrollmentsPage() {
  await requireRole(Role.ADMIN);

  let dbCourses: any[] = [];
  let dbTeachers: any[] = [];
  let dbStudents: any[] = [];
  let dbTrialLeads: any[] = [];
  let dbEnrollments: any[] = [];

  try {
    // 1. Fetch catalog
    dbCourses = await db.course.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        instrument: true,
        level: true,
        sessionCount: true,
        priceMinorUnits: true,
        durationWeeks: true,
      },
      orderBy: { title: "asc" },
    });

    // 2. Fetch faculty teachers
    dbTeachers = await db.user.findMany({
      where: { role: Role.TEACHER },
      include: {
        teacherProfile: {
          select: {
            instruments: true,
            payoutPerSession: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    // 3. Fetch students roster
    dbStudents = await db.user.findMany({
      where: { role: Role.STUDENT },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        timezone: true,
        guardianName: true,
        guardianPhone: true,
        country: true,
        age: true,
      },
      orderBy: { name: "asc" },
    });

    // 4. Fetch trial leads
    dbTrialLeads = await db.trialRequest.findMany({
      select: {
        id: true,
        studentId: true,
        studentName: true,
        studentEmail: true,
        instrument: true,
        status: true,
        isConverted: true,
        preferredTimeSlot: true,
        allottedTeacherId: true,
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // 5. Fetch full relational enrollments with optimized select
    dbEnrollments = await db.enrollment.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            timezone: true,
            guardianName: true,
            guardianPhone: true,
            country: true,
            age: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            instrument: true,
            level: true,
            sessionCount: true,
            priceMinorUnits: true,
            durationWeeks: true,
          },
        },
        lessons: {
          select: {
            id: true,
            trackingCode: true,
            startsAt: true,
            durationMinutes: true,
            status: true,
            teacherId: true,
          },
          orderBy: { startsAt: "asc" },
        },
        payment: {
          select: {
            id: true,
            amountMinorUnits: true,
            status: true,
            gatewayPaymentId: true,
          },
        },
      },
      orderBy: { startedAt: "desc" },
    });
  } catch (error) {
    console.error("[AdminEnrollmentsPage] Error querying PostgreSQL:", error);
  }

  const teacherMap = new Map<string, { name: string; payoutRupees: number }>();
  for (const t of dbTeachers) {
    teacherMap.set(t.id, {
      name: t.name || "Faculty Teacher",
      payoutRupees: Math.round((t.teacherProfile?.payoutPerSession || 80000) / 100),
    });
  }

  const formattedEnrollments: EnrollmentRecord[] = dbEnrollments.map((e: any) => {
    const assignedFaculty = e.teacherId ? teacherMap.get(e.teacherId) : null;

    return {
      id: e.id,
      studentId: e.studentId,
      studentName: e.student.name || "Student",
      studentEmail: e.student.email,
      studentPhone: e.student.phone,
      studentTimezone: e.student.timezone || "Asia/Kolkata",
      studentGuardianName: e.student.guardianName,
      studentGuardianPhone: e.student.guardianPhone,
      studentCountry: e.student.country,
      studentAge: e.student.age,
      courseId: e.courseId,
      courseTitle: e.course.title,
      courseInstrument: e.course.instrument,
      courseLevel: e.course.level,
      courseSessionCount: e.course.sessionCount,
      coursePriceMinorUnits: e.course.priceMinorUnits,
      courseDurationWeeks: e.course.durationWeeks,
      teacherId: e.teacherId,
      teacherName: assignedFaculty?.name || null,
      teacherPayoutRupees: assignedFaculty?.payoutRupees || 800,
      sessionsRemaining: e.sessionsRemaining,
      sessionsTotal: e.course.sessionCount,
      status: e.status,
      startedAt: e.startedAt.toISOString(),
      adminNotes: e.adminNotes,
      lessons: (e.lessons || []).map((l: any) => ({
        id: l.id,
        trackingCode: l.trackingCode || `GS-LSN-${l.id.slice(-8).toUpperCase()}`,
        startsAt: l.startsAt.toISOString(),
        durationMinutes: l.durationMinutes,
        status: l.status,
        teacherId: l.teacherId,
        teacherName: (l.teacherId ? teacherMap.get(l.teacherId)?.name : null) || assignedFaculty?.name || "Assigned Faculty",
        payoutRupees: (l.teacherId ? teacherMap.get(l.teacherId)?.payoutRupees : null) || assignedFaculty?.payoutRupees || 800,
      })),
      payment: e.payment,
    };
  });

  const formattedCourses: CourseCatalogOption[] = dbCourses.map((c) => ({
    id: c.id,
    title: c.title,
    instrument: c.instrument,
    level: c.level,
    sessionCount: c.sessionCount,
    priceMinorUnits: c.priceMinorUnits,
    durationWeeks: c.durationWeeks,
  }));

  const formattedTeachers: FacultyOption[] = dbTeachers.map((t) => ({
    id: t.id,
    name: t.name || "Faculty Teacher",
    email: t.email,
    instruments: t.teacherProfile?.instruments || [],
    payoutRupees: Math.round((t.teacherProfile?.payoutPerSession || 80000) / 100),
  }));

  const formattedStudents: StudentOption[] = dbStudents.map((s) => ({
    id: s.id,
    name: s.name || "Student",
    email: s.email,
    timezone: s.timezone || "Asia/Kolkata",
    guardianName: s.guardianName,
    age: s.age,
    phone: s.phone,
    country: s.country,
  }));

  const formattedTrialLeads: TrialLeadOption[] = dbTrialLeads.map((t) => ({
    id: t.id,
    studentId: t.studentId,
    studentName: t.studentName,
    studentEmail: t.studentEmail,
    instrument: t.instrument,
    status: t.status,
    isConverted: t.isConverted,
    preferredTimeSlot: t.preferredTimeSlot,
    allottedTeacherId: t.allottedTeacherId,
  }));

  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-body">Loading enrollment planner...</div>}>
      <AdminEnrollmentsManager
        initialEnrollments={formattedEnrollments}
        courses={formattedCourses}
        teachers={formattedTeachers}
        students={formattedStudents}
        trialLeads={formattedTrialLeads}
      />
    </Suspense>
  );
}
