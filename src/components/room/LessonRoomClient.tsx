"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AudioMode } from "@/lib/audio-engine";
import { releaseAllMediaDevices } from "@/lib/media-devices";
import { PreJoinScreen } from "./PreJoinScreen";
import { LessonRoom } from "./LessonRoom";
import { Loader2, AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

interface LessonRoomClientProps {
  lesson: {
    id: string;
    instrument: string;
    startsAt: string;
    endsAt: string;
    durationMinutes: number;
    partnerName: string;
    isTeacher: boolean;
    callerRole: "TEACHER" | "STUDENT";
    lessonSource?: string | null;
  };
}

export function LessonRoomClient({ lesson }: LessonRoomClientProps) {
  const router = useRouter();

  const [step, setStep] = useState<"PRE_JOIN" | "CONNECTING" | "CONNECTED" | "ERROR">("PRE_JOIN");
  const [tokenData, setTokenData] = useState<{
    token: string;
    serverUrl: string;
  } | null>(null);

  const [joinedConfig, setJoinedConfig] = useState<{
    audioDeviceId: string;
    videoDeviceId: string;
    audioMode: AudioMode;
  }>({
    audioDeviceId: "",
    videoDeviceId: "",
    audioMode: "TALKING",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePreJoinComplete = async (config: {
    audioDeviceId: string;
    videoDeviceId: string;
    audioMode: AudioMode;
  }) => {
    setJoinedConfig(config);
    setStep("CONNECTING");
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/lessons/${lesson.id}/room-token?early=true`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to mint lesson room token.");
      }

      setTokenData({
        token: data.token,
        serverUrl: data.serverUrl,
      });
      setStep("CONNECTED");
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "Failed to connect to lesson room.");
      setStep("ERROR");
    }
  };

  const handleLeave = () => {
    releaseAllMediaDevices();
    const dashboardRoute =
      lesson.callerRole === "TEACHER" ? "/teacher/dashboard" : "/student/dashboard";
    router.push(dashboardRoute);
  };

  if (step === "PRE_JOIN") {
    return (
      <PreJoinScreen
        lesson={lesson}
        onJoin={handlePreJoinComplete}
        onCancel={handleLeave}
      />
    );
  }

  if (step === "CONNECTING") {
    return (
      <div className="min-h-screen bg-[#0E0C18] flex flex-col items-center justify-center p-4 text-center space-y-6">
        <div className="flex justify-center mb-2">
          <Image
            src="/cropped-Add-a-subheading-5-png-scaled.webp"
            alt="Gandharva School of Music"
            width={180}
            height={50}
            className="h-11 w-auto object-contain"
            priority
          />
        </div>

        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-primary/20 border-t-cta rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-cta font-serif font-black text-xl">
            ♪
          </div>
        </div>

        <div className="space-y-1.5 max-w-sm">
          <span className="text-[11px] font-bold uppercase tracking-widest text-cta font-mono">
            Live Audio Calibration
          </span>
          <h2 className="text-xl font-bold font-serif text-white">
            Entering Lesson Room...
          </h2>
          <p className="text-xs text-stone-400 leading-relaxed">
            Configuring high-fidelity 48kHz audio pipeline with {lesson.partnerName}
          </p>
        </div>
      </div>
    );
  }

  if (step === "ERROR") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bg via-bg-alt/25 to-bg flex items-center justify-center p-4 sm:p-6">
        <div className="relative max-w-md w-full overflow-hidden rounded-2xl bg-white p-7 sm:p-9 text-center space-y-6 shadow-xl shadow-stone-900/10">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-primary" />

          <div className="flex justify-center">
            <Image
              src="/cropped-Add-a-subheading-5-png-scaled.webp"
              alt="Gandharva School of Music"
              width={160}
              height={44}
              className="h-10 w-auto object-contain"
            />
          </div>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-red-600 font-mono">
              Connection Notice
            </span>
            <h2 className="text-2xl font-bold font-serif text-heading">
              Connection Issue
            </h2>
            <p className="text-xs sm:text-sm text-body leading-relaxed">
              {errorMessage}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => setStep("PRE_JOIN")}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary via-cta to-accent hover:opacity-95 text-white text-xs font-bold shadow-md shadow-primary/20 transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Device Setup</span>
            </button>
            <button
              type="button"
              onClick={handleLeave}
              className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-surface-muted/40 hover:bg-surface-muted/70 text-heading text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenData) return null;

  return (
    <LessonRoom
      token={tokenData.token}
      serverUrl={tokenData.serverUrl}
      lesson={lesson}
      initialConfig={joinedConfig}
      onLeave={handleLeave}
    />
  );
}
