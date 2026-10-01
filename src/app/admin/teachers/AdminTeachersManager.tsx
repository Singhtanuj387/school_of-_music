"use client";

import { useState, useTransition } from "react";
import { TeacherApprovalStatus } from "@prisma/client";
import { updateTeacherApprovalAction } from "@/actions/admin";
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Loader2,
  UserCheck,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  ExternalLink,
  CreditCard,
  X,
  FileText,
  Music,
  Check,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import { formatDeterministicDate } from "@/lib/timezone";

export interface AdminTeacherProfileData {
  id: string; // TeacherProfile id
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
  image: string | null;
  timezone: string;
  createdAt: string; // ISO
  bio: string;
  instruments: string[];
  expertInstruments: string[];
  moderateInstruments: string[];
  languages: string[];
  yearsTeaching: number;
  hourlyRate: number; // paise
  payoutPerSession: number; // paise
  upiId: string | null;
  isPublished: boolean;
  approvalStatus: TeacherApprovalStatus;
  approvedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  adminNotes: string | null;
  scheduledLessonsCount: number;
  completedLessonsCount: number;
}

interface AdminTeachersManagerProps {
  initialTeachers: AdminTeacherProfileData[];
}

export function AdminTeachersManager({ initialTeachers }: AdminTeachersManagerProps) {
  const [teachers, setTeachers] = useState<AdminTeacherProfileData[]>(initialTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | TeacherApprovalStatus>("PENDING");
  const [instrumentFilter, setInstrumentFilter] = useState<string>("ALL");

  // Selected teacher for full review / edit modal
  const [selectedTeacher, setSelectedTeacher] = useState<AdminTeacherProfileData | null>(null);

  // Rejection modal state
  const [rejectionModalTeacher, setRejectionModalTeacher] = useState<AdminTeacherProfileData | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");

  // Quick edit state in review modal
  const [modalAdminNotes, setModalAdminNotes] = useState("");
  const [modalPayoutRupees, setModalPayoutRupees] = useState<number>(800);

  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Compute counts
  const pendingCount = teachers.filter((t) => t.approvalStatus === "PENDING").length;
  const approvedCount = teachers.filter((t) => t.approvalStatus === "APPROVED").length;
  const rejectedCount = teachers.filter((t) => t.approvalStatus === "REJECTED").length;
  const publishedCount = teachers.filter((t) => t.isPublished).length;

  // Extract all unique instruments across teachers
  const allInstruments = Array.from(
    new Set(teachers.flatMap((t) => t.instruments)),
  ).sort();

  // Filter teachers
  const filteredTeachers = teachers.filter((t) => {
    const matchesStatus = statusFilter === "ALL" || t.approvalStatus === statusFilter;
    const matchesInstrument =
      instrumentFilter === "ALL" || t.instruments.includes(instrumentFilter);
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !searchLower ||
      t.name.toLowerCase().includes(searchLower) ||
      t.email.toLowerCase().includes(searchLower) ||
      (t.phone ? t.phone.toLowerCase().includes(searchLower) : false) ||
      t.instruments.some((inst) => inst.toLowerCase().includes(searchLower)) ||
      t.bio.toLowerCase().includes(searchLower);

    return matchesStatus && matchesInstrument && matchesSearch;
  });

  const handleApprove = (teacher: AdminTeacherProfileData, notesOverride?: string) => {
    setFeedback(null);
    startTransition(async () => {
      const res = await updateTeacherApprovalAction({
        teacherProfileId: teacher.id,
        status: TeacherApprovalStatus.APPROVED,
        adminNotes: notesOverride ?? teacher.adminNotes,
        payoutPerSession: teacher.payoutPerSession,
      });

      if (res.success) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.id === teacher.id
              ? {
                  ...t,
                  approvalStatus: TeacherApprovalStatus.APPROVED,
                  approvedAt: new Date().toISOString(),
                  rejectedAt: null,
                  rejectionReason: null,
                  adminNotes: notesOverride ?? t.adminNotes,
                }
              : t,
          ),
        );
        setFeedback({
          type: "success",
          message: res.message || `${teacher.name} approved successfully!`,
        });
        if (selectedTeacher?.id === teacher.id) {
          setSelectedTeacher(null);
        }
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to approve faculty." });
      }
    });
  };

  const openRejectModal = (teacher: AdminTeacherProfileData) => {
    setRejectionModalTeacher(teacher);
    setRejectionReasonInput(
      teacher.rejectionReason ||
        "Faculty credentials require additional certification or teaching history.",
    );
    setFeedback(null);
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectionModalTeacher) return;

    setFeedback(null);
    startTransition(async () => {
      const res = await updateTeacherApprovalAction({
        teacherProfileId: rejectionModalTeacher.id,
        status: TeacherApprovalStatus.REJECTED,
        rejectionReason: rejectionReasonInput.trim(),
      });

      if (res.success) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.id === rejectionModalTeacher.id
              ? {
                  ...t,
                  approvalStatus: TeacherApprovalStatus.REJECTED,
                  rejectedAt: new Date().toISOString(),
                  approvedAt: null,
                  rejectionReason: rejectionReasonInput.trim(),
                  isPublished: false,
                }
              : t,
          ),
        );
        setFeedback({
          type: "success",
          message: res.message || `${rejectionModalTeacher.name} marked as rejected.`,
        });
        setRejectionModalTeacher(null);
        if (selectedTeacher?.id === rejectionModalTeacher.id) {
          setSelectedTeacher(null);
        }
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to reject faculty." });
      }
    });
  };

  const handleResetToPending = (teacher: AdminTeacherProfileData) => {
    setFeedback(null);
    startTransition(async () => {
      const res = await updateTeacherApprovalAction({
        teacherProfileId: teacher.id,
        status: TeacherApprovalStatus.PENDING,
      });

      if (res.success) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.id === teacher.id
              ? {
                  ...t,
                  approvalStatus: TeacherApprovalStatus.PENDING,
                  approvedAt: null,
                  rejectedAt: null,
                  rejectionReason: null,
                  isPublished: false,
                }
              : t,
          ),
        );
        setFeedback({
          type: "success",
          message: `${teacher.name} reset to pending review.`,
        });
        if (selectedTeacher?.id === teacher.id) {
          setSelectedTeacher(null);
        }
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to reset status." });
      }
    });
  };

  const openReviewModal = (teacher: AdminTeacherProfileData) => {
    setSelectedTeacher(teacher);
    setModalAdminNotes(teacher.adminNotes || "");
    setModalPayoutRupees(teacher.payoutPerSession ? teacher.payoutPerSession / 100 : 800);
    setFeedback(null);
  };

  const handleSaveModalSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher) return;

    startTransition(async () => {
      const res = await updateTeacherApprovalAction({
        teacherProfileId: selectedTeacher.id,
        status: selectedTeacher.approvalStatus,
        adminNotes: modalAdminNotes.trim() ? modalAdminNotes.trim() : null,
        payoutPerSession: Math.round(modalPayoutRupees * 100),
      });

      if (res.success) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.id === selectedTeacher.id
              ? {
                  ...t,
                  adminNotes: modalAdminNotes.trim() ? modalAdminNotes.trim() : null,
                  payoutPerSession: Math.round(modalPayoutRupees * 100),
                }
              : t,
          ),
        );
        setFeedback({ type: "success", message: "Faculty settings updated successfully!" });
        setSelectedTeacher(null);
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to update faculty settings." });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Feedback Banner */}
      {feedback && (
        <div
          role="alert"
          className={`flex items-center justify-between p-4 rounded-2xl border text-xs font-medium animate-in fade-in duration-150 ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 text-body hover:text-heading transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-body-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-heading tabular-nums">
              {pendingCount}
            </span>
            {pendingCount > 0 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                Action Needed
              </span>
            )}
          </div>
          <p className="text-[11px] text-body mt-0.5">Awaiting admin review</p>
        </div>

        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-body-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">Approved Faculty</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-heading tabular-nums">
              {approvedCount}
            </span>
            <span className="text-[11px] text-body">instructors</span>
          </div>
          <p className="text-[11px] text-body mt-0.5">Teaching credentials verified</p>
        </div>

        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-body-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">Publicly Live</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-heading tabular-nums">
              {publishedCount}
            </span>
            <span className="text-[11px] text-body">discoverable</span>
          </div>
          <p className="text-[11px] text-body mt-0.5">Visible to prospective students</p>
        </div>

        <div className="rounded-2xl border border-border-default bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-body-muted">
            <span className="text-[11px] font-bold uppercase tracking-wider">Rejected / Paused</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-heading tabular-nums">
              {rejectedCount}
            </span>
            <span className="text-[11px] text-body">profiles</span>
          </div>
          <p className="text-[11px] text-body mt-0.5">Require updates or declined</p>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-border-default shadow-xs overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setStatusFilter("PENDING")}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              statusFilter === "PENDING"
                ? "bg-amber-600 text-white shadow-xs font-bold"
                : "text-body hover:text-heading font-medium"
            }`}
          >
            <span>Pending Review</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                statusFilter === "PENDING"
                  ? "bg-white/20 text-white"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {pendingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("APPROVED")}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              statusFilter === "APPROVED"
                ? "bg-primary text-white shadow-xs font-bold"
                : "text-body hover:text-heading font-medium"
            }`}
          >
            <span>Approved</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                statusFilter === "APPROVED"
                  ? "bg-white/20 text-white"
                  : "bg-neutral-100 text-body"
              }`}
            >
              {approvedCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("REJECTED")}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              statusFilter === "REJECTED"
                ? "bg-rose-700 text-white shadow-xs font-bold"
                : "text-body hover:text-heading font-medium"
            }`}
          >
            <span>Rejected</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                statusFilter === "REJECTED"
                  ? "bg-white/20 text-white"
                  : "bg-neutral-100 text-body"
              }`}
            >
              {rejectedCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              statusFilter === "ALL"
                ? "bg-primary text-white shadow-xs font-bold"
                : "text-body hover:text-heading font-medium"
            }`}
          >
            <span>All Instructors</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                statusFilter === "ALL"
                  ? "bg-white/20 text-white"
                  : "bg-neutral-100 text-body"
              }`}
            >
              {teachers.length}
            </span>
          </button>
        </div>

        {/* Search & Instrument Filter */}
        <div className="flex items-center gap-2">
          {allInstruments.length > 0 && (
            <select
              value={instrumentFilter}
              onChange={(e) => setInstrumentFilter(e.target.value)}
              className="rounded-xl border border-border-default bg-white px-3 py-2 text-xs text-heading shadow-xs focus:border-primary focus:outline-hidden font-medium"
            >
              <option value="ALL">All Disciplines</option>
              {allInstruments.map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>
          )}

          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-muted" />
            <input
              type="text"
              placeholder="Search faculty name, email, bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-default bg-white text-xs text-heading placeholder:text-body-muted shadow-xs focus:border-primary focus:outline-hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-body-muted hover:text-heading"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Teachers List / Table */}
      {filteredTeachers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-default bg-white p-12 text-center space-y-3">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-primary-subtle text-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-heading">No instructors match your filters</h3>
          <p className="text-xs text-body max-w-sm mx-auto">
            {searchQuery || instrumentFilter !== "ALL" || statusFilter !== "ALL"
              ? "Try adjusting your search terms or filter selection."
              : "No faculty accounts have registered yet."}
          </p>
          {(searchQuery || instrumentFilter !== "ALL" || statusFilter !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setInstrumentFilter("ALL");
                setStatusFilter("ALL");
              }}
              className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline cursor-pointer pt-2"
            >
              <span>Reset all filters</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTeachers.map((teacher) => {
            const isApproved = teacher.approvalStatus === "APPROVED";
            const isPendingStatus = teacher.approvalStatus === "PENDING";
            const isRejected = teacher.approvalStatus === "REJECTED";

            return (
              <div
                key={teacher.id}
                className={`rounded-2xl border bg-white p-5 shadow-xs transition-all hover:border-primary/40 ${
                  isPendingStatus
                    ? "border-amber-300 ring-1 ring-amber-200/60 bg-gradient-to-r from-amber-50/20 via-white to-white"
                    : "border-border-default"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Teacher Identity & Details */}
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    {teacher.image ? (
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-13 h-13 rounded-2xl object-cover border border-border-default shrink-0 shadow-xs"
                      />
                    ) : (
                      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-serif font-bold text-lg shrink-0 shadow-xs">
                        {teacher.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-serif text-base font-bold text-heading truncate">
                          {teacher.name}
                        </h4>

                        {/* Approval Status Badge */}
                        {isPendingStatus && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                            <span>Pending Review</span>
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Approved Faculty</span>
                          </span>
                        )}
                        {isRejected && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            <span>Rejected / Revision Required</span>
                          </span>
                        )}

                        {/* Public Discoverability */}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            teacher.isPublished
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-neutral-100 text-body-muted border-neutral-200"
                          }`}
                        >
                          {teacher.isPublished ? "● Live on Site" : "○ Draft Profile"}
                        </span>
                      </div>

                      {/* Contact row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-body">
                        <span>{teacher.email}</span>
                        {teacher.phone && (
                          <span className="flex items-center gap-1">
                            <span>{teacher.phone}</span>
                            {teacher.phoneVerified && (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                                Verified
                              </span>
                            )}
                          </span>
                        )}
                        <span className="text-body-muted">
                          Registered: {formatDeterministicDate(teacher.createdAt)}
                        </span>
                      </div>

                      {/* Instruments & Experience */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {teacher.instruments.length > 0 ? (
                          teacher.instruments.map((inst) => {
                            const isExpert = teacher.expertInstruments.includes(inst);
                            return (
                              <span
                                key={inst}
                                className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                                  isExpert
                                    ? "bg-primary-subtle text-primary border-primary/20 font-bold"
                                    : "bg-neutral-50 text-body border-border-default"
                                }`}
                              >
                                {inst}
                                {isExpert ? " ★" : ""}
                              </span>
                            );
                          })
                        ) : (
                          <span className="text-[11px] text-body-muted italic">
                            No instruments declared yet
                          </span>
                        )}

                        <span className="text-body-muted text-xs mx-1">•</span>

                        <span className="text-xs text-body">
                          <strong>{teacher.yearsTeaching}</strong> yrs experience
                        </span>

                        <span className="text-body-muted text-xs mx-1">•</span>

                        <span className="text-xs text-heading font-medium">
                          Display Rate: ₹{(teacher.hourlyRate / 100).toFixed(0)}/hr
                        </span>

                        <span className="text-body-muted text-xs mx-1">•</span>

                        <span className="text-xs text-accent-dark font-medium">
                          Remuneration: ₹{(teacher.payoutPerSession / 100).toFixed(0)}/session
                        </span>
                      </div>

                      {/* Bio preview if exists */}
                      {teacher.bio && (
                        <p className="text-xs text-body leading-relaxed line-clamp-2 max-w-3xl pt-1">
                          {teacher.bio}
                        </p>
                      )}

                      {/* Rejection Note Alert if rejected */}
                      {isRejected && teacher.rejectionReason && (
                        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-2.5 text-xs text-rose-800 space-y-0.5">
                          <span className="font-bold uppercase tracking-wider text-[10px] text-rose-900">
                            Reason Provided to Teacher:
                          </span>
                          <p>{teacher.rejectionReason}</p>
                        </div>
                      )}

                      {/* Admin Private Notes if exist */}
                      {teacher.adminNotes && (
                        <div className="rounded-xl border border-primary/20 bg-primary-subtle/40 p-2 text-xs text-primary space-y-0.5">
                          <span className="font-bold uppercase tracking-wider text-[10px]">
                            Private Admin Notes:
                          </span>
                          <p>{teacher.adminNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-border-default/60">
                    {/* Primary Approval Action Buttons */}
                    {isPendingStatus ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleApprove(teacher)}
                          className="btn-tactile inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve Faculty</span>
                        </button>

                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => openRejectModal(teacher)}
                          className="btn-tactile inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all active:scale-[0.98] cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject / Request Changes</span>
                        </button>
                      </div>
                    ) : isApproved ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => openRejectModal(teacher)}
                          className="btn-tactile inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 text-xs font-medium transition-all cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5 text-rose-500" />
                          <span>Revoke / Reject</span>
                        </button>

                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleResetToPending(teacher)}
                          title="Reset to Pending Review"
                          className="p-1.5 rounded-lg border border-border-default text-body hover:text-heading hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleApprove(teacher)}
                          className="btn-tactile inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Re-approve Faculty</span>
                        </button>

                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => handleResetToPending(teacher)}
                          className="btn-tactile inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-border-default text-body hover:text-heading hover:bg-neutral-50 text-xs font-medium cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Set to Pending</span>
                        </button>
                      </div>
                    )}

                    {/* Review Application Details Button */}
                    <button
                      type="button"
                      onClick={() => openReviewModal(teacher)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-default bg-white text-heading hover:bg-neutral-50 text-xs font-medium shadow-xs transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-body" />
                      <span>Review Full Application</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── MODAL: REJECT APPLICATION WITH REASON ──────────────────────────────── */}
      {rejectionModalTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-border-default bg-white p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border-default/60 pb-3">
              <div className="flex items-center gap-2 text-rose-700">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="font-serif text-lg font-bold text-heading">
                  Reject or Request Changes
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRejectionModalTeacher(null)}
                className="p-1 rounded-lg text-body hover:text-heading hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-body leading-relaxed">
              Rejecting <strong>{rejectionModalTeacher.name}</strong> will unpublish their
              profile from public search and notify them in their studio dashboard. Please provide
              actionable feedback or required updates.
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-heading">
                  Reason / Required Action for Instructor
                </label>
                <textarea
                  required
                  rows={4}
                  value={rejectionReasonInput}
                  onChange={(e) => setRejectionReasonInput(e.target.value)}
                  placeholder="e.g. Please provide additional information regarding your classical performance certifications or teaching background..."
                  className="w-full rounded-xl border border-border-default p-3 text-xs text-heading shadow-xs focus:border-rose-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectionModalTeacher(null)}
                  className="px-4 py-2 rounded-xl border border-border-default text-xs font-medium text-body hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-tactile inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                  <span>Confirm Rejection</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: FULL APPLICATION REVIEW & SETTINGS ─────────────────────────── */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border-default bg-white p-6 sm:p-7 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-default/60 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-dark">
                  Faculty Accreditation Review
                </span>
                <h3 className="font-serif text-xl font-bold text-heading mt-0.5">
                  {selectedTeacher.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="p-1.5 rounded-xl text-body hover:text-heading hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-border-default bg-bg-alt/20 p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-body-muted">
                  Email & Timezone
                </span>
                <p className="font-medium text-heading">{selectedTeacher.email}</p>
                <p className="text-body">Timezone: {selectedTeacher.timezone}</p>
              </div>

              <div className="rounded-xl border border-border-default bg-bg-alt/20 p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-body-muted">
                  Phone & Verification
                </span>
                <p className="font-medium text-heading">
                  {selectedTeacher.phone || "No phone provided"}
                </p>
                <p className="text-body">
                  OTP Status:{" "}
                  {selectedTeacher.phoneVerified ? "✓ Verified" : "✗ Not Verified"}
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-bg-alt/20 p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-body-muted">
                  Hourly Rate (Public)
                </span>
                <p className="font-serif text-base font-bold text-heading">
                  ₹{(selectedTeacher.hourlyRate / 100).toFixed(0)} / session
                </p>
                <p className="text-body">Experience: {selectedTeacher.yearsTeaching} years</p>
              </div>

              <div className="rounded-xl border border-border-default bg-bg-alt/20 p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-body-muted">
                  Payout Remuneration
                </span>
                <p className="font-serif text-base font-bold text-accent-dark">
                  ₹{(selectedTeacher.payoutPerSession / 100).toFixed(0)} / session
                </p>
                <p className="text-body">UPI: {selectedTeacher.upiId || "Not added yet"}</p>
              </div>
            </div>

            {/* Teaching Bio */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-heading">
                Pedagogical Bio & Qualifications
              </span>
              <div className="rounded-2xl border border-border-default bg-neutral-50/70 p-4 text-xs text-body leading-relaxed max-h-40 overflow-y-auto">
                {selectedTeacher.bio || (
                  <span className="text-body-muted italic">No bio submitted yet.</span>
                )}
              </div>
            </div>

            {/* Instruments & Disciplines */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-heading">
                Disciplines & Skill Levels
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedTeacher.instruments.map((inst) => {
                  const isExp = selectedTeacher.expertInstruments.includes(inst);
                  return (
                    <span
                      key={inst}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                        isExp
                          ? "bg-primary-subtle text-primary border-primary/30 font-bold"
                          : "bg-white text-body border-border-default"
                      }`}
                    >
                      {inst} {isExp ? "★ (Expert)" : "• (Moderate)"}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Admin Controls Form */}
            <form onSubmit={handleSaveModalSettings} className="space-y-4 pt-2 border-t border-border-default">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-heading">
                    Fixed Session Payout (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={50}
                    value={modalPayoutRupees}
                    onChange={(e) => setModalPayoutRupees(Number(e.target.value))}
                    className="w-full rounded-xl border border-border-default p-2.5 text-xs text-heading shadow-xs focus:border-primary focus:outline-hidden"
                  />
                  <p className="text-[10px] text-body-muted">
                    Remuneration paid to instructor per completed 1:1 lesson.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-heading">
                    Approval State
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {selectedTeacher.approvalStatus === "APPROVED" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Approved & Verified</span>
                      </span>
                    ) : selectedTeacher.approvalStatus === "REJECTED" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Application Rejected</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pending Review</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-heading">
                  Administrative Notes (Private to School Admin)
                </label>
                <textarea
                  rows={3}
                  value={modalAdminNotes}
                  onChange={(e) => setModalAdminNotes(e.target.value)}
                  placeholder="Private board notes, interview impressions, background check notes..."
                  className="w-full rounded-xl border border-border-default p-2.5 text-xs text-heading shadow-xs focus:border-primary focus:outline-hidden"
                />
              </div>

              {/* Action Buttons in Modal */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-default/60">
                <div className="flex items-center gap-2">
                  {selectedTeacher.approvalStatus !== "APPROVED" && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleApprove(selectedTeacher, modalAdminNotes)}
                      className="btn-tactile inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve Faculty</span>
                    </button>
                  )}

                  {selectedTeacher.approvalStatus !== "REJECTED" && (
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => {
                        const t = selectedTeacher;
                        setSelectedTeacher(null);
                        openRejectModal(t);
                      }}
                      className="btn-tactile inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject Application</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTeacher(null)}
                    className="px-3.5 py-2 rounded-xl border border-border-default text-xs font-medium text-body hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="btn-tactile inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                  >
                    {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
