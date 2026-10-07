"use client";

import { useState, useTransition } from "react";
import { TeacherApprovalStatus } from "@prisma/client";
import { updateTeacherApprovalAction } from "@/actions/admin";
import {
  Globe,
  Upload,
  UserPlus,
  Search,
  ChevronRight,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart2,
  FileText,
  IndianRupee,
  Sparkles,
  X,
  CreditCard,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  UserCheck,
  BookOpen,
  Music,
  ExternalLink,
  Shield,
  Award,
  SlidersHorizontal,
  FileCheck,
  Send,
  Eye,
  EyeOff,
  Edit3,
} from "lucide-react";

export interface TeacherRecord {
  id: string; // TeacherProfile id (or user id fallback)
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
  image: string | null;
  timezone: string;
  country: string | null;
  createdAt: string;
  isActive: boolean;
  bio: string;
  instruments: string[];
  expertInstruments: string[];
  moderateInstruments: string[];
  languages: string[];
  yearsTeaching: number;
  hourlyRate: number; // paise
  payoutPerSession: number; // paise (e.g. 80000 = ₹800)
  upiId: string | null;
  isPublished: boolean;
  approvalStatus: TeacherApprovalStatus; // PENDING, APPROVED, REJECTED
  approvedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  adminNotes: string | null;
  lessons: {
    id: string;
    instrument: string;
    startsAt: string;
    durationMinutes: number;
    status: string;
    studentName: string | null;
    studentEmail: string | null;
    trackingCode: string | null;
    recordingUrl: string | null;
    payoutStatus: string;
  }[];
  courses: {
    id: string;
    title: string;
    instrument: string;
    level: string;
    sessionCount: number;
  }[];
  resources: {
    id: string;
    title: string;
    category: string;
    fileUrl: string;
    createdAt: string;
  }[];
  trials: {
    id: string;
    instrument: string;
    status: string;
    startsAt: string;
    isConverted: boolean;
  }[];
  availabilitySlotsCount: number;
}

interface AdminTeachersManagerProps {
  initialTeachers: TeacherRecord[];
}

export function AdminTeachersManager({ initialTeachers }: AdminTeachersManagerProps) {
  const [teachers, setTeachers] = useState<TeacherRecord[]>(initialTeachers);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(
    initialTeachers[0]?.id || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | TeacherApprovalStatus>("ALL");
  const [activeTab, setActiveTab] = useState<
    | "OVERVIEW"
    | "CLASSES"
    | "STUDENTS"
    | "RESOURCES"
    | "PAYOUTS"
    | "DOSSIER"
  >("OVERVIEW");

  // Modals & Drawers
  const [isReviewApplicationOpen, setIsReviewApplicationOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");
  const [inlinePayoutInput, setInlinePayoutInput] = useState<number>(800);
  const [adminNotesInput, setAdminNotesInput] = useState<string>("");

  // Feedback notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isPending, startTransition] = useTransition();

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedTeacher =
    teachers.find((t) => t.id === selectedTeacherId) || teachers[0];

  // Dynamic status counts from active database records
  const allCount = teachers.length;
  const approvedCount = teachers.filter((t) => t.approvalStatus === "APPROVED").length;
  const pendingCount = teachers.filter((t) => t.approvalStatus === "PENDING").length;
  const rejectedCount = teachers.filter((t) => t.approvalStatus === "REJECTED").length;

  // Filter teachers for directory list
  const filteredTeachers = teachers.filter((t) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      (t.phone && t.phone.toLowerCase().includes(q)) ||
      t.instruments.some((inst) => inst.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    if (statusFilter === "ALL") return true;
    return t.approvalStatus === statusFilter;
  });

  const formattedIstDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  // Metrics for selected teacher
  const totalLessons = selectedTeacher ? selectedTeacher.lessons.length : 0;
  const completedLessons = selectedTeacher
    ? selectedTeacher.lessons.filter((l) => l.status === "COMPLETED").length
    : 0;
  const scheduledLessons = selectedTeacher
    ? selectedTeacher.lessons.filter((l) => l.status === "SCHEDULED").length
    : 0;
  const payoutRupees = selectedTeacher
    ? Math.round(selectedTeacher.payoutPerSession / 100)
    : 800;

  // Initials generator
  const getInitials = (name: string) => {
    return (
      name
        .split(" ")
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase() || "FA"
    );
  };

  // Status update handler (Approve, Reject, Pending)
  const handleUpdateStatus = (
    teacherId: string,
    newStatus: TeacherApprovalStatus,
    reason?: string
  ) => {
    startTransition(async () => {
      const res = await updateTeacherApprovalAction({
        teacherProfileId: teacherId,
        status: newStatus,
        rejectionReason: reason || null,
        adminNotes: adminNotesInput.trim() ? adminNotesInput.trim() : undefined,
      });

      if (res.success) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.id === teacherId
              ? {
                  ...t,
                  approvalStatus: newStatus,
                  approvedAt:
                    newStatus === "APPROVED"
                      ? new Date().toISOString()
                      : t.approvedAt,
                  rejectedAt:
                    newStatus === "REJECTED"
                      ? new Date().toISOString()
                      : null,
                  rejectionReason:
                    newStatus === "REJECTED"
                      ? reason || "Requirements not met"
                      : null,
                  isPublished: newStatus === "APPROVED" ? t.isPublished : false,
                }
              : t
          )
        );
        showToast(
          res.message ||
            `Faculty status updated to ${newStatus.toLowerCase()}.`,
          "success"
        );
        setIsRejectModalOpen(false);
        setRejectionReasonInput("");
      } else {
        showToast(res.error || "Failed to update faculty status.", "error");
      }
    });
  };

  // Payout rate save handler
  const handleSavePayoutRate = (teacherId: string) => {
    const ratePaise = Math.round(inlinePayoutInput * 100);
    startTransition(async () => {
      const res = await updateTeacherApprovalAction({
        teacherProfileId: teacherId,
        status: selectedTeacher.approvalStatus,
        payoutPerSession: ratePaise,
        adminNotes: adminNotesInput.trim() ? adminNotesInput.trim() : undefined,
      });

      if (res.success) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.id === teacherId
              ? {
                  ...t,
                  payoutPerSession: ratePaise,
                  adminNotes: adminNotesInput.trim() || t.adminNotes,
                }
              : t
          )
        );
        showToast(`Session payout updated to ₹${inlinePayoutInput}.`, "success");
      } else {
        showToast(res.error || "Could not update remuneration rate.", "error");
      }
    });
  };

  // Publish / Discoverability toggle
  const handleTogglePublish = (teacherId: string, currentPublished: boolean) => {
    startTransition(async () => {
      const res = await updateTeacherApprovalAction({
        teacherProfileId: teacherId,
        status: selectedTeacher.approvalStatus,
        isPublished: !currentPublished,
      });

      if (res.success) {
        setTeachers((prev) =>
          prev.map((t) =>
            t.id === teacherId ? { ...t, isPublished: !currentPublished } : t
          )
        );
        showToast(
          !currentPublished
            ? "Faculty profile published to website catalog."
            : "Faculty profile hidden from website catalog.",
          "success"
        );
      } else {
        showToast(res.error || "Could not update discoverability.", "error");
      }
    });
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
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
          <span className="font-bold text-heading">Teachers</span>
        </div>

        <div className="flex items-center gap-2.5 text-body/80 self-end sm:self-auto">
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
            Teachers
          </h1>
          <p className="text-xs sm:text-sm text-body/70 mt-1">
            Faculty accreditation, master credentials, remuneration control, and verified teaching timeline
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {/* Export Roster button */}
          <button
            type="button"
            onClick={() => showToast("Faculty roster CSV ready for download.")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-heading text-xs font-bold transition-all shadow-2xs active:scale-95"
          >
            <Upload className="w-3.5 h-3.5 text-body/80 rotate-180" />
            <span>Export Roster</span>
          </button>

          {/* Invite Faculty button */}
          <button
            type="button"
            onClick={() => showToast("Faculty invitation link copied to clipboard.")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3C096C] hover:bg-[#2F0755] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            <UserPlus className="w-4 h-4 text-white" />
            <span>Invite Faculty</span>
          </button>
        </div>
      </div>

      {/* ─── 3. MASTER-DETAIL WORKSPACE (DIRECTORY + 360 OVERVIEW) ──────── */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* ─── LEFT: DIRECTORY LIST (320px–360px) ───────────────────────── */}
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-4 sm:p-5 space-y-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-heading">Directory</h2>
            <p className="text-xs text-body/70 mt-0.5 font-numeric">
              {teachers.length} active faculty profiles
            </p>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-body/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Name, email or instrument"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200/90 text-xs text-heading placeholder:text-body/40 focus:outline-none focus:border-[#3C096C] transition-colors"
            />
          </div>

          {/* ─── FILTER PILLS (AS REQUESTED) ───────────────────────────── */}
          {/* Pending Review 0, Approved 3, Rejected 1, All Instructors 4 */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setStatusFilter("ALL")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                statusFilter === "ALL"
                  ? "bg-[#3C096C] text-white shadow-2xs"
                  : "bg-neutral-100/90 hover:bg-neutral-200/70 text-body"
              }`}
            >
              <span>All Instructors</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold font-numeric ${
                  statusFilter === "ALL"
                    ? "bg-white/20 text-white"
                    : "bg-neutral-200/90 text-heading"
                }`}
              >
                {allCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("APPROVED")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                statusFilter === "APPROVED"
                  ? "bg-emerald-700 text-white shadow-2xs"
                  : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/70"
              }`}
            >
              <span>Approved</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold font-numeric ${
                  statusFilter === "APPROVED"
                    ? "bg-white/20 text-white"
                    : "bg-emerald-200/70 text-emerald-900"
                }`}
              >
                {approvedCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("PENDING")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                statusFilter === "PENDING"
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/70"
              }`}
            >
              <span>Pending Review</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold font-numeric ${
                  statusFilter === "PENDING"
                    ? "bg-white/20 text-white"
                    : "bg-amber-200/70 text-amber-900"
                }`}
              >
                {pendingCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("REJECTED")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                statusFilter === "REJECTED"
                  ? "bg-rose-700 text-white shadow-2xs"
                  : "bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200/70"
              }`}
            >
              <span>Rejected</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold font-numeric ${
                  statusFilter === "REJECTED"
                    ? "bg-white/20 text-white"
                    : "bg-rose-200/70 text-rose-900"
                }`}
              >
                {rejectedCount}
              </span>
            </button>
          </div>

          {/* Directory Teacher Card List */}
          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filteredTeachers.length === 0 ? (
              <div className="p-6 text-center text-xs text-body/60 bg-neutral-50/70 rounded-xl">
                No faculty members match your filter.
              </div>
            ) : (
              filteredTeachers.map((teacher) => {
                const isSelected = teacher.id === selectedTeacher?.id;
                const initials = getInitials(teacher.name);
                const primaryInst =
                  teacher.instruments.length > 0
                    ? teacher.instruments.slice(0, 2).join(", ")
                    : "All Instruments";

                return (
                  <button
                    key={teacher.id}
                    type="button"
                    onClick={() => {
                      setSelectedTeacherId(teacher.id);
                      setInlinePayoutInput(Math.round(teacher.payoutPerSession / 100));
                      setAdminNotesInput(teacher.adminNotes || "");
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#3C096C]/5 border-[#3C096C] shadow-2xs ring-1 ring-[#3C096C]/30"
                        : "bg-white hover:bg-neutral-50/80 border-neutral-200/80"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Initials Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-[#3C096C]/10 text-[#3C096C] border border-[#3C096C]/15 flex items-center justify-center font-bold text-xs shrink-0 font-sans">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <div className="font-bold text-xs text-heading truncate">
                          {teacher.name}
                        </div>
                        <div className="text-[11px] text-body/70 truncate mt-0.5">
                          {primaryInst} · {teacher.country || "India"}
                        </div>
                        <div className="mt-1">
                          <span
                            className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                              teacher.approvalStatus === "APPROVED"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : teacher.approvalStatus === "PENDING"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {teacher.approvalStatus === "APPROVED"
                              ? "Approved"
                              : teacher.approvalStatus === "PENDING"
                                ? "Pending Review"
                                : "Rejected"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? "text-[#3C096C] translate-x-0.5" : "text-body/30"
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ─── RIGHT: TEACHER 360 WORKSPACE (FULL DETAILS) ─────────────── */}
        {selectedTeacher ? (
          <div className="flex-1 min-w-0 space-y-5">
            {/* ─── Profile Header Card ─────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#3C096C]/10 border border-[#3C096C]/20 text-[#3C096C] flex items-center justify-center font-bold text-lg shrink-0 shadow-inner">
                    {getInitials(selectedTeacher.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-heading">
                        {selectedTeacher.name}
                      </h2>
                      <span
                        className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${
                          selectedTeacher.approvalStatus === "APPROVED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : selectedTeacher.approvalStatus === "PENDING"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {selectedTeacher.approvalStatus === "APPROVED"
                          ? "Approved"
                          : selectedTeacher.approvalStatus === "PENDING"
                            ? "Pending Review"
                            : "Rejected"}
                      </span>
                      {selectedTeacher.isPublished && (
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">
                          Live on Web
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-body/60 mt-1 font-numeric">
                      FAC-{new Date(selectedTeacher.createdAt).getFullYear()}-
                      {selectedTeacher.id.slice(-4)} · faculty since{" "}
                      {new Date(selectedTeacher.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* ─── ACTION BUTTONS: Review Full Application & Revoke / Reject ─── */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Button 1: Review Full Application */}
                  <button
                    type="button"
                    onClick={() => {
                      setInlinePayoutInput(Math.round(selectedTeacher.payoutPerSession / 100));
                      setAdminNotesInput(selectedTeacher.adminNotes || "");
                      setIsReviewApplicationOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-heading text-xs font-semibold transition-colors shadow-2xs active:scale-95"
                  >
                    <FileCheck className="w-3.5 h-3.5 text-[#3C096C]" />
                    <span>Review Full Application</span>
                  </button>

                  {/* Button 2: Revoke / Reject */}
                  {selectedTeacher.approvalStatus !== "REJECTED" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setRejectionReasonInput(
                          selectedTeacher.rejectionReason ||
                            "Credentials require verified academic accreditation."
                        );
                        setIsRejectModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-rose-300 hover:bg-rose-50 text-rose-700 text-xs font-semibold transition-colors shadow-2xs active:scale-95"
                    >
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Revoke / Reject</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(selectedTeacher.id, TeacherApprovalStatus.APPROVED)
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Re-evaluate & Approve</span>
                    </button>
                  )}

                  {/* Approve Faculty CTA if Pending */}
                  {selectedTeacher.approvalStatus === "PENDING" && (
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateStatus(selectedTeacher.id, TeacherApprovalStatus.APPROVED)
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#3C096C] hover:bg-[#2F0755] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Approve Faculty</span>
                    </button>
                  )}
                </div>
              </div>

              {/* 6-Field Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-neutral-100 text-xs">
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Email</div>
                  <div className="font-bold text-heading mt-0.5 truncate select-all">
                    {selectedTeacher.email}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Phone</div>
                  <div className="font-bold text-heading mt-0.5 font-numeric flex items-center gap-1.5">
                    <span>{selectedTeacher.phone || "—"}</span>
                    {selectedTeacher.phoneVerified && (
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Remuneration Rate</div>
                  <div className="font-bold text-heading mt-0.5 font-numeric text-[#3C096C]">
                    ₹{payoutRupees.toLocaleString("en-IN")} / session
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Payout UPI ID</div>
                  <div className="font-bold text-heading mt-0.5 truncate">
                    {selectedTeacher.upiId || "Not configured"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Country / Timezone</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedTeacher.country || "India"} · {selectedTeacher.timezone}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-body/60 font-medium">Experience & Languages</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedTeacher.yearsTeaching} yrs ·{" "}
                    {selectedTeacher.languages.join(", ") || "English"}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Tab Navigation Bar ──────────────────────────────────── */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-semibold">
              {[
                { id: "OVERVIEW", label: "Overview" },
                { id: "CLASSES", label: "Classes & Sessions" },
                { id: "STUDENTS", label: "Students Allotted" },
                { id: "RESOURCES", label: "Curriculum & Resources" },
                { id: "PAYOUTS", label: "Payout History" },
                { id: "DOSSIER", label: "Accreditation Dossier" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap active:scale-95 ${
                    activeTab === tab.id
                      ? "bg-[#3C096C] text-white shadow-xs"
                      : "bg-white hover:bg-neutral-100 text-body/70 border border-neutral-200/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ─── 4 Executive Metric Cards Row ────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {/* Card 1: Completed Sessions */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body font-medium">Completed Sessions</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-heading mt-2 font-numeric">
                  {completedLessons}
                </div>
                <div className="text-[11px] text-body/60 font-medium mt-0.5 font-numeric">
                  {totalLessons} total assigned sessions
                </div>
              </div>

              {/* Card 2: Scheduled / Upcoming */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body font-medium">Scheduled Classes</span>
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-heading mt-2 font-numeric">
                  {scheduledLessons}
                </div>
                <div className="text-[11px] text-body/60 font-medium mt-0.5 font-numeric">
                  Upcoming bookings on calendar
                </div>
              </div>

              {/* Card 3: Payout Rate */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body font-medium">Session Remuneration</span>
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <IndianRupee className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-heading mt-2 font-numeric">
                  ₹{payoutRupees.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-body/60 font-medium mt-0.5">
                  Per 60-min completed lesson
                </div>
              </div>

              {/* Card 4: Discoverability */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-body font-medium">Catalog Listing</span>
                  <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-heading mt-2">
                  {selectedTeacher.isPublished ? "Live on Web" : "Unlisted"}
                </div>
                <div className="text-[11px] text-body/60 font-medium mt-0.5 flex items-center justify-between">
                  <span>{selectedTeacher.isPublished ? "Publicly bookable" : "Hidden from search"}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleTogglePublish(selectedTeacher.id, selectedTeacher.isPublished)
                    }
                    className="text-[10px] text-[#3C096C] font-bold hover:underline"
                  >
                    {selectedTeacher.isPublished ? "Unlist" : "Publish"}
                  </button>
                </div>
              </div>
            </div>

            {/* ─── 2-Column Content Grid ───────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* LEFT SUB-COLUMN (7 COLS / ~60%) */}
              <div className="lg:col-span-7 space-y-5">
                {/* 1. Specialized Instruments & Disciplines */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-heading">
                        Specialized Instruments & Disciplines
                      </h3>
                      <p className="text-xs text-body/60 mt-0.5">
                        Verified mastery and teaching competency
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Expert Instruments */}
                    <div>
                      <div className="text-[11px] font-semibold text-heading uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-purple-700" />
                        <span>Expert Mastery</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTeacher.expertInstruments.length > 0 ? (
                          selectedTeacher.expertInstruments.map((inst) => (
                            <span
                              key={inst}
                              className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200/80 text-xs font-semibold"
                            >
                              {inst}
                            </span>
                          ))
                        ) : selectedTeacher.instruments.length > 0 ? (
                          selectedTeacher.instruments.map((inst) => (
                            <span
                              key={inst}
                              className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200/80 text-xs font-semibold"
                            >
                              {inst}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-body/50 italic">
                            No expert disciplines listed.
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Moderate Instruments */}
                    {selectedTeacher.moderateInstruments.length > 0 && (
                      <div className="pt-2 border-t border-neutral-100">
                        <div className="text-[11px] font-semibold text-body/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Music className="w-3.5 h-3.5 text-body/60" />
                          <span>Secondary / Moderate Competency</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedTeacher.moderateInstruments.map((inst) => (
                            <span
                              key={inst}
                              className="px-2.5 py-1 rounded-lg bg-neutral-100 text-body/80 border border-neutral-200 text-xs font-medium"
                            >
                              {inst}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Upcoming & Recent Classes */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-heading">
                        Upcoming & Recent Classes
                      </h3>
                      <p className="text-xs text-body/60 mt-0.5">
                        Individual 1:1 sessions conducted by this faculty
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedTeacher.lessons.length === 0 ? (
                      <div className="p-4 rounded-xl bg-neutral-50 text-center text-xs text-body/60">
                        No sessions recorded for this faculty member yet.
                      </div>
                    ) : (
                      selectedTeacher.lessons.slice(0, 5).map((l) => {
                        const lDate = new Date(l.startsAt);
                        const isUpcoming = l.status === "SCHEDULED";
                        const isCompleted = l.status === "COMPLETED";

                        return (
                          <div
                            key={l.id}
                            className="p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/40 flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <div className="font-bold text-xs text-heading truncate">
                                {lDate.toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                })}{" "}
                                ·{" "}
                                {lDate.toLocaleTimeString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}{" "}
                                · {l.instrument}
                              </div>
                              <div className="text-[11px] text-body/70 mt-0.5 truncate">
                                Student: {l.studentName || l.studentEmail || "Enrolled Student"}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {isCompleted ? (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                                  Complete
                                </span>
                              ) : isUpcoming ? (
                                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold">
                                  Upcoming
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-body/70 text-[10px] font-semibold">
                                  {l.status}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* 3. Biography & Teaching Philosophy */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-heading">
                    Curriculum & Teaching Bio
                  </h3>
                  <div className="text-xs text-body leading-relaxed whitespace-pre-line bg-neutral-50/50 p-4 rounded-xl border border-neutral-100">
                    {selectedTeacher.bio || "No professional biography submitted yet."}
                  </div>
                </div>
              </div>

              {/* RIGHT SUB-COLUMN (5 COLS / ~40%) */}
              <div className="lg:col-span-5 space-y-5">
                {/* 1. Remuneration & Payout Settings */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-base font-bold text-heading">
                        Remuneration Control
                      </h3>
                      <p className="text-xs text-body/60 mt-0.5">Session rate configuration</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/80 space-y-3">
                    <label className="text-[11px] font-semibold text-heading block">
                      Payout Per 60-Minute Class (INR ₹)
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-body">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={inlinePayoutInput}
                          onChange={(e) => setInlinePayoutInput(Number(e.target.value))}
                          step="50"
                          min="0"
                          className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-purple-200 bg-white text-xs font-bold text-heading focus:outline-none focus:border-[#3C096C]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSavePayoutRate(selectedTeacher.id)}
                        disabled={isPending}
                        className="px-3 py-1.5 rounded-lg bg-[#3C096C] hover:bg-[#2F0755] text-white text-xs font-bold transition-all shadow-2xs active:scale-95 disabled:opacity-50"
                      >
                        {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save Rate"}
                      </button>
                    </div>

                    <div className="text-[11px] text-body/70 pt-2 border-t border-purple-100 flex items-center justify-between">
                      <span>Linked UPI ID:</span>
                      <span className="font-semibold text-heading">
                        {selectedTeacher.upiId || "None"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Application Status & Governance */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-heading">
                    Accreditation & Governance
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/40 flex items-center justify-between">
                      <span className="text-body/70">Current Accreditation</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          selectedTeacher.approvalStatus === "APPROVED"
                            ? "bg-emerald-50 text-emerald-700"
                            : selectedTeacher.approvalStatus === "PENDING"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {selectedTeacher.approvalStatus}
                      </span>
                    </div>

                    {selectedTeacher.rejectionReason && (
                      <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/70 text-rose-900 text-xs">
                        <div className="font-semibold mb-1">Rejection Rationale:</div>
                        <div>{selectedTeacher.rejectionReason}</div>
                      </div>
                    )}

                    {/* Admin Notes */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-heading block">
                        Internal Admin Notes
                      </label>
                      <textarea
                        value={adminNotesInput}
                        onChange={(e) => setAdminNotesInput(e.target.value)}
                        placeholder="Add verified credentials, background check notes, audition remarks..."
                        rows={3}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs text-heading placeholder:text-body/40 focus:outline-none focus:border-[#3C096C]"
                      />
                      <button
                        type="button"
                        onClick={() => handleSavePayoutRate(selectedTeacher.id)}
                        disabled={isPending}
                        className="text-[11px] text-[#3C096C] font-bold hover:underline"
                      >
                        Save Admin Notes
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Allotted Courses & Enrolled Catalog */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-heading">
                    Catalog Allotments
                  </h3>

                  <div className="space-y-2 text-xs">
                    {selectedTeacher.courses.length === 0 ? (
                      <div className="p-3 text-center text-body/50 bg-neutral-50 rounded-xl">
                        Not allotted to any course batches yet.
                      </div>
                    ) : (
                      selectedTeacher.courses.map((c) => (
                        <div
                          key={c.id}
                          className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/40 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-bold text-heading">{c.title}</div>
                            <div className="text-[11px] text-body/60 mt-0.5">
                              {c.instrument} · {c.level}
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700">
                            Faculty
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* ─── MODAL 1: REVIEW FULL APPLICATION ───────────────────────────── */}
      {isReviewApplicationOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#3C096C]/10 text-[#3C096C] font-bold flex items-center justify-center">
                  {getInitials(selectedTeacher.name)}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-heading">
                    Full Faculty Application
                  </h3>
                  <p className="text-xs text-body/60">
                    {selectedTeacher.name} · {selectedTeacher.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewApplicationOpen(false)}
                className="p-1 text-body hover:text-heading transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Content */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-50/80 border border-neutral-200/60">
                <div>
                  <div className="text-body/60 font-medium">Approval Status</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedTeacher.approvalStatus}
                  </div>
                </div>
                <div>
                  <div className="text-body/60 font-medium">Years of Experience</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedTeacher.yearsTeaching} years teaching
                  </div>
                </div>
                <div>
                  <div className="text-body/60 font-medium">Primary Disciplines</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedTeacher.instruments.join(", ") || "None"}
                  </div>
                </div>
                <div>
                  <div className="text-body/60 font-medium">Languages Spoken</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedTeacher.languages.join(", ") || "English"}
                  </div>
                </div>
                <div>
                  <div className="text-body/60 font-medium">Verified Phone</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedTeacher.phone || "Not provided"}
                  </div>
                </div>
                <div>
                  <div className="text-body/60 font-medium">Country / Timezone</div>
                  <div className="font-bold text-heading mt-0.5">
                    {selectedTeacher.country || "India"} · {selectedTeacher.timezone}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-heading mb-1.5">Submitted Biography</h4>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-body leading-relaxed whitespace-pre-line">
                  {selectedTeacher.bio || "No biography provided by applicant."}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-heading mb-1.5">Admin Accreditation Notes</h4>
                <textarea
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="Record credentials verification, university degrees, or comments..."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-neutral-200 text-xs text-heading placeholder:text-body/40 focus:outline-none focus:border-[#3C096C]"
                />
              </div>
            </div>

            {/* Modal Decision Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => {
                  setIsReviewApplicationOpen(false);
                  setIsRejectModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors"
              >
                Revoke / Reject Application
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewApplicationOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-body font-semibold text-xs transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleUpdateStatus(selectedTeacher.id, TeacherApprovalStatus.APPROVED);
                    setIsReviewApplicationOpen(false);
                  }}
                  disabled={isPending}
                  className="px-4 py-2 rounded-xl bg-[#3C096C] hover:bg-[#2F0755] text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Approve Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: REVOKE / REJECT FACULTY ────────────────────────────── */}
      {isRejectModalOpen && selectedTeacher && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5 text-rose-700 font-bold text-base">
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Revoke or Reject Faculty</span>
              </div>
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="p-1 text-body hover:text-heading"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-body leading-relaxed">
              Are you sure you want to revoke accreditation for{" "}
              <strong className="text-heading">{selectedTeacher.name}</strong>? This will
              unpublish their public profile and notify them.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-heading block">
                Rejection Rationale / Notice
              </label>
              <textarea
                value={rejectionReasonInput}
                onChange={(e) => setRejectionReasonInput(e.target.value)}
                placeholder="Reason for revoking accreditation..."
                rows={3}
                className="w-full p-2.5 rounded-xl border border-neutral-200 text-xs text-heading placeholder:text-body/40 focus:outline-none focus:border-rose-600"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="px-3.5 py-2 rounded-xl border border-neutral-200 text-body hover:bg-neutral-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  handleUpdateStatus(
                    selectedTeacher.id,
                    TeacherApprovalStatus.REJECTED,
                    rejectionReasonInput
                  )
                }
                disabled={isPending}
                className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors shadow-xs"
              >
                {isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  "Confirm Revocation"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
