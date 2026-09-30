"use client";

import { useState, useTransition } from "react";
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
  formattedTime: string;
  preferredTimeSlot: string;
  timezone?: string;
  ageGroup: string;
  studentNotes?: string | null;
  status: TrialRequestStatus;
  allottedTeacherId?: string | null;
  allottedTeacherName?: string | null;
  createdAt: string;
}

export interface TeacherOption {
  id: string;
  name: string;
  email: string;
  instruments: string[];
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

  // Allotment Modal State
  const [selectedRequest, setSelectedRequest] = useState<AdminTrialRequestItem | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState(false);

  const openAllotModal = (req: AdminTrialRequestItem) => {
    setSelectedRequest(req);
    // Suggest teacher teaching this instrument if available
    const matching = teachers.find((t) =>
      t.instruments.some((i) => i.toLowerCase().includes(req.instrument.toLowerCase()))
    );
    setSelectedTeacherId(req.allottedTeacherId || matching?.id || teachers[0]?.id || "");
    setActionError(null);
    setActionSuccess(false);
  };

  const handleAllotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !selectedTeacherId) return;

    setActionError(null);
    setActionSuccess(false);

    startTransition(async () => {
      const res = await allotTrialTeacherAction({
        trialRequestId: selectedRequest.id,
        teacherId: selectedTeacherId,
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
      (r.allottedTeacherName && r.allottedTeacherName.toLowerCase().includes(searchQuery.toLowerCase()));

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
            placeholder="Search student, instrument, age..."
            className="w-full rounded-xl bg-white border border-primary/15 pl-9 pr-3.5 py-2 text-xs text-heading placeholder:text-body/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
          />
        </div>
      </div>

      {/* Requests Table / Grid */}
      {filteredRequests.length === 0 ? (
        <div className="p-12 rounded-2xl border border-primary/10 bg-white text-center space-y-3 shadow-xs">
          <Sparkles className="w-8 h-8 text-accent-dark mx-auto" />
          <h3 className="font-serif text-lg font-bold text-heading">No trial requests found</h3>
          <p className="text-xs text-body max-w-sm mx-auto">
            {searchQuery
              ? "Try adjusting your search criteria."
              : "When students request trial lessons through the booking wizard, they will appear here for faculty allotment."}
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
                  <th className="py-3.5 px-4 font-bold">Requested Schedule</th>
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

                    {/* Requested Schedule */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-heading font-numeric">{req.formattedTime}</div>
                      <div className="text-[11px] text-body mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-accent-dark" />
                        <span>Slot: {req.preferredTimeSlot} ({req.timezone || "UTC"})</span>
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
                            <span>Allot Teacher</span>
                          </button>
                        ) : req.status === TrialRequestStatus.ALLOTTED ? (
                          <button
                            type="button"
                            onClick={() => openAllotModal(req)}
                            className="px-3 py-1.5 rounded-xl bg-bg-alt/50 hover:bg-bg-alt border border-primary/10 text-primary hover:text-heading text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5"
                          >
                            <span>Reassign</span>
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

      {/* ALLOT TEACHER MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-heading/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-primary/15 bg-white p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-start justify-between border-b border-primary/10 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-dark font-mono">
                  Academy Faculty Allocation
                </span>
                <h3 className="font-serif text-lg font-bold text-heading mt-0.5">
                  Allot Teacher for Trial Lesson
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="p-1 rounded-lg text-body/60 hover:text-heading hover:bg-bg-alt/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trial Request Details Recap */}
            <div className="p-4 rounded-xl bg-bg-alt/25 border border-primary/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-body">Student:</span>
                <strong className="text-heading font-medium">{selectedRequest.studentName} ({selectedRequest.ageGroup})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-body">Category & Instrument:</span>
                <strong className="text-accent-dark">{selectedRequest.instrument}</strong>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-body">Requested Time:</span>
                <div className="text-right">
                  <strong className="text-heading font-numeric font-medium block">{selectedRequest.formattedTime}</strong>
                  <span className="text-[11px] text-accent-dark font-medium">Slot: {selectedRequest.preferredTimeSlot} ({selectedRequest.timezone || "UTC"})</span>
                </div>
              </div>
              {selectedRequest.studentNotes && (
                <div className="pt-1 border-t border-primary/10 text-body">
                  <span className="text-[11px] text-body/60">Notes: </span>
                  <span className="italic">{selectedRequest.studentNotes}</span>
                </div>
              )}
            </div>

            {actionError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{actionError}</span>
              </div>
            )}

            {actionSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Faculty allotted successfully! Live lesson scheduled.</span>
              </div>
            )}

            <form onSubmit={handleAllotSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-heading block">
                  Select Faculty Instructor *
                </label>
                <select
                  required
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  className="w-full rounded-xl bg-white border border-primary/15 p-3 text-xs text-heading focus:outline-none focus:border-primary shadow-2xs"
                >
                  <option value="" disabled>
                    -- Choose an instructor --
                  </option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.email}) - Disciplines: {t.instruments.join(", ") || "General"}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-body">
                  Selecting an instructor will automatically schedule the live classroom session and notify both student and teacher.
                </p>
              </div>

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
                  disabled={isPending || !selectedTeacherId}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-50 active:scale-95"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Confirming Allotment...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Confirm Allotment</span>
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
