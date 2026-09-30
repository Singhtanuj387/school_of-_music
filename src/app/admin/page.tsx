import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import {
  Role,
  LessonStatus,
  TicketStatus,
  PaymentStatus,
  TrialRequestStatus,
  EnrollmentStatus,
} from "@prisma/client";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  CircleDollarSign,
  Video,
  HelpCircle,
  TrendingUp,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Settings,
  CreditCard,
  Sparkles,
  SlidersHorizontal,
  UserCheck,
} from "lucide-react";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "Admin Overview | Gandharva School of Music",
  description: "Executive operations dashboard, platform KPIs, and real-time activity feed.",
};

export default async function AdminOverviewPage() {
  await requireRole(Role.ADMIN);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // Parallel KPI queries
  const [
    activeStudents,
    activeTeachers,
    totalRevenueAgg,
    todayLessons,
    pendingTickets,
    pendingTrials,
    pendingCourseEnrollmentsCount,
    pendingTeacherApprovals,
    recentEnrollments,
    recentPayments,
    recentLessons,
    teacherUsers,
  ] = await Promise.all([
    db.user.count({
      where: { role: Role.STUDENT, isActive: true },
    }),
    db.user.count({
      where: { role: Role.TEACHER, isActive: true },
    }),
    db.payment.aggregate({
      _sum: { amountMinorUnits: true },
      where: { status: PaymentStatus.PAID },
    }),
    db.lesson.count({
      where: {
        status: LessonStatus.SCHEDULED,
        startsAt: { gte: startOfToday, lte: endOfToday },
      },
    }),
    db.supportTicket.count({
      where: {
        status: { in: [TicketStatus.OPEN, TicketStatus.IN_PROGRESS] },
      },
    }),
    db.trialRequest.count({
      where: { status: TrialRequestStatus.PENDING },
    }),
    db.enrollment.count({
      where: {
        status: EnrollmentStatus.ACTIVE,
        OR: [
          { teacherId: null },
          { lessons: { none: { status: LessonStatus.SCHEDULED } } },
        ],
      },
    }),
    db.teacherProfile.count({
      where: { approvalStatus: "PENDING" },
    }),
    db.enrollment.findMany({
      take: 6,
      orderBy: { startedAt: "desc" },
      include: {
        student: { select: { name: true, email: true } },
        course: { select: { title: true, instrument: true, sessionCount: true } },
        lessons: { select: { id: true, status: true } },
      },
    }),
    db.payment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        student: { select: { name: true, email: true } },
      },
    }),
    db.lesson.findMany({
      take: 5,
      orderBy: { startsAt: "desc" },
      include: {
        student: { select: { name: true } },
        teacher: { select: { name: true } },
      },
    }),
    db.user.findMany({
      where: { role: Role.TEACHER },
      select: { id: true, name: true },
    }),
  ]);

  const teacherMap = new Map<string, string>();
  for (const t of teacherUsers) {
    teacherMap.set(t.id, t.name || "Teacher");
  }

  const totalRevenueRupees = (totalRevenueAgg._sum.amountMinorUnits || 0) / 100;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-sans">
            Executive Control Center
          </span>
          <SplitHeading
            firstClause="Operations &"
            accentClause="Performance Overview"
            as="h1"
            size="lg"
          />
          <p className="text-xs text-body mt-1 max-w-2xl">
            Real-time platform metrics across enrollments, institutional revenue, faculty roster, and classroom sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/teachers"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-border-default text-xs font-semibold text-body hover:text-heading transition-all shadow-xs active:scale-[0.98]"
          >
            <UserCheck className="w-3.5 h-3.5 text-primary" />
            <span>Faculty Approvals</span>
            {pendingTeacherApprovals > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                {pendingTeacherApprovals}
              </span>
            )}
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-border-default text-xs font-semibold text-body hover:text-heading transition-all shadow-xs active:scale-[0.98]"
          >
            <Settings className="w-3.5 h-3.5 text-primary" />
            <span>Platform Settings</span>
          </Link>
        </div>
      </div>

      {/* Pending Faculty Approvals Alert Banner */}
      {pendingTeacherApprovals > 0 && (
        <div className="relative overflow-hidden rounded-2xl border border-amber-300 bg-amber-50/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white shadow-xs">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Approval Required
                </span>
                <p className="text-sm font-bold text-amber-950 font-numeric">
                  {pendingTeacherApprovals} Faculty {pendingTeacherApprovals === 1 ? "Registration Awaiting" : "Registrations Awaiting"} Administrative Review
                </p>
              </div>
              <p className="text-xs text-amber-900/80 mt-0.5">
                New instructor accounts have been created. Review teaching credentials, bio, instrument proficiencies, and approve faculty profiles.
              </p>
            </div>
          </div>
          <Link
            href="/admin/teachers"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-xs shrink-0 active:scale-[0.98]"
          >
            <span>Review & Approve Faculty &rarr;</span>
          </Link>
        </div>
      )}

      {/* Pending 1:1 Course Enrollments Alert Banner */}
      {pendingCourseEnrollmentsCount > 0 && (
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary-subtle/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold uppercase tracking-wider">
                  Action Required
                </span>
                <p className="text-sm font-bold text-heading font-numeric">
                  {pendingCourseEnrollmentsCount} Student Course {pendingCourseEnrollmentsCount === 1 ? "Enrollment Needs" : "Enrollments Need"} Allotment & 1:1 Scheduling
                </p>
              </div>
              <p className="text-xs text-body mt-0.5">
                Students have enrolled in courses. Allot dedicated certified faculty mentors and schedule their private 1-on-1 personalized sessions.
              </p>
            </div>
          </div>
          <Link
            href="/admin/enrollments"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs transition-all shadow-xs shrink-0 active:scale-[0.98]"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Allot Teachers & Schedule 1:1 &rarr;</span>
          </Link>
        </div>
      )}

      {/* Pending Trials Alert Banner */}
      {pendingTrials > 0 && (
        <div className="relative overflow-hidden rounded-2xl border border-amber-300 bg-amber-50/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-accent-dark border border-amber-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-950 font-numeric">
                {pendingTrials} Trial Lesson {pendingTrials === 1 ? "Request" : "Requests"} Awaiting Faculty Allotment
              </p>
              <p className="text-xs text-amber-900/80">
                Incoming student trial requests need certified faculty instructors assigned to confirm sessions.
              </p>
            </div>
          </div>
          <Link
            href="/admin/trials"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-xs transition-all shadow-xs shrink-0 active:scale-[0.98]"
          >
            Review & Allot Faculty &rarr;
          </Link>
        </div>
      )}

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1: Active Students */}
        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-body">
            <span className="text-xs font-semibold">Active Students</span>
            <div className="w-7 h-7 rounded-lg bg-primary-subtle flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-heading mt-1 font-numeric">
            {activeStudents}
          </p>
          <p className="text-[11px] text-body">Registered learners</p>
        </div>

        {/* KPI 2: Active Teachers */}
        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-body">
            <span className="text-xs font-semibold">Faculty Instructors</span>
            <div className="w-7 h-7 rounded-lg bg-accent-subtle flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5 text-accent-dark" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-heading mt-1 font-numeric">
            {activeTeachers}
          </p>
          <p className="text-[11px] text-body">Teaching faculty</p>
        </div>

        {/* KPI 3: Total Revenue */}
        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-body">
            <span className="text-xs font-semibold">Total Revenue</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CircleDollarSign className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-emerald-700 mt-1 font-numeric">
            ₹{totalRevenueRupees.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-body">Captured payments</p>
        </div>

        {/* KPI 4: Today's Lessons */}
        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-body">
            <span className="text-xs font-semibold">Lessons Today</span>
            <div className="w-7 h-7 rounded-lg bg-primary-subtle flex items-center justify-center">
              <Video className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-primary mt-1 font-numeric">
            {todayLessons}
          </p>
          <p className="text-[11px] text-body">Scheduled on calendar</p>
        </div>

        {/* KPI 5: Pending Tickets */}
        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-body">
            <span className="text-xs font-semibold">Support Queue</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
              <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            </div>
          </div>
          <p className="font-serif text-2xl font-bold text-accent-dark mt-1 font-numeric">
            {pendingTickets}
          </p>
          <p className="text-[11px] text-body">Open or in progress</p>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="rounded-2xl border border-border-default bg-white p-5 shadow-xs space-y-3">
        <h3 className="font-serif text-sm font-bold text-heading uppercase tracking-wider text-[11px]">
          Administrative Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/users"
            className="p-3.5 rounded-xl bg-bg-alt/30 hover:bg-bg-alt/60 border border-border-default/60 text-left transition-all group flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <Users className="w-4 h-4 text-primary" />
              <ArrowUpRight className="w-3.5 h-3.5 text-body/40 group-hover:text-primary transition-colors" />
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold text-heading group-hover:text-primary transition-colors">
                User Management
              </p>
              <p className="text-[10px] text-body">Edit roles & trials</p>
            </div>
          </Link>

          <Link
            href="/admin/courses"
            className="p-3.5 rounded-xl bg-bg-alt/30 hover:bg-bg-alt/60 border border-border-default/60 text-left transition-all group flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <BookOpen className="w-4 h-4 text-accent-dark" />
              <ArrowUpRight className="w-3.5 h-3.5 text-body/40 group-hover:text-accent-dark transition-colors" />
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold text-heading group-hover:text-accent-dark transition-colors">
                Course Catalog
              </p>
              <p className="text-[10px] text-body">Create & manage syllabi</p>
            </div>
          </Link>

          <Link
            href="/admin/enrollments"
            className="p-3.5 rounded-xl bg-primary-subtle/50 hover:bg-primary-subtle border border-primary/20 text-left transition-all group flex flex-col justify-between active:scale-[0.98] relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <GraduationCap className="w-4 h-4 text-primary" />
              {pendingCourseEnrollmentsCount > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-primary text-white font-bold text-[10px] font-numeric animate-pulse">
                  {pendingCourseEnrollmentsCount}
                </span>
              ) : (
                <ArrowUpRight className="w-3.5 h-3.5 text-body/40 group-hover:text-primary transition-colors" />
              )}
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold text-heading group-hover:text-primary transition-colors">
                1:1 Course Scheduling
              </p>
              <p className="text-[10px] text-body">Allot faculty & timetable</p>
            </div>
          </Link>

          <Link
            href="/admin/trials"
            className="p-3.5 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 border border-amber-200 text-left transition-all group flex flex-col justify-between relative overflow-hidden active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <Sparkles className="w-4 h-4 text-accent-dark" />
              {pendingTrials > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-accent text-white font-bold text-[10px] font-numeric animate-pulse">
                  {pendingTrials}
                </span>
              )}
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold text-heading group-hover:text-accent-dark transition-colors">
                Trial Requests
              </p>
              <p className="text-[10px] text-accent-dark font-medium">
                {pendingTrials > 0 ? `${pendingTrials} need faculty` : "Allot teachers"}
              </p>
            </div>
          </Link>

          <Link
            href="/admin/support"
            className="p-3.5 rounded-xl bg-bg-alt/30 hover:bg-bg-alt/60 border border-border-default/60 text-left transition-all group flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <HelpCircle className="w-4 h-4 text-rose-600" />
              <ArrowUpRight className="w-3.5 h-3.5 text-body/40 group-hover:text-rose-600 transition-colors" />
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold text-heading group-hover:text-rose-600 transition-colors">
                Support Desk
              </p>
              <p className="text-[10px] text-body">Resolve inquiries</p>
            </div>
          </Link>

          <Link
            href="/admin/payments"
            className="p-3.5 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/60 border border-emerald-200/80 text-left transition-all group flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              <ArrowUpRight className="w-3.5 h-3.5 text-body/40 group-hover:text-emerald-700 transition-colors" />
            </div>
            <div className="mt-2">
              <p className="text-xs font-bold text-heading group-hover:text-emerald-700 transition-colors">
                Payment Management
              </p>
              <p className="text-[10px] text-body">Pay teacher & audit</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Activity Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Enrollments: 1:1 Scheduling & Faculty Allotment Queue */}
        <div className="rounded-2xl border border-border-default bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border-default pb-3">
            <div>
              <h3 className="font-serif text-sm font-bold text-heading">
                Course Enrollments (1:1 Scheduling Queue)
              </h3>
              <p className="text-[11px] text-body mt-0.5">
                Allot certified faculty teachers and schedule private 1-on-1 sessions.
              </p>
            </div>
            <Link
              href="/admin/enrollments"
              className="text-xs font-semibold text-primary hover:text-primary-dark whitespace-nowrap"
            >
              View all &rarr;
            </Link>
          </div>

          {recentEnrollments.length === 0 ? (
            <p className="text-xs text-body/60 italic py-4 text-center">
              No recent course enrollments recorded.
            </p>
          ) : (
            <div className="space-y-3">
              {recentEnrollments.map((enr) => {
                const teacherName = enr.teacherId ? teacherMap.get(enr.teacherId) : null;
                const scheduledCount = enr.lessons.filter((l) => l.status === "SCHEDULED").length;

                return (
                  <div
                    key={enr.id}
                    className="p-3.5 rounded-xl bg-bg-alt/25 border border-border-default/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:border-primary/30 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-heading">{enr.student.name || "Student"}</p>
                        <span className="text-[10px] text-body">({enr.student.email})</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-body flex-wrap">
                        <span className="font-semibold text-accent-dark">{enr.course.title}</span>
                        <span>•</span>
                        <span>{enr.course.instrument}</span>
                        <span>•</span>
                        <span className="font-numeric font-medium">{scheduledCount} / {enr.course.sessionCount} Scheduled</span>
                      </div>
                      <div className="pt-0.5">
                        {teacherName ? (
                          <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Faculty: {teacherName}
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-flex items-center gap-1">
                            ⚠️ Needs Faculty Allotment
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/admin/enrollments?schedule=${enr.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-xs transition-all shrink-0 active:scale-[0.98]"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Allot Teacher & Schedule 1:1</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Latest Payments */}
        <div className="rounded-2xl border border-border-default bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border-default pb-3">
            <h3 className="font-serif text-sm font-bold text-heading">
              Recent Institutional Payments
            </h3>
            <Link
              href="/admin/enrollments"
              className="text-xs font-semibold text-primary hover:text-primary-dark"
            >
              View ledger &rarr;
            </Link>
          </div>

          {recentPayments.length === 0 ? (
            <p className="text-xs text-body/60 italic py-4 text-center">
              No recent payment transactions recorded.
            </p>
          ) : (
            <div className="space-y-2.5">
              {recentPayments.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-bg-alt/20 border border-border-default/50 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-heading">{p.student.name}</p>
                    <p className="text-[11px] text-body font-numeric">
                      {p.gatewayPaymentId || p.gatewayOrderId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-700 font-numeric">
                      ₹{(p.amountMinorUnits / 100).toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-body font-numeric">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
