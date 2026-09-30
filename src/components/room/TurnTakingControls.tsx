"use client";

import { useLocalParticipant } from "@livekit/components-react";

export type TurnTakingState =
  | "TEACHER_PLAYING"
  | "STUDENT_PLAYING"
  | "DISCUSSION";

interface TurnTakingControlsProps {
  isTeacher: boolean;
  activeState: TurnTakingState;
  onStateChange: (newState: TurnTakingState) => void;
}

export function TurnTakingControls({
  isTeacher,
  activeState,
  onStateChange,
}: TurnTakingControlsProps) {
  const { localParticipant } = useLocalParticipant();

  const broadcastState = (newState: TurnTakingState) => {
    onStateChange(newState);
    if (localParticipant) {
      const payload = new TextEncoder().encode(
        JSON.stringify({
          type: "TURN_TAKING_SIGNAL",
          state: newState,
        }),
      );
      localParticipant.publishData(payload, { reliable: true });
    }
  };

  return (
    <div className="flex items-center gap-2 bg-[#161226]/95 rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 backdrop-blur-md shadow-sm">
      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider hidden sm:inline font-mono">
        Floor:
      </span>

      {isTeacher ? (
        <div className="flex items-center gap-1 sm:gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => broadcastState("TEACHER_PLAYING")}
            className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold transition-all cursor-pointer active:scale-95 text-[11px] sm:text-xs shadow-sm ${
              activeState === "TEACHER_PLAYING"
                ? "bg-cta text-white shadow-md shadow-orange-950/50"
                : "bg-[#201A36] text-stone-300 hover:text-white"
            }`}
          >
            🎵 Demonstrating
          </button>
          <button
            type="button"
            onClick={() => broadcastState("STUDENT_PLAYING")}
            className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold transition-all cursor-pointer active:scale-95 text-[11px] sm:text-xs shadow-sm ${
              activeState === "STUDENT_PLAYING"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
                : "bg-[#201A36] text-stone-300 hover:text-white"
            }`}
          >
            🎯 Student&apos;s Turn
          </button>
          <button
            type="button"
            onClick={() => broadcastState("DISCUSSION")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer active:scale-95 text-[11px] sm:text-xs shadow-sm ${
              activeState === "DISCUSSION"
                ? "bg-primary text-white shadow-md shadow-purple-950/50"
                : "text-stone-400 hover:text-white"
            }`}
          >
            💬 Discuss
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
              activeState === "STUDENT_PLAYING"
                ? "bg-emerald-500/25 text-emerald-300 animate-pulse"
                : activeState === "TEACHER_PLAYING"
                ? "bg-amber-500/20 text-amber-300"
                : "bg-[#201A36] text-stone-300"
            }`}
          >
            {activeState === "STUDENT_PLAYING"
              ? "Your turn to perform!"
              : activeState === "TEACHER_PLAYING"
              ? "Teacher demonstrating"
              : "Discussion"}
          </span>

          {activeState !== "STUDENT_PLAYING" && (
            <button
              type="button"
              onClick={() => broadcastState("STUDENT_PLAYING")}
              className="px-2.5 py-1 rounded-lg bg-[#201A36] hover:bg-[#2A2346] text-stone-200 hover:text-white text-[11px] font-semibold transition-all cursor-pointer active:scale-95 shadow-sm"
            >
              Request to play
            </button>
          )}
        </div>
      )}
    </div>
  );
}
