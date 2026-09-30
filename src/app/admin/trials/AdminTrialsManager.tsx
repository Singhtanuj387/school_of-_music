"use client";

import { useState, useTransition, useMemo } from "react";
import { TrialRequestStatus } from "@prisma/client";
import { allotTrialTeacherAction, cancelTrialRequestAction } from "@/actions/admin";
import {
  Sparkles,
  Users,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  UserCheck,
  Music2,
  Filter,
  Phone,
  Mail,
  XCircle,
  CalendarClock,
  RotateCcw,
  Globe,
  Tag,
  FileText,
  Sliders,
} from "lucide-react";

export interface AdminTrialRequestItem {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string | null;
  category: string;
  instrument: string;
  requestedStartsAt: string;
  originalRequestedStartsAt?: string;
  formattedTime: string;
  preferredTimeSlot: string;
  timezone?: string;
  ageGroup: string;
  studentNotes?: string | null;
  status: TrialRequestStatus;
  allottedTeacherId?: string | null;
  allottedTeacherName?: string | null;
  allottedTeacherTimezone?: string | null;
  createdAt: string;
  durationMinutes?: number;
  trackingCode?: string | null;
}

export interface TeacherOption {
  id: string;
  name: string;
  email: string;
  timezone?: string;
  instruments: string[];
}

const PRESET_TIME_SLOTS = [
  { time: "09:00", label: "9:00 AM" },
  { time: "10:00", label: "10:00 AM" },
  { time: "11:30", label: "11:30 AM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "15:30", label: "3:30 PM" },
  { time: "17:00", label: "5:00 PM" },
  { time: "18:30", label: "6:30 PM" },
  { time: "19:30", label: "7:30 PM" },
];

function formatTimezonePreview(date: Date | null, timeZone: string): string {
  if (!date || isNaN(date.getTime())) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone || "UTC",
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

export function AdminTrialsManager({
  initialRequests,
  teachers,
}: {
  initialRequests: AdminTrialRequestItem[];
  teachers: TeacherOption[];
}) {
  const [requests, setRequests] = useState<AdminTrialRequestItem[]>(initialRequests);
  const [activeTab, setActiveTab] = useState<"PENDING" | "ALLOTTED" | "ALL">("PENDING");
  const [searchQuery, setSearchQuery] = useState("");

  // Allotment & Timing Modal State
  const [selectedRequest, setSelectedRequest] = useState<AdminTrialRequestItem | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [adminNotes, setAdminNotes] = useState<string>("");

  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState(false);

  // Selected Teacher Lookup
  const selectedTeacher = useMemo(() => {
    return teachers.find((t) => t.id === selectedTeacherId) || null;
  }, [teachers, selectedTeacherId]);

  // Initial Date Strings for the selected request
  const initialDateStrings = useMemo(() => {
    if (!selectedRequest) return { dateStr: "", timeStr: "" };
    const dateSource = selectedRequest.originalRequestedStartsAt || selectedRequest.requestedStartsAt;
    const d = new Date(dateSource);
    const valid = !isNaN(d.getTime()) ? d : new Date();

    const yyyy = valid.getFullYear();
    const mm = String(valid.getMonth() + 1).padStart(2, "0");
    const dd = String(valid.getDate()).padStart(2, "0");
    const hh = String(valid.getHours()).padStart(2, "0");
    const min = String(valid.getMinutes()).padStart(2, "0");

    return {
      dateStr: `${yyyy}-${mm}-${dd}`,
      timeStr: `${hh}:${min}`,
    };
  }, [selectedRequest]);

  // Combined Date object for preview
  const computedStartsAt = useMemo(() => {
    if (!scheduledDate || !scheduledTime) return null;
    try {
      const dt = new Date(`${scheduledDate}T${scheduledTime}:00`);
      return isNaN(dt.getTime()) ? null : dt;
    } catch {
      return null;
    }
  }, [scheduledDate, scheduledTime]);

  // Detect whether timing has been adjusted from student's original booking
  const isTimingModified = useMemo(() => {
    if (!selectedRequest || !computedStartsAt) return false;
    const originalDate = new Date(
      selectedRequest.originalRequestedStartsAt || selectedRequest.requestedStartsAt
    );
    if (isNaN(originalDate.getTime())) return false;

    const diffMinutes = Math.abs(computedStartsAt.getTime() - originalDate.getTime()) / (1000 * 60);
    const durationChanged = durationMinutes !== (selectedRequest.durationMinutes || 60);
    return diffMinutes > 2 || durationChanged;
  }, [selectedRequest, computedStartsAt, durationMinutes]);

  const openAllotModal = (req: AdminTrialRequestItem) => {
    setSelectedRequest(req);
    setActionError(null);
    setActionSuccess(false);

    // Suggest instructor specializing in this instrument
    const matching = teachers.find((t) =>
      t.instruments.some((i) => i.toLowerCase().includes(req.instrument.toLowerCase()))
    );
    setSelectedTeacherId(req.allottedTeacherId || matching?.id || teachers[0]?.id || "");

    // Populate date & time from requestedStartsAt
    const d = new Date(req.requestedStartsAt);
    const valid = !isNaN(d.getTime()) ? d : new Date();

    const yyyy = valid.getFullYear();
    const mm = String(valid.getMonth() + 1).padStart(2, "0");
    const dd = String(valid.getDate()).padStart(2, "0");
    const hh = String(valid.getHours()).padStart(2, "0");
    const min = String(valid.getMinutes()).padStart(2, "0");

    setScheduledDate(`${yyyy}-${mm}-${dd}`);
    setScheduledTime(`${hh}:${min}`);
    setDurationMinutes(req.durationMinutes || 60);
    setAdminNotes("");
  };

  const handleResetToStudentRequest = () => {
    if (!selectedRequest) return;
    setScheduledDate(initialDateStrings.dateStr);
    setScheduledTime(initialDateStrings.timeStr);
    setDurationMinutes(selectedRequest.durationMinutes || 60);
  };

  const handleAllotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !selectedTeacherId) return;

    if (!computedStartsAt) {
      setActionError("Please provide a valid scheduled date and time.");
      return;
    }

    setActionError(null);
    setActionSuccess(false);

    startTransition(async () => {
      const res = await allotTrialTeacherAction({
        trialRequestId: selectedRequest.id,
        teacherId: selectedTeacherId,
        scheduledStartsAt: computedStartsAt.toISOString(),
        durationMinutes,
        adminNotes: adminNotes.trim() || undefined,
      });

      if (!res.success) {
        setActionError(res.error || "Failed to allot teacher.");
      } else {
        setActionSuccess(true);
        const assignedTeacher = teachers.find((t) => t.id === selectedTeacherId);
        setRequests((prev) =>
          prev.map((r) =>
            r.id === selectedRequest.id
              ? {
                  ...r,
                  status: TrialRequestStatus.ALLOTTED,
                  allottedTeacherId: selectedTeacherId,
                  allottedTeacherName: assignedTeacher?.name || "Assigned Teacher",
                  allottedTeacherTimezone: assignedTeacher?.timezone || null,
                  requestedStartsAt: computedStartsAt.toISOString(),
                  formattedTime: formatTimezonePreview(computedStartsAt, r.timezone || "UTC"),
                  durationMinutes,
                  trackingCode: res.data?.trackingCode || r.trackingCode || null,
                }
              : r
          )
        );
        setTimeout(() => {
          setSelectedRequest(null);
          setActionSuccess(false);
        }, 1200);
      }
    });
  };

  const handleCancelRequest = (req: AdminTrialRequestItem) => {
    if (!confirm(`Cancel trial request for ${req.studentName}?`)) return;

    startTransition(async () => {
      const res = await cancelTrialRequestAction(req.id);
      if (!res.success) {
        alert(res.error || "Failed to cancel request.");
      } else {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === req.id ? { ...r, status: TrialRequestStatus.CANCELLED } : r
          )
        );
      }
    });
  };

  const filteredRequests = requests.filter((r) => {
    const matchesTab =
      activeTab === "ALL" ||
      (activeTab === "PENDING" && r.status === TrialRequestStatus.PENDING) ||
      (activeTab === "ALLOTTED" && r.status === TrialRequestStatus.ALLOTTED);

    const matchesSearch =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ageGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.allottedTeacherName && r.allottedTeacherName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.trackingCode && r.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const pendingCount = requests.filter((r) => r.status === TrialRequestStatus.PENDING).length;

  return (
    <div className="space-y-6">
      {/* Top Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-primary/10 rounded-2xl text-xs font-semibold shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("PENDING")}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 active:scale-95 ${
              activeTab === "PENDING"
                ? "bg-rose-600 text-white shadow-xs font-bold"
                : "text-body hover:text-heading hover:bg-bg-alt/30"
            }`}
          >
            <span>Pending Allotment</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white text-rose-700 text-[10px] font-extrabold font-numeric">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ALLOTTED")}
            className={`px-4 py-2 rounded-xl transition-all active:scale-95 ${
              activeTab === "ALLOTTED"
                ? "bg-primary text-white shadow-xs font-bold"
                : "text-body hover:text-heading hover:bg-bg-alt/30"
            }`}
          >
            Allotted
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ALL")}
            className={`px-4 py-2 rounded-xl transition-all active:scale-95 ${
              activeTab === "ALL"
                ? "bg-accent text-white shadow-xs font-bold"
                : "text-body hover:text-heading hover:bg-bg-alt/30"
            }`}
          >
            All Requests ({requests.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-body/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student, instrument, code..."
            className="w-full rounded-xl bg-white border border-primary/15 pl-9 pr-3.5 py-2 text-xs text-heading placeholder:text-body/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
          />
        </div>
      </div>

      {/* Requests Table */}
      {filteredRequests.length === 0 ? (
        <div className="p-12 rounded-2xl border border-primary/10 bg-white text-center space-y-3 shadow-xs">
          <Sparkles className="w-8 h-8 text-accent-dark mx-auto" />
          <h3 className="font-serif text-lg font-bold text-heading">No trial requests found</h3>
          <p className="text-xs text-body max-w-sm mx-auto">
            {searchQuery
              ? "Try adjusting your search criteria."
              : "When students request trial lessons through the booking wizard, they will appear here for faculty allotment and customized scheduling."}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-primary/10 bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-primary/10 bg-bg-alt/25 text-heading font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 font-bold">Student & Contact</th>
                  <th className="py-3.5 px-4 font-bold">Discipline / Category</th>
                  <th className="py-3.5 px-4 font-bold">Age Group</th>
                  <th className="py-3.5 px-4 font-bold">Schedule & Timing</th>
                  <th className="py-3.5 px-4 font-bold">Status & Allotted Faculty</th>
                  <th className="py-3.5 px-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-bg-alt/15 transition-colors">
                    {/* Student & Contact */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-heading text-sm">{req.studentName}</div>
                      <div className="text-[11px] text-body flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-body/50" />
                        <span>{req.studentEmail}</span>
                      </div>
                      {req.studentPhone && (
                        <div className="text-[11px] text-body flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3 text-body/50" />
                          <span>{req.studentPhone}</span>
                        </div>
                      )}
                      {req.studentNotes && (
                        <div className="text-[10px] text-accent-dark italic mt-1 max-w-xs">
                          &quot;{req.studentNotes}&quot;
                        </div>
                      )}
                    </td>

                    {/* Discipline */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-accent-dark text-xs">{req.instrument}</div>
                      <div className="text-[10px] text-body mt-0.5">{req.category}</div>
                    </td>

                    {/* Age Group */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cta/10 text-cta border border-cta/25">
                        {req.ageGroup}
                      </span>
                    </td>

                    {/* Schedule & Timing */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-heading font-numeric">{req.formattedTime}</div>
                      <div className="text-[11px] text-body mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span className="flex items-center gap-1 text-accent-dark font-medium">
                          <Clock className="w-3 h-3" />
                          {req.durationMinutes || 60}m session
                        </span>
                        <span className="text-body/50">•</span>
                        <span className="text-[10px] text-body/70 font-mono">
                          {req.timezone || "UTC"}
                        </span>
                      </div>
                    </td>

                    {/* Status & Allotted Faculty */}
                    <td className="py-3.5 px-4">
                      {req.status === TrialRequestStatus.PENDING ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                          <Clock className="w-3 h-3 text-rose-500" /> Pending Allotment
                        </span>
                      ) : req.status === TrialRequestStatus.ALLOTTED ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Allotted
                          </span>
                          <div className="text-xs font-bold text-heading flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-primary" />
                            <span>{req.allottedTeacherName || "Faculty Assigned"}</span>
                          </div>
                          {req.trackingCode && (
                            <div className="font-mono text-[10px] text-primary/70 bg-primary-subtle px-1.5 py-0.5 rounded w-fit">
                              {req.trackingCode}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-600 border border-neutral-200">
                          Cancelled
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {req.status === TrialRequestStatus.PENDING ? (
                          <button
                            type="button"
                            onClick={() => openAllotModal(req)}
                            className="px-3.5 py-1.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Allot & Schedule</span>
                          </button>
                        ) : req.status === TrialRequestStatus.ALLOTTED ? (
                          <button
                            type="button"
                            onClick={() => openAllotModal(req)}
                            className="px-3 py-1.5 rounded-xl bg-bg-alt/50 hover:bg-bg-alt border border-primary/10 text-primary hover:text-heading text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5"
                          >
                            <CalendarClock className="w-3.5 h-3.5 text-accent-dark" />
                            <span>Edit Timing / Teacher</span>
                          </button>
                        ) : null}

                        {req.status === TrialRequestStatus.PENDING && (
                          <button
                            type="button"
                            onClick={() => handleCancelRequest(req)}
                            title="Cancel Trial Request"
                            className="p-1.5 rounded-lg text-body/50 hover:text-rose-600 hover:bg-rose-50 transition-colors active:scale-95"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ALLOT TEACHER & SCHEDULE TIMING MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-heading/45 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border border-primary/15 bg-white p-6 sm:p-7 shadow-2xl space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-primary/10 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-dark font-mono">
                  Academy Faculty Allocation & Scheduling
                </span>
                <h3 className="font-serif text-xl font-bold text-heading mt-0.5">
                  {selectedRequest.status === TrialRequestStatus.ALLOTTED
                    ? "Edit Trial Timing & Faculty Allotment"
                    : "Allot Faculty & Confirm Trial Timing"}
                </h3>
                <p className="text-xs text-body mt-0.5">
                  Review student requirements, allot certified faculty, and customize the session schedule.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-xl text-body/60 hover:text-heading hover:bg-bg-alt/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student Request Summary Card */}
            <div className="p-4 rounded-2xl bg-bg-alt/30 border border-primary/10 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-primary/10 pb-2.5">
                <div>
                  <span className="text-[11px] text-body/70">Student Candidate:</span>
                  <div className="text-sm font-bold text-heading flex items-center gap-2">
                    <span>{selectedRequest.studentName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cta/10 text-cta border border-cta/20">
                      {selectedRequest.ageGroup}
                    </span>
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-[11px] text-body/70">Discipline:</span>
                  <div className="text-xs font-bold text-accent-dark flex items-center sm:justify-end gap-1.5">
                    <Music2 className="w-3.5 h-3.5" />
                    <span>{selectedRequest.instrument} ({selectedRequest.category})</span>
                  </div>
                </div>
              </div>

              {/* Student's Original Request Reference */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-body">
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-body/70 text-[11px]">Original Student Request: </span>
                    <strong className="text-heading font-medium">
                      {selectedRequest.formattedTime}
                    </strong>
                  </div>
                </div>
                <div className="text-accent-dark font-mono text-[11px]">
                  Preferred Slot: {selectedRequest.preferredTimeSlot} ({selectedRequest.timezone || "UTC"})
                </div>
              </div>

              {selectedRequest.studentNotes && (
                <div className="pt-2 border-t border-primary/10 text-body flex items-start gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-body/60 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-semibold text-body/80">Student Notes: </span>
                    <span className="italic">{selectedRequest.studentNotes}</span>
                  </div>
                </div>
              )}
            </div>

            {actionError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{actionError}</span>
              </div>
            )}

            {actionSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Faculty allotted and trial session scheduled successfully!</span>
              </div>
            )}

            <form onSubmit={handleAllotSubmit} className="space-y-5">
              {/* 1. TEACHER SELECTION */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-heading block">
                  Select Certified Faculty Instructor *
                </label>
                <select
                  required
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  className="w-full rounded-xl bg-white border border-primary/15 p-3 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 shadow-xs"
                >
                  <option value="" disabled>
                    -- Choose an instructor --
                  </option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. EDIT TRIAL TIMING SECTION (CORE FEATURE) */}
              <div className="p-4 rounded-2xl bg-white border border-primary/15 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-primary/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-accent-dark" />
                    <div>
                      <h4 className="text-xs font-bold text-heading">
                        Session Date & Schedule Timing
                      </h4>
                      <p className="text-[11px] text-body">
                        Customize or fine-tune session schedule to match instructor availability.
                      </p>
                    </div>
                  </div>

                  {isTimingModified && (
                    <button
                      type="button"
                      onClick={handleResetToStudentRequest}
                      className="px-2.5 py-1 rounded-lg bg-bg-alt/50 hover:bg-bg-alt text-primary text-[11px] font-semibold flex items-center gap-1 transition-all active:scale-95"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset to Student Request</span>
                    </button>
                  )}
                </div>

                {/* Date & Time Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Scheduled Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-heading block">
                      Lesson Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full rounded-xl bg-white border border-primary/15 px-3 py-2.5 text-xs text-heading font-numeric focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 shadow-2xs"
                    />
                  </div>

                  {/* Scheduled Time */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-heading block">
                      Start Time (24h or local) *
                    </label>
                    <input
                      type="time"
                      required
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full rounded-xl bg-white border border-primary/15 px-3 py-2.5 text-xs text-heading font-numeric focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Quick Time Presets */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-medium text-body/80">
                    Quick Preset Slots:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_TIME_SLOTS.map((slot) => {
                      const isSelected = scheduledTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setScheduledTime(slot.time)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-numeric font-medium transition-all active:scale-95 ${
                            isSelected
                              ? "bg-primary text-white shadow-2xs font-bold"
                              : "bg-bg-alt/40 hover:bg-bg-alt text-primary/80 border border-primary/10"
                          }`}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Duration Selector */}
                <div className="space-y-1.5 pt-2 border-t border-primary/10">
                  <div className="text-[11px] font-medium text-body/80">
                    Session Duration:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { mins: 30, label: "30 Mins (Short)" },
                      { mins: 45, label: "45 Mins (Standard)" },
                      { mins: 60, label: "60 Mins (Full Session)" },
                    ].map((opt) => (
                      <button
                        key={opt.mins}
                        type="button"
                        onClick={() => setDurationMinutes(opt.mins)}
                        className={`py-1.5 px-2 rounded-xl text-xs font-semibold text-center transition-all active:scale-95 ${
                          durationMinutes === opt.mins
                            ? "bg-accent text-white shadow-xs font-bold"
                            : "bg-neutral-50 hover:bg-neutral-100 text-body border border-neutral-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dual Timezone Live Translation Card */}
                {computedStartsAt && (
                  <div className="p-3 rounded-xl bg-primary-subtle/50 border border-primary/10 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary uppercase tracking-wider font-mono">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Timezone Synchronization</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-numeric">
                      <div className="bg-white/80 p-2 rounded-lg border border-primary/10">
                        <span className="text-[10px] text-body/70 block">Student Timezone ({selectedRequest.timezone || "UTC"}):</span>
                        <strong className="text-heading text-xs font-semibold">
                          {formatTimezonePreview(computedStartsAt, selectedRequest.timezone || "UTC")}
                        </strong>
                      </div>

                      <div className="bg-white/80 p-2 rounded-lg border border-primary/10">
                        <span className="text-[10px] text-body/70 block">
                          Instructor Timezone ({selectedTeacher?.timezone || "UTC"}):
                        </span>
                        <strong className="text-heading text-xs font-semibold">
                          {formatTimezonePreview(computedStartsAt, selectedTeacher?.timezone || "UTC")}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Alert when timing is modified from student's original request */}
                {isTimingModified && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="font-semibold text-amber-950">
                        Trial Timing Modified by Administrator
                      </p>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        Original request was for <span className="font-medium underline">{selectedRequest.formattedTime}</span>. The student and faculty will receive live invites with this updated schedule.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. OPTIONAL ADMIN NOTES */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-heading block">
                  Internal Notes or Schedule Adjustment Rationale (Optional)
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Adjusted start time to 5:00 PM per student's phone request, or special instructions for teacher..."
                  className="w-full rounded-xl bg-white border border-primary/15 p-2.5 text-xs text-heading placeholder:text-body/45 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 shadow-2xs"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-primary/10">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 border border-neutral-200 text-body text-xs font-semibold hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending || !selectedTeacherId || !computedStartsAt}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50 active:scale-95"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Scheduling & Allotting...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>
                        {isTimingModified
                          ? "Confirm Allotment with Updated Timing"
                          : "Confirm Faculty Allotment"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
