"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Video, BookOpen, Disc, Sparkles, SlidersHorizontal } from "lucide-react";
import { releaseAllMediaDevices } from "@/lib/media-devices";
import { StudioCameraMonitor } from "./StudioCameraMonitor";
import { StudioRecorder } from "./StudioRecorder";
import { StudioMetronomeTuner } from "./StudioMetronomeTuner";
import { StudioSheetViewer } from "./StudioSheetViewer";
import { StudioRecordingsVault } from "./StudioRecordingsVault";

interface StudioWorkspaceProps {
  studentName: string;
}

type StudioViewTab = "live_studio" | "music_sheets" | "recordings_vault";

export function StudioWorkspace({ studentName }: StudioWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<StudioViewTab>("live_studio");
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [isDualSplitView, setIsDualSplitView] = useState(false);
  const [vaultRefreshTrigger, setVaultRefreshTrigger] = useState(0);

  const toggleCameraRef = useRef<(() => void) | null>(null);
  const toggleMicRef = useRef<(() => void) | null>(null);

  const handleToggleCamera = useCallback(() => {
    toggleCameraRef.current?.();
  }, []);

  const handleToggleMic = useCallback(() => {
    toggleMicRef.current?.();
  }, []);

  useEffect(() => {
    return () => {
      releaseAllMediaDevices();
    };
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Studio Top Navigation & Breadcrumb - No White Divider Line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link
              href="/student/dashboard"
              className="text-xs font-semibold text-body hover:text-heading flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-accent" />
              <span>Back to Dashboard</span>
            </Link>
            <span className="text-body-muted">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent-dark font-mono text-[10px] font-bold uppercase tracking-wider">
              Solo Practice &amp; Rehearsal
            </span>
          </div>

          <div className="flex items-center gap-2.5 pt-0.5">
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-heading tracking-tight">
              Solo Music Studio
            </h1>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Studio Ready" />
          </div>
          <p className="text-xs sm:text-sm text-body max-w-2xl leading-relaxed">
            Welcome, <strong className="text-heading font-semibold">{studentName}</strong>. Sing alone, rehearse with classical music sheets, lock in your tempo with the practice metronome &amp; Tanpura drone, and record your sessions.
          </p>
        </div>

        {/* Studio View Navigation Mode Pills - No White Borders */}
        <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl shadow-sm self-start sm:self-auto border-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab("live_studio");
              setIsDualSplitView(false);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 ${
              activeTab === "live_studio" && !isDualSplitView
                ? "bg-primary text-white shadow-xs"
                : "text-body hover:text-heading hover:bg-bg-alt/40"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Studio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("music_sheets")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 ${
              activeTab === "music_sheets"
                ? "bg-primary text-white shadow-xs"
                : "text-body hover:text-heading hover:bg-bg-alt/40"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sheets</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("recordings_vault");
              setIsDualSplitView(false);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 ${
              activeTab === "recordings_vault"
                ? "bg-primary text-white shadow-xs"
                : "text-body hover:text-heading hover:bg-bg-alt/40"
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            <span>Vault</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsDualSplitView((d) => !d);
              setActiveTab("live_studio");
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border-0 ${
              isDualSplitView
                ? "bg-accent text-white shadow-xs"
                : "text-body hover:text-heading hover:bg-bg-alt/40"
            }`}
            title="Split-screen: Rehearse with Sheet Music alongside your live camera monitor"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Split Screen</span>
          </button>
        </div>
      </div>

      {/* Main Studio Work Area */}
      {isDualSplitView ? (
        /* Dual View Mode: Left = Camera + Recorder; Right = Sheet Music */
        <div className="space-y-6">
          <div className="flex items-center justify-between px-1 text-xs text-body">
            <span className="flex items-center gap-1.5 text-accent-dark font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Dual Rehearsal Mode (Camera Monitor + Music Sheet)
            </span>
            <button
              type="button"
              onClick={() => setIsDualSplitView(false)}
              className="text-primary hover:underline font-semibold cursor-pointer border-0"
            >
              Exit Split Screen
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Live Camera & Recorder & Tools (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <StudioCameraMonitor
                onMediaStreamReady={setMediaStream}
                isRecording={isRecordingActive}
                isVideoOff={isVideoOff}
                isMicMuted={isMicMuted}
                onCameraStateChange={setIsVideoOff}
                onMicStateChange={setIsMicMuted}
                toggleCameraRef={toggleCameraRef}
                toggleMicRef={toggleMicRef}
              />
              <StudioRecorder
                mediaStream={mediaStream}
                isVideoOff={isVideoOff}
                isMicMuted={isMicMuted}
                onToggleCamera={handleToggleCamera}
                onToggleMic={handleToggleMic}
                onRecordingStateChange={setIsRecordingActive}
                onTakeSaved={() => setVaultRefreshTrigger((prev) => prev + 1)}
              />
              <StudioMetronomeTuner />
            </div>

            {/* Right Column: Sheet Music Viewer (7 cols) */}
            <div className="lg:col-span-7">
              <StudioSheetViewer
                isDualView={true}
                onDualViewToggle={() => setIsDualSplitView(false)}
              />
            </div>
          </div>
        </div>
      ) : activeTab === "live_studio" ? (
        /* Standard Studio View Mode */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Main: Camera Viewport + Recorder (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <StudioCameraMonitor
                onMediaStreamReady={setMediaStream}
                isRecording={isRecordingActive}
                isVideoOff={isVideoOff}
                isMicMuted={isMicMuted}
                onCameraStateChange={setIsVideoOff}
                onMicStateChange={setIsMicMuted}
                toggleCameraRef={toggleCameraRef}
                toggleMicRef={toggleMicRef}
              />
              <StudioRecorder
                mediaStream={mediaStream}
                isVideoOff={isVideoOff}
                isMicMuted={isMicMuted}
                onToggleCamera={handleToggleCamera}
                onToggleMic={handleToggleMic}
                onRecordingStateChange={setIsRecordingActive}
                onTakeSaved={() => setVaultRefreshTrigger((prev) => prev + 1)}
              />
            </div>

            {/* Right Side: Metronome & Tanpura Drone (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <StudioMetronomeTuner />
            </div>
          </div>

          {/* Quick Sheet Music Preview Strip Below */}
          <div className="pt-2">
            <StudioSheetViewer
              isDualView={false}
              onDualViewToggle={(dual) => setIsDualSplitView(dual)}
            />
          </div>

          {/* Recordings Vault Strip Below */}
          <div className="pt-2">
            <StudioRecordingsVault refreshTrigger={vaultRefreshTrigger} />
          </div>
        </div>
      ) : activeTab === "music_sheets" ? (
        /* Dedicated Full Sheet Music Mode */
        <div className="space-y-6">
          <StudioSheetViewer
            isDualView={false}
            onDualViewToggle={(dual) => setIsDualSplitView(dual)}
          />
        </div>
      ) : (
        /* Dedicated Recordings Vault Mode */
        <div className="space-y-6">
          <StudioRecordingsVault refreshTrigger={vaultRefreshTrigger} />
        </div>
      )}
    </div>
  );
}
