"use client";

import { useState, useTransition } from "react";
import { LessonStatus, LessonSource } from "@prisma/client";
import { cancelLessonAdminAction } from "@/actions/admin";
import Link from "next/link";
import {
  Video,
  Search,
  Calendar,
  AlertCircle,
  XCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";

export interface AdminLessonItem {
  id: string;
  trackingCode: string;
  startsAt: string;
  formattedTime: string;
  durationMinutes: number;
  instrument: string;
  status: LessonStatus;
  lessonSource: LessonSource;
  teacherName: string;
  studentName: string;
  studentEmail: string;
}

export function AdminLessonsManager({
  initialLessons,
}: {
  initialLessons: AdminLessonItem[];
}) {
  const [lessons, setLessons] = useState<AdminLessonItem[]>(initialLessons);
  const [statusFilter, setStatusFilter] = useState<"ALL" | LessonStatus>("ALL");
  const [sourceFilter, setSourceFilter] = useState<"ALL" | LessonSource>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleCancelLesson = (lessonId: string, studentName: string) => {
    if (!confirm(`Cancel lesson with ${studentName}? This will restore the student's trial or course session quota.`)) {
      return;
    }

    startTransition(async () => {
      const res = await cancelLessonAdminAction(lessonId);
      if (!res.success) {
        alert(res.error || "Failed to cancel lesson.");
      } else {
        setLessons((prev) =>
          prev.map((l) =>
            l.id === lessonId ? { ...l, status: LessonStatus.CANCELLED } : l,
          ),
        );
      }
    });
  };

  const filteredLessons = lessons.filter((l) => {
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    const matchesSource = sourceFilter === "ALL" || l.lessonSource === sourceFilter;
    const matchesSearch =
      l.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.trackingCode.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSource && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-primary/10 shadow-xs">
            <button
              type="button"
              onClick={() => setStatusFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
                statusFilter === "ALL"
                  ? "bg-primary text-white shadow-xs"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter(LessonStatus.SCHEDULED)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
                statusFilter === LessonStatus.SCHEDULED
                  ? "bg-primary text-white shadow-xs"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              Scheduled
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter(LessonStatus.COMPLETED)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
                statusFilter === LessonStatus.COMPLETED
                  ? "bg-primary text-white shadow-xs"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              Completed
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter(LessonStatus.CANCELLED)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
                statusFilter === LessonStatus.CANCELLED
                  ? "bg-primary text-white shadow-xs"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white border border-primary/10 shadow-xs">
            <button
              type="button"
              onClick={() => setSourceFilter("ALL")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
                sourceFilter === "ALL"
                  ? "bg-accent text-white shadow-xs"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              All Types
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter(LessonSource.TRIAL)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
                sourceFilter === LessonSource.TRIAL
                  ? "bg-accent text-white shadow-xs"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              Trials
            </button>
            <button
              type="button"
              onClick={() => setSourceFilter(LessonSource.ENROLLMENT)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors active:scale-95 ${
                sourceFilter === LessonSource.ENROLLMENT
                  ? "bg-cta text-white shadow-xs"
                  : "text-body hover:text-heading hover:bg-bg-alt/30"
              }`}
            >
              Course Sessions
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student, teacher, instrument..."
            className="w-full rounded-xl bg-white border border-primary/15 pl-9 pr-3 py-2 text-xs text-heading placeholder:text-body/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-xs"
          />
        </div>
      </div>

      {/* Global Lessons Table */}
      <div className="rounded-2xl border border-primary/10 bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-primary/10 bg-bg-alt/25 text-heading font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Tracking ID</th>
                <th className="py-3.5 px-4 font-bold">Date & Time</th>
                <th className="py-3.5 px-4 font-bold">Session Type</th>
                <th className="py-3.5 px-4 font-bold">Faculty Instructor</th>
                <th className="py-3.5 px-4 font-bold">Student</th>
                <th className="py-3.5 px-4 font-bold">Discipline</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredLessons.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-body">
                    <AlertCircle className="w-6 h-6 text-body/40 mx-auto mb-2" />
                    No lessons found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLessons.map((l) => (
                  <tr
                    key={l.id}
                    className="hover:bg-bg-alt/15 transition-colors"
                  >
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-accent-dark text-[11px] bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                        {l.trackingCode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-heading font-medium whitespace-nowrap font-numeric">
                      {l.formattedTime}
                    </td>

                    <td className="py-3.5 px-4">
                      {l.lessonSource === "TRIAL" ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/15 text-accent-dark border border-accent/25">
                          Free Trial
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cta/10 text-cta border border-cta/25">
                          Course Session
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-heading whitespace-nowrap">
                      {l.teacherName}
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-heading whitespace-nowrap">{l.studentName}</p>
                      <p className="text-[10px] text-body">{l.studentEmail}</p>
                    </td>

                    <td className="py-3.5 px-4 text-body">
                      {l.instrument} ({l.durationMinutes}m)
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          l.status === "SCHEDULED"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : l.status === "COMPLETED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/lesson/${l.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-bg-alt/40 text-primary hover:bg-primary hover:text-white transition-all active:scale-95 shadow-2xs"
                          title="Open Classroom"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        {l.status === "SCHEDULED" && (
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleCancelLesson(l.id, l.studentName)}
                            className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors border border-rose-200 text-[11px] font-semibold active:scale-95"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
