"use client";

import { useState, useTransition, useEffect, useMemo } from "react";
import { EnrollmentStatus, PaymentStatus, LessonStatus } from "@prisma/client";
import {
  saveFullEnrollmentPlanAction,
  scheduleEnrollmentLessonAction,
  bulkScheduleEnrollmentLessonsAction,
  rescheduleEnrollmentLessonAction,
  deleteOrCancelEnrollmentLessonAction,
  reassignEnrollmentTeacherAction,
} from "@/actions/admin";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Globe,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  Copy,
  Check,
  Plus,
  RefreshCw,
  BookOpen,
  Users,
  GraduationCap,
  IndianRupee,
  ArrowRight,
  Edit3,
  SlidersHorizontal,
  CalendarDays,
  FileText,
  CreditCard,
  UserCheck,
  Award,
  Sparkles,
  Layers,
  CalendarClock,
} from "lucide-react";

export interface ScheduledLessonData {
  id: string;
  trackingCode: string;
  startsAt: string;
  durationMinutes: number;
  status: string;
  teacherId?: string | null;
  teacherName: string;
  payoutRupees: number;
}

export interface EnrollmentRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string | null;
  studentTimezone: string;
  studentGuardianName?: string | null;
  studentGuardianPhone?: string | null;
  studentCountry?: string | null;
  studentAge?: number | null;
  courseId: string;
  courseTitle: string;
  courseInstrument: string;
  courseLevel: string;
  courseSessionCount: number;
  coursePriceMinorUnits: number;
  courseDurationWeeks: number;
  teacherId: string | null;
  teacherName: string | null;
  teacherPayoutRupees: number;
  sessionsRemaining: number;
  sessionsTotal: number;
  status: EnrollmentStatus;
  startedAt: string;
  adminNotes?: string | null;
  lessons: ScheduledLessonData[];
  payment?: {
    id: string;
    amountMinorUnits: number;
    status: PaymentStatus;
    gatewayPaymentId: string | null;
  } | null;
}

export interface CourseCatalogOption {
  id: string;
  title: string;
  instrument: string;
  level: string;
  sessionCount: number;
  priceMinorUnits: number;
  durationWeeks: number;
}

export interface FacultyOption {
  id: string;
  name: string;
  email: string;
  instruments: string[];
  payoutRupees: number;
}

export interface StudentOption {
  id: string;
  name: string;
  email: string;
  timezone: string;
  guardianName?: string | null;
  age?: number | null;
  phone?: string | null;
  country?: string | null;
}

export interface TrialLeadOption {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  instrument: string;
  status: string;
  isConverted: boolean;
  preferredTimeSlot?: string;
  allottedTeacherId?: string | null;
}

interface AdminEnrollmentsManagerProps {
  initialEnrollments: EnrollmentRecord[];
  courses: CourseCatalogOption[];
  teachers: FacultyOption[];
  students: StudentOption[];
  trialLeads: TrialLeadOption[];
}

export function AdminEnrollmentsManager({
  initialEnrollments,
  courses,
  teachers,
  students,
  trialLeads,
}: AdminEnrollmentsManagerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramEnrollmentId = searchParams.get("enrollmentId");
  const paramTrialId = searchParams.get("trialId");

  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(initialEnrollments);
  const [viewMode, setViewMode] = useState<"PLANNER" | "ROSTER">("PLANNER");

  // Selected Enrollment / Student context
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState<string>(
    paramEnrollmentId || initialEnrollments[0]?.id || ""
  );

  const activeEnrollment = useMemo(() => {
    return enrollments.find((e) => e.id === selectedEnrollmentId) || enrollments[0] || null;
  }, [enrollments, selectedEnrollmentId]);

  // Form State: 1 · Student & Course
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    activeEnrollment?.studentId || students[0]?.id || ""
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    activeEnrollment?.courseId || courses[0]?.id || ""
  );
  const [linkedTrialId, setLinkedTrialId] = useState<string>(paramTrialId || "");

  // Form State: 2 · Teacher & recurring schedule
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(
    activeEnrollment?.teacherId || teachers[0]?.id || ""
  );
  const [sessionDurationMinutes, setSessionDurationMinutes] = useState<number>(45);
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    activeEnrollment?.studentTimezone || "Asia/Kolkata"
  );
  const [recurringCadence, setRecurringCadence] = useState<string>("TUE_THU");
  const [startTime, setStartTime] = useState<string>("18:00");
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 86400000 * 84).toISOString().slice(0, 10)
  );

  // Form State: 3 · Session Plan
  const [totalSessions, setTotalSessions] = useState<number>(
    activeEnrollment?.sessionsTotal || courses[0]?.sessionCount || 24
  );
  const [completedSessions, setCompletedSessions] = useState<number>(
    activeEnrollment ? activeEnrollment.sessionsTotal - activeEnrollment.sessionsRemaining : 0
  );
  const [frequencyLabel, setFrequencyLabel] = useState<string>("2 classes / week");
  const [expectedDurationWeeks, setExpectedDurationWeeks] = useState<number>(12);

  // Form State: 4 · Fees, payments & notes
  const [feeRupees, setFeeRupees] = useState<number>(
    activeEnrollment
      ? Math.round(activeEnrollment.coursePriceMinorUnits / 100)
      : courses[0]
      ? Math.round(courses[0].priceMinorUnits / 100)
      : 24000
  );
  const [paidRupees, setPaidRupees] = useState<number>(
    activeEnrollment?.payment
      ? Math.round(activeEnrollment.payment.amountMinorUnits / 100)
      : 8000
  );
  const [paymentStatus, setPaymentStatus] = useState<string>("Partially paid");
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus>(
    activeEnrollment?.status || EnrollmentStatus.ACTIVE
  );
  const [nextDueDate, setNextDueDate] = useState<string>(
    new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10)
  );
  const [adminNotes, setAdminNotes] = useState<string>(
    activeEnrollment?.adminNotes ||
      "Parent requested Tuesday/Thursday cadence. Share starter riyaz kit after enrollment activation."
  );

  // Inline lesson scheduling & management
  const [scheduleMode, setScheduleMode] = useState<"SINGLE" | "BULK">("SINGLE");
  const [singleLessonDate, setSingleLessonDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  );
  const [singleLessonDuration, setSingleLessonDuration] = useState<number>(60);
  const [bulkStartDate, setBulkStartDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16)
  );
  const [bulkIntervalDays, setBulkIntervalDays] = useState<number>(7);
  const [bulkCount, setBulkCount] = useState<number>(4);

  // Inline Reschedule modal/input
  const [reschedulingLessonId, setReschedulingLessonId] = useState<string | null>(null);
  const [rescheduleDateInput, setRescheduleDateInput] = useState<string>("");
  const [reassigningLessonId, setReassigningLessonId] = useState<string | null>(null);
  const [reassignTeacherId, setReassignTeacherId] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Transitions & Feedback
  const [isPending, startTransition] = useTransition();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyTracking = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Sync state when activeEnrollment changes
  useEffect(() => {
    if (activeEnrollment) {
      setSelectedStudentId(activeEnrollment.studentId);
      setSelectedCourseId(activeEnrollment.courseId);
      if (activeEnrollment.teacherId) {
        setSelectedTeacherId(activeEnrollment.teacherId);
      }
      setTotalSessions(activeEnrollment.sessionsTotal);
      setCompletedSessions(
        Math.max(0, activeEnrollment.sessionsTotal - activeEnrollment.sessionsRemaining)
      );
      setFeeRupees(Math.round(activeEnrollment.coursePriceMinorUnits / 100));
      if (activeEnrollment.payment) {
        setPaidRupees(Math.round(activeEnrollment.payment.amountMinorUnits / 100));
      }
      setEnrollmentStatus(activeEnrollment.status);
      if (activeEnrollment.adminNotes) {
        setAdminNotes(activeEnrollment.adminNotes);
      }
    }
  }, [activeEnrollment]);

  // All courses enrolled by the selected student (for the Course Selection Switcher button!)
  const studentEnrollments = useMemo(() => {
    return enrollments.filter((e) => e.studentId === selectedStudentId);
  }, [enrollments, selectedStudentId]);

  const currentStudent = useMemo(() => {
    return (
      students.find((s) => s.id === selectedStudentId) ||
      (activeEnrollment
        ? {
            id: activeEnrollment.studentId,
            name: activeEnrollment.studentName,
            email: activeEnrollment.studentEmail,
            timezone: activeEnrollment.studentTimezone,
            guardianName: activeEnrollment.studentGuardianName,
            age: activeEnrollment.studentAge,
            phone: activeEnrollment.studentPhone,
            country: activeEnrollment.studentCountry,
          }
        : students[0])
    );
  }, [students, selectedStudentId, activeEnrollment]);

  const currentCourse = useMemo(() => {
    return (
      courses.find((c) => c.id === selectedCourseId) ||
      (activeEnrollment
        ? {
            id: activeEnrollment.courseId,
            title: activeEnrollment.courseTitle,
            instrument: activeEnrollment.courseInstrument,
            level: activeEnrollment.courseLevel,
            sessionCount: activeEnrollment.sessionsTotal,
            priceMinorUnits: activeEnrollment.coursePriceMinorUnits,
            durationWeeks: activeEnrollment.courseDurationWeeks,
          }
        : courses[0])
    );
  }, [courses, selectedCourseId, activeEnrollment]);

  const currentTeacher = useMemo(() => {
    return (
      teachers.find((t) => t.id === selectedTeacherId) ||
      teachers[0] ||
      null
    );
  }, [teachers, selectedTeacherId]);

  // Live calculation of amount due
  const amountDueRupees = Math.max(0, feeRupees - paidRupees);

  // Live preview session dates generator
  const generatedPreviewDates = useMemo(() => {
    const list: string[] = [];
    const base = new Date(startDate);
    if (isNaN(base.getTime())) return list;

    let cur = new Date(base);
    let count = 0;
    while (count < 4 && count < totalSessions) {
      const day = cur.getDay(); // 0 = Sun, 2 = Tue, 4 = Thu
      if (recurringCadence === "TUE_THU") {
        if (day === 2 || day === 4) {
          list.push(
            cur.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              weekday: "short",
            })
          );
          count++;
        }
      } else if (recurringCadence === "MON_WED_FRI") {
        if (day === 1 || day === 3 || day === 5) {
          list.push(
            cur.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              weekday: "short",
            })
          );
          count++;
        }
      } else {
        // Weekly on same day
        list.push(
          cur.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            weekday: "short",
          })
        );
        count++;
        cur.setDate(cur.getDate() + 7);
        continue;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return list;
  }, [startDate, recurringCadence, totalSessions]);

  const formattedIstDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  // ─── 1. SAVE COMPREHENSIVE ENROLLMENT PLAN ────────────────────────────
  const handleSaveEnrollment = (isDraft: boolean = false) => {
    if (!currentStudent || !currentCourse) {
      showToast("Please ensure student and course are selected.", "error");
      return;
    }

    startTransition(async () => {
      const res = await saveFullEnrollmentPlanAction({
        enrollmentId: activeEnrollment?.id || null,
        trialRequestId: linkedTrialId || null,
        studentId: currentStudent.id,
        courseId: currentCourse.id,
        teacherId: selectedTeacherId || null,
        sessionsRemaining: Math.max(1, totalSessions - completedSessions),
        status: enrollmentStatus,
        adminNotes: isDraft ? `[DRAFT] ${adminNotes.trim()}` : adminNotes.trim() || undefined,
        paymentFeeRupees: feeRupees,
        paidAmountRupees: paidRupees,
        paymentStatus:
          paidRupees >= feeRupees
            ? "FULLY_PAID"
            : paidRupees > 0
            ? "PARTIALLY_PAID"
            : "UNPAID",
      });

      if (res.success && res.data) {
        showToast(
          isDraft
            ? "Enrollment draft saved."
            : `Enrollment saved! 1-on-1 timetable generated for ${currentStudent.name}.`,
          "success"
        );
        router.refresh();
      } else {
        showToast(res.error || "Could not save enrollment.", "error");
      }
    });
  };

  // ─── 2. SCHEDULE INDIVIDUAL 1-ON-1 LESSON ────────────────────────────
  const handleScheduleSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEnrollment) {
      showToast("Please save enrollment before scheduling individual lessons.", "error");
      return;
    }

    startTransition(async () => {
      const res = await scheduleEnrollmentLessonAction({
        enrollmentId: activeEnrollment.id,
        teacherId: selectedTeacherId || activeEnrollment.teacherId || undefined,
        startsAt: new Date(singleLessonDate).toISOString(),
        durationMinutes: singleLessonDuration,
      });

      if (res.success && res.data) {
        showToast(
          `Lesson scheduled! Tracking ID: ${res.data.trackingCode}`,
          "success"
        );
        // Optimistically update table
        const teacherObj = teachers.find((t) => t.id === selectedTeacherId);
        const newLesson: ScheduledLessonData = {
          id: res.data.lessonId,
          trackingCode: res.data.trackingCode,
          startsAt: new Date(singleLessonDate).toISOString(),
          durationMinutes: singleLessonDuration,
          status: "SCHEDULED",
          teacherId: selectedTeacherId,
          teacherName: teacherObj?.name || "Assigned Faculty",
          payoutRupees: teacherObj?.payoutRupees || 800,
        };

        setEnrollments((prev) =>
          prev.map((item) =>
            item.id === activeEnrollment.id
              ? {
                  ...item,
                  lessons: [newLesson, ...item.lessons],
                }
              : item
          )
        );
      } else {
        showToast(res.error || "Failed to schedule lesson.", "error");
      }
    });
  };

  // ─── 3. BULK RECURRING SCHEDULE ──────────────────────────────────────
  const handleBulkSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEnrollment) {
      showToast("Please save enrollment first.", "error");
      return;
    }

    startTransition(async () => {
      const startMs = new Date(bulkStartDate).getTime();
      const slots = [];
      for (let i = 0; i < bulkCount; i++) {
        slots.push({
          startsAt: new Date(startMs + i * bulkIntervalDays * 86400000).toISOString(),
          durationMinutes: sessionDurationMinutes,
        });
      }

      const res = await bulkScheduleEnrollmentLessonsAction({
        enrollmentId: activeEnrollment.id,
        teacherId: selectedTeacherId || activeEnrollment.teacherId || undefined,
        slots,
      });

      if (res.success) {
        showToast(
          `Bulk schedule generated! ${res.data?.createdCount || slots.length} sessions created with tracking codes.`,
          "success"
        );
        router.refresh();
      } else {
        showToast(res.error || "Failed to generate bulk schedule.", "error");
      }
    });
  };

  // ─── 4. RESCHEDULE EXISTING LESSON ───────────────────────────────────
  const handleReschedule = (lessonId: string) => {
    if (!rescheduleDateInput) return;

    startTransition(async () => {
      const res = await rescheduleEnrollmentLessonAction({
        lessonId,
        startsAt: new Date(rescheduleDateInput).toISOString(),
      });

      if (res.success) {
        showToast("Lesson rescheduled successfully.", "success");
        setEnrollments((prev) =>
          prev.map((enr) => ({
            ...enr,
            lessons: enr.lessons.map((l) =>
              l.id === lessonId
                ? { ...l, startsAt: new Date(rescheduleDateInput).toISOString() }
                : l
            ),
          }))
        );
        setReschedulingLessonId(null);
      } else {
        showToast(res.error || "Failed to reschedule lesson.", "error");
      }
    });
  };

  // ─── 5. CANCEL LESSON ────────────────────────────────────────────────
  const handleCancelLesson = (lessonId: string) => {
    startTransition(async () => {
      const res = await deleteOrCancelEnrollmentLessonAction(lessonId);
      if (res.success) {
        showToast("Lesson cancelled.", "success");
        setEnrollments((prev) =>
          prev.map((enr) => ({
            ...enr,
            lessons: enr.lessons.map((l) =>
              l.id === lessonId ? { ...l, status: "CANCELLED" } : l
            ),
          }))
        );
      } else {
        showToast(res.error || "Could not cancel lesson.", "error");
      }
    });
  };

  // ─── 6. REASSIGN FACULTY TEACHER FOR A LESSON ─────────────────────────
  const handleReassignLesson = (lessonId: string, newTeacherId: string) => {
    if (!newTeacherId) return;
    const tObj = teachers.find((t) => t.id === newTeacherId);
    setEnrollments((prev) =>
      prev.map((item) =>
        item.id === activeEnrollment?.id
          ? {
              ...item,
              lessons: item.lessons.map((l) =>
                l.id === lessonId
                  ? {
                      ...l,
                      teacherId: newTeacherId,
                      teacherName: tObj?.name || "Assigned Faculty",
                      payoutRupees: tObj?.payoutRupees || 800,
                    }
                  : l
              ),
            }
          : item
      )
    );
    showToast(`Faculty reassigned to ${tObj?.name || "Faculty"}.`, "success");
    setReassigningLessonId(null);
  };

  return (
    <div className="space-y-6 pb-14 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className={`fixed top-20 right-6 z-50 p-4 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 ${
            toastType === "success"
              ? "border-emerald-200 bg-white text-heading"
              : "border-rose-200 bg-rose-50 text-rose-900"
          }`}
        >
          {toastType === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── 1. TOP BREADCRUMB & UTILITIES ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-body/70">
          <span className="font-medium">Operations</span>
          <span className="text-body/40">/</span>
          <span className="font-bold text-heading">Create enrollment</span>
        </div>

        <div className="flex items-center gap-2.5 text-body/80 self-end sm:self-auto">
          {/* View mode toggle */}
          <div className="flex items-center bg-white border border-neutral-200/90 rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("PLANNER")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "PLANNER"
                  ? "bg-[#3C096C] text-white shadow-xs"
                  : "text-body hover:text-heading"
              }`}
            >
              Planner & Scheduler
            </button>
            <button
              type="button"
              onClick={() => setViewMode("ROSTER")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "ROSTER"
                  ? "bg-[#3C096C] text-white shadow-xs"
                  : "text-body hover:text-heading"
              }`}
            >
              All Enrollments ({enrollments.length})
            </button>
          </div>

          {/* IST Timezone Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200/90 text-[11px] font-medium shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-primary/70" />
            <span>IST · {formattedIstDate}</span>
          </div>
        </div>
      </div>

      {/* ─── 2. MAIN HEADER & ACTIONS ───────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-heading tracking-tight">
            Create enrollment
          </h1>
          <p className="text-xs sm:text-sm text-body/70 mt-1">
            Convert a qualified trial into a scheduled, billable learning plan
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            type="button"
            onClick={() => handleSaveEnrollment(true)}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-heading text-xs font-bold transition-all shadow-2xs active:scale-95 disabled:opacity-50"
          >
            <FileText className="w-3.5 h-3.5 text-body/80" />
            <span>Save draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSaveEnrollment(false)}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3C096C] hover:bg-[#2F0755] text-white text-xs font-bold transition-all shadow-xs active:scale-95 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Check className="w-4 h-4 text-white" />
            )}
            <span>Save Enrollment</span>
          </button>
        </div>
      </div>

      {/* ─── 3. MODERN STEPPER PROGRESS BAR ─────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Step 1: Trial */}
        <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 font-numeric">
            1
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-heading">Trial</div>
            <div className="text-[11px] text-body/60 truncate font-numeric">
              {linkedTrialId ? `TRL-${linkedTrialId.slice(-6)} · Complete` : "TRL-2026-1048 · Complete"}
            </div>
          </div>
        </div>

        {/* Step 2: Student */}
        <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 font-numeric">
            2
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-heading">Student</div>
            <div className="text-[11px] text-body/60 truncate font-numeric">
              {currentStudent?.name || "Student"} · Created
            </div>
          </div>
        </div>

        {/* Step 3: Enrollment */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#3C096C]/30 ring-1 ring-[#3C096C]/20 shadow-2xs flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#3C096C] text-white flex items-center justify-center font-bold text-xs shrink-0 font-numeric">
            3
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-heading">Enrollment</div>
            <div className="text-[11px] text-body/60 truncate font-numeric">
              {activeEnrollment ? `ENR-${activeEnrollment.id.slice(-4)}` : "New record"} · In progress
            </div>
          </div>
        </div>

        {/* Step 4: Sessions */}
        <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-neutral-100 text-body flex items-center justify-center font-bold text-xs shrink-0 font-numeric">
            4
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-heading">Sessions</div>
            <div className="text-[11px] text-body/60 truncate font-numeric">
              {activeEnrollment?.lessons.length || 0} scheduled · Active
            </div>
          </div>
        </div>
      </div>

      {viewMode === "ROSTER" ? (
        /* ─── ALL ENROLLMENTS ROSTER VIEW ───────────────────────────────── */
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-heading">All Course Enrollments</h2>
              <p className="text-xs text-body/60">
                Active catalog subscriptions, faculty allotments, and remaining session balances.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50/70 border-b border-neutral-200 text-[11px] font-semibold text-body uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Enrolled Course</th>
                  <th className="py-3 px-4">Assigned Faculty</th>
                  <th className="py-3 px-4">Progress / Balance</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-numeric">
                {enrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-heading">{enr.studentName}</div>
                      <div className="text-[11px] text-body/60">{enr.studentEmail}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-heading">{enr.courseTitle}</div>
                      <div className="text-[11px] text-body/60">
                        {enr.courseInstrument} · {enr.courseLevel}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-heading">
                        {enr.teacherName || "Unassigned"}
                      </div>
                      <div className="text-[10px] text-emerald-700">
                        ₹{enr.teacherPayoutRupees} / class
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-heading">
                        {enr.sessionsTotal - enr.sessionsRemaining} / {enr.sessionsTotal} sessions
                      </div>
                      <div className="text-[11px] text-body/60">
                        {enr.lessons.length} scheduled instances
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {enr.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedEnrollmentId(enr.id);
                          setViewMode("PLANNER");
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#3C096C] hover:bg-[#2F0755] text-white font-bold text-xs transition-all shadow-2xs"
                      >
                        Open Planner & Timetable
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ─── 4. MAIN 2-COLUMN WORKSPACE (MATCHING ATTACHED SCREENSHOT) ─── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* ─── LEFT COLUMN: 4 NUMBERED SECTIONS (8 COLS / ~66%) ───────── */}
          <div className="lg:col-span-8 space-y-5">
            {/* ─── SECTION 1: STUDENT & COURSE ─────────────────────────── */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-heading">
                  1 · Student & course
                </h2>
                <p className="text-xs text-body/60 mt-0.5">
                  Search existing records or continue from trial context
                </p>
              </div>

              {/* Student selector and course catalog dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Student
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-heading font-medium focus:outline-none focus:border-[#3C096C]"
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} · STU-{s.id.slice(-4)}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-body/50 mt-1">
                    {linkedTrialId ? `Created from trial lead TRL-${linkedTrialId.slice(-6)}` : "Verified student account"}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Controlled course catalog
                  </label>
                  <select
                    value={selectedCourseId}
                    onChange={(e) => {
                      setSelectedCourseId(e.target.value);
                      const crs = courses.find((c) => c.id === e.target.value);
                      if (crs) {
                        setTotalSessions(crs.sessionCount);
                        setFeeRupees(Math.round(crs.priceMinorUnits / 100));
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-heading font-medium focus:outline-none focus:border-[#3C096C]"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} · {c.level}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-body/50 mt-1">
                    Course CRSE-{currentCourse?.id.slice(-6)} · {currentCourse?.sessionCount || 24} sessions
                  </p>
                </div>
              </div>

              {/* ─── COURSE SELECTION SWITCHER BUTTON (REQUESTED SPECIFICATION) ─── */}
              {studentEnrollments.length > 0 && (
                <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-heading flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#3C096C]" />
                      <span>Courses bought by {currentStudent?.name}:</span>
                    </span>
                    <span className="text-[11px] text-body/60">
                      Click to switch course timetable
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {studentEnrollments.map((enr) => {
                      const isThisActive = enr.id === activeEnrollment?.id;
                      return (
                        <button
                          key={enr.id}
                          type="button"
                          onClick={() => setSelectedEnrollmentId(enr.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                            isThisActive
                              ? "bg-[#3C096C] text-white shadow-xs"
                              : "bg-white hover:bg-neutral-100 text-heading border border-purple-200"
                          }`}
                        >
                          <span>{enr.courseTitle}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-numeric ${
                              isThisActive
                                ? "bg-white/20 text-white"
                                : "bg-purple-100 text-[#3C096C]"
                            }`}
                          >
                            {enr.lessons.length} sessions
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Context strip banner */}
              <div className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-100/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Timezone</div>
                  <div className="font-bold text-heading mt-0.5">
                    {currentStudent?.timezone || "Asia/Kolkata"} · IST
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Age / guardian</div>
                  <div className="font-bold text-heading mt-0.5">
                    {currentStudent?.age ? `${currentStudent.age} yrs` : "14 yrs"} ·{" "}
                    {currentStudent?.guardianName || "Parent"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Trial teacher</div>
                  <div className="font-bold text-heading mt-0.5">
                    {currentTeacher?.name || "Mira Sen"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Trial outcome</div>
                  <div className="font-bold text-heading mt-0.5">
                    Qualified · {formattedIstDate}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── SECTION 2: SESSION PLAN & 1-ON-1 TIMETABLE ──────────── */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-lg font-bold text-heading">
                    2 · Session plan
                  </h2>
                  <p className="text-xs text-body/60 mt-0.5">
                    Enrollment defines the plan; every class remains an individual session record
                  </p>
                </div>

                {/* Faculty allotment quick indicator */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[11px] font-semibold text-body/70">Faculty:</span>
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#3C096C] text-xs font-bold font-numeric flex items-center gap-1.5 shadow-2xs">
                    <UserCheck className="w-3.5 h-3.5 text-[#3C096C]" />
                    <span>{currentTeacher?.name || "No faculty allotted"}</span>
                    {currentTeacher && (
                      <span className="text-[10px] text-purple-700/80 font-normal">
                        (₹{currentTeacher.payoutRupees}/class)
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* ─── TEACHER SELECTION BUTTON & ALLOTMENT BAR ────────────── */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50/60 via-purple-50/30 to-white border border-purple-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#3C096C] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#3C096C] uppercase tracking-wider bg-purple-100/80 px-2 py-0.5 rounded-md">
                        Faculty Allotment
                      </span>
                      {currentTeacher && (
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accredited Faculty</span>
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-heading text-sm mt-1 flex items-center gap-2">
                      <span>{currentTeacher?.name || "Choose Faculty Instructor"}</span>
                      {currentTeacher && (
                        <span className="text-xs text-body/70 font-normal">
                          · {currentTeacher.instruments.join(", ") || "Music Faculty"}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-body/60 mt-0.5 font-numeric">
                      Institutional Remuneration: ₹{currentTeacher?.payoutRupees || 800} payout per completed session
                    </div>
                  </div>
                </div>

                {/* Teacher Selection Control & Button */}
                <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto">
                  <div className="relative">
                    <select
                      value={selectedTeacherId}
                      onChange={(e) => {
                        const newTid = e.target.value;
                        setSelectedTeacherId(newTid);
                        const tObj = teachers.find((t) => t.id === newTid);
                        if (tObj) {
                          showToast(`Selected ${tObj.name} for this session plan.`, "success");
                        }
                      }}
                      className="px-3.5 py-2.5 pr-8 rounded-xl border border-purple-300 bg-white text-xs font-bold text-heading shadow-2xs focus:outline-none focus:border-[#3C096C] cursor-pointer appearance-none hover:border-[#3C096C] transition-colors"
                    >
                      {teachers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} · {t.instruments[0] || "Faculty"} (₹{t.payoutRupees})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-body/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (activeEnrollment && selectedTeacherId) {
                        startTransition(async () => {
                          const res = await reassignEnrollmentTeacherAction({
                            enrollmentId: activeEnrollment.id,
                            teacherId: selectedTeacherId,
                            updateUpcomingLessons: true,
                          });
                          if (res.success) {
                            showToast(
                              `Allotted ${currentTeacher?.name} to enrollment and updated sessions!`,
                              "success"
                            );
                            setEnrollments((prev) =>
                              prev.map((item) =>
                                item.id === activeEnrollment.id
                                  ? {
                                      ...item,
                                      teacherId: selectedTeacherId,
                                      teacherName: currentTeacher?.name || null,
                                      teacherPayoutRupees: currentTeacher?.payoutRupees || 800,
                                      lessons: item.lessons.map((l) => ({
                                        ...l,
                                        teacherId: selectedTeacherId,
                                        teacherName: currentTeacher?.name || "Assigned Faculty",
                                        payoutRupees: currentTeacher?.payoutRupees || 800,
                                      })),
                                    }
                                  : item
                              )
                            );
                          } else {
                            showToast(res.error || "Failed to allot teacher", "error");
                          }
                        });
                      } else {
                        showToast(`Teacher set to ${currentTeacher?.name || "Faculty"}.`, "success");
                      }
                    }}
                    disabled={isPending}
                    className="px-4 py-2.5 rounded-xl bg-[#3C096C] hover:bg-[#2F0755] text-white text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    {isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <UserCheck className="w-3.5 h-3.5" />
                    )}
                    <span>Allot Teacher</span>
                  </button>
                </div>
              </div>

              {/* 4 Inputs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Total sessions
                  </label>
                  <input
                    type="number"
                    value={totalSessions}
                    onChange={(e) => setTotalSessions(Number(e.target.value))}
                    min="1"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs font-bold text-heading focus:outline-none focus:border-[#3C096C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Completed sessions
                  </label>
                  <input
                    type="number"
                    value={completedSessions}
                    onChange={(e) => setCompletedSessions(Number(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs font-bold text-heading focus:outline-none focus:border-[#3C096C]"
                  />
                  <span className="text-[10px] text-body/50">Read-only after creation</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Frequency
                  </label>
                  <select
                    value={frequencyLabel}
                    onChange={(e) => setFrequencyLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-heading font-medium focus:outline-none focus:border-[#3C096C]"
                  >
                    <option value="1 class / week">1 class / week</option>
                    <option value="2 classes / week">2 classes / week</option>
                    <option value="3 classes / week">3 classes / week</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Expected duration
                  </label>
                  <select
                    value={expectedDurationWeeks}
                    onChange={(e) => setExpectedDurationWeeks(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-heading font-medium focus:outline-none focus:border-[#3C096C]"
                  >
                    <option value={8}>8 weeks</option>
                    <option value={12}>12 weeks</option>
                    <option value={16}>16 weeks</option>
                    <option value={24}>24 weeks</option>
                  </select>
                </div>
              </div>

              {/* Generated Date Pills Preview */}
              <div className="flex items-center gap-2 flex-wrap text-xs font-numeric">
                {generatedPreviewDates.map((dateStr, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 text-heading font-semibold shadow-2xs"
                  >
                    {dateStr}
                  </div>
                ))}
                {totalSessions > 4 && (
                  <div className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-neutral-100 text-body font-semibold">
                    +{totalSessions - 4} sessions
                  </div>
                )}
              </div>

              {/* ─── SCHEDULE NEXT 1-ON-1 SESSION(S) INTERACTIVE PANEL ───── */}
              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-heading">
                      Schedule Next 1-on-1 Session(s)
                    </h3>
                    <p className="text-[11px] text-body/70 mt-0.5">
                      Allot date and time instances with audited tracking IDs
                    </p>
                  </div>

                  <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-0.5 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setScheduleMode("SINGLE")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        scheduleMode === "SINGLE"
                          ? "bg-[#3C096C] text-white"
                          : "text-body hover:text-heading"
                      }`}
                    >
                      Single Lesson
                    </button>
                    <button
                      type="button"
                      onClick={() => setScheduleMode("BULK")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        scheduleMode === "BULK"
                          ? "bg-[#3C096C] text-white"
                          : "text-body hover:text-heading"
                      }`}
                    >
                      Bulk Recurring Timetable
                    </button>
                  </div>
                </div>

                {scheduleMode === "SINGLE" ? (
                  <form onSubmit={handleScheduleSingle} className="flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-[180px]">
                      <label className="text-[11px] font-semibold text-body block mb-1">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={singleLessonDate}
                        onChange={(e) => setSingleLessonDate(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-medium focus:outline-none focus:border-[#3C096C]"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-[11px] font-semibold text-body block mb-1">
                        Duration
                      </label>
                      <select
                        value={singleLessonDuration}
                        onChange={(e) => setSingleLessonDuration(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-medium focus:outline-none focus:border-[#3C096C]"
                      >
                        <option value={45}>45 mins</option>
                        <option value={60}>60 mins</option>
                        <option value={90}>90 mins</option>
                      </select>
                    </div>
                    <div className="w-40">
                      <label className="text-[11px] font-semibold text-body block mb-1">
                        Assigned Faculty
                      </label>
                      <select
                        value={selectedTeacherId}
                        onChange={(e) => setSelectedTeacherId(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-medium focus:outline-none focus:border-[#3C096C]"
                      >
                        {teachers.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} (₹{t.payoutRupees})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="self-end">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="px-3.5 py-1.5 rounded-lg bg-[#3C096C] hover:bg-[#2F0755] text-white text-xs font-bold transition-all shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {isPending ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          "+ Add 1-on-1 Lesson"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleBulkSchedule} className="flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-[170px]">
                      <label className="text-[11px] font-semibold text-body block mb-1">
                        First Session
                      </label>
                      <input
                        type="datetime-local"
                        value={bulkStartDate}
                        onChange={(e) => setBulkStartDate(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-medium focus:outline-none focus:border-[#3C096C]"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-[11px] font-semibold text-body block mb-1">
                        Interval
                      </label>
                      <select
                        value={bulkIntervalDays}
                        onChange={(e) => setBulkIntervalDays(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-medium focus:outline-none focus:border-[#3C096C]"
                      >
                        <option value={7}>Weekly (7d)</option>
                        <option value={3}>3-4 Days</option>
                      </select>
                    </div>
                    <div className="w-16">
                      <label className="text-[11px] font-semibold text-body block mb-1">
                        Count
                      </label>
                      <input
                        type="number"
                        value={bulkCount}
                        onChange={(e) => setBulkCount(Number(e.target.value))}
                        min="1"
                        max="24"
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-bold text-heading focus:outline-none focus:border-[#3C096C]"
                      />
                    </div>
                    <div className="w-40">
                      <label className="text-[11px] font-semibold text-body block mb-1">
                        Assigned Faculty
                      </label>
                      <select
                        value={selectedTeacherId}
                        onChange={(e) => setSelectedTeacherId(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-medium focus:outline-none focus:border-[#3C096C]"
                      >
                        {teachers.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} (₹{t.payoutRupees})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="self-end">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="px-3.5 py-1.5 rounded-lg bg-[#3C096C] hover:bg-[#2F0755] text-white text-xs font-bold transition-all shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {isPending ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          "Generate Timetable"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* ─── 1-ON-1 SCHEDULED SESSIONS TABLE (SPECIFIED BY USER) ─── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-sm font-bold text-heading">
                    Scheduled 1-on-1 Sessions for {currentCourse?.title}
                  </h3>
                  <span className="text-[11px] font-numeric text-body/60">
                    {activeEnrollment?.lessons.length || 0} scheduled classes
                  </span>
                </div>

                <div className="rounded-xl border border-neutral-200 overflow-hidden bg-white shadow-2xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-50 border-b border-neutral-200 text-[11px] font-semibold text-body uppercase tracking-wider">
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
                      <tbody className="divide-y divide-neutral-100 font-numeric">
                        {!activeEnrollment || activeEnrollment.lessons.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-6 text-center text-xs text-body/60">
                              No 1-on-1 sessions scheduled for this course yet. Use the panel above to schedule.
                            </td>
                          </tr>
                        ) : (
                          activeEnrollment.lessons.map((lesson, idx) => {
                            const isRescheduling = reschedulingLessonId === lesson.id;
                            const lDate = new Date(lesson.startsAt);

                            return (
                              <tr key={lesson.id} className="hover:bg-neutral-50/60 transition-colors">
                                <td className="py-3 px-3.5 font-bold text-heading">
                                  {idx + 1}
                                </td>

                                <td className="py-3 px-3.5">
                                  <div className="flex items-center gap-1.5 font-mono">
                                    <span className="bg-purple-50 text-[#3C096C] px-2 py-0.5 rounded text-[11px] font-bold">
                                      {lesson.trackingCode}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => copyTracking(lesson.trackingCode)}
                                      className="p-1 text-body/40 hover:text-heading cursor-pointer"
                                      title="Copy Tracking ID"
                                    >
                                      {copiedCode === lesson.trackingCode ? (
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
                                        value={rescheduleDateInput}
                                        onChange={(e) => setRescheduleDateInput(e.target.value)}
                                        className="rounded-lg border border-neutral-300 px-2 py-1 text-xs"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleReschedule(lesson.id)}
                                        disabled={isPending || !rescheduleDateInput}
                                        className="px-2 py-1 rounded bg-emerald-700 text-white font-bold text-[11px]"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setReschedulingLessonId(null)}
                                        className="text-[11px] text-body hover:text-heading"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <div className="font-bold text-heading">
                                        {lDate.toLocaleDateString("en-GB", {
                                          weekday: "short",
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </div>
                                      <div className="text-[11px] text-body/70">
                                        {lDate.toLocaleTimeString("en-GB", {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </td>

                                <td className="py-3 px-3.5 text-body">
                                  {lesson.durationMinutes} mins
                                </td>

                                 <td className="py-3 px-3.5">
                                  {reassigningLessonId === lesson.id ? (
                                    <div className="flex items-center gap-1.5">
                                      <select
                                        value={reassignTeacherId || lesson.teacherId || selectedTeacherId}
                                        onChange={(e) => setReassignTeacherId(e.target.value)}
                                        className="text-[11px] border border-neutral-300 rounded px-1.5 py-1 bg-white font-sans focus:outline-none focus:border-[#3C096C]"
                                      >
                                        {teachers.map((t) => (
                                          <option key={t.id} value={t.id}>
                                            {t.name} (₹{t.payoutRupees})
                                          </option>
                                        ))}
                                      </select>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleReassignLesson(
                                            lesson.id,
                                            reassignTeacherId || selectedTeacherId
                                          )
                                        }
                                        className="px-2 py-1 rounded bg-[#3C096C] text-white font-bold text-[10px] cursor-pointer"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setReassigningLessonId(null)}
                                        className="text-[10px] text-body hover:text-heading cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <div className="font-semibold text-heading flex items-center gap-1.5">
                                        <span>{lesson.teacherName}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setReassigningLessonId(lesson.id);
                                            setReassignTeacherId(lesson.teacherId || selectedTeacherId);
                                          }}
                                          className="text-[10px] text-[#3C096C] hover:underline font-bold cursor-pointer"
                                          title="Reassign faculty for this lesson"
                                        >
                                          Change
                                        </button>
                                      </div>
                                      <div className="text-[10px] text-emerald-700">
                                        Payout: ₹{lesson.payoutRupees}
                                      </div>
                                    </div>
                                  )}
                                </td>

                                <td className="py-3 px-3.5 text-center">
                                  <span
                                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                      lesson.status === "SCHEDULED"
                                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                                        : lesson.status === "COMPLETED"
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        : "bg-rose-50 text-rose-700 border border-rose-200"
                                    }`}
                                  >
                                    {lesson.status}
                                  </span>
                                </td>

                                <td className="py-3 px-3.5 text-right whitespace-nowrap">
                                  {lesson.status === "SCHEDULED" && !isRescheduling && (
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setReschedulingLessonId(lesson.id);
                                          const localIso = new Date(
                                            new Date(lesson.startsAt).getTime() -
                                              new Date(lesson.startsAt).getTimezoneOffset() * 60000
                                          )
                                            .toISOString()
                                            .slice(0, 16);
                                          setRescheduleDateInput(localIso);
                                        }}
                                        className="text-[11px] text-[#3C096C] font-bold hover:underline"
                                      >
                                        Reschedule
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleCancelLesson(lesson.id)}
                                        className="text-[11px] text-rose-700 font-bold hover:underline"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── SECTION 3: FEES, PAYMENTS & NOTES ───────────────────── */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-heading">
                  3 · Fees, payments & notes
                </h2>
                <p className="text-xs text-body/60 mt-0.5">INR-only enrollment ledger</p>
              </div>

              {/* 3 Ledger Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-numeric">
                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Enrollment fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-body">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={feeRupees}
                      onChange={(e) => setFeeRupees(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs font-bold text-heading focus:outline-none focus:border-[#3C096C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Successful payments
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-body">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={paidRupees}
                      onChange={(e) => setPaidRupees(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs font-bold text-heading focus:outline-none focus:border-[#3C096C]"
                    />
                  </div>
                  <span className="text-[10px] text-body/50 mt-1 block">
                    Receipt RCPT-2026-8934
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Calculated amount due
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#3C096C]">
                      ₹
                    </span>
                    <input
                      type="text"
                      readOnly
                      value={amountDueRupees.toLocaleString("en-IN")}
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-purple-200 bg-purple-50/50 text-xs font-bold text-[#3C096C]"
                    />
                  </div>
                  <span className="text-[10px] text-body/50 mt-1 block">
                    Enrollment fee – successful payments
                  </span>
                </div>
              </div>

              {/* Status and Next due date row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Payment status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-heading font-medium focus:outline-none focus:border-[#3C096C]"
                  >
                    <option value="Partially paid">Partially paid</option>
                    <option value="Fully paid">Fully paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Enrollment status
                  </label>
                  <select
                    value={enrollmentStatus}
                    onChange={(e) => setEnrollmentStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-heading font-medium focus:outline-none focus:border-[#3C096C]"
                  >
                    <option value="ACTIVE">Active on payment confirmation</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="REFUNDED">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-heading block mb-1">
                    Next due date
                  </label>
                  <input
                    type="date"
                    value={nextDueDate}
                    onChange={(e) => setNextDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-heading font-medium focus:outline-none focus:border-[#3C096C]"
                  />
                </div>
              </div>

              {/* Admin notes */}
              <div>
                <label className="text-xs font-semibold text-heading block mb-1">
                  Admin notes
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-xl border border-neutral-300 text-xs text-heading placeholder:text-body/40 focus:outline-none focus:border-[#3C096C]"
                />
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: SUMMARY, CHECKLIST, CTAS (4 COLS / ~33%) ─── */}
          <div className="lg:col-span-4 space-y-5">
            {/* 1. Enrollment summary card */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="font-serif text-base font-bold text-heading">
                  Enrollment summary
                </h3>
                <p className="text-xs text-body/60 mt-0.5">Review before saving</p>
              </div>

              <div className="space-y-3 text-xs divide-y divide-neutral-100">
                <div className="flex items-center justify-between pt-1">
                  <span className="text-body/70">Student</span>
                  <span className="font-bold text-heading">{currentStudent?.name || "Student"}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-body/70">Course</span>
                  <span className="font-bold text-heading truncate max-w-[180px]">
                    {currentCourse?.title}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-body/70">Teacher</span>
                  <span className="font-bold text-heading">{currentTeacher?.name || "Mira Sen"}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-body/70">Schedule</span>
                  <span className="font-semibold text-heading font-numeric">
                    {recurringCadence === "TUE_THU" ? "Tue / Thu" : "Weekly"} · {startTime} IST
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-body/70">Dates</span>
                  <span className="font-semibold text-heading font-numeric">
                    {startDate} – {endDate}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-body/70">Sessions</span>
                  <span className="font-semibold text-heading font-numeric">
                    {totalSessions} × {sessionDurationMinutes} minutes
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 font-numeric">
                  <span className="text-body/70">Fee</span>
                  <span className="font-semibold text-heading">₹{feeRupees.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex items-center justify-between pt-2 font-numeric">
                  <span className="text-body/70">Paid</span>
                  <span className="font-semibold text-emerald-700">
                    – ₹{paidRupees.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 text-sm font-numeric">
                  <span className="font-bold text-heading">Amount due</span>
                  <span className="font-serif text-xl font-bold text-[#3C096C]">
                    ₹{amountDueRupees.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Ready to save checklist */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-3">
              <div>
                <h3 className="font-serif text-base font-bold text-heading">Ready to save</h3>
                <p className="text-xs text-body/60 mt-0.5">All required records validated</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Student identity and guardian verified</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Course is active in catalog</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Teacher available for recurrence</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>INR fee and ledger balanced</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-numeric">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{totalSessions} sessions ready to generate</span>
                </div>
              </div>
            </div>

            {/* 3. Action Card */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
              <p className="text-xs text-body/70 leading-relaxed font-numeric">
                Saving creates the enrollment and {totalSessions} traceable class sessions. No payment
                is collected automatically.
              </p>

              <button
                type="button"
                onClick={() => handleSaveEnrollment(false)}
                disabled={isPending}
                className="w-full py-2.5 rounded-xl bg-[#3C096C] hover:bg-[#2F0755] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Check className="w-4 h-4 text-white" />
                )}
                <span>Save Enrollment</span>
              </button>

              <button
                type="button"
                onClick={() => handleSaveEnrollment(true)}
                disabled={isPending}
                className="w-full py-2.5 rounded-xl border border-neutral-200/90 hover:bg-neutral-50 text-heading font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs active:scale-95 disabled:opacity-50"
              >
                <FileText className="w-3.5 h-3.5 text-body/80" />
                <span>Save as draft</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
