"use client";

import { useState, useTransition } from "react";
import {
  CoursePaymentPlan,
  CourseEmiStatus,
  CourseRequestStatus,
  EnrollmentStatus,
} from "@prisma/client";
import {
  adminApproveCourseRequestAction,
  adminRejectCourseRequestAction,
  adminDirectAllotCourseAction,
  adminUpdateStudentCourseAction,
} from "@/actions/courses";
import {
  GraduationCap,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  Filter,
  UserCheck,
  CreditCard,
  Calendar,
  AlertCircle,
  Loader2,
  X,
  Edit,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface StudentCourseRequestRow {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string | null;
  courseId: string;
  courseTitle: string;
  courseDiscipline: string;
  courseInstrument: string;
  courseSessionCount: number;
  paymentPlan: CoursePaymentPlan;
  status: CourseRequestStatus;
  studentNotes?: string | null;
  adminNotes?: string | null;
  preferredSchedule?: string | null;
  allottedTeacherId?: string | null;
  allottedTeacherName?: string | null;
  enrollmentId?: string | null;
  createdAt: string;
}

export interface StudentCourseEnrollmentRow {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  courseDiscipline: string;
  courseInstrument: string;
  courseSessionCount: number;
  teacherId: string | null;
  teacherName: string | null;
  sessionsRemaining: number;
  status: EnrollmentStatus;
  paymentPlan: CoursePaymentPlan;
  emiStatus: CourseEmiStatus;
  adminNotes?: string | null;
  scheduledLessonsCount: number;
  completedLessonsCount: number;
  startedAt: string;
}

export interface TeacherOption {
  id: string;
  name: string;
  email: string;
  instruments: string[];
}

export interface StudentOption {
  id: string;
  name: string;
  email: string;
}

export interface CourseOption {
  id: string;
  title: string;
  sessionCount: number;
  discipline: string;
  instrument: string;
  priceMinorUnits: number;
}

export function AdminStudentCoursesManager({
  initialRequests,
  initialEnrollments,
  teachers,
  students,
  courses,
}: {
  initialRequests: StudentCourseRequestRow[];
  initialEnrollments: StudentCourseEnrollmentRow[];
  teachers: TeacherOption[];
  students: StudentOption[];
  courses: CourseOption[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"REQUESTS" | "ENROLLMENTS">("REQUESTS");
  const [searchQuery, setSearchQuery] = useState("");
  const [requestStatusFilter, setRequestStatusFilter] = useState<string>("PENDING");
  const [enrollmentStatusFilter, setEnrollmentStatusFilter] = useState<string>("ALL");

  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // ── Modal States ──
  // 1. Approve Request Modal
  const [approvingRequest, setApprovingRequest] = useState<StudentCourseRequestRow | null>(null);
  const [approveTeacherId, setApproveTeacherId] = useState("");
  const [approveSessions, setApproveSessions] = useState<number>(12);
  const [approveEmiStatus, setApproveEmiStatus] = useState<CourseEmiStatus>(CourseEmiStatus.FIRST_INSTALLMENT_PAID);
  const [approveNotes, setApproveNotes] = useState("");

  // 2. Reject Request Modal
  const [rejectingRequest, setRejectingRequest] = useState<StudentCourseRequestRow | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  // 3. Direct Allotment Modal
  const [isDirectAllotOpen, setIsDirectAllotOpen] = useState(false);
  const [directStudentId, setDirectStudentId] = useState("");
  const [directCourseId, setDirectCourseId] = useState("");
  const [directTeacherId, setDirectTeacherId] = useState("");
  const [directSessions, setDirectSessions] = useState<number>(12);
  const [directPaymentPlan, setDirectPaymentPlan] = useState<CoursePaymentPlan>(CoursePaymentPlan.FULL_PAYMENT);
  const [directEmiStatus, setDirectEmiStatus] = useState<CourseEmiStatus>(CourseEmiStatus.FULLY_PAID);
  const [directNotes, setDirectNotes] = useState("");

  // 4. Edit Enrollment Modal
  const [editingEnrollment, setEditingEnrollment] = useState<StudentCourseEnrollmentRow | null>(null);
  const [editTeacherId, setEditTeacherId] = useState("");
  const [editSessionsRemaining, setEditSessionsRemaining] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<EnrollmentStatus>(EnrollmentStatus.ACTIVE);
  const [editPaymentPlan, setEditPaymentPlan] = useState<CoursePaymentPlan>(CoursePaymentPlan.FULL_PAYMENT);
  const [editEmiStatus, setEditEmiStatus] = useState<CourseEmiStatus>(CourseEmiStatus.NOT_APPLICABLE);
  const [editNotes, setEditNotes] = useState("");

  // Filter requests
  const filteredRequests = initialRequests.filter((r) => {
    if (requestStatusFilter !== "ALL" && r.status !== requestStatusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.studentName.toLowerCase().includes(q) ||
        r.studentEmail.toLowerCase().includes(q) ||
        r.courseTitle.toLowerCase().includes(q) ||
        r.courseInstrument.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filter enrollments
  const filteredEnrollments = initialEnrollments.filter((e) => {
    if (enrollmentStatusFilter !== "ALL" && e.status !== enrollmentStatusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        e.studentName.toLowerCase().includes(q) ||
        e.studentEmail.toLowerCase().includes(q) ||
        e.courseTitle.toLowerCase().includes(q) ||
        e.courseInstrument.toLowerCase().includes(q) ||
        (e.teacherName && e.teacherName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const pendingRequestsCount = initialRequests.filter((r) => r.status === "PENDING").length;

  const planLabel = (plan: CoursePaymentPlan) => {
    switch (plan) {
      case "EMI_3_MONTHS":
        return "3-Month EMI";
      case "EMI_6_MONTHS":
        return "6-Month EMI";
      default:
        return "Full Upfront";
    }
  };

  const emiStatusBadge = (status: CourseEmiStatus) => {
    switch (status) {
      case "FULLY_PAID":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            Tuition Settled
          </span>
        );
      case "FIRST_INSTALLMENT_PAID":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
            1st EMI Paid
          </span>
        );
      case "PARTIALLY_PAID":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
            Partially Paid
          </span>
        );
      case "PENDING_PAYMENT":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
            Fee Pending
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
            N/A
          </span>
        );
    }
  };

  // Open approve modal handler
  const handleOpenApprove = (req: StudentCourseRequestRow) => {
    setApprovingRequest(req);
    setApproveTeacherId("");
    setApproveSessions(req.courseSessionCount || 12);
    setApproveEmiStatus(
      req.paymentPlan === "FULL_PAYMENT"
        ? CourseEmiStatus.FULLY_PAID
        : CourseEmiStatus.FIRST_INSTALLMENT_PAID,
    );
    setApproveNotes("");
    setActionError(null);
    setActionSuccess(null);
  };

  // Submit approve
  const handleConfirmApprove = () => {
    if (!approvingRequest) return;
    setActionError(null);
    setActionSuccess(null);

    startTransition(async () => {
      const res = await adminApproveCourseRequestAction({
        requestId: approvingRequest.id,
        teacherId: approveTeacherId || null,
        sessionsRemaining: approveSessions,
        emiStatus: approveEmiStatus,
        adminNotes: approveNotes,
      });

      if (!res.success) {
        setActionError(res.error || "Failed to approve request.");
      } else {
        setActionSuccess(`Approved! Course allotted to ${approvingRequest.studentName}'s dashboard.`);
        setApprovingRequest(null);
        router.refresh();
      }
    });
  };

  // Submit reject
  const handleConfirmReject = () => {
    if (!rejectingRequest) return;
    setActionError(null);

    startTransition(async () => {
      const res = await adminRejectCourseRequestAction({
        requestId: rejectingRequest.id,
        reason: rejectReason,
      });

      if (!res.success) {
        setActionError(res.error || "Failed to reject request.");
      } else {
        setActionSuccess(`Request rejected and student notified.`);
        setRejectingRequest(null);
        router.refresh();
      }
    });
  };

  // Submit direct allotment
  const handleConfirmDirectAllot = () => {
    if (!directStudentId || !directCourseId) {
      setActionError("Please select both a student and a course.");
      return;
    }
    setActionError(null);

    startTransition(async () => {
      const res = await adminDirectAllotCourseAction({
        studentId: directStudentId,
        courseId: directCourseId,
        teacherId: directTeacherId || null,
        sessionsCount: directSessions,
        paymentPlan: directPaymentPlan,
        emiStatus: directEmiStatus,
        adminNotes: directNotes,
      });

      if (!res.success) {
        setActionError(res.error || "Failed to allot course.");
      } else {
        setActionSuccess("Course directly allotted to student dashboard!");
        setIsDirectAllotOpen(false);
        router.refresh();
      }
    });
  };

  // Open edit enrollment modal
  const handleOpenEditEnrollment = (enr: StudentCourseEnrollmentRow) => {
    setEditingEnrollment(enr);
    setEditTeacherId(enr.teacherId || "");
    setEditSessionsRemaining(enr.sessionsRemaining);
    setEditStatus(enr.status);
    setEditPaymentPlan(enr.paymentPlan);
    setEditEmiStatus(enr.emiStatus);
    setEditNotes(enr.adminNotes || "");
    setActionError(null);
  };

  // Submit edit enrollment
  const handleConfirmEditEnrollment = () => {
    if (!editingEnrollment) return;
    setActionError(null);

    startTransition(async () => {
      const res = await adminUpdateStudentCourseAction({
        enrollmentId: editingEnrollment.id,
        teacherId: editTeacherId || null,
        sessionsRemaining: editSessionsRemaining,
        status: editStatus,
        paymentPlan: editPaymentPlan,
        emiStatus: editEmiStatus,
        adminNotes: editNotes,
      });

      if (!res.success) {
        setActionError(res.error || "Failed to update enrollment.");
      } else {
        setActionSuccess("Course enrollment updated successfully.");
        setEditingEnrollment(null);
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* ── Notifications / Alerts ── */}
      {actionError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{actionError}</span>
          </div>
          <button
            onClick={() => setActionError(null)}
            className="text-rose-500 hover:text-rose-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {actionSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button
            onClick={() => setActionSuccess(null)}
            className="text-emerald-500 hover:text-emerald-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Top Metric Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-border-default space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-body-muted text-xs">
            <span>Pending Requests</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-heading">
            {pendingRequestsCount}
          </div>
          <div className="text-[11px] text-body-muted">Awaiting your approval</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-border-default space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-body-muted text-xs">
            <span>Active Enrollments</span>
            <GraduationCap className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold font-serif text-heading">
            {initialEnrollments.filter((e) => e.status === "ACTIVE").length}
          </div>
          <div className="text-[11px] text-body-muted">Active in student dashboards</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-border-default space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-body-muted text-xs">
            <span>EMI Plans</span>
            <CreditCard className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold font-serif text-heading">
            {initialEnrollments.filter((e) => e.paymentPlan !== "FULL_PAYMENT").length}
          </div>
          <div className="text-[11px] text-body-muted">Active installment plans</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-border-default space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-body-muted text-xs">
            <span>Faculty Mentors</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-serif text-heading">
            {teachers.length}
          </div>
          <div className="text-[11px] text-body-muted">Certified gurus available</div>
        </div>
      </div>

      {/* ── Main Action Bar: Tabs & "+ Manually Allot Course" ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("REQUESTS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative btn-tactile ${
              activeTab === "REQUESTS"
                ? "bg-primary text-white shadow-xs"
                : "bg-white border border-border-default text-body hover:text-heading"
            }`}
          >
            <span>Course Admission Requests</span>
            {pendingRequestsCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-accent text-white font-bold">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ENROLLMENTS")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all btn-tactile ${
              activeTab === "ENROLLMENTS"
                ? "bg-primary text-white shadow-xs"
                : "bg-white border border-border-default text-body hover:text-heading"
            }`}
          >
            <span>Active Student Courses ({initialEnrollments.length})</span>
          </button>
        </div>

        {/* Action Button: Manually Allot Course */}
        <button
          type="button"
          onClick={() => {
            setIsDirectAllotOpen(true);
            setDirectStudentId("");
            setDirectCourseId(courses[0]?.id || "");
            setDirectSessions(courses[0]?.sessionCount || 12);
            setDirectTeacherId("");
            setDirectPaymentPlan(CoursePaymentPlan.FULL_PAYMENT);
            setDirectEmiStatus(CourseEmiStatus.FULLY_PAID);
            setDirectNotes("");
            setActionError(null);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cta hover:bg-cta-hover active:bg-cta-active text-white font-bold text-xs transition-all shadow-sm shadow-cta/25 btn-tactile"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Allot Course to Student</span>
        </button>
      </div>

      {/* ── Search and Filter Controls ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-body-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student, course, or mentor..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-default text-xs text-heading placeholder:text-body-muted/60 focus:border-cta focus:ring-2 focus:ring-cta/20 bg-white"
          />
        </div>

        {activeTab === "REQUESTS" ? (
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] text-body-muted font-medium">Status:</span>
            {["PENDING", "APPROVED", "REJECTED", "ALL"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setRequestStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  requestStatusFilter === st
                    ? "bg-primary text-white"
                    : "bg-white border border-border-default text-body hover:text-heading"
                }`}
              >
                {st === "ALL" ? "All Requests" : st}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] text-body-muted font-medium">Status:</span>
            {["ALL", "ACTIVE", "COMPLETED", "CANCELLED"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setEnrollmentStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  enrollmentStatusFilter === st
                    ? "bg-primary text-white"
                    : "bg-white border border-border-default text-body hover:text-heading"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── TAB 1: ADMISSION REQUESTS ── */}
      {activeTab === "REQUESTS" && (
        <div className="space-y-3">
          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center bg-white border border-dashed border-border-default rounded-2xl">
              <Clock className="w-8 h-8 text-body-muted mx-auto mb-2 opacity-50" />
              <p className="font-bold text-heading text-sm">No course admission requests found</p>
              <p className="text-xs text-body-muted mt-0.5">
                When students request courses from the catalog, they will appear here for review and allotment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl bg-white border border-border-default hover:border-border-strong transition-all shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                        {req.studentName?.[0]?.toUpperCase() || "S"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-heading">
                            {req.studentName}
                          </h4>
                          <span className="text-[11px] text-body-muted">
                            ({req.studentEmail})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-primary">
                            Course: {req.courseTitle}
                          </span>
                          <span className="text-xs text-body-muted">•</span>
                          <span className="text-xs text-accent-dark font-medium">
                            {req.courseDiscipline} ({req.courseInstrument})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary-subtle text-primary border border-primary/20">
                        {planLabel(req.paymentPlan)}
                      </span>
                      {req.status === "PENDING" && (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Pending Review
                        </span>
                      )}
                      {req.status === "APPROVED" && (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Allotted & Active
                        </span>
                      )}
                      {req.status === "REJECTED" && (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Declined
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Student Schedule & Note Inclusions */}
                  {(req.preferredSchedule || req.studentNotes) && (
                    <div className="p-3 rounded-xl bg-bg-alt/30 border border-border-subtle text-xs space-y-1">
                      {req.preferredSchedule && (
                        <p className="text-heading font-medium">
                          <span className="font-bold text-primary">Timing Preference: </span>
                          {req.preferredSchedule}
                        </p>
                      )}
                      {req.studentNotes && (
                        <p className="text-body italic">
                          <span className="font-semibold text-body-muted not-italic">Student Goal: </span>
                          &ldquo;{req.studentNotes}&rdquo;
                        </p>
                      )}
                    </div>
                  )}

                  {/* Admin notes if present */}
                  {req.adminNotes && (
                    <div className="text-xs text-body-muted">
                      <span className="font-bold text-heading">Admin Notes: </span>
                      {req.adminNotes}
                    </div>
                  )}

                  {/* Footer & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border-subtle text-xs">
                    <span className="text-body-muted text-[11px]">
                      Submitted: {new Date(req.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                    </span>

                    {req.status === "PENDING" && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setRejectingRequest(req);
                            setRejectReason("");
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors"
                        >
                          Decline
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenApprove(req)}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cta hover:bg-cta-hover active:bg-cta-active text-white text-xs font-bold transition-all shadow-xs shadow-cta/20 btn-tactile"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve & Allot to Dashboard</span>
                        </button>
                      </div>
                    )}

                    {req.status === "APPROVED" && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-emerald-800 font-semibold">
                          Allotted to Dashboard
                        </span>
                        {req.enrollmentId && (
                          <Link
                            href={`/admin/enrollments?schedule=${req.enrollmentId}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                          >
                            <span>Manage 1:1 Timetable</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: ACTIVE STUDENT COURSES ── */}
      {activeTab === "ENROLLMENTS" && (
        <div className="space-y-3">
          {filteredEnrollments.length === 0 ? (
            <div className="p-12 text-center bg-white border border-dashed border-border-default rounded-2xl">
              <GraduationCap className="w-8 h-8 text-body-muted mx-auto mb-2 opacity-50" />
              <p className="font-bold text-heading text-sm">No student course enrollments found</p>
              <p className="text-xs text-body-muted mt-0.5">
                Allot a course above to see active student dashboard records.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredEnrollments.map((enr) => (
                <div
                  key={enr.id}
                  className="p-5 rounded-2xl bg-white border border-border-default hover:border-border-strong transition-all shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                        {enr.studentName?.[0]?.toUpperCase() || "S"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-heading">
                            {enr.studentName}
                          </h4>
                          <span className="text-[11px] text-body-muted">
                            ({enr.studentEmail})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-primary">
                            Course: {enr.courseTitle}
                          </span>
                          <span className="text-xs text-body-muted">•</span>
                          <span className="text-xs text-accent-dark font-medium">
                            {enr.courseDiscipline} ({enr.courseInstrument})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary-subtle text-primary border border-primary/20">
                        {planLabel(enr.paymentPlan)}
                      </span>
                      {emiStatusBadge(enr.emiStatus)}
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          enr.status === "ACTIVE"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : enr.status === "COMPLETED"
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-slate-100 text-slate-700 border border-slate-300"
                        }`}
                      >
                        {enr.status}
                      </span>
                    </div>
                  </div>

                  {/* Mentor & Progress Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-bg-alt/30 border border-border-subtle text-xs">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0 truncate">
                        <span className="text-body-muted text-[11px]">Mentor: </span>
                        <span className="font-bold text-heading">
                          {enr.teacherName || "Unassigned"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent shrink-0" />
                      <div>
                        <span className="text-body-muted text-[11px]">Remaining: </span>
                        <span className="font-bold text-heading">
                          {enr.sessionsRemaining} / {enr.courseSessionCount} sessions
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cta shrink-0" />
                      <div>
                        <span className="text-body-muted text-[11px]">Scheduled: </span>
                        <span className="font-bold text-heading">
                          {enr.scheduledLessonsCount} booked • {enr.completedLessonsCount} finished
                        </span>
                      </div>
                    </div>
                  </div>

                  {enr.adminNotes && (
                    <div className="text-xs text-body-muted">
                      <span className="font-bold text-heading">Admin Notes: </span>
                      {enr.adminNotes}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border-subtle text-xs">
                    <span className="text-[11px] text-body-muted">
                      Enrolled on {new Date(enr.startedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/enrollments?schedule=${enr.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-default hover:bg-bg-alt/50 text-xs font-semibold text-heading transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-cta" />
                        <span>1:1 Schedule Timetable</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleOpenEditEnrollment(enr)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover active:bg-primary-active transition-colors btn-tactile"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Course Allotment</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── MODAL 1: APPROVE REQUEST & ALLOT ── */}
      {approvingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white border border-border-default rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-dark">
                  Admission Decision
                </span>
                <h3 className="font-serif font-bold text-xl text-heading mt-0.5">
                  Approve Course & Allot to Dashboard
                </h3>
                <p className="text-xs text-body-muted">
                  Student: <span className="font-semibold text-heading">{approvingRequest.studentName}</span> • Course: <span className="font-semibold text-heading">{approvingRequest.courseTitle}</span>
                </p>
              </div>
              <button
                onClick={() => setApprovingRequest(null)}
                className="w-7 h-7 rounded-full bg-bg-alt flex items-center justify-center text-body hover:text-heading"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Teacher Allotment */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  Assign Faculty Mentor (Guru)
                </label>
                <select
                  value={approveTeacherId}
                  onChange={(e) => setApproveTeacherId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta focus:ring-2 focus:ring-cta/20"
                >
                  <option value="">-- Assign Later (Admin Can Allot Any Time) --</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.instruments.join(", ") || "General"})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-body-muted">
                  If selected, the guru will also be notified of the new student assignment.
                </p>
              </div>

              {/* Number of Sessions */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  Allotted Private Sessions
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={approveSessions}
                  onChange={(e) => setApproveSessions(parseInt(e.target.value) || 12)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta focus:ring-2 focus:ring-cta/20"
                />
              </div>

              {/* Payment & EMI Status */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  Initial Tuition / EMI Status
                </label>
                <select
                  value={approveEmiStatus}
                  onChange={(e) => setApproveEmiStatus(e.target.value as CourseEmiStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta focus:ring-2 focus:ring-cta/20"
                >
                  <option value={CourseEmiStatus.FULLY_PAID}>Tuition Settled (Full Upfront Paid)</option>
                  <option value={CourseEmiStatus.FIRST_INSTALLMENT_PAID}>1st Installment Paid (EMI Plan)</option>
                  <option value={CourseEmiStatus.PARTIALLY_PAID}>Partially Paid</option>
                  <option value={CourseEmiStatus.PENDING_PAYMENT}>Payment Pending (Offline Bank/UPI Settlement)</option>
                </select>
              </div>

              {/* Admin Internal Notes */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  Admin Internal Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={approveNotes}
                  onChange={(e) => setApproveNotes(e.target.value)}
                  placeholder="e.g. Verified UPI transaction ref #12345, requested weekend slot"
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setApprovingRequest(null)}
                className="px-4 py-2 rounded-xl border border-border-default text-xs font-semibold text-body hover:bg-bg-alt"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleConfirmApprove}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cta hover:bg-cta-hover active:bg-cta-active text-white text-xs font-bold shadow-sm shadow-cta/20 btn-tactile disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Allotting Course...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Allotment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: REJECT REQUEST ── */}
      {rejectingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white border border-border-default rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-heading">
              Decline Admission Request
            </h3>
            <p className="text-xs text-body">
              Are you sure you want to decline the request for <span className="font-bold text-heading">{rejectingRequest.studentName}</span> ({rejectingRequest.courseTitle})?
            </p>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-heading">
                Reason for Decline (Sent to Student)
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Batch is at full capacity, please contact us for next month..."
                className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-rose-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border-subtle">
              <button
                type="button"
                onClick={() => setRejectingRequest(null)}
                className="px-4 py-2 rounded-xl border border-border-default text-xs font-semibold text-body hover:bg-bg-alt"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors btn-tactile disabled:opacity-60"
              >
                {isPending ? "Declining..." : "Decline Request"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 3: DIRECT ALLOTMENT (NEW ENROLLMENT) ── */}
      {isDirectAllotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white border border-border-default rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl my-8">
            <div className="flex items-start justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-dark">
                  Institutional Action
                </span>
                <h3 className="font-serif font-bold text-xl text-heading mt-0.5">
                  Directly Allot Course to Student
                </h3>
                <p className="text-xs text-body-muted">
                  Add any course directly to any student dashboard without requiring an online payment checkout.
                </p>
              </div>
              <button
                onClick={() => setIsDirectAllotOpen(false)}
                className="w-7 h-7 rounded-full bg-bg-alt flex items-center justify-center text-body hover:text-heading"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Select Student */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  1. Select Student <span className="text-rose-500">*</span>
                </label>
                <select
                  value={directStudentId}
                  onChange={(e) => setDirectStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta focus:ring-2 focus:ring-cta/20"
                >
                  <option value="">-- Choose Student --</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name || "Student"} ({s.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Course */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  2. Select Course <span className="text-rose-500">*</span>
                </label>
                <select
                  value={directCourseId}
                  onChange={(e) => {
                    const cId = e.target.value;
                    setDirectCourseId(cId);
                    const found = courses.find((c) => c.id === cId);
                    if (found) setDirectSessions(found.sessionCount);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta focus:ring-2 focus:ring-cta/20"
                >
                  <option value="">-- Choose Course --</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.discipline} • {c.sessionCount} sessions • ₹{(c.priceMinorUnits / 100).toLocaleString("en-IN")})
                    </option>
                  ))}
                </select>
              </div>

              {/* Faculty Mentor */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  3. Assign Faculty Mentor (Guru)
                </label>
                <select
                  value={directTeacherId}
                  onChange={(e) => setDirectTeacherId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta focus:ring-2 focus:ring-cta/20"
                >
                  <option value="">-- Assign Later --</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.instruments.join(", ") || "General"})
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of sessions */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  4. Sessions Included
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={directSessions}
                  onChange={(e) => setDirectSessions(parseInt(e.target.value) || 12)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta focus:ring-2 focus:ring-cta/20"
                />
              </div>

              {/* Payment Plan & EMI */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block font-bold text-heading">
                    5. Payment Plan
                  </label>
                  <select
                    value={directPaymentPlan}
                    onChange={(e) => setDirectPaymentPlan(e.target.value as CoursePaymentPlan)}
                    className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta focus:ring-2 focus:ring-cta/20"
                  >
                    <option value={CoursePaymentPlan.FULL_PAYMENT}>Full Upfront</option>
                    <option value={CoursePaymentPlan.EMI_3_MONTHS}>3-Month EMI</option>
                    <option value={CoursePaymentPlan.EMI_6_MONTHS}>6-Month EMI</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-heading">
                    6. Fee Status
                  </label>
                  <select
                    value={directEmiStatus}
                    onChange={(e) => setDirectEmiStatus(e.target.value as CourseEmiStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta focus:ring-2 focus:ring-cta/20"
                  >
                    <option value={CourseEmiStatus.FULLY_PAID}>Tuition Settled</option>
                    <option value={CourseEmiStatus.FIRST_INSTALLMENT_PAID}>1st Installment Paid</option>
                    <option value={CourseEmiStatus.PARTIALLY_PAID}>Partially Paid</option>
                    <option value={CourseEmiStatus.PENDING_PAYMENT}>Pending Payment</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  7. Internal Notes
                </label>
                <textarea
                  rows={2}
                  value={directNotes}
                  onChange={(e) => setDirectNotes(e.target.value)}
                  placeholder="e.g. Offline bank transfer verified on Oct 1"
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setIsDirectAllotOpen(false)}
                className="px-4 py-2 rounded-xl border border-border-default text-xs font-semibold text-body hover:bg-bg-alt"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleConfirmDirectAllot}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cta hover:bg-cta-hover active:bg-cta-active text-white text-xs font-bold shadow-sm shadow-cta/20 btn-tactile disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Allotting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Allot Course to Student</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 4: EDIT ENROLLMENT ── */}
      {editingEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white border border-border-default rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl my-8">
            <div className="flex items-start justify-between border-b border-border-subtle pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Enrollment Configuration
                </span>
                <h3 className="font-serif font-bold text-xl text-heading mt-0.5">
                  Edit Course Allotment
                </h3>
                <p className="text-xs text-body-muted">
                  Student: <span className="font-semibold text-heading">{editingEnrollment.studentName}</span> • Course: <span className="font-semibold text-heading">{editingEnrollment.courseTitle}</span>
                </p>
              </div>
              <button
                onClick={() => setEditingEnrollment(null)}
                className="w-7 h-7 rounded-full bg-bg-alt flex items-center justify-center text-body hover:text-heading"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Teacher Assignment */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  Faculty Mentor
                </label>
                <select
                  value={editTeacherId}
                  onChange={(e) => setEditTeacherId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta"
                >
                  <option value="">-- No Teacher Assigned --</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.instruments.join(", ") || "General"})
                    </option>
                  ))}
                </select>
              </div>

              {/* Remaining Sessions */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  Remaining 1:1 Sessions
                </label>
                <input
                  type="number"
                  min={0}
                  max={200}
                  value={editSessionsRemaining}
                  onChange={(e) => setEditSessionsRemaining(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta"
                />
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  Enrollment Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as EnrollmentStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta"
                >
                  <option value={EnrollmentStatus.ACTIVE}>ACTIVE (Appears in Student Dashboard)</option>
                  <option value={EnrollmentStatus.COMPLETED}>COMPLETED (Graduated / Finished)</option>
                  <option value={EnrollmentStatus.CANCELLED}>CANCELLED</option>
                </select>
              </div>

              {/* Payment Plan & EMI Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block font-bold text-heading">
                    Payment Plan
                  </label>
                  <select
                    value={editPaymentPlan}
                    onChange={(e) => setEditPaymentPlan(e.target.value as CoursePaymentPlan)}
                    className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta"
                  >
                    <option value={CoursePaymentPlan.FULL_PAYMENT}>Full Upfront</option>
                    <option value={CoursePaymentPlan.EMI_3_MONTHS}>3-Month EMI</option>
                    <option value={CoursePaymentPlan.EMI_6_MONTHS}>6-Month EMI</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-heading">
                    EMI / Fee Status
                  </label>
                  <select
                    value={editEmiStatus}
                    onChange={(e) => setEditEmiStatus(e.target.value as CourseEmiStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta"
                  >
                    <option value={CourseEmiStatus.FULLY_PAID}>Tuition Settled</option>
                    <option value={CourseEmiStatus.FIRST_INSTALLMENT_PAID}>1st Installment Paid</option>
                    <option value={CourseEmiStatus.PARTIALLY_PAID}>Partially Paid</option>
                    <option value={CourseEmiStatus.PENDING_PAYMENT}>Pending Payment</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="block font-bold text-heading">
                  Internal Notes
                </label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border-default text-xs text-heading focus:border-cta resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setEditingEnrollment(null)}
                className="px-4 py-2 rounded-xl border border-border-default text-xs font-semibold text-body hover:bg-bg-alt"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleConfirmEditEnrollment}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover active:bg-primary-active btn-tactile disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Allotment</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
