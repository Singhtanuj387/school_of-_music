import { getCurrentUser } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {
  Role,
  LessonStatus,
  TicketStatus,
  PaymentStatus,
  TrialRequestStatus,
  EnrollmentStatus,
  TeacherPayoutStatus,
} from "@prisma/client";
import {
  AdminOverviewClient,
  ScheduleItem,
  FunnelStage,
  DailyCollectionBar,
  NeedsAttentionItem,
} from "./AdminOverviewClient";

export const metadata = {
  title: "Admin Overview | Gandharva School of Music",
  description:
    "Operational pulse across learning, collections, and teacher readiness.",
};

export default async function AdminOverviewPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (user.role !== Role.ADMIN) {
    redirect("/dashboard");
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
  const fourteenDaysAgo = new Date(Date.now() - 14 * 86400000);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000);

  // Initialize DB metrics with zero defaults
  let dbActiveStudents = 0;
  let dbStudentsThisMonth = 0;
  let dbActiveTeachers = 0;
  let dbAvailableTeachers = 0;
  let dbTodayScheduledLessons = 0;
  let dbTodayCompletedLessons = 0;
  let dbLiveLessons = 0;
  let dbPendingTrials = 0;
  let dbTrialsNeedFollowUp = 0;
  let dbActiveEnrollments = 0;
  let dbGoodStandingEnrollments = 0;
  let dbThisWeekRevenueMinor = 0;
  let dbPriorWeekRevenueMinor = 0;
  let dbPendingRevenueMinor = 0;
  let dbOverdueRevenueMinor = 0;
  let dbOverduePaymentsCount = 0;
  let dbPendingPayoutMinor = 0;
  let dbPendingPayoutTeachers = 0;
  let dbUnpaidLessonsCount = 0;
  let dbPaidCompletedLessons = 0;
  let dbTotalCompletedLessons = 0;
  let dbPendingCourseRequests = 0;
  let dbPendingTeacherApprovals = 0;
  let dbPendingTickets = 0;
  let dbPendingRecordingsCount = 0;
  let dbTodayLessonsRaw: any[] = [];
  let dbTrials30DaysCount = 0;
  let dbTrialsAttendedCount = 0;
  let dbTrialsQualifiedCount = 0;
  let dbTrialsConvertedCount = 0;
  let dbPayments7DaysRaw: any[] = [];
  let dbScheduledLessonsForConflict: any[] = [];

  try {
    const results = await Promise.allSettled([
      // 0: Active Students
      db.user.count({ where: { role: Role.STUDENT, isActive: true } }),
      // 1: Students joined this month
      db.user.count({ where: { role: Role.STUDENT, createdAt: { gte: startOfMonth } } }),
      // 2: Active Teachers
      db.user.count({ where: { role: Role.TEACHER, isActive: true } }),
      // 3: Approved Teacher Profiles
      db.teacherProfile.count({ where: { approvalStatus: "APPROVED" } }),
      // 4: Today's Scheduled Lessons
      db.lesson.count({
        where: { startsAt: { gte: startOfToday, lte: endOfToday }, status: LessonStatus.SCHEDULED },
      }),
      // 5: Today's Completed Lessons
      db.lesson.count({
        where: { startsAt: { gte: startOfToday, lte: endOfToday }, status: LessonStatus.COMPLETED },
      }),
      // 6: Live Lessons
      db.lesson.count({
        where: {
          status: LessonStatus.SCHEDULED,
          startsAt: { lte: now, gte: new Date(now.getTime() - 90 * 60 * 1000) },
        },
      }),
      // 7: Pending Trials
      db.trialRequest.count({
        where: { status: TrialRequestStatus.PENDING },
      }),
      // 8: Pending Trials needing follow up
      db.trialRequest.count({
        where: { status: TrialRequestStatus.PENDING, isContacted: false },
      }),
      // 9: Active Enrollments
      db.enrollment.count({
        where: { status: EnrollmentStatus.ACTIVE },
      }),
      // 10: Active Enrollments with sessions remaining
      db.enrollment.count({
        where: { status: EnrollmentStatus.ACTIVE, sessionsRemaining: { gt: 0 } },
      }),
      // 11: Revenue collected past 7 days
      db.payment.aggregate({
        _sum: { amountMinorUnits: true },
        where: { status: PaymentStatus.PAID, createdAt: { gte: sevenDaysAgo } },
      }),
      // 12: Revenue collected prior 7-14 days
      db.payment.aggregate({
        _sum: { amountMinorUnits: true },
        where: { status: PaymentStatus.PAID, createdAt: { gte: fourteenDaysAgo, lt: sevenDaysAgo } },
      }),
      // 13: Pending Payments
      db.payment.aggregate({
        _sum: { amountMinorUnits: true },
        where: { status: PaymentStatus.CREATED },
      }),
      // 14: Overdue payments (created > 7 days ago and still pending)
      db.payment.aggregate({
        _sum: { amountMinorUnits: true },
        where: { status: PaymentStatus.CREATED, createdAt: { lt: sevenDaysAgo } },
      }),
      // 15: Overdue payments count
      db.payment.count({
        where: { status: PaymentStatus.CREATED, createdAt: { lt: sevenDaysAgo } },
      }),
      // 16: Unpaid Teacher Lessons minor sum
      db.lesson.aggregate({
        _sum: { payoutAmountMinor: true },
        where: { status: LessonStatus.COMPLETED, payoutStatus: TeacherPayoutStatus.UNPAID },
      }),
      // 17: Distinct teachers with unpaid lessons
      db.lesson.findMany({
        where: { status: LessonStatus.COMPLETED, payoutStatus: TeacherPayoutStatus.UNPAID },
        select: { teacherId: true },
        distinct: ["teacherId"],
      }),
      // 18: Unpaid completed lessons count
      db.lesson.count({
        where: { status: LessonStatus.COMPLETED, payoutStatus: TeacherPayoutStatus.UNPAID },
      }),
      // 19: Paid completed lessons count
      db.lesson.count({
        where: { status: LessonStatus.COMPLETED, payoutStatus: TeacherPayoutStatus.PAID },
      }),
      // 20: Total completed lessons count
      db.lesson.count({
        where: { status: LessonStatus.COMPLETED },
      }),
      // 21: Pending Course Enrollment Requests
      db.courseEnrollmentRequest.count({ where: { status: "PENDING" } }),
      // 22: Pending Teacher Approvals
      db.teacherProfile.count({ where: { approvalStatus: "PENDING" } }),
      // 23: Open Support Tickets
      db.supportTicket.count({ where: { status: { in: [TicketStatus.OPEN, TicketStatus.IN_PROGRESS] } } }),
      // 24: Completed lessons pending recording
      db.lesson.count({
        where: { status: LessonStatus.COMPLETED, recordingUrl: null },
      }),
      // 25: Today's Lessons with details
      db.lesson.findMany({
        where: { startsAt: { gte: startOfToday, lte: endOfToday } },
        include: {
          student: { select: { name: true } },
          teacher: { select: { name: true } },
          enrollment: { include: { course: true } },
        },
        orderBy: { startsAt: "asc" },
      }),
      // 26: 30-day Trials
      db.trialRequest.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { status: true, isContacted: true, isConverted: true },
      }),
      // 27: Payments past 7 days for trend
      db.payment.findMany({
        where: { status: PaymentStatus.PAID, createdAt: { gte: sevenDaysAgo } },
        select: { amountMinorUnits: true, createdAt: true },
      }),
      // 28: Scheduled lessons for conflict detection
      db.lesson.findMany({
        where: { startsAt: { gte: startOfToday }, status: LessonStatus.SCHEDULED },
        select: { id: true, teacherId: true, startsAt: true, durationMinutes: true },
        orderBy: { startsAt: "asc" },
        take: 100,
      }),
    ]);

    if (results[0].status === "fulfilled") dbActiveStudents = results[0].value;
    if (results[1].status === "fulfilled") dbStudentsThisMonth = results[1].value;
    if (results[2].status === "fulfilled") dbActiveTeachers = results[2].value;
    if (results[3].status === "fulfilled") dbAvailableTeachers = results[3].value;
    if (results[4].status === "fulfilled") dbTodayScheduledLessons = results[4].value;
    if (results[5].status === "fulfilled") dbTodayCompletedLessons = results[5].value;
    if (results[6].status === "fulfilled") dbLiveLessons = results[6].value;
    if (results[7].status === "fulfilled") dbPendingTrials = results[7].value;
    if (results[8].status === "fulfilled") dbTrialsNeedFollowUp = results[8].value;
    if (results[9].status === "fulfilled") dbActiveEnrollments = results[9].value;
    if (results[10].status === "fulfilled") dbGoodStandingEnrollments = results[10].value;
    if (results[11].status === "fulfilled") dbThisWeekRevenueMinor = results[11].value._sum?.amountMinorUnits || 0;
    if (results[12].status === "fulfilled") dbPriorWeekRevenueMinor = results[12].value._sum?.amountMinorUnits || 0;
    if (results[13].status === "fulfilled") dbPendingRevenueMinor = results[13].value._sum?.amountMinorUnits || 0;
    if (results[14].status === "fulfilled") dbOverdueRevenueMinor = results[14].value._sum?.amountMinorUnits || 0;
    if (results[15].status === "fulfilled") dbOverduePaymentsCount = results[15].value;
    if (results[16].status === "fulfilled") dbPendingPayoutMinor = results[16].value._sum?.payoutAmountMinor || 0;
    if (results[17].status === "fulfilled") dbPendingPayoutTeachers = results[17].value.length;
    if (results[18].status === "fulfilled") dbUnpaidLessonsCount = results[18].value;
    if (results[19].status === "fulfilled") dbPaidCompletedLessons = results[19].value;
    if (results[20].status === "fulfilled") dbTotalCompletedLessons = results[20].value;
    if (results[21].status === "fulfilled") dbPendingCourseRequests = results[21].value;
    if (results[22].status === "fulfilled") dbPendingTeacherApprovals = results[22].value;
    if (results[23].status === "fulfilled") dbPendingTickets = results[23].value;
    if (results[24].status === "fulfilled") dbPendingRecordingsCount = results[24].value;
    if (results[25].status === "fulfilled") dbTodayLessonsRaw = results[25].value;
    if (results[26].status === "fulfilled") {
      const trials = results[26].value;
      dbTrials30DaysCount = trials.length;
      dbTrialsAttendedCount = trials.filter((t) => t.status === TrialRequestStatus.ALLOTTED).length;
      dbTrialsQualifiedCount = trials.filter((t) => t.isContacted).length;
      dbTrialsConvertedCount = trials.filter((t) => t.isConverted).length;
    }
    if (results[27].status === "fulfilled") dbPayments7DaysRaw = results[27].value;
    if (results[28].status === "fulfilled") dbScheduledLessonsForConflict = results[28].value;
  } catch (err) {
    console.error("Failed to query database metrics for admin overview:", err);
  }

  // ─── 1. REAL 10 EXECUTIVE KPIS (100% DATABASE TRUTH) ──────────────────────
  const activeStudents = dbActiveStudents;
  const studentsGrowth = `${dbStudentsThisMonth > 0 ? `+${dbStudentsThisMonth}` : "0"} this month`;

  const activeTeachers = dbActiveTeachers;
  const teachersAvailable = `${dbAvailableTeachers} approved faculty`;

  const todayClassesTotal = dbTodayScheduledLessons + dbTodayCompletedLessons;
  const todayClassesDetail = `${dbTodayScheduledLessons} scheduled · ${dbTodayCompletedLessons} complete`;

  const liveClasses = dbLiveLessons;
  const liveClassesStatus = liveClasses > 0 ? `${liveClasses} active now` : "All rooms healthy";

  const pendingTrials = dbPendingTrials;
  const pendingTrialsDetail = `${dbTrialsNeedFollowUp} need follow-up`;

  const activeEnrollments = dbActiveEnrollments;
  const standingPct = dbActiveEnrollments > 0
    ? Math.round((dbGoodStandingEnrollments / dbActiveEnrollments) * 100)
    : 100;
  const enrollmentsStanding = dbActiveEnrollments > 0
    ? `${standingPct}% in good standing`
    : "No active enrollments";

  const outstandingRupees = (dbPendingRevenueMinor || 0) / 100;
  const inrOutstanding = outstandingRupees > 0
    ? (outstandingRupees >= 100000
        ? `₹${(outstandingRupees / 100000).toFixed(2)}L`
        : `₹${outstandingRupees.toLocaleString("en-IN")}`)
    : "₹0";

  const overdueRupees = (dbOverdueRevenueMinor || 0) / 100;
  const inrOverdue = overdueRupees > 0
    ? (overdueRupees >= 100000
        ? `₹${(overdueRupees / 100000).toFixed(2)}L overdue`
        : `₹${overdueRupees.toLocaleString("en-IN")} overdue`)
    : "₹0 overdue";

  const collectedWeekRupees = (dbThisWeekRevenueMinor || 0) / 100;
  const collectedThisWeek = collectedWeekRupees > 0
    ? (collectedWeekRupees >= 100000
        ? `₹${(collectedWeekRupees / 100000).toFixed(1)}L`
        : `₹${collectedWeekRupees.toLocaleString("en-IN")}`)
    : "₹0";

  const priorWeekRupees = (dbPriorWeekRevenueMinor || 0) / 100;
  let collectedGrowth = "0% this week";
  if (priorWeekRupees > 0) {
    const diffPct = Math.round(((collectedWeekRupees - priorWeekRupees) / priorWeekRupees) * 100);
    collectedGrowth = `${diffPct >= 0 ? `+${diffPct}` : diffPct}% vs prior week`;
  } else if (collectedWeekRupees > 0) {
    collectedGrowth = "+100% vs prior week";
  }

  const pendingPayoutRupees = (dbPendingPayoutMinor || 0) / 100;
  const mondayPayoutPending = pendingPayoutRupees > 0
    ? (pendingPayoutRupees >= 100000
        ? `₹${(pendingPayoutRupees / 100000).toFixed(2)}L`
        : `₹${pendingPayoutRupees.toLocaleString("en-IN")}`)
    : "₹0";

  const mondayPayoutDetail = `${dbPendingPayoutTeachers} ${
    dbPendingPayoutTeachers === 1 ? "teacher" : "teachers"
  } · prior period`;

  const awaitingReview = dbPendingCourseRequests + dbPendingTeacherApprovals + dbPendingTickets;
  const awaitingReviewDetail = awaitingReview > 0 ? `${awaitingReview} in queue` : "Queue clear";

  // ─── 2. REAL TODAY'S SCHEDULE LIST ─────────────────────────────────────────
  const scheduleList: ScheduleItem[] = dbTodayLessonsRaw.map((l: any) => {
    const startsDate = new Date(l.startsAt);
    const timeStr = startsDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });

    let status: "COMPLETED" | "IN_PROGRESS" | "JOIN_OPENS" | "SCHEDULED" = "SCHEDULED";
    if (l.status === LessonStatus.COMPLETED) {
      status = "COMPLETED";
    } else {
      const diffMinutes = (startsDate.getTime() - now.getTime()) / 60000;
      if (diffMinutes <= 0 && diffMinutes >= -(l.durationMinutes || 60)) {
        status = "IN_PROGRESS";
      } else if (diffMinutes > 0 && diffMinutes <= 30) {
        status = "JOIN_OPENS";
      }
    }

    return {
      id: l.id,
      time: `${timeStr} IST`,
      title: `${l.instrument || "Vocal"} · ${l.enrollment?.course?.level || "Standard"}`,
      faculty: l.teacher?.name || "Faculty Instructor",
      student: l.student?.name || "Student",
      status,
      joinTime: timeStr,
      lessonId: l.id,
    };
  });

  // ─── 3. REAL TRIAL CONVERSION FUNNEL (30 DAYS) ─────────────────────────────
  const bookedCount = dbTrials30DaysCount;
  const attendedCount = dbTrialsAttendedCount;
  const qualifiedCount = dbTrialsQualifiedCount;
  const enrolledCount = dbTrialsConvertedCount;

  const funnelStages: FunnelStage[] = [
    {
      label: "Booked",
      count: bookedCount,
      pct: bookedCount > 0 ? 100 : 0,
    },
    {
      label: "Attended",
      count: attendedCount,
      pct: bookedCount > 0 ? Math.round((attendedCount / bookedCount) * 100) : 0,
    },
    {
      label: "Qualified",
      count: qualifiedCount,
      pct: bookedCount > 0 ? Math.round((qualifiedCount / bookedCount) * 100) : 0,
    },
    {
      label: "Enrolled",
      count: enrolledCount,
      pct: bookedCount > 0 ? Math.round((enrolledCount / bookedCount) * 100) : 0,
      isHighlight: true,
    },
  ];

  // ─── 4. REAL COLLECTIONS TREND (CALENDAR WEEK: M-S) ───────────────────────
  const weekDayLetters = ["M", "T", "W", "T", "F", "S", "S"];
  const currentDayIdx = (now.getDay() + 6) % 7; // 0=Mon, 1=Tue, ..., 6=Sun
  const startOfCurrentWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - currentDayIdx,
    0,
    0,
    0,
    0
  );

  const weeklyBuckets = weekDayLetters.map((letter, idx) => {
    const dayDate = new Date(startOfCurrentWeek.getTime() + idx * 86400000);
    const dateKey = `${dayDate.getFullYear()}-${dayDate.getMonth()}-${dayDate.getDate()}`;
    const isSunday = idx === 6;
    const isToday = idx === currentDayIdx;
    return {
      day: letter,
      amountRupees: 0,
      dateKey,
      isSunday,
      isToday,
    };
  });

  if (dbPayments7DaysRaw && dbPayments7DaysRaw.length > 0) {
    dbPayments7DaysRaw.forEach((p: any) => {
      const pd = new Date(p.createdAt);
      const pKey = `${pd.getFullYear()}-${pd.getMonth()}-${pd.getDate()}`;
      const bucket = weeklyBuckets.find((b) => b.dateKey === pKey);
      if (bucket) {
        bucket.amountRupees += (p.amountMinorUnits || 0) / 100;
      }
    });
  }

  const maxWeeklyAmount = Math.max(...weeklyBuckets.map((b) => b.amountRupees), 0);
  const collectionsBars: DailyCollectionBar[] = weeklyBuckets.map((b) => ({
    day: b.day,
    amountRupees: b.amountRupees,
    heightPct:
      maxWeeklyAmount > 0 && b.amountRupees > 0
        ? Math.max(Math.round((b.amountRupees / maxWeeklyAmount) * 100), 20)
        : 0,
    isPeakOrCurrent: b.isSunday || (b.isToday && b.amountRupees > 0),
  }));

  const weeklyCollectionsDisplay = collectedWeekRupees > 0
    ? `₹${collectedWeekRupees.toLocaleString("en-IN")} this week`
    : "₹0 this week";

  // ─── 5. REAL MONDAY PAYOUT READINESS ───────────────────────────────────────
  const payoutReadinessPct = dbTotalCompletedLessons > 0
    ? Math.round((dbPaidCompletedLessons / dbTotalCompletedLessons) * 100)
    : 100;

  const payoutTotalDisplay = pendingPayoutRupees > 0
    ? `₹${pendingPayoutRupees.toLocaleString("en-IN")}`
    : "₹0";

  const payoutBreakdown = `${dbUnpaidLessonsCount} ready · ${dbPendingTeacherApprovals} need review · 0 on hold`;
  const payoutApproveCount = dbUnpaidLessonsCount;

  // ─── 6. REAL NEEDS ATTENTION EXCEPTIONS ────────────────────────────────────
  let conflictCount = 0;
  const lessonsByTeacher: Record<string, any[]> = {};
  for (const l of dbScheduledLessonsForConflict) {
    if (!lessonsByTeacher[l.teacherId]) lessonsByTeacher[l.teacherId] = [];
    lessonsByTeacher[l.teacherId].push(l);
  }
  for (const teacherId in lessonsByTeacher) {
    const tLessons = lessonsByTeacher[teacherId];
    for (let i = 0; i < tLessons.length; i++) {
      for (let j = i + 1; j < tLessons.length; j++) {
        const t1 = new Date(tLessons[i].startsAt).getTime();
        const d1 = (tLessons[i].durationMinutes || 60) * 60000;
        const t2 = new Date(tLessons[j].startsAt).getTime();
        const d2 = (tLessons[j].durationMinutes || 60) * 60000;
        if (Math.max(t1, t2) < Math.min(t1 + d1, t2 + d2)) {
          conflictCount++;
        }
      }
    }
  }

  const attentionItems: NeedsAttentionItem[] = [];

  if (conflictCount > 0) {
    attentionItems.push({
      id: "att-conflict",
      title: "Teacher conflict",
      description: `${conflictCount} overlapping ${conflictCount === 1 ? "session" : "sessions"} detected`,
      color: "rose",
      href: "/admin/lessons",
    });
  }

  if (dbPendingRecordingsCount > 0) {
    attentionItems.push({
      id: "att-recording",
      title: "Recording pending",
      description: `${dbPendingRecordingsCount} completed ${
        dbPendingRecordingsCount === 1 ? "class" : "classes"
      } awaiting secure recording`,
      color: "amber",
      href: "/admin/lessons",
    });
  }

  if (dbPendingTeacherApprovals > 0) {
    attentionItems.push({
      id: "att-teacher",
      title: "Teacher verification",
      description: `${dbPendingTeacherApprovals} faculty ${
        dbPendingTeacherApprovals === 1 ? "profile" : "profiles"
      } awaiting approval`,
      color: "rose",
      href: "/admin/teachers",
    });
  }

  if (dbOverduePaymentsCount > 0) {
    attentionItems.push({
      id: "att-overdue",
      title: "Reconciliation gap",
      description: `${dbOverduePaymentsCount} uncaptured ${
        dbOverduePaymentsCount === 1 ? "invoice" : "invoices"
      } overdue`,
      color: "sky",
      href: "/admin/payments",
    });
  }

  if (dbPendingTickets > 0 && attentionItems.length < 3) {
    attentionItems.push({
      id: "att-support",
      title: "Support ticket",
      description: `${dbPendingTickets} unresolved ${
        dbPendingTickets === 1 ? "inquiry" : "inquiries"
      }`,
      color: "sky",
      href: "/admin/support",
    });
  }

  return (
    <AdminOverviewClient
      kpis={{
        activeStudents,
        studentsGrowth,
        activeTeachers,
        teachersAvailable,
        todayClasses: todayClassesTotal,
        todayClassesDetail,
        liveClasses,
        liveClassesStatus,
        pendingTrials,
        pendingTrialsDetail,
        activeEnrollments,
        enrollmentsStanding,
        inrOutstanding,
        inrOverdue,
        collectedThisWeek,
        collectedGrowth,
        mondayPayoutPending,
        mondayPayoutDetail,
        awaitingReview,
        awaitingReviewDetail,
      }}
      todaySessionsCount={todayClassesTotal}
      scheduleList={scheduleList}
      funnelStages={funnelStages}
      weeklyCollectionsDisplay={weeklyCollectionsDisplay}
      collectionsBars={collectionsBars}
      payoutReadinessPct={payoutReadinessPct}
      payoutTotalDisplay={payoutTotalDisplay}
      payoutBreakdown={payoutBreakdown}
      payoutApproveCount={payoutApproveCount}
      attentionItems={attentionItems}
    />
  );
}
