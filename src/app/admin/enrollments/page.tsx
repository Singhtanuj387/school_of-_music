import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import {
  AdminEnrollmentsManager,
  AdminEnrollmentItem,
  AdminPaymentItem,
  TeacherOption,
} from "./AdminEnrollmentsManager";
import { SplitHeading } from "@/components/ui/SplitHeading";

import { Suspense } from "react";

export const metadata = {
  title: "1:1 Course Scheduling & Enrollments | Admin Portal | Gandharva School of Music",
  description: "Allot certified faculty teachers to enrolled students, customize 1-on-1 timetables, and audit session tracking.",
};

export default async function AdminEnrollmentsPage() {
  await requireRole(Role.ADMIN);

  const [dbEnrollments, dbPayments, dbTeachers] = await Promise.all([
    db.enrollment.findMany({
      include: {
        student: { select: { id: true, name: true, email: true, timezone: true } },
        course: { select: { id: true, title: true, instrument: true, sessionCount: true } },
        lessons: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: { startedAt: "desc" },
    }),
    db.payment.findMany({
      include: {
        student: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.user.findMany({
      where: { role: Role.TEACHER, isActive: true },
      include: {
        teacherProfile: {
          select: {
            instruments: true,
            payoutPerSession: true,
          },
        },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  const teacherMap = new Map<string, string>();
  for (const t of dbTeachers) {
    teacherMap.set(t.id, t.name || "Teacher");
  }

  const formattedEnrollments: AdminEnrollmentItem[] = dbEnrollments.map((e) => {
    const scheduledLessonsCount = e.lessons.filter((l) => l.status === "SCHEDULED").length;
    const completedLessonsCount = e.lessons.filter((l) => l.status === "COMPLETED").length;

    return {
      id: e.id,
      studentId: e.studentId,
      studentName: e.student.name || "Student",
      studentEmail: e.student.email,
      studentTimezone: e.student.timezone || "UTC",
      courseId: e.courseId,
      courseTitle: e.course.title,
      courseInstrument: e.course.instrument,
      teacherId: e.teacherId,
      teacherName: e.teacherId ? teacherMap.get(e.teacherId) || "Assigned Teacher" : null,
      sessionsRemaining: e.sessionsRemaining,
      sessionsTotal: e.course.sessionCount,
      scheduledLessonsCount,
      completedLessonsCount,
      status: e.status,
      startedAt: e.startedAt.toISOString(),
    };
  });

  const formattedPayments: AdminPaymentItem[] = dbPayments.map((p) => ({
    id: p.id,
    gatewayPaymentId: p.gatewayPaymentId,
    gatewayOrderId: p.gatewayOrderId,
    amountMinorUnits: p.amountMinorUnits,
    currency: p.currency,
    status: p.status,
    studentName: p.student.name || "Student",
    studentEmail: p.student.email,
    createdAt: p.createdAt.toISOString(),
  }));

  const teacherOptions: TeacherOption[] = dbTeachers.map((t) => ({
    id: t.id,
    name: t.name || "Teacher",
    email: t.email,
    instruments: t.teacherProfile?.instruments || [],
    payoutRupees: (t.teacherProfile?.payoutPerSession || 80000) / 100,
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-sans">
          Institutional Operations
        </span>
        <SplitHeading
          firstClause="1:1 Course Scheduling &"
          accentClause="Enrollment Ledger"
          as="h1"
          size="lg"
        />
        <p className="text-xs text-body mt-1 max-w-2xl">
          Allot dedicated faculty teachers to student course enrollments, build personalized 1-on-1 timetables, and audit financial lesson tracking IDs.
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-xs text-body">Loading 1-on-1 scheduling portal...</div>}>
        <AdminEnrollmentsManager
          initialEnrollments={formattedEnrollments}
          initialPayments={formattedPayments}
          teachers={teacherOptions}
        />
      </Suspense>
    </div>
  );
}
