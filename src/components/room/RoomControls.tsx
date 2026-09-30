"use client";

import { useState } from "react";
import { AudioMode } from "@/lib/audio-engine";

interface RoomControlsProps {
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
  audioMode: AudioMode;
  isSwitchingAudioMode: boolean;
  isMultiCamActive?: boolean;
  onOpenMultiCam?: () => void;
  isChatOpen?: boolean;
  unreadChatCount?: number;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  onToggleScreenShare: () => void;
  onSwitchAudioMode: (targetMode: AudioMode) => void;
  onToggleChat?: () => void;
  onLeave: () => void;
}

export function RoomControls({
  isMuted,
  isVideoOff,
  isScreenSharing,
  audioMode,
  isSwitchingAudioMode,
  isMultiCamActive = false,
  onOpenMultiCam,
  isChatOpen = false,
  unreadChatCount = 0,
  onToggleMic,
  onToggleVideo,
  onToggleScreenShare,
  onSwitchAudioMode,
  onToggleChat,
  onLeave,
}: RoomControlsProps) {
  const [showHeadphoneTip, setShowHeadphoneTip] = useState(false);

  const handleAudioModeToggle = () => {
    const nextMode = audioMode === "TALKING" ? "PLAYING" : "TALKING";
    if (nextMode === "PLAYING") {
      setShowHeadphoneTip(true);
    } else {
      setShowHeadphoneTip(false);
    }
    onSwitchAudioMode(nextMode);
  };

  return (
    <div className="relative">
      {/* Headphone Advisory Toast when switching to Instrument Mode */}
      {showHeadphoneTip && audioMode === "PLAYING" && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-40 bg-[#1B0C33]/98 border-0 text-stone-100 px-3.5 py-2 rounded-2xl text-xs shadow-2xl flex items-center gap-2.5 sm:gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 max-w-[92vw] sm:whitespace-nowrap">
          <span>🎧 Echo cancellation disabled for pure instrument tone. Wear headphones!</span>
          <button
            type="button"
            onClick={() => setShowHeadphoneTip(false)}
            className="text-accent hover:text-white font-bold p-1 ml-auto cursor-pointer border-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Control Bar - Zero White Borders */}
      <div className="bg-[#1A0B2E]/95 rounded-2xl p-1.5 sm:p-2.5 shadow-2xl backdrop-blur-md border-0 flex items-center justify-between gap-1 sm:gap-2 max-w-xl mx-auto w-full">
        {/* Left: Media Mutes */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mic */}
          <button
            type="button"
            onClick={onToggleMic}
            className={`p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-95 shadow-xs border-0 ${
              isMuted
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-sm"
                : "bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200"
            }`}
            title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {isMuted ? "🔇" : "🎙️"}
          </button>

          {/* Camera */}
          <button
            type="button"
            onClick={onToggleVideo}
            className={`p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-95 shadow-xs border-0 ${
              isVideoOff
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-sm"
                : "bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200"
            }`}
            title={isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
          >
            {isVideoOff ? "🚫" : "📹"}
          </button>

          {/* Multi-Cam Studio Director Button */}
          {onOpenMultiCam && (
            <button
              type="button"
              onClick={onOpenMultiCam}
              className={`relative p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-95 shadow-xs border-0 ${
                isMultiCamActive
                  ? "bg-gradient-to-r from-primary via-cta to-accent text-white shadow-md shadow-cta/30"
                  : "bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200"
              }`}
              title={
                isMultiCamActive
                  ? "Multi-Camera Active (2 Angles) • Click to Configure"
                  : "Multi-Camera Director • Add Secondary Camera Angle (Hands/Instrument)"
              }
            >
              <span>📷⁺</span>
              {isMultiCamActive && (
                <span className="absolute -top-1 -right-1 px-1 min-w-[16px] h-[16px] bg-accent text-white text-[9px] font-black rounded-full shadow-xs flex items-center justify-center">
                  2
                </span>
              )}
            </button>
          )}

          {/* Screen Share */}
          <button
            type="button"
            onClick={onToggleScreenShare}
            className={`p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-95 shadow-xs border-0 ${
              isScreenSharing
                ? "bg-cta text-white shadow-md shadow-cta/30"
                : "bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200"
            }`}
            title={isScreenSharing ? "Stop Sharing Screen" : "Share Sheet Music / Screen"}
          >
            🖥️
          </button>
        </div>

        {/* Center: Specialized Audio Mode Button */}
        <button
          type="button"
          onClick={handleAudioModeToggle}
          disabled={isSwitchingAudioMode}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-all shadow-sm shrink-0 cursor-pointer active:scale-95 border-0 ${
            audioMode === "PLAYING"
              ? "bg-accent text-white shadow-md shadow-accent/30 font-bold"
              : "bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200"
          }`}
          title="Toggle between Talking Mode (Speech Filters) and Instrument Mode (Raw 48kHz Stereo)"
        >
          {isSwitchingAudioMode ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin"></span>
              <span className="hidden sm:inline">Calibrating Audio...</span>
              <span className="sm:hidden">Calibrating...</span>
            </>
          ) : audioMode === "PLAYING" ? (
            <>
              <span>🎸</span>
              <span className="hidden sm:inline">Instrument Mode (48kHz)</span>
              <span className="sm:hidden">48kHz Pure</span>
            </>
          ) : (
            <>
              <span>💬</span>
              <span className="hidden sm:inline">Talking Mode</span>
              <span className="sm:hidden">Speech</span>
            </>
          )}
        </button>

        {/* Right: Studio Chat & Leave Call */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Live Studio Chat Button */}
          {onToggleChat && (
            <button
              type="button"
              onClick={onToggleChat}
              className={`relative p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer active:scale-95 shadow-xs border-0 ${
                isChatOpen
                  ? "bg-cta text-white shadow-md shadow-cta/35"
                  : "bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200"
              }`}
              title="Toggle Live Studio Chat"
            >
              💬
              {unreadChatCount > 0 && !isChatOpen && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-accent text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-md">
                  {unreadChatCount > 9 ? "9+" : unreadChatCount}
                </span>
              )}
            </button>
          )}

          {/* Leave Call */}
          <button
            type="button"
            onClick={onLeave}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] sm:text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95 ml-1 border-0"
          >
            <span>Leave</span>
            <span>✕</span>
          </button>
        </div>
      </div>
    </div>
  );
}
