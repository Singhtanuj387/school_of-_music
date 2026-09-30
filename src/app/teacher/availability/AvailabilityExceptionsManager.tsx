"use client";

import { useState, useTransition } from "react";
import {
  addAvailabilityExceptionAction,
  deleteAvailabilityExceptionAction,
} from "@/actions/teacher";
import { CheckCircle2, AlertCircle, Calendar, Plus, Trash2 } from "lucide-react";

interface ExceptionItem {
  id: string;
  date: string;
  isBlocked: boolean;
  startMinute?: number | null;
  endMinute?: number | null;
}

interface AvailabilityExceptionsManagerProps {
  initialExceptions: ExceptionItem[];
}

export function AvailabilityExceptionsManager({
  initialExceptions,
}: AvailabilityExceptionsManagerProps) {
  const [exceptions, setExceptions] = useState<ExceptionItem[]>(initialExceptions);
  const [date, setDate] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleAddException = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    setMessage(null);
    const formData = new FormData();
    formData.append("date", date);
    formData.append("isBlocked", "true");

    startTransition(async () => {
      const res = await addAvailabilityExceptionAction(null, formData);
      if (res.success) {
        setMessage({ type: "success", text: "Exception date added!" });
        setExceptions((prev) => [
          ...prev,
          { id: Math.random().toString(), date, isBlocked: true },
        ]);
        setDate("");
      } else {
        setMessage({
          type: "error",
          text: res.error || "Failed to add date exception.",
        });
      }
    });
  };

  const handleDelete = (id: string) => {
    setMessage(null);
    startTransition(async () => {
      const res = await deleteAvailabilityExceptionAction(id);
      if (res.success) {
        setExceptions((prev) => prev.filter((e) => e.id !== id));
        setMessage({ type: "success", text: "Exception removed." });
      } else {
        setMessage({ type: "error", text: "Failed to remove exception." });
      }
    });
  };

  return (
    <div className="space-y-6">
      {message && (
        <div
          role="alert"
          className={`rounded-xl border p-3.5 text-xs font-semibold flex items-center gap-2 ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Add Date Form */}
      <form
        onSubmit={handleAddException}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label
            htmlFor="exceptionDate"
            className="block text-xs font-semibold uppercase tracking-wider text-body mb-1"
          >
            Block a specific date
          </label>
          <input
            id="exceptionDate"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full rounded-xl border border-border-default bg-white px-3.5 py-2 text-xs text-heading font-numeric focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || !date}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border-default bg-white hover:bg-neutral-50 px-5 py-2.5 text-xs font-bold text-heading shadow-xs transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5 text-primary" />
          <span>{isPending ? "Adding..." : "Block Date"}</span>
        </button>
      </form>

      {/* List of exceptions */}
      <div className="space-y-2 pt-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-body">
          Current Blocked Dates
        </h3>

        {exceptions.length === 0 ? (
          <p className="text-xs text-body/60 italic bg-neutral-50/60 border border-dashed border-border-default rounded-xl p-4 text-center">
            No holiday or date blocks configured.
          </p>
        ) : (
          <div className="divide-y divide-border-default/60 rounded-xl border border-border-default bg-white shadow-xs overflow-hidden">
            {exceptions.map((exc) => (
              <div
                key={exc.id}
                className="flex items-center justify-between p-3.5 text-xs hover:bg-neutral-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                  <span className="font-bold text-heading font-numeric">{exc.date}</span>
                  <span className="text-[11px] text-body">
                    {exc.isBlocked ? "(Full Day Blocked)" : "(Custom hours)"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(exc.id)}
                  className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
