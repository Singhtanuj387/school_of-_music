"use client";

import { useState, useTransition } from "react";
import { registerForEventAction, cancelEventRegistrationAction } from "@/actions/events";
import { EventType } from "@prisma/client";
import { Calendar, Clock, Users, Sparkles, Check, Loader2, GraduationCap } from "lucide-react";

export type EventItem = {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startsAt: string; // ISO
  durationMinutes: number;
  capacity?: number | null;
  registeredCount: number;
  isRegistered: boolean;
  formattedDate: string;
  formattedTime: string;
  timezoneAbbr: string;
  teacherName?: string | null;
  teacherInstruments?: string[];
};

export function EventCard({ event }: { event: EventItem }) {
  const [isRegistered, setIsRegistered] = useState(event.isRegistered);
  const [registeredCount, setRegisteredCount] = useState(event.registeredCount);
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isFull = event.capacity !== null && event.capacity !== undefined && registeredCount >= event.capacity;

  const handleToggleRegistration = () => {
    setErrorMsg(null);
    startTransition(async () => {
      if (isRegistered) {
        const res = await cancelEventRegistrationAction(event.id);
        if (res.success) {
          setIsRegistered(false);
          setRegisteredCount((c) => Math.max(0, c - 1));
        } else {
          setErrorMsg(res.error || "Failed to cancel registration.");
        }
      } else {
        const res = await registerForEventAction(event.id);
        if (res.success) {
          setIsRegistered(true);
          setRegisteredCount((c) => c + 1);
        } else {
          setErrorMsg(res.error || "Failed to register.");
        }
      }
    });
  };

  const typeBadgeColors: Record<EventType, string> = {
    WORKSHOP: "bg-accent-subtle text-accent-dark border-accent/30 font-bold",
    MASTERCLASS: "bg-primary-subtle text-primary border-primary/30 font-bold",
    RECITAL: "bg-bg-alt text-cta border-cta/30 font-bold",
    EXAM_PREP: "bg-info-muted text-info border-info/30 font-bold",
  };

  return (
    <div className="p-6 rounded-3xl border border-border-default bg-white shadow-sm space-y-4 hover:border-cta/40 hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs border ${
              typeBadgeColors[event.type]
            }`}
          >
            {event.type.replace("_", " ")}
          </span>

          <div className="flex items-center gap-1.5 text-xs text-body-muted font-medium">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span>
              {registeredCount}
              {event.capacity ? ` / ${event.capacity}` : ""} registered
            </span>
          </div>
        </div>

        <h3 className="font-serif text-xl font-bold text-heading group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <p className="text-xs text-body leading-relaxed line-clamp-3">
          {event.description}
        </p>

        {event.teacherName && (
          <div className="flex items-center gap-1.5 text-xs text-primary font-semibold p-2 rounded-xl bg-primary-subtle/50 border border-primary/15">
            <GraduationCap className="w-3.5 h-3.5 text-accent-dark shrink-0" />
            <span>Faculty Mentor: <strong className="text-heading font-bold">{event.teacherName}</strong></span>
            {event.teacherInstruments && event.teacherInstruments.length > 0 && (
              <span className="text-body-muted text-[11px] font-normal truncate">
                • {event.teacherInstruments.slice(0, 2).join(", ")}
              </span>
            )}
          </div>
        )}

        {/* Schedule Pill Grid */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-heading font-medium">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-bg-alt/40 border border-border-subtle">
            <Calendar className="w-3.5 h-3.5 text-accent-dark shrink-0" />
            <span className="truncate">{event.formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-bg-alt/40 border border-border-subtle">
            <Clock className="w-3.5 h-3.5 text-cta shrink-0" />
            <span className="truncate">
              {event.formattedTime} ({event.durationMinutes}m)
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-danger-muted border border-danger/25 text-xs text-danger-dark font-medium">
            {errorMsg}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border-subtle flex items-center justify-between gap-3">
        {isRegistered ? (
          <div className="flex items-center justify-between w-full">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-success">
              <Check className="w-4 h-4" /> You are registered
            </span>
            <button
              onClick={handleToggleRegistration}
              disabled={isPending}
              className="text-xs text-body-muted hover:text-danger transition-colors btn-tactile cursor-pointer"
            >
              {isPending ? "Cancelling..." : "Cancel registration"}
            </button>
          </div>
        ) : isFull ? (
          <button
            disabled
            className="w-full py-2.5 px-4 rounded-xl bg-bg-alt text-body-muted text-xs font-semibold cursor-not-allowed border border-border-subtle"
          >
            Registration Full (Capacity Reached)
          </button>
        ) : (
          <button
            onClick={handleToggleRegistration}
            disabled={isPending}
            className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-active text-white font-bold text-xs transition-all shadow-sm shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 btn-tactile cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Registering...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> Reserve Free Seat
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
