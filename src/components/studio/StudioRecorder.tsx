"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Circle, Pause, Play, Square, Download, Save, Trash2, Video, Mic, CheckCircle2, VideoOff, MicOff, AlertCircle } from "lucide-react";
import { saveStudioRecording, StudioRecordingTake } from "@/lib/studio-recordings-db";

interface StudioRecorderProps {
  mediaStream: MediaStream | null;
  isVideoOff?: boolean;
  isMicMuted?: boolean;
  onToggleCamera?: () => void;
  onToggleMic?: () => void;
  onRecordingStateChange?: (isRecording: boolean) => void;
  onTakeSaved?: () => void;
}

export function StudioRecorder({
  mediaStream,
  isVideoOff = false,
  isMicMuted = false,
  onToggleCamera,
  onToggleMic,
  onRecordingStateChange,
  onTakeSaved,
}: StudioRecorderProps) {
  const [recordMode, setRecordMode] = useState<"video" | "audio">("video");
  const [recordingState, setRecordingState] = useState<"idle" | "recording" | "paused">("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Review modal state
  const [completedTake, setCompletedTake] = useState<{
    blob: Blob;
    url: string;
    type: "video" | "audio";
    mimeType: string;
    durationSeconds: number;
    durationFormatted: string;
  } | null>(null);

  const [takeTitle, setTakeTitle] = useState("");
  const [takeNotes, setTakeNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = useCallback(() => {
    if (!mediaStream) {
      alert("Please ensure your camera or microphone is enabled before recording.");
      return;
    }

    try {
      recordedChunksRef.current = [];
      let streamToRecord = mediaStream;

      if (recordMode === "audio") {
        const audioTracks = mediaStream.getAudioTracks();
        if (audioTracks.length === 0) {
          alert("No audio track found in media stream.");
          return;
        }
        streamToRecord = new MediaStream(audioTracks);
      }

      let mimeType = recordMode === "video" ? "video/webm;codecs=vp9,opus" : "audio/webm;codecs=opus";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = recordMode === "video" ? "video/webm" : "audio/webm";
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "";
      }

      const recorder = new MediaRecorder(streamToRecord, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const actualMime = recorder.mimeType || (recordMode === "video" ? "video/webm" : "audio/webm");
        const fullBlob = new Blob(recordedChunksRef.current, { type: actualMime });
        const previewUrl = URL.createObjectURL(fullBlob);

        const now = new Date();
        const defaultTitle = `Practice Take — ${now.toLocaleDateString([], { month: "short", day: "numeric" })} at ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

        setCompletedTake({
          blob: fullBlob,
          url: previewUrl,
          type: recordMode,
          mimeType: actualMime,
          durationSeconds: elapsedSeconds,
          durationFormatted: formatTimer(elapsedSeconds),
        });

        setTakeTitle(defaultTitle);
        setTakeNotes("");
        setSaveSuccess(false);
      };

      recorder.start(500);
      setRecordingState("recording");
      setElapsedSeconds(0);
      onRecordingStateChange?.(true);

      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    } catch (err) {
      console.error("Failed to start MediaRecorder:", err);
      alert("Failed to start recording. Please ensure camera and microphone are available.");
    }
  }, [mediaStream, recordMode, elapsedSeconds, onRecordingStateChange]);

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === "recording") {
      mediaRecorderRef.current.pause();
      setRecordingState("paused");
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState === "paused") {
      mediaRecorderRef.current.resume();
      setRecordingState("recording");
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState !== "idle") {
      mediaRecorderRef.current.stop();
      setRecordingState("idle");
      onRecordingStateChange?.(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (completedTake?.url) {
        URL.revokeObjectURL(completedTake.url);
      }
    };
  }, [completedTake]);

  const handleSaveToVault = async () => {
    if (!completedTake) return;
    setIsSaving(true);
    try {
      const takeData: StudioRecordingTake = {
        id: `take-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: takeTitle.trim() || "Untitled Take",
        blob: completedTake.blob,
        type: completedTake.type,
        mimeType: completedTake.mimeType,
        durationSeconds: completedTake.durationSeconds,
        durationFormatted: completedTake.durationFormatted,
        createdAt: new Date().toISOString(),
        notes: takeNotes.trim(),
      };

      await saveStudioRecording(takeData);
      setIsSaving(false);
      setSaveSuccess(true);
      onTakeSaved?.();
      setTimeout(() => {
        setCompletedTake(null);
        setSaveSuccess(false);
      }, 1200);
    } catch (err) {
      console.error("Save take failed:", err);
      setIsSaving(false);
      alert("Failed to save take to vault. Please try downloading it directly.");
    }
  };

  const handleDownloadDirectly = () => {
    if (!completedTake) return;
    const a = document.createElement("a");
    a.href = completedTake.url;
    const extension = completedTake.type === "video" ? "webm" : "webm";
    const filename = `${takeTitle.trim().replace(/[^a-z0-9]/gi, "_").toLowerCase() || "take"}.${extension}`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDiscardTake = () => {
    if (completedTake?.url) {
      URL.revokeObjectURL(completedTake.url);
    }
    setCompletedTake(null);
  };

  return (
    <>
      {/* Active Mute / Camera Off Advisory Banner - No White Borders */}
      {((recordMode === "video" && isVideoOff) || isMicMuted) && recordingState === "idle" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 bg-amber-500/10 rounded-2xl text-xs text-amber-900 shadow-xs animate-in fade-in border-0">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {recordMode === "video" && isVideoOff && isMicMuted
                ? "Camera is off and microphone is muted."
                : recordMode === "video" && isVideoOff
                ? "Camera is currently turned off. Your take will record blank video."
                : "Microphone is muted. Your take will record without sound."}
            </span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {recordMode === "video" && isVideoOff && onToggleCamera && (
              <button
                type="button"
                onClick={onToggleCamera}
                className="px-2.5 py-1 rounded-lg bg-accent text-white font-bold text-[11px] hover:bg-accent-dark transition-all cursor-pointer shadow-xs border-0"
              >
                Turn On Camera
              </button>
            )}
            {isMicMuted && onToggleMic && (
              <button
                type="button"
                onClick={onToggleMic}
                className="px-2.5 py-1 rounded-lg bg-primary text-white font-bold text-[11px] hover:bg-primary-hover transition-all cursor-pointer shadow-xs border-0"
              >
                Unmute Mic
              </button>
            )}
          </div>
        </div>
      )}

      {/* Control Bar Panel - No White Borders */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 border-0">
        {/* Left: Recording Mode Tabs */}
        <div className="flex items-center gap-1 bg-bg-alt/30 p-1 rounded-xl border-0">
          <button
            type="button"
            disabled={recordingState !== "idle"}
            onClick={() => setRecordMode("video")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-0 ${
              recordMode === "video"
                ? "bg-primary text-white shadow-xs"
                : "text-body hover:text-heading"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Take</span>
          </button>
          <button
            type="button"
            disabled={recordingState !== "idle"}
            onClick={() => setRecordMode("audio")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-0 ${
              recordMode === "audio"
                ? "bg-primary text-white shadow-xs"
                : "text-body hover:text-heading"
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Audio Only</span>
          </button>
        </div>

        {/* Center: Stopwatch Timer */}
        <div className="flex items-center gap-2">
          {recordingState !== "idle" && (
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          )}
          <div className="font-mono text-xl sm:text-2xl font-black text-heading tabular-nums tracking-wider">
            {formatTimer(elapsedSeconds)}
          </div>
          {recordingState === "paused" && (
            <span className="px-2 py-0.5 rounded-md bg-accent/15 text-accent-dark font-mono text-[10px] font-bold uppercase border-0">
              Paused
            </span>
          )}
        </div>

        {/* Right: Record / Pause / Stop Buttons */}
        <div className="flex items-center gap-2">
          {recordingState === "idle" ? (
            <button
              type="button"
              onClick={startRecording}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm shadow-rose-950/20 flex items-center gap-2 transition-all cursor-pointer active:scale-95 border-0"
            >
              <Circle className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
              <span>Record Take</span>
            </button>
          ) : (
            <>
              {recordingState === "recording" ? (
                <button
                  type="button"
                  onClick={pauseRecording}
                  className="px-3.5 py-2 rounded-xl bg-bg-alt/50 hover:bg-bg-alt text-heading font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border-0"
                  title="Pause Recording"
                >
                  <Pause className="w-3.5 h-3.5 text-accent" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resumeRecording}
                  className="px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm border-0"
                  title="Resume Recording"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume</span>
                </button>
              )}

              <button
                type="button"
                onClick={stopRecording}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 border-0"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop &amp; Review</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Review Modal on Recording Stop - No White Borders */}
      {completedTake && (
        <div className="fixed inset-0 z-50 bg-[#1E1A4D]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 text-heading max-h-[90vh] overflow-y-auto border-0">
            {/* Header */}
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="font-serif font-black text-xl text-heading">Review Practice Take</h3>
                <p className="text-xs text-body font-mono mt-0.5">
                  Duration: {completedTake.durationFormatted} • {completedTake.type.toUpperCase()}
                </p>
              </div>
              <button
                type="button"
                onClick={handleDiscardTake}
                className="p-1 rounded-lg text-body hover:text-heading text-xs cursor-pointer border-0"
              >
                ✕
              </button>
            </div>

            {/* Video / Audio Preview Stand */}
            <div className="rounded-2xl overflow-hidden bg-[#160A29] shadow-inner aspect-video flex items-center justify-center border-0">
              {completedTake.type === "video" ? (
                <video
                  src={completedTake.url}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 space-y-4 w-full">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl animate-pulse">
                    🎵
                  </div>
                  <audio src={completedTake.url} controls className="w-full max-w-xs" />
                </div>
              )}
            </div>

            {/* Take Metadata & Label Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-heading mb-1">
                  Take Title
                </label>
                <input
                  type="text"
                  value={takeTitle}
                  onChange={(e) => setTakeTitle(e.target.value)}
                  placeholder="e.g., Yaman Alap Take 1 — Fast Taan"
                  className="w-full px-3.5 py-2.5 rounded-xl border-0 ring-1 ring-primary/15 focus:ring-2 focus:ring-primary bg-bg-alt/15 text-heading text-xs sm:text-sm outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1">
                  Self-Reflection &amp; Practice Notes
                </label>
                <textarea
                  rows={2}
                  value={takeNotes}
                  onChange={(e) => setTakeNotes(e.target.value)}
                  placeholder="e.g., Notice tempo rush in the 2nd avartan, pitch accuracy on Komal Re was solid."
                  className="w-full px-3.5 py-2 rounded-xl border-0 ring-1 ring-primary/15 focus:ring-2 focus:ring-primary bg-bg-alt/15 text-heading text-xs outline-none resize-none font-medium"
                />
              </div>

              {saveSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold animate-in fade-in border-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Saved take to local Practice Vault!</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleDiscardTake}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Discard</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDownloadDirectly}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-bg-alt/40 hover:bg-bg-alt/80 text-heading text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs border-0"
                >
                  <Download className="w-3.5 h-3.5 text-accent" />
                  <span>Download File</span>
                </button>

                <button
                  type="button"
                  disabled={isSaving || saveSuccess}
                  onClick={handleSaveToVault}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-cta hover:bg-cta-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-cta/25 disabled:opacity-60 border-0"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save to Vault"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
