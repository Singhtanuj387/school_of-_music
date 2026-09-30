"use client";

import { useState, useTransition, useMemo } from "react";
import {
  CreditCard,
  Search,
  CheckCircle2,
  Clock,
  CircleDollarSign,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  X,
  AlertCircle,
  FileSpreadsheet,
  Users,
  Loader2,
  ArrowUpDown,
  Filter,
  RefreshCw,
} from "lucide-react";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { markLessonPayoutAction } from "@/actions/admin";

export interface AdminSessionPayoutItem {
  id: string;
  trackingCode: string;
  startsAt: string;
  dateFormatted: string;
  durationMinutes: number;
  lessonStatus: string;
  lessonSource: string | null;
  courseTitle: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  teacherId: string;
  teacherName: string;
  teacherEmail: string;
  teacherUpiId?: string | null;
  teacherQrUrl?: string | null;
  payoutRateRupees: number;
  payoutStatus: "PAID" | "UNPAID";
  payoutPaidAtFormatted?: string | null;
  payoutTransactionId?: string | null;
  payoutNotes?: string | null;
  payoutAmountRupees: number;
}

export function AdminPaymentsManager({
  initialSessions,
}: {
  initialSessions: AdminSessionPayoutItem[];
}) {
  const [sessions, setSessions] = useState<AdminSessionPayoutItem[]>(initialSessions);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "UNPAID" | "PAID">("ALL");
  const [teacherFilter, setTeacherFilter] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Selected session for Pay Teacher modal
  const [selectedSession, setSelectedSession] = useState<AdminSessionPayoutItem | null>(null);
  const [customAmountRupees, setCustomAmountRupees] = useState<number>(800);
  const [transactionRef, setTransactionRef] = useState<string>("");
  const [payoutNotes, setPayoutNotes] = useState<string>("");
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Unique list of teachers for dropdown filter
  const uniqueTeachers = useMemo(() => {
    const map = new Map<string, string>();
    sessions.forEach((s) => {
      if (!map.has(s.teacherId)) {
        map.set(s.teacherId, s.teacherName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [sessions]);

  // Copy helper
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open modal
  const handleOpenPayModal = (session: AdminSessionPayoutItem) => {
    setSelectedSession(session);
    setCustomAmountRupees(session.payoutAmountRupees || session.payoutRateRupees || 800);
    setTransactionRef(session.payoutTransactionId || "");
    setPayoutNotes(session.payoutNotes || "");
    setModalError(null);
    setModalSuccess(null);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedSession(null);
    setModalError(null);
    setModalSuccess(null);
  };

  // Handle Mark as Paid
  const handleConfirmPayout = (newStatus: "PAID" | "UNPAID") => {
    if (!selectedSession) return;
    setModalError(null);
    setModalSuccess(null);

    startTransition(async () => {
      try {
        const res = await markLessonPayoutAction({
          lessonId: selectedSession.id,
          status: newStatus,
          transactionId: transactionRef,
          notes: payoutNotes,
          amountMinor: Math.round(customAmountRupees * 100),
        });

        if (!res.success) {
          setModalError(res.error || "Failed to update payout status.");
          return;
        }

        // Optimistically update local session in state
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === selectedSession.id) {
              return {
                ...s,
                payoutStatus: newStatus,
                payoutPaidAtFormatted:
                  newStatus === "PAID"
                    ? new Date().toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : null,
                payoutTransactionId: newStatus === "PAID" ? transactionRef.trim() || null : null,
                payoutNotes: newStatus === "PAID" ? payoutNotes.trim() || null : null,
                payoutAmountRupees: customAmountRupees,
              };
            }
            return s;
          }),
        );

        setModalSuccess(
          newStatus === "PAID"
            ? "Session payout marked as PAID successfully!"
            : "Session payout reverted to UNPAID.",
        );

        setTimeout(() => {
          handleCloseModal();
        }, 1200);
      } catch (err: unknown) {
        setModalError(err instanceof Error ? err.message : "An unexpected error occurred.");
      }
    });
  };

  // Filtered rows
  const filteredSessions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return sessions.filter((s) => {
      // Status filter
      if (statusFilter !== "ALL" && s.payoutStatus !== statusFilter) {
        return false;
      }
      // Teacher filter
      if (teacherFilter !== "ALL" && s.teacherId !== teacherFilter) {
        return false;
      }
      // Search
      if (q) {
        const matchTracking = s.trackingCode.toLowerCase().includes(q);
        const matchTeacher = s.teacherName.toLowerCase().includes(q);
        const matchStudent = s.studentName.toLowerCase().includes(q);
        const matchCourse = s.courseTitle.toLowerCase().includes(q);
        const matchRef = s.payoutTransactionId?.toLowerCase().includes(q) || false;
        return matchTracking || matchTeacher || matchStudent || matchCourse || matchRef;
      }
      return true;
    });
  }, [sessions, searchQuery, statusFilter, teacherFilter]);

  // Aggregate metrics
  const totalPaidOut = useMemo(() => {
    return sessions
      .filter((s) => s.payoutStatus === "PAID")
      .reduce((sum, s) => sum + s.payoutAmountRupees, 0);
  }, [sessions]);

  const totalPendingPayout = useMemo(() => {
    return sessions
      .filter((s) => s.payoutStatus === "UNPAID" && s.lessonStatus !== "CANCELLED")
      .reduce((sum, s) => sum + s.payoutRateRupees, 0);
  }, [sessions]);

  const paidCount = sessions.filter((s) => s.payoutStatus === "PAID").length;
  const unpaidCount = sessions.filter(
    (s) => s.payoutStatus === "UNPAID" && s.lessonStatus !== "CANCELLED",
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-sans">
          Institutional Administration
        </span>
        <SplitHeading
          firstClause="Faculty Payment"
          accentClause="Management"
          as="h1"
          size="lg"
        />
        <p className="text-xs text-body mt-1 max-w-3xl">
          Disburse teacher session remuneration via UPI or direct QR transfer. Confirm payments with bank UTR transaction references to immediately update faculty ledgers.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Paid Out */}
        <div className="rounded-2xl border border-border-default bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-body">
            <span className="text-xs font-semibold">Total Disbursed (Paid)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <p className="font-serif text-2xl md:text-3xl font-bold text-emerald-700 font-numeric">
            ₹{totalPaidOut.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-body">
            {paidCount} session{paidCount === 1 ? "" : "s"} settled with faculty
          </p>
        </div>

        {/* Card 2: Pending Payout */}
        <div className="rounded-2xl border border-border-default bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-body">
            <span className="text-xs font-semibold">Pending Remuneration</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="font-serif text-2xl md:text-3xl font-bold text-amber-700 font-numeric">
            ₹{totalPendingPayout.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-body">
            {unpaidCount} session{unpaidCount === 1 ? "" : "s"} awaiting disbursement
          </p>
        </div>

        {/* Card 3: Total Sessions */}
        <div className="rounded-2xl border border-border-default bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-body">
            <span className="text-xs font-semibold">Total Sessions</span>
            <div className="w-8 h-8 rounded-xl bg-primary-subtle flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="font-serif text-2xl md:text-3xl font-bold text-primary font-numeric">
            {sessions.length}
          </p>
          <p className="text-[11px] text-body">All-time tracked 1:1 and trial sessions</p>
        </div>

        {/* Card 4: Active Faculty Count */}
        <div className="rounded-2xl border border-border-default bg-white p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-body">
            <span className="text-xs font-semibold">Instructors Tracked</span>
            <div className="w-8 h-8 rounded-xl bg-accent-subtle flex items-center justify-center">
              <Users className="w-4 h-4 text-accent-dark" />
            </div>
          </div>
          <p className="font-serif text-2xl md:text-3xl font-bold text-heading font-numeric">
            {uniqueTeachers.length}
          </p>
          <p className="text-[11px] text-body">Active instructors with session bookings</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-border-default bg-white overflow-hidden shadow-xs space-y-4 p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-border-default/60">
          <div>
            <h2 className="font-serif text-lg font-bold text-heading">
              Faculty Session Payouts Ledger
            </h2>
            <p className="text-xs text-body">
              Search by Session ID or filter by instructor to disburse session fees and view payment coordinates.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Teacher Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-body">
              <label htmlFor="teacherFilter" className="font-semibold text-heading shrink-0">
                Instructor:
              </label>
              <select
                id="teacherFilter"
                value={teacherFilter}
                onChange={(e) => setTeacherFilter(e.target.value)}
                className="rounded-xl border border-border-default bg-neutral-50 px-3 py-1.5 text-xs text-heading focus:outline-none focus:border-primary focus:bg-white shadow-2xs"
              >
                <option value="ALL">All Instructors ({uniqueTeachers.length})</option>
                {uniqueTeachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-border-default text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStatusFilter("ALL")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  statusFilter === "ALL"
                    ? "bg-white text-heading shadow-xs font-bold"
                    : "text-body hover:text-heading"
                }`}
              >
                All ({sessions.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("UNPAID")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  statusFilter === "UNPAID"
                    ? "bg-white text-amber-800 shadow-xs font-bold"
                    : "text-body hover:text-heading"
                }`}
              >
                Unpaid ({unpaidCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("PAID")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  statusFilter === "PAID"
                    ? "bg-white text-emerald-800 shadow-xs font-bold"
                    : "text-body hover:text-heading"
                }`}
              >
                Paid ({paidCount})
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-body/50 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Session ID (e.g. GS-LSN-XXXX), teacher name, student, or bank UTR..."
            className="w-full rounded-xl bg-neutral-50/60 border border-border-default pl-10 pr-4 py-2.5 text-xs text-heading placeholder-body/50 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-body hover:text-heading font-medium cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-5 -mb-5">
          <table className="w-full text-left text-xs text-body border-collapse min-w-[850px]">
            <thead className="bg-bg-alt/30 border-y border-border-default text-[11px] font-bold text-heading uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Session ID</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Instructor</th>
                <th className="py-3 px-4">Student & Class</th>
                <th className="py-3 px-4 text-right">Fee Rate</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default/60">
              {filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-body text-xs">
                    {searchQuery
                      ? `No sessions found matching "${searchQuery}".`
                      : "No sessions recorded in this filter view."}
                  </td>
                </tr>
              ) : (
                filteredSessions.map((session) => {
                  const isPaid = session.payoutStatus === "PAID";
                  const isCancelled = session.lessonStatus === "CANCELLED";

                  return (
                    <tr
                      key={session.id}
                      className="hover:bg-neutral-50/70 transition-colors group"
                    >
                      {/* Session ID */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-heading bg-neutral-100 group-hover:bg-white px-2 py-0.5 rounded border border-border-default shadow-2xs">
                            {session.trackingCode}
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(session.trackingCode, session.id)}
                            className="p-1 rounded text-body/50 hover:text-heading hover:bg-neutral-100 transition-colors cursor-pointer"
                            title="Copy Session ID"
                          >
                            {copiedId === session.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-3.5 px-4 font-numeric text-heading">
                        <div>{session.dateFormatted}</div>
                        <span className="text-[10px] text-body/70 capitalize">
                          {session.durationMinutes}m • {session.lessonStatus.toLowerCase()}
                        </span>
                      </td>

                      {/* Instructor */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-heading">{session.teacherName}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          {session.teacherUpiId ? (
                            <span
                              className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200"
                              title={`UPI: ${session.teacherUpiId}`}
                            >
                              UPI Active
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                              No UPI
                            </span>
                          )}
                          {session.teacherQrUrl && (
                            <span className="text-[10px] text-primary bg-primary-subtle px-1.5 py-0.2 rounded border border-primary/20 flex items-center gap-0.5">
                              <QrCode className="w-2.5 h-2.5" /> QR
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Student & Class */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-heading">{session.studentName}</p>
                        <p className="text-[11px] text-body/70 truncate max-w-[180px]">
                          {session.courseTitle}
                        </p>
                      </td>

                      {/* Fee Rate */}
                      <td className="py-3.5 px-4 text-right font-numeric font-bold text-heading">
                        ₹{session.payoutRateRupees.toLocaleString("en-IN")}
                      </td>

                      {/* Payout Status */}
                      <td className="py-3.5 px-4 text-center">
                        {isCancelled ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-600 border border-neutral-200">
                            Cancelled
                          </span>
                        ) : isPaid ? (
                          <div className="inline-flex flex-col items-center gap-0.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              PAID
                            </span>
                            {session.payoutTransactionId && (
                              <span
                                className="text-[9px] font-mono text-emerald-700 max-w-[120px] truncate"
                                title={`Ref: ${session.payoutTransactionId}`}
                              >
                                {session.payoutTransactionId}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
                            <Clock className="w-3 h-3 text-amber-600" />
                            UNPAID
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-5 text-right">
                        {isPaid ? (
                          <button
                            type="button"
                            onClick={() => handleOpenPayModal(session)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-default bg-white hover:bg-neutral-50 text-xs font-semibold text-heading transition-all shadow-xs cursor-pointer active:scale-95"
                          >
                            <CreditCard className="w-3.5 h-3.5 text-accent" />
                            <span>View / Edit</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenPayModal(session)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Pay Teacher</span>
                          </button>
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

      {/* Pay Teacher Modal Pop-up */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-border-default shadow-2xl p-6 sm:p-7 space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border-default pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-sans">
                  Institutional Transfer
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-heading">
                  Disburse Teacher Remuneration
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-body">Session ID:</span>
                  <span className="font-mono text-xs font-bold text-primary bg-primary-subtle px-2 py-0.5 rounded border border-primary/20">
                    {selectedSession.trackingCode}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full border border-border-default/60 flex items-center justify-center text-body/60 hover:text-heading hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error & Success Messages */}
            {modalError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}
            {modalSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{modalSuccess}</span>
              </div>
            )}

            {/* Instructor & Session Overview Card */}
            <div className="p-4 rounded-2xl bg-neutral-50/70 border border-border-default/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-body/70 tracking-wider">
                  Instructor Recipient
                </p>
                <p className="font-serif text-base font-bold text-heading">
                  {selectedSession.teacherName}
                </p>
                <p className="text-xs text-body">{selectedSession.teacherEmail}</p>
                <p className="text-[11px] text-body/70 mt-1">
                  Class: {selectedSession.courseTitle} • Student: {selectedSession.studentName}
                </p>
              </div>

              <div className="sm:text-right shrink-0">
                <p className="text-[10px] uppercase font-bold text-body/70 tracking-wider">
                  Amount Due
                </p>
                <p className="font-serif text-2xl font-bold text-emerald-700 font-numeric">
                  ₹{customAmountRupees.toLocaleString("en-IN")}
                </p>
                <p className="text-[10px] text-body/70 font-numeric">
                  {selectedSession.durationMinutes}m Session Fee
                </p>
              </div>
            </div>

            {/* Teacher's Remuneration Coordinates (UPI ID & Payment QR) */}
            <div className="rounded-2xl border-2 border-primary/20 bg-primary-subtle/20 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-heading flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span>Teacher Payout Coordinates (UPI & QR)</span>
                </h4>
                {selectedSession.teacherUpiId ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    UPI Active
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    No UPI Configured
                  </span>
                )}
              </div>

              {/* UPI ID Field with 1-click Copy */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-body block mb-1">
                  Teacher UPI ID
                </label>
                {selectedSession.teacherUpiId ? (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-heading bg-white px-3 py-2 rounded-xl border border-border-default shadow-xs select-all flex-1">
                      {selectedSession.teacherUpiId}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(selectedSession.teacherUpiId || "", "modal-upi")
                      }
                      className="px-3 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      {copiedId === "modal-upi" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy UPI</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-800">
                    Instructor has not configured their UPI ID in their profile yet. You may disburse via bank or request their details.
                  </div>
                )}
              </div>

              {/* Payment QR Code */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-body block mb-1">
                  Payment QR Code
                </label>
                {selectedSession.teacherQrUrl ? (
                  <div className="p-3 rounded-2xl bg-white border border-border-default flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href={selectedSession.teacherQrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-32 h-32 sm:w-36 sm:h-36 rounded-xl border-2 border-primary/30 p-1 overflow-hidden bg-white hover:border-primary transition-all shrink-0 shadow-sm"
                      title="Click to view full size QR code"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedSession.teacherQrUrl}
                        alt="Teacher Payment QR Code"
                        className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform"
                      />
                    </a>
                    <div className="space-y-1.5 text-center sm:text-left">
                      <p className="text-xs font-bold text-heading">
                        Scan to Pay with Any UPI App
                      </p>
                      <p className="text-[11px] text-body leading-relaxed">
                        Open Google Pay, PhonePe, Paytm, or BHIM on your mobile phone to scan this verified instructor QR code.
                      </p>
                      <a
                        href={selectedSession.teacherQrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline mt-1"
                      >
                        <span>Open Full Size QR</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-neutral-100/70 border border-neutral-200 text-xs text-body italic">
                    Instructor has not uploaded a payment QR code image.
                  </div>
                )}
              </div>
            </div>

            {/* Payout Confirmation Inputs */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-heading">
                Step 2: Confirm Transaction Audit Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Disbursed Amount */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-body">
                    Amount Paid (₹)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={20000}
                    step={50}
                    value={customAmountRupees}
                    onChange={(e) => setCustomAmountRupees(Number(e.target.value))}
                    className="w-full rounded-xl bg-white border border-border-default px-3 py-2 text-xs text-heading font-numeric focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                  />
                </div>

                {/* Bank / UTR Reference ID */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-body">
                    Bank UTR / Transaction Ref ID
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. 426819203948 or UPI/123456789"
                    className="w-full rounded-xl bg-white border border-border-default px-3 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                  />
                </div>
              </div>

              {/* Note / Remark */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-body">
                  Payout Note / Remarks (Optional)
                </label>
                <input
                  type="text"
                  value={payoutNotes}
                  onChange={(e) => setPayoutNotes(e.target.value)}
                  placeholder="e.g. Disbursed via PhonePe institutional account"
                  className="w-full rounded-xl bg-white border border-border-default px-3 py-2 text-xs text-heading focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-border-default flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
              {selectedSession.payoutStatus === "PAID" ? (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleConfirmPayout("UNPAID")}
                  className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPending ? "Reverting..." : "Revert to UNPAID"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2.5 rounded-xl border border-border-default bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-heading transition-all cursor-pointer"
                >
                  Cancel
                </button>
              )}

              <div className="flex items-center gap-2 justify-end">
                {selectedSession.payoutStatus === "PAID" && (
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl border border-border-default bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-heading transition-all cursor-pointer"
                  >
                    Close
                  </button>
                )}
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleConfirmPayout("PAID")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs hover:shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Payout...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {selectedSession.payoutStatus === "PAID"
                          ? "Update Payout Details"
                          : "Confirm & Mark as PAID"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
