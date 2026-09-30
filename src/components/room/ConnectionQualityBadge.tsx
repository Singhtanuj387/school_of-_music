"use client";

import { ConnectionQuality } from "livekit-client";

interface ConnectionQualityBadgeProps {
  quality: ConnectionQuality;
  isReconnecting: boolean;
  onTurnOffVideo?: () => void;
}

export function ConnectionQualityBadge({
  quality,
  isReconnecting,
  onTurnOffVideo,
}: ConnectionQualityBadgeProps) {
  let color = "bg-emerald-500";
  let label = "Excellent";

  if (quality === ConnectionQuality.Good) {
    color = "bg-emerald-400";
    label = "Good";
  } else if (quality === ConnectionQuality.Poor) {
    color = "bg-amber-400";
    label = "Poor";
  } else if (quality === ConnectionQuality.Lost) {
    color = "bg-rose-500 animate-ping";
    label = "Disconnected";
  }

  return (
    <>
      {/* Reconnecting Persistent Alert Banner */}
      {isReconnecting && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#2D0F08]/95 text-amber-200 px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs font-semibold animate-pulse ring-1 ring-amber-500/50">
          <span className="w-2.5 h-2.5 rounded-full bg-cta animate-ping"></span>
          <span>Connection unstable, recovering audio pipe... Please hold on.</span>
        </div>
      )}

      {/* Degradation Warning Banner */}
      {!isReconnecting && quality === ConnectionQuality.Poor && onTurnOffVideo && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 bg-[#161226]/95 text-stone-200 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs ring-1 ring-amber-500/40">
          <span>⚠️ Low network bandwidth detected.</span>
          <button
            type="button"
            onClick={onTurnOffVideo}
            className="px-3 py-1 bg-cta hover:bg-orange-600 text-white font-bold rounded-xl text-[11px] transition-all active:scale-95 cursor-pointer shadow-md shadow-orange-950/40"
          >
            Turn off video to prioritize audio
          </button>
        </div>
      )}

      {/* Compact Badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#161226] text-[11px] text-stone-300 font-mono shadow-sm">
        <span className={`w-2 h-2 rounded-full ${color}`}></span>
        <span>{label}</span>
      </div>
    </>
  );
}
