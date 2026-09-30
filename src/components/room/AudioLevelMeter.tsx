"use client";

import { useEffect, useState } from "react";
import { createAudioLevelMeter } from "@/lib/audio-engine";

interface AudioLevelMeterProps {
  stream?: MediaStream | null;
  className?: string;
  showLabels?: boolean;
}

/**
 * Real-time VU meter component for checking microphone and instrument levels.
 * Features multi-segment meter (Green - Safe, Yellow - Nominal, Red - Clipping).
 */
export function AudioLevelMeter({
  stream,
  className = "",
  showLabels = false,
}: AudioLevelMeterProps) {
  const [rmsLevel, setRmsLevel] = useState(0);
  const [peakLevel, setPeakLevel] = useState(0);

  useEffect(() => {
    if (!stream || stream.getAudioTracks().length === 0) {
      setRmsLevel(0);
      setPeakLevel(0);
      return;
    }

    const cleanup = createAudioLevelMeter(stream, (rms, peak) => {
      setRmsLevel(rms);
      setPeakLevel(peak);
    });

    return cleanup;
  }, [stream]);

  // Total segments in the meter
  const segments = 24;
  const activeSegments = Math.round(rmsLevel * segments);
  const isClipping = peakLevel > 0.95;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between text-[10px] uppercase font-semibold tracking-wider text-stone-400">
          <span>Mic Input Level</span>
          <span className={isClipping ? "text-red-400 font-bold" : "text-stone-400"}>
            {isClipping ? "Peak Clipping!" : "Nominal"}
          </span>
        </div>
      )}

      {/* Segmented LED Bar */}
      <div className="flex items-center gap-0.5 h-2.5 bg-black/60 p-0.5 rounded-md">
        {Array.from({ length: segments }).map((_, i) => {
          const isActive = i < activeSegments;
          // Colors: first 14 green, next 6 yellow/amber, last 4 red
          let activeColor = "bg-emerald-500 shadow-sm shadow-emerald-500/50";
          if (i >= 18) {
            activeColor = "bg-red-500 shadow-sm shadow-red-500/50";
          } else if (i >= 13) {
            activeColor = "bg-amber-400 shadow-sm shadow-amber-400/50";
          }

          return (
            <div
              key={i}
              className={`flex-1 h-full rounded-xs transition-colors duration-75 ${
                isActive ? activeColor : "bg-stone-800/60"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
