"use client";

import { useSyncedTime } from "@/lib/synced-time";
import { JOIN_WINDOW_MINUTES_BEFORE } from "@/types";

interface LessonCountdownProps {
  startsAt: string; // ISO 8601 string
  initialServerTime?: number;
  className?: string;
}

export function LessonCountdown({
  startsAt,
  initialServerTime,
  className = "",
}: LessonCountdownProps) {
  const now = useSyncedTime(initialServerTime);


  const startsAtTime = new Date(startsAt).getTime();
  const earlyOpenTime = startsAtTime - JOIN_WINDOW_MINUTES_BEFORE * 60 * 1000;

  const msToStart = startsAtTime - now;
  const msToOpen = earlyOpenTime - now;

  // 1. Room is currently open!
  if (msToOpen <= 0) {
    if (msToStart <= 0) {
      return (
        <span className={`text-success font-semibold flex items-center gap-1.5 ${className}`}>
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          <span>In Progress</span>
        </span>
      );
    }

    const minutesToStart = Math.ceil(msToStart / 60000);
    return (
      <span className={`text-success font-semibold flex items-center gap-1.5 ${className}`}>
        <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
        <span>Room Open (starts in {minutesToStart}m)</span>
      </span>
    );
  }

  // 2. Room opens soon (under 60 minutes)
  const totalSeconds = Math.floor(msToOpen / 1000);
  if (totalSeconds < 3600) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return (
      <span className={`text-accent-dark font-medium ${className}`}>
        Room opens in {mins}m {secs.toString().padStart(2, "0")}s
      </span>
    );
  }

  // 3. More than 1 hour away
  const hours = Math.floor(msToStart / (1000 * 60 * 60));
  if (hours < 24) {
    return (
      <span className={`text-body-muted ${className}`}>
        Starts in ~{hours} hour{hours === 1 ? "" : "s"}
      </span>
    );
  }

  const days = Math.floor(hours / 24);
  return (
    <span className={`text-body-muted ${className}`}>
      In {days} day{days === 1 ? "" : "s"}
    </span>
  );
}
