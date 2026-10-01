"use client";

import { useTransition } from "react";
import Link from "next/link";
import { CoursePaymentPlan, CourseEmiStatus, CourseRequestStatus, EnrollmentStatus } from "@prisma/client";
import {
  GraduationCap,
  Clock,
  UserCheck,
  BookOpen,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  CreditCard,
  X,
} from "lucide-react";
import { cancelCourseEnrollmentRequestAction } from "@/actions/courses";
import { useRouter } from "next/navigation";

export interface EnrolledCourseItem {
  id: string;
  courseTitle: string;
  courseSlug: string;
  discipline: string;
  instrument: string;
  sessionsTotal: number;
  sessionsRemaining: number;
  status: EnrollmentStatus;
  paymentPlan: CoursePaymentPlan;
  emiStatus: CourseEmiStatus;
  teacherName: string | null;
  startedAt: string;
}

export interface CourseRequestItem {
  id: string;
  courseTitle: string;
  courseSlug: string;
  discipline: string;
  instrument: string;
  paymentPlan: CoursePaymentPlan;
  status: CourseRequestStatus;
  studentNotes: string | null;
  adminNotes: string | null;
  createdAt: string;
}

export function StudentEnrolledCoursesSection({
  enrollments,
  requests,
}: {
  enrollments: EnrolledCourseItem[];
  requests: CourseRequestItem[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const pendingRequests = requests.filter((r) => r.status === "PENDING");
  const activeEnrollments = enrollments.filter((e) => e.status === "ACTIVE");

  if (activeEnrollments.length === 0 && pendingRequests.length === 0) {
    return null;
  }

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

  const emiStatusLabel = (status: CourseEmiStatus) => {
    switch (status) {
      case "FIRST_INSTALLMENT_PAID":
        return "1st Installment Paid";
      case "PARTIALLY_PAID":
        return "Partially Paid";
      case "FULLY_PAID":
        return "Tuition Settled";
      case "PENDING_PAYMENT":
        return "Fee Pending";
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Active Enrolled Courses ── */}
      {activeEnrollments.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-xl font-bold text-heading">
                My Enrolled Courses ({activeEnrollments.length})
              </h2>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Live & Allotted
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeEnrollments.map((item) => {
              const sessionsCompleted = Math.max(0, item.sessionsTotal - item.sessionsRemaining);
              const progressPercent = Math.min(100, Math.round((sessionsCompleted / item.sessionsTotal) * 100));

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white border border-border-default hover:border-primary/40 shadow-xs space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-accent-subtle text-accent-dark border border-accent/20">
                          {item.discipline}
                        </span>
                        <span className="text-[10px] font-semibold text-body-muted">
                          {item.instrument}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-heading">
                        {item.courseTitle}
                      </h3>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary-subtle text-primary border border-primary/20 shrink-0">
                      {planLabel(item.paymentPlan)}
                    </span>
                  </div>

                  {/* Mentor Info */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-bg-alt/40 border border-border-subtle text-xs">
                    <UserCheck className="w-4 h-4 text-primary shrink-0" />
                    <div className="min-w-0 flex-1 truncate">
                      <span className="text-body-muted">Assigned Mentor: </span>
                      <span className="font-bold text-heading">
                        {item.teacherName || "Academy Faculty Allotment in Progress"}
                      </span>
                    </div>
                  </div>

                  {/* Sessions & Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-body">1:1 Masterclasses</span>
                      <span className="text-heading">
                        {item.sessionsRemaining} of {item.sessionsTotal} sessions left
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-border-subtle overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cta to-accent rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions & Details */}
                  <div className="flex items-center justify-between pt-2 border-t border-border-subtle text-xs">
                    <div className="text-[11px] text-body-muted">
                      {emiStatusLabel(item.emiStatus) && (
                        <span className="font-semibold text-primary">
                          {emiStatusLabel(item.emiStatus)}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/student/dashboard/courses/${item.courseSlug}`}
                      className="inline-flex items-center gap-1.5 font-bold text-cta hover:text-cta-hover transition-colors"
                    >
                      <span>View Course Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Pending Course Admission Requests ── */}
      {pendingRequests.length > 0 && (
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif font-bold text-base text-amber-950">
                Pending Course Admission Requests ({pendingRequests.length})
              </h3>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
              Awaiting Admin Allotment
            </span>
          </div>

          <p className="text-xs text-amber-900/80 leading-relaxed">
            Your admission requests below have been sent directly to the Academy Administration. Once verified and a faculty mentor is scheduled, the courses will automatically unlock on your dashboard.
          </p>

          <div className="space-y-2 pt-1">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-white border border-amber-200 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-heading text-sm">
                      {req.courseTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary-subtle text-primary border border-primary/20">
                      {planLabel(req.paymentPlan)}
                    </span>
                  </div>
                  <div className="text-[11px] text-body-muted flex items-center gap-2">
                    <span>{req.discipline} • {req.instrument}</span>
                    <span>•</span>
                    <span>Requested on {new Date(req.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  {req.studentNotes && (
                    <p className="text-[11px] text-body italic mt-0.5">
                      Note: &ldquo;{req.studentNotes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/student/dashboard/courses/${req.courseSlug}`}
                    className="text-xs font-bold text-cta hover:text-cta-hover transition-colors"
                  >
                    View Course
                  </Link>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      if (confirm("Withdraw this admission request?")) {
                        startTransition(async () => {
                          const res = await cancelCourseEnrollmentRequestAction(req.id);
                          if (res.success) {
                            router.refresh();
                          } else {
                            alert(res.error || "Failed to cancel request.");
                          }
                        });
                      }
                    }}
                    className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 underline transition-colors disabled:opacity-50"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
