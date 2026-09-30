"use client";

import { useState, useTransition, useEffect } from "react";
import { EnrollmentStatus, PaymentStatus, LessonStatus } from "@prisma/client";
import {
  reassignEnrollmentTeacherAction,
  getEnrollmentScheduleAction,
  scheduleEnrollmentLessonAction,
  bulkScheduleEnrollmentLessonsAction,
  rescheduleEnrollmentLessonAction,
  deleteOrCancelEnrollmentLessonAction,
  type ScheduledEnrollmentLessonItem,
  type EnrollmentScheduleDetails,
} from "@/actions/admin";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CreditCard,
  GraduationCap,
  Users,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  UserCheck,
  Calendar,
  Clock,
  Plus,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  BookOpen,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

export interface AdminEnrollmentItem {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentTimezone?: string;
  courseId: string;
  courseTitle: string;
  courseInstrument: string;
  teacherId: string | null;
  teacherName: string | null;
  sessionsRemaining: number;
  sessionsTotal: number;
  scheduledLessonsCount?: number;
  completedLessonsCount?: number;
  status: EnrollmentStatus;
  startedAt: string;
}

export interface AdminPaymentItem {
  id: string;
  gatewayPaymentId: string | null;
  gatewayOrderId: string;
  amountMinorUnits: number;
  currency: string;
  status: PaymentStatus;
  studentName: string;
  studentEmail: string;
  createdAt: string;
}

export interface TeacherOption {
  id: string;
  name: string;
  email: string;
  instruments: string[];
  payoutRupees?: number;
}

export function AdminEnrollmentsManager({
  initialEnrollments,
  initialPayments,
  teachers,
}: {
  initialEnrollments: AdminEnrollmentItem[];
  initialPayments: AdminPaymentItem[];
  teachers: TeacherOption[];
}) {
  const [activeTab, setActiveTab] = useState<"ENROLLMENTS" | "PAYMENTS">("ENROLLMENTS");
  const [enrollments, setEnrollments] = useState<AdminEnrollmentItem[]>(initialEnrollments);
  const [payments] = useState<AdminPaymentItem[]>(initialPayments);
  const [searchQuery, setSearchQuery] = useState("");

  // 1-on-1 Schedule & Teacher Allotment Drawer State
  const [selectedEnrollment, setSelectedEnrollment] = useState<AdminEnrollmentItem | null>(null);
  const [scheduleDetails, setScheduleDetails] = useState<EnrollmentScheduleDetails | null>(null);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");

  // Scheduling Form State inside Drawer
  const [schedulingMode, setSchedulingMode] = useState<"SINGLE" | "RECURRING">("SINGLE");
  const [singleLessonDate, setSingleLessonDate] = useState<string>("");
  const [singleLessonDuration, setSingleLessonDuration] = useState<number>(60);

  // Recurring Timetable Generator State
  const [recurringStartDate, setRecurringStartDate] = useState<string>("");
  const [recurringFrequencyDays, setRecurringFrequencyDays] = useState<number>(7); // weekly
  const [recurringCount, setRecurringCount] = useState<number>(4);

  // Reschedule inline state
  const [reschedulingLessonId, setReschedulingLessonId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>("");

  // Copy tracking ID feedback
  const [copiedTrackingCode, setCopiedTrackingCode] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const openScheduleDrawer = async (enr: AdminEnrollmentItem) => {
    setSelectedEnrollment(enr);
    setSelectedTeacherId(enr.teacherId || "");
    setActionError(null);
    setActionSuccess(null);
    setReschedulingLessonId(null);
    setLoadingSchedule(true);

    // Set default datetime to tomorrow at 17:00
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(17, 0, 0, 0);
    const defaultIsoLocal = new Date(tomorrow.getTime() - tomorrow.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setSingleLessonDate(defaultIsoLocal);
    setRecurringStartDate(defaultIsoLocal);

    try {
      const res = await getEnrollmentScheduleAction(enr.id);
      if (res.success && res.data) {
        setScheduleDetails(res.data);
        if (res.data.enrollment.teacherId) {
          setSelectedTeacherId(res.data.enrollment.teacherId);
        }
        const remainingToSchedule = Math.max(
          1,
          res.data.course.sessionCount - res.data.lessons.filter((l) => l.status !== "CANCELLED").length,
        );
        setRecurringCount(remainingToSchedule);
      } else {
        setActionError(res.error || "Failed to load schedule details.");
      }
    } catch {
      setActionError("Error loading student schedule.");
    } finally {
      setLoadingSchedule(false);
    }
  };

  const searchParams = useSearchParams();
  const scheduleId = searchParams?.get("schedule");

  useEffect(() => {
    if (scheduleId && enrollments.length > 0) {
      const match = enrollments.find((e) => e.id === scheduleId);
      if (match && selectedEnrollment?.id !== match.id) {
        openScheduleDrawer(match);
      }
    }
  }, [scheduleId, enrollments]);

  const closeScheduleDrawer = () => {
    setSelectedEnrollment(null);
    setScheduleDetails(null);
    setActionError(null);
    setActionSuccess(null);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTrackingCode(code);
    setTimeout(() => setCopiedTrackingCode(null), 2000);
  };

  // 1. Allot / Update Teacher
  const handleTeacherAllotment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnrollment || !selectedTeacherId) return;

    setActionError(null);
    setActionSuccess(null);

    startTransition(async () => {
      const res = await reassignEnrollmentTeacherAction({
        enrollmentId: selectedEnrollment.id,
        teacherId: selectedTeacherId,
        updateUpcomingLessons: true,
      });

      if (!res.success) {
        setActionError(res.error || "Failed to allot teacher.");
      } else {
        setActionSuccess("Faculty teacher allotted successfully! Linked to 1-on-1 sessions.");
        const newTeacher = teachers.find((t) => t.id === selectedTeacherId);

        // Update local enrollment list
        setEnrollments((prev) =>
          prev.map((item) =>
            item.id === selectedEnrollment.id
              ? {
                  ...item,
                  teacherId: selectedTeacherId,
                  teacherName: newTeacher?.name || "Assigned Teacher",
                }
              : item,
          ),
        );

        // Refresh schedule details
        const refresh = await getEnrollmentScheduleAction(selectedEnrollment.id);
        if (refresh.success && refresh.data) {
          setScheduleDetails(refresh.data);
        }
      }
    });
  };

  // 2. Schedule Single 1-on-1 Lesson
  const handleScheduleSingleLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnrollment || !singleLessonDate) return;

    const teacherToUse = selectedTeacherId || selectedEnrollment.teacherId;
    if (!teacherToUse) {
      setActionError("Please allot a faculty teacher before scheduling lessons.");
      return;
    }

    setActionError(null);
    setActionSuccess(null);

    startTransition(async () => {
      const res = await scheduleEnrollmentLessonAction({
        enrollmentId: selectedEnrollment.id,
        teacherId: teacherToUse,
        startsAt: new Date(singleLessonDate).toISOString(),
        durationMinutes: singleLessonDuration,
      });

      if (!res.success) {
        setActionError(res.error || "Failed to schedule lesson.");
      } else {
        setActionSuccess(
          `1-on-1 Lesson scheduled! Unique Tracking ID: ${res.data?.trackingCode || "Generated"}`,
        );

        // Update local enrollments list
        setEnrollments((prev) =>
          prev.map((item) =>
            item.id === selectedEnrollment.id
              ? {
                  ...item,
                  teacherId: teacherToUse,
                  teacherName:
                    teachers.find((t) => t.id === teacherToUse)?.name || item.teacherName,
                  scheduledLessonsCount: (item.scheduledLessonsCount || 0) + 1,
                }
              : item,
          ),
        );

        // Refresh schedule drawer
        const refresh = await getEnrollmentScheduleAction(selectedEnrollment.id);
        if (refresh.success && refresh.data) {
          setScheduleDetails(refresh.data);
        }
      }
    });
  };

  // 3. Bulk Schedule Recurring Lessons
  const handleBulkRecurringSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnrollment || !recurringStartDate || recurringCount <= 0) return;

    const teacherToUse = selectedTeacherId || selectedEnrollment.teacherId;
    if (!teacherToUse) {
      setActionError("Please allot a faculty teacher before scheduling lessons.");
      return;
    }

    setActionError(null);
    setActionSuccess(null);

    startTransition(async () => {
      const startMs = new Date(recurringStartDate).getTime();
      const slots: Array<{ startsAt: string; durationMinutes: number }> = [];

      for (let i = 0; i < recurringCount; i++) {
        const slotDate = new Date(startMs + i * recurringFrequencyDays * 86400000);
        slots.push({
          startsAt: slotDate.toISOString(),
          durationMinutes: 60,
        });
      }

      const res = await bulkScheduleEnrollmentLessonsAction({
        enrollmentId: selectedEnrollment.id,
        teacherId: teacherToUse,
        slots,
      });

      if (!res.success) {
        setActionError(res.error || "Failed to bulk schedule lessons.");
      } else {
        setActionSuccess(
          `Successfully scheduled ${res.data?.createdCount || slots.length} 1-on-1 lessons! Each session received an audited unique tracking ID.`,
        );

        // Update local enrollment list
        setEnrollments((prev) =>
          prev.map((item) =>
            item.id === selectedEnrollment.id
              ? {
                  ...item,
                  teacherId: teacherToUse,
                  teacherName:
                    teachers.find((t) => t.id === teacherToUse)?.name || item.teacherName,
                  scheduledLessonsCount:
                    (item.scheduledLessonsCount || 0) + (res.data?.createdCount || slots.length),
                }
              : item,
          ),
        );

        // Refresh schedule drawer
        const refresh = await getEnrollmentScheduleAction(selectedEnrollment.id);
        if (refresh.success && refresh.data) {
          setScheduleDetails(refresh.data);
        }
      }
    });
  };

  // 4. Reschedule Existing Lesson
  const handleRescheduleLesson = (lessonId: string) => {
    if (!rescheduleDate) return;

    setActionError(null);
    setActionSuccess(null);

    startTransition(async () => {
      const res = await rescheduleEnrollmentLessonAction({
        lessonId,
        startsAt: new Date(rescheduleDate).toISOString(),
      });

      if (!res.success) {
        setActionError(res.error || "Failed to reschedule lesson.");
      } else {
        setActionSuccess("Lesson rescheduled successfully!");
        setReschedulingLessonId(null);
        setRescheduleDate("");

        if (selectedEnrollment) {
          const refresh = await getEnrollmentScheduleAction(selectedEnrollment.id);
          if (refresh.success && refresh.data) {
            setScheduleDetails(refresh.data);
          }
        }
      }
    });
  };

  // 5. Cancel Lesson
  const handleCancelLesson = (lessonId: string, trackingCode: string) => {
    if (!confirm(`Cancel 1-on-1 session [${trackingCode}]? This will mark it as cancelled.`)) {
      return;
    }

    setActionError(null);
    setActionSuccess(null);

    startTransition(async () => {
      const res = await deleteOrCancelEnrollmentLessonAction(lessonId);

      if (!res.success) {
        setActionError(res.error || "Failed to cancel lesson.");
      } else {
        setActionSuccess(`Lesson [${trackingCode}] cancelled.`);

        if (selectedEnrollment) {
          const refresh = await getEnrollmentScheduleAction(selectedEnrollment.id);
          if (refresh.success && refresh.data) {
            setScheduleDetails(refresh.data);
          }
        }
      }
    });
  };

  const handleExportCsv = () => {
    const headers = ["Payment ID", "Order ID", "Student Name", "Student Email", "Amount (INR)", "Status", "Date"];
    const rows = payments.map((p) => [
      `"${(p.gatewayPaymentId || "N/A").replace(/"/g, '""')}"`,
      `"${(p.gatewayOrderId || "").replace(/"/g, '""')}"`,
      `"${p.studentName.replace(/"/g, '""')}"`,
      `"${p.studentEmail.replace(/"/g, '""')}"`,
      (p.amountMinorUnits / 100).toFixed(2),
      p.status,
      new Date(p.createdAt).toISOString(),
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gandharva-payments-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredEnrollments = enrollments.filter(
    (e) =>
      e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.teacherName && e.teacherName.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const filteredPayments = payments.filter(
    (p) =>
      p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.gatewayPaymentId && p.gatewayPaymentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.gatewayOrderId.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Tabs & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-border-default shadow-xs self-start">
          <button
            type="button"
            onClick={() => setActiveTab("ENROLLMENTS")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "ENROLLMENTS"
                ? "bg-primary text-white shadow-xs font-bold"
                : "text-body hover:text-heading"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Course Enrollments ({enrollments.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("PAYMENTS")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === "PAYMENTS"
                ? "bg-primary text-white shadow-xs font-bold"
                : "text-body hover:text-heading"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments Ledger ({payments.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student, course, teacher..."
              className="w-full rounded-xl bg-white border border-border-default pl-9 pr-3 py-2 text-xs text-heading placeholder-body/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
            />
          </div>

          {activeTab === "PAYMENTS" && (
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border-default bg-white hover:bg-neutral-50 text-xs font-semibold text-heading transition-all shrink-0 shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Enrollments Table */}
      {activeTab === "ENROLLMENTS" && (
        <div className="rounded-2xl border border-border-default bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-default bg-neutral-50/70 text-body font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Course Joined</th>
                  <th className="py-3.5 px-4">Allotted Teacher</th>
                  <th className="py-3.5 px-4">1:1 Lesson Schedule</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Student Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default/60">
                {filteredEnrollments.map((enr) => {
                  return (
                    <tr
                      key={enr.id}
                      className="hover:bg-neutral-50/50 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-heading">{enr.studentName}</p>
                        <p className="text-[11px] text-body">{enr.studentEmail}</p>
                        {enr.studentTimezone && (
                          <span className="text-[10px] text-body/70 font-mono">
                            TZ: {enr.studentTimezone}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-heading">{enr.courseTitle}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-2 py-0.5 rounded-md bg-accent-subtle text-accent-dark text-[10px] font-bold">
                            {enr.courseInstrument}
                          </span>
                          <span className="text-[11px] text-body font-numeric">
                            {enr.sessionsTotal} Sessions
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {enr.teacherName ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-heading font-medium">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                              <span className="font-bold">{enr.teacherName}</span>
                            </div>
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold inline-block">
                              1:1 Dedicated Mentor
                            </span>
                          </div>
                        ) : (
                          <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            Needs Teacher Allotment
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-primary-subtle text-primary font-bold font-numeric text-[11px]">
                              {enr.scheduledLessonsCount ?? 0} / {enr.sessionsTotal}
                            </span>
                            <span className="text-[11px] text-body">
                              1:1 Sessions Scheduled
                            </span>
                          </div>
                          {(enr.scheduledLessonsCount ?? 0) === 0 ? (
                            <p className="text-[10px] text-amber-700 font-medium">
                              ⚠️ Lessons not scheduled yet
                            </p>
                          ) : (
                            <p className="text-[10px] text-emerald-600 font-medium">
                              ✓ Personalized timetable active
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            enr.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : enr.status === "COMPLETED"
                              ? "bg-primary-subtle text-primary border border-primary/30"
                              : "bg-neutral-100 text-body border border-neutral-200"
                          }`}
                        >
                          {enr.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => openScheduleDrawer(enr)}
                          className="px-3.5 py-1.5 rounded-xl border border-primary/30 bg-primary-subtle hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                          <span>Allot Teacher & Schedule</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Payments Ledger Table */}
      {activeTab === "PAYMENTS" && (
        <div className="rounded-2xl border border-border-default bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-default bg-neutral-50/70 text-body font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Gateway Reference IDs</th>
                  <th className="py-3.5 px-4 text-right">Amount</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default/60">
                {filteredPayments.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-body font-numeric whitespace-nowrap">
                      {new Date(p.createdAt).toLocaleDateString()} at{" "}
                      {new Date(p.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-heading">{p.studentName}</p>
                      <p className="text-[11px] text-body">{p.studentEmail}</p>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-body">
                      <div>
                        Payment:{" "}
                        <span className="text-accent-dark font-semibold">
                          {p.gatewayPaymentId || "pending-capture"}
                        </span>
                      </div>
                      <div className="text-[10px] text-body/60">
                        Order: {p.gatewayOrderId}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-heading font-numeric">
                      ₹{(p.amountMinorUnits / 100).toLocaleString("en-IN")} {p.currency}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.status === "PAID"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : p.status === "CREATED"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── Interactive 1-on-1 Student Timetable & Teacher Allotment Modal ─── */}
      {selectedEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-border-default bg-white shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border-default p-5 sm:p-6 bg-neutral-50/60 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-dark px-2.5 py-0.5 rounded-md bg-accent/10 border border-accent/20">
                    1-on-1 Personalized Course Management
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                    Private Classroom (Not Group)
                  </span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-heading">
                  {selectedEnrollment.courseTitle}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-body">
                  <span>
                    Student: <strong className="text-heading">{selectedEnrollment.studentName}</strong> ({selectedEnrollment.studentEmail})
                  </span>
                  <span>•</span>
                  <span>
                    Instrument: <strong className="text-accent-dark">{selectedEnrollment.courseInstrument}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Total Package: <strong className="text-heading font-numeric">{selectedEnrollment.sessionsTotal} Sessions</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeScheduleDrawer}
                className="p-1.5 rounded-xl text-body/50 hover:text-heading hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {actionError && (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{actionError}</span>
                </div>
              )}

              {actionSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {/* SECTION 1: Allot Dedicated Faculty Teacher */}
              <div className="rounded-2xl border border-border-default bg-neutral-50/40 p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-default/60 pb-3">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-heading flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-primary" />
                      <span>Dedicated Faculty Teacher Allotment</span>
                    </h3>
                    <p className="text-[11px] text-body mt-0.5">
                      Allot a qualified faculty mentor specifically for this student&apos;s 1-on-1 private lessons.
                    </p>
                  </div>
                  {scheduleDetails?.teacher && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold self-start">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Currently: {scheduleDetails.teacher.name}</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleTeacherAllotment} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-1">
                    <select
                      required
                      value={selectedTeacherId}
                      onChange={(e) => setSelectedTeacherId(e.target.value)}
                      className="w-full rounded-xl bg-white border border-border-default px-3.5 py-2.5 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs font-medium"
                    >
                      <option value="" disabled>Select faculty teacher to allot...</option>
                      {teachers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isPending || !selectedTeacherId || selectedTeacherId === scheduleDetails?.enrollment.teacherId}
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-xs disabled:opacity-40 cursor-pointer shrink-0 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
                    <span>{scheduleDetails?.enrollment.teacherId ? "Update Allotted Teacher" : "Allot Teacher"}</span>
                  </button>
                </form>
              </div>

              {/* SECTION 2: 1-on-1 Lesson Timetable & Unique Lesson Tracking IDs */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-heading flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>Student&apos;s 1-on-1 Lesson Timetable & Tracking IDs</span>
                    </h3>
                    <p className="text-[11px] text-body mt-0.5">
                      Each lesson is created with a unique tracking code for financial reconciliation, faculty payouts, and attendance.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-neutral-100 text-body font-numeric text-xs font-bold">
                      {scheduleDetails?.lessons.length || 0} of {selectedEnrollment.sessionsTotal} Scheduled
                    </span>
                  </div>
                </div>

                {/* Scheduled Lessons Table */}
                {loadingSchedule ? (
                  <div className="p-8 text-center bg-neutral-50 rounded-2xl border border-border-default flex flex-col items-center justify-center gap-2 text-body">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span>Loading student&apos;s personalized timetable...</span>
                  </div>
                ) : scheduleDetails && scheduleDetails.lessons.length > 0 ? (
                  <div className="rounded-2xl border border-border-default overflow-hidden bg-white shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-neutral-50/70 border-b border-border-default text-[11px] font-semibold text-body uppercase tracking-wider">
                          <tr>
                            <th className="py-2.5 px-3.5">#</th>
                            <th className="py-2.5 px-3.5">Unique Lesson ID (Tracking)</th>
                            <th className="py-2.5 px-3.5">Date & Time</th>
                            <th className="py-2.5 px-3.5">Duration</th>
                            <th className="py-2.5 px-3.5">Assigned Faculty</th>
                            <th className="py-2.5 px-3.5 text-center">Status</th>
                            <th className="py-2.5 px-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border-default/60">
                          {scheduleDetails.lessons.map((lesson, idx) => {
                            const isRescheduling = reschedulingLessonId === lesson.id;

                            return (
                              <tr key={lesson.id} className="hover:bg-neutral-50/50 transition-colors">
                                <td className="py-3 px-3.5 font-bold text-heading font-numeric">
                                  {idx + 1}
                                </td>

                                <td className="py-3 px-3.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono font-bold text-accent-dark bg-accent/10 px-2 py-0.5 rounded text-[11px]">
                                      {lesson.trackingCode}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => copyToClipboard(lesson.trackingCode)}
                                      className="p-1 rounded text-body/50 hover:text-primary transition-colors cursor-pointer"
                                      title="Copy tracking code for payment / accounting audit"
                                    >
                                      {copiedTrackingCode === lesson.trackingCode ? (
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  </div>
                                </td>

                                <td className="py-3 px-3.5">
                                  {isRescheduling ? (
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="datetime-local"
                                        value={rescheduleDate}
                                        onChange={(e) => setRescheduleDate(e.target.value)}
                                        className="rounded-lg border border-border-default px-2 py-1 text-xs"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleRescheduleLesson(lesson.id)}
                                        disabled={isPending || !rescheduleDate}
                                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setReschedulingLessonId(null)}
                                        className="px-2 py-1 text-body/60 hover:text-heading text-[11px]"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <p className="font-bold text-heading font-numeric">
                                        {new Date(lesson.startsAt).toLocaleDateString([], {
                                          weekday: "short",
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </p>
                                      <p className="text-[11px] text-body font-numeric">
                                        {new Date(lesson.startsAt).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </p>
                                    </div>
                                  )}
                                </td>

                                <td className="py-3 px-3.5 text-body font-numeric">
                                  {lesson.durationMinutes} mins
                                </td>

                                <td className="py-3 px-3.5">
                                  <span className="font-medium text-heading">
                                    {lesson.teacherName}
                                  </span>
                                  <div className="text-[10px] text-emerald-700 font-numeric">
                                    Payout: ₹{lesson.payoutRupees}
                                  </div>
                                </td>

                                <td className="py-3 px-3.5 text-center">
                                  <span
                                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                      lesson.status === "SCHEDULED"
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        : lesson.status === "COMPLETED"
                                        ? "bg-primary-subtle text-primary border border-primary/30"
                                        : "bg-red-50 text-red-700 border border-red-200"
                                    }`}
                                  >
                                    {lesson.status}
                                  </span>
                                </td>

                                <td className="py-3 px-3.5 text-right whitespace-nowrap">
                                  {lesson.status === "SCHEDULED" && !isRescheduling && (
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setReschedulingLessonId(lesson.id);
                                          const localIso = new Date(
                                            new Date(lesson.startsAt).getTime() -
                                              new Date(lesson.startsAt).getTimezoneOffset() * 60000,
                                          )
                                            .toISOString()
                                            .slice(0, 16);
                                          setRescheduleDate(localIso);
                                        }}
                                        className="px-2.5 py-1 rounded-lg border border-border-default hover:bg-neutral-50 text-[11px] font-semibold text-heading transition-colors cursor-pointer"
                                      >
                                        Reschedule
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleCancelLesson(lesson.id, lesson.trackingCode)}
                                        className="px-2.5 py-1 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-[11px] font-semibold text-red-700 transition-colors cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-border-default bg-neutral-50/50 space-y-2">
                    <p className="font-bold text-heading text-sm">
                      No 1-on-1 lessons scheduled yet
                    </p>
                    <p className="text-xs text-body max-w-md mx-auto">
                      Use the interactive scheduler below to create personalized 1-on-1 sessions for this student. Each session is private between the student and their allotted teacher.
                    </p>
                  </div>
                )}

                {/* SECTION 3: Add / Schedule New 1-on-1 Lessons */}
                <div className="rounded-2xl border border-border-default bg-white p-4 sm:p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-border-default pb-3">
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4 text-primary" />
                      <h4 className="font-serif text-sm font-bold text-heading">
                        Schedule Next 1-on-1 Session(s)
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100">
                      <button
                        type="button"
                        onClick={() => setSchedulingMode("SINGLE")}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          schedulingMode === "SINGLE"
                            ? "bg-white text-heading shadow-xs font-bold"
                            : "text-body hover:text-heading"
                        }`}
                      >
                        Single Lesson
                      </button>
                      <button
                        type="button"
                        onClick={() => setSchedulingMode("RECURRING")}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          schedulingMode === "RECURRING"
                            ? "bg-white text-heading shadow-xs font-bold"
                            : "text-body hover:text-heading"
                        }`}
                      >
                        Bulk Recurring Timetable
                      </button>
                    </div>
                  </div>

                  {schedulingMode === "SINGLE" ? (
                    <form onSubmit={handleScheduleSingleLesson} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-semibold text-heading">
                          Select Date & Time (Student Timezone: {selectedEnrollment.studentTimezone || "Local"})
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={singleLessonDate}
                          onChange={(e) => setSingleLessonDate(e.target.value)}
                          className="w-full rounded-xl bg-neutral-50 border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary shadow-xs"
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isPending || !singleLessonDate}
                          className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-[0.98]"
                        >
                          {isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                          <span>Create 1:1 Lesson</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleBulkRecurringSchedule} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-heading">
                            First Session Start Date & Time
                          </label>
                          <input
                            type="datetime-local"
                            required
                            value={recurringStartDate}
                            onChange={(e) => setRecurringStartDate(e.target.value)}
                            className="w-full rounded-xl bg-neutral-50 border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary shadow-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-heading">
                            Cadence / Repeat
                          </label>
                          <select
                            value={recurringFrequencyDays}
                            onChange={(e) => setRecurringFrequencyDays(Number(e.target.value))}
                            className="w-full rounded-xl bg-neutral-50 border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary shadow-xs"
                          >
                            <option value={7}>Weekly (Every 7 days)</option>
                            <option value={3}>Twice a week (Every 3-4 days)</option>
                            <option value={14}>Bi-weekly (Every 14 days)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-heading">
                            Sessions to Generate
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={selectedEnrollment.sessionsTotal}
                            value={recurringCount}
                            onChange={(e) => setRecurringCount(Math.max(1, Number(e.target.value)))}
                            className="w-full rounded-xl bg-neutral-50 border border-border-default px-3.5 py-2 text-xs text-heading focus:outline-none focus:border-primary shadow-xs"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-body">
                          This will generate {recurringCount} consecutive 1-on-1 private lessons with unique tracking codes.
                        </span>
                        <button
                          type="submit"
                          disabled={isPending || !recurringStartDate || recurringCount <= 0}
                          className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-[0.98]"
                        >
                          {isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Sparkles className="w-4 h-4" />
                          )}
                          <span>Generate Recurring 1:1 Timetable</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-border-default bg-neutral-50/60 flex items-center justify-between shrink-0">
              <div className="text-[11px] text-body">
                Student: <strong>{selectedEnrollment.studentName}</strong> • Course: <strong>{selectedEnrollment.courseTitle}</strong>
              </div>
              <button
                type="button"
                onClick={closeScheduleDrawer}
                className="px-5 py-2 rounded-xl bg-white border border-border-default hover:bg-neutral-50 text-xs font-semibold text-heading transition-all shadow-xs cursor-pointer active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
