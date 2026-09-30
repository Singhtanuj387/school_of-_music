"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveAvailabilityRulesAction } from "@/actions/teacher";
import { AvailabilityRuleItem } from "@/schemas/teacher";
import { Clock, CheckCircle2, AlertCircle, Plus, X } from "lucide-react";

const DAYS_OF_WEEK = [
  { day: 1, label: "Monday", short: "Mon" },
  { day: 2, label: "Tuesday", short: "Tue" },
  { day: 3, label: "Wednesday", short: "Wed" },
  { day: 4, label: "Thursday", short: "Thu" },
  { day: 5, label: "Friday", short: "Fri" },
  { day: 6, label: "Saturday", short: "Sat" },
  { day: 0, label: "Sunday", short: "Sun" },
];

/** Convert minutes from midnight to HH:MM string */
export function minutesToTimeString(minutes: number): string {
  const clamped = Math.max(0, Math.min(1439, minutes));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

/** Convert HH:MM string to minutes from midnight */
export function timeStringToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return 0;
  return h * 60 + m;
}

interface WeeklyScheduleEditorProps {
  initialRules: AvailabilityRuleItem[];
  timezone: string;
  onSaved?: () => void;
}

export function WeeklyScheduleEditor({
  initialRules,
  timezone,
  onSaved,
}: WeeklyScheduleEditorProps) {
  const [rules, setRules] = useState<AvailabilityRuleItem[]>(initialRules);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Group rules by day
  const getRulesForDay = (day: number) =>
    rules.filter((r) => r.dayOfWeek === day);

  const isDayEnabled = (day: number) => getRulesForDay(day).length > 0;

  // Toggle a day: if off, enable with default 9:00 AM to 5:00 PM (540 to 1020)
  const toggleDay = (day: number) => {
    if (isDayEnabled(day)) {
      setRules((prev) => prev.filter((r) => r.dayOfWeek !== day));
    } else {
      setRules((prev) => [
        ...prev,
        { dayOfWeek: day, startMinute: 540, endMinute: 1020 },
      ]);
    }
  };

  const addTimeWindow = (day: number) => {
    const dayRules = getRulesForDay(day);
    let start = 540;
    let end = 1020;
    if (dayRules.length > 0) {
      const last = dayRules[dayRules.length - 1];
      start = Math.min(1380, last.endMinute + 60); // 1 hr break
      end = Math.min(1440, start + 180);
    }
    setRules((prev) => [...prev, { dayOfWeek: day, startMinute: start, endMinute: end }]);
  };

  const removeTimeWindow = (day: number, index: number) => {
    setRules((prev) => {
      let seen = 0;
      return prev.filter((r) => {
        if (r.dayOfWeek === day) {
          if (seen === index) {
            seen++;
            return false;
          }
          seen++;
        }
        return true;
      });
    });
  };

  const updateTimeWindow = (
    day: number,
    index: number,
    field: "startMinute" | "endMinute",
    timeStr: string,
  ) => {
    const minutes = timeStringToMinutes(timeStr);
    setRules((prev) => {
      let seen = 0;
      return prev.map((r) => {
        if (r.dayOfWeek === day) {
          if (seen === index) {
            seen++;
            return { ...r, [field]: minutes };
          }
          seen++;
        }
        return r;
      });
    });
  };

  // Presets
  const applyWeekdays9to5 = () => {
    const newRules: AvailabilityRuleItem[] = [];
    for (let day = 1; day <= 5; day++) {
      newRules.push({ dayOfWeek: day, startMinute: 540, endMinute: 1020 });
    }
    setRules(newRules);
  };

  const applyWeekdays10to6 = () => {
    const newRules: AvailabilityRuleItem[] = [];
    for (let day = 1; day <= 5; day++) {
      newRules.push({ dayOfWeek: day, startMinute: 600, endMinute: 1080 });
    }
    setRules(newRules);
  };

  const copyMondayToWeekdays = () => {
    const mondayRules = getRulesForDay(1);
    if (mondayRules.length === 0) {
      setStatusMessage({
        type: "error",
        text: "Monday has no time windows set to copy.",
      });
      return;
    }
    setRules((prev) => {
      const nonWeekday = prev.filter((r) => r.dayOfWeek === 0 || r.dayOfWeek === 6);
      const copied: AvailabilityRuleItem[] = [];
      for (let day = 1; day <= 5; day++) {
        for (const mr of mondayRules) {
          copied.push({ dayOfWeek: day, startMinute: mr.startMinute, endMinute: mr.endMinute });
        }
      }
      return [...nonWeekday, ...copied];
    });
  };

  const clearAll = () => {
    setRules([]);
  };

  const handleSave = () => {
    setStatusMessage(null);
    startTransition(async () => {
      const res = await saveAvailabilityRulesAction(rules);
      if (res.success) {
        setStatusMessage({
          type: "success",
          text: res.message || "Schedule saved successfully!",
        });
        router.refresh();
        if (onSaved) onSaved();
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || "Failed to save schedule.",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Timezone Notice & Presets Bar */}
      <div className="flex flex-col gap-4 rounded-xl border border-border-default bg-bg-alt/30 p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
        <div className="flex items-center gap-2 text-xs text-body">
          <Clock className="h-4 w-4 text-primary" />
          <span>Teaching Timezone:</span>
          <span className="font-semibold text-heading font-numeric">{timezone}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-body/70">Presets:</span>
          <button
            type="button"
            onClick={applyWeekdays9to5}
            className="rounded-lg border border-border-default bg-white px-2.5 py-1 text-xs font-semibold text-heading hover:bg-neutral-50 shadow-xs transition-colors active:scale-[0.98]"
          >
            Mon-Fri 9-5
          </button>
          <button
            type="button"
            onClick={applyWeekdays10to6}
            className="rounded-lg border border-border-default bg-white px-2.5 py-1 text-xs font-semibold text-heading hover:bg-neutral-50 shadow-xs transition-colors active:scale-[0.98]"
          >
            Mon-Fri 10-6
          </button>
          <button
            type="button"
            onClick={copyMondayToWeekdays}
            className="rounded-lg border border-border-default bg-white px-2.5 py-1 text-xs font-semibold text-heading hover:bg-neutral-50 shadow-xs transition-colors active:scale-[0.98]"
          >
            Copy Mon to Weekdays
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors active:scale-[0.98]"
          >
            Clear All
          </button>
        </div>
      </div>

      {statusMessage && (
        <div
          role="alert"
          className={`rounded-xl border p-3.5 text-xs font-semibold flex items-center gap-2 ${
            statusMessage.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Days Grid */}
      <div className="space-y-3">
        {DAYS_OF_WEEK.map(({ day, label }) => {
          const enabled = isDayEnabled(day);
          const dayRules = getRulesForDay(day);

          return (
            <div
              key={day}
              className={`rounded-xl border p-4 transition-all ${
                enabled
                  ? "border-border-default bg-white shadow-xs"
                  : "border-neutral-200 bg-neutral-50/50 opacity-60"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Day Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`day-toggle-${day}`}
                    checked={enabled}
                    onChange={() => toggleDay(day)}
                    className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary accent-primary"
                  />
                  <label
                    htmlFor={`day-toggle-${day}`}
                    className="cursor-pointer font-semibold text-heading text-sm"
                  >
                    {label}
                  </label>
                </div>

                {/* Time windows */}
                {enabled ? (
                  <div className="flex flex-col gap-2 sm:items-end">
                    {dayRules.map((rule, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="time"
                          value={minutesToTimeString(rule.startMinute)}
                          onChange={(e) =>
                            updateTimeWindow(
                              day,
                              idx,
                              "startMinute",
                              e.target.value,
                            )
                          }
                          className="rounded-lg border border-border-default bg-white px-2.5 py-1 text-xs text-heading font-numeric focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs focus:outline-none"
                        />
                        <span className="text-body text-xs font-medium">to</span>
                        <input
                          type="time"
                          value={minutesToTimeString(rule.endMinute)}
                          onChange={(e) =>
                            updateTimeWindow(
                              day,
                              idx,
                              "endMinute",
                              e.target.value,
                            )
                          }
                          className="rounded-lg border border-border-default bg-white px-2.5 py-1 text-xs text-heading font-numeric focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-xs focus:outline-none"
                        />
                        {dayRules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTimeWindow(day, idx)}
                            className="text-body/50 hover:text-red-600 p-1 transition-colors"
                            title="Remove window"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addTimeWindow(day)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark mt-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add time window</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-body/60 italic">Unavailable</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="rounded-xl bg-primary hover:bg-primary-dark px-6 py-2.5 text-xs font-bold text-white shadow-xs transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {isPending ? "Saving schedule..." : "Save Availability Schedule"}
        </button>
      </div>
    </div>
  );
}
