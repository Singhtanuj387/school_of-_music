"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AudioMode } from "@/lib/audio-engine";
import { AudioLevelMeter } from "./AudioLevelMeter";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Headphones,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Camera,
  Music,
  MessageSquare,
} from "lucide-react";

interface PreJoinScreenProps {
  lesson: {
    id: string;
    instrument: string;
    startsAt: string;
    endsAt: string;
    durationMinutes: number;
    partnerName: string;
    callerRole: "TEACHER" | "STUDENT";
    lessonSource?: string | null;
  };
  onJoin: (config: {
    audioDeviceId: string;
    videoDeviceId: string;
    audioMode: AudioMode;
  }) => void;
  onCancel?: () => void;
}

export function PreJoinScreen({ lesson, onJoin, onCancel }: PreJoinScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);

  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");

  const [audioMode, setAudioMode] = useState<AudioMode>("TALKING");
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [headphonesAcknowledged, setHeadphonesAcknowledged] = useState(false);

  const [deviceError, setDeviceError] = useState<string | null>(null);

  // Load saved audio mode preference from localStorage
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem("toneroom_audio_mode") as AudioMode;
      if (savedMode === "TALKING" || savedMode === "PLAYING") setAudioMode(savedMode);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Request media permissions and enumerate devices
  useEffect(() => {
    let active = true;

    async function setupDevices() {
      try {
        setDeviceError(null);
        // Initial permission request: try video and audio together, fallback to audio-only if camera is busy or unavailable
        let initialStream: MediaStream;
        try {
          initialStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
        } catch (mediaErr: unknown) {
          console.warn("Could not acquire both video and audio, trying audio only:", mediaErr);
          try {
            initialStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            setIsVideoMuted(true);
            setDeviceError(
              "Camera is currently unavailable (it may be in use by another browser tab or app). Audio is ready.",
            );
          } catch {
            throw mediaErr;
          }
        }

        if (!active) {
          initialStream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = initialStream;
        setStream(initialStream);
        if (videoRef.current) {
          videoRef.current.srcObject = initialStream;
        }

        // Enumerate devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const mics = devices.filter((d) => d.kind === "audioinput");
        const cams = devices.filter((d) => d.kind === "videoinput");

        setAudioDevices(mics);
        setVideoDevices(cams);

        let savedMic: string | null = null;
        let savedCam: string | null = null;
        try {
          savedMic = localStorage.getItem("toneroom_mic_id");
          savedCam = localStorage.getItem("toneroom_cam_id");
        } catch {
          // Ignore
        }

        // Match saved mic or default to first available
        const matchedMic = mics.find((m) => m.deviceId === savedMic);
        if (matchedMic) {
          setSelectedAudioDevice(matchedMic.deviceId);
        } else if (mics[0]) {
          setSelectedAudioDevice(mics[0].deviceId);
        }

        // Match saved cam or default to first available
        const matchedCam = cams.find((c) => c.deviceId === savedCam);
        if (matchedCam) {
          setSelectedVideoDevice(matchedCam.deviceId);
        } else if (cams[0]) {
          setSelectedVideoDevice(cams[0].deviceId);
        }
      } catch (err: unknown) {
        const error = err as Error;
        setDeviceError(
          error.message ||
            "Please grant microphone and camera permissions to join the lesson room.",
        );
      }
    }

    setupDevices();

    const handleBeforeUnload = () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      active = false;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Handle camera / mic device change in preview
  const handleDeviceChange = async (newMicId: string, newCamId: string) => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }

      let newStream: MediaStream;
      try {
        newStream = await navigator.mediaDevices.getUserMedia({
          audio: newMicId ? { deviceId: { ideal: newMicId } } : true,
          video: newCamId ? { deviceId: { ideal: newCamId } } : true,
        });
      } catch (devErr) {
        console.warn("Could not switch to ideal device, falling back to default media:", devErr);
        newStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
      }

      streamRef.current = newStream;
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }

      // Sync mute states
      newStream.getVideoTracks().forEach((t) => (t.enabled = !isVideoMuted));
      newStream.getAudioTracks().forEach((t) => (t.enabled = !isAudioMuted));
    } catch (err) {
      console.warn("Failed to switch preview device", err);
    }
  };

  const toggleVideo = () => {
    if (!stream) return;
    const nextState = !isVideoMuted;
    setIsVideoMuted(nextState);
    stream.getVideoTracks().forEach((t) => (t.enabled = !nextState));
  };

  const toggleAudio = () => {
    if (!stream) return;
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    stream.getAudioTracks().forEach((t) => (t.enabled = !nextState));
  };

  const handleJoin = () => {
    // Save preferences
    try {
      localStorage.setItem("toneroom_mic_id", selectedAudioDevice);
      localStorage.setItem("toneroom_cam_id", selectedVideoDevice);
      localStorage.setItem("toneroom_audio_mode", audioMode);
    } catch {
      // Ignore
    }

    // Explicitly and synchronously stop local preview tracks before handoff to LiveKit
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }

    onJoin({
      audioDeviceId: selectedAudioDevice,
      videoDeviceId: selectedVideoDevice,
      audioMode,
    });
  };

  const handleCancel = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    onCancel?.();
  };

  const canJoin = audioMode === "TALKING" || headphonesAcknowledged;

  return (
    <div className="min-h-screen bg-[#0E0C18] text-stone-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header Bar */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between py-2 pb-6">
        <div className="flex items-center gap-3">
          <Image
            src="/cropped-Add-a-subheading-5-png-scaled.webp"
            alt="Gandharva School of Music"
            width={170}
            height={46}
            className="h-9 sm:h-10 w-auto object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300">
            {lesson.instrument} Studio
          </span>
        </div>
      </header>

      {/* Main Studio Setup Grid */}
      <main className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center flex-1 my-auto">
        {/* Left Col: Live Video Preview & Audio VU Meter (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video bg-[#161226] rounded-3xl overflow-hidden shadow-2xl shadow-black/80 flex items-center justify-center">
            {isVideoMuted ? (
              <div className="text-center space-y-2.5">
                <div className="w-16 h-16 rounded-2xl bg-[#201A36] text-stone-400 flex items-center justify-center text-2xl mx-auto shadow-inner">
                  <Camera className="w-8 h-8 opacity-70" />
                </div>
                <p className="text-xs text-stone-400 font-medium">Camera is muted</p>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transition-transform duration-200 scale-x-[-1]"
              />
            )}

            {/* Floating In-Preview Controls */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer ${
                    isAudioMuted
                      ? "bg-rose-600 text-white"
                      : "bg-black/60 hover:bg-black/80 text-white"
                  }`}
                  title={isAudioMuted ? "Unmute Microphone" : "Mute Microphone"}
                >
                  {isAudioMuted ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-emerald-400" />}
                  <span>{isAudioMuted ? "Mic Off" : "Mic On"}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleVideo}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all active:scale-95 shadow-md cursor-pointer ${
                    isVideoMuted
                      ? "bg-rose-600 text-white"
                      : "bg-black/60 hover:bg-black/80 text-white"
                  }`}
                  title={isVideoMuted ? "Turn Video On" : "Turn Video Off"}
                >
                  {isVideoMuted ? <VideoOff className="w-4 h-4 text-white" /> : <VideoIcon className="w-4 h-4 text-emerald-400" />}
                  <span>{isVideoMuted ? "Cam Off" : "Cam On"}</span>
                </button>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-amber-300">
                {audioMode === "PLAYING" ? "🎸 Instrument Audio" : "💬 Speech Audio"}
              </span>
            </div>
          </div>

          {/* Real-time Studio VU Meter */}
          <div className="bg-[#161226] p-4 rounded-2xl space-y-2 shadow-xl">
            <AudioLevelMeter stream={isAudioMuted ? null : stream} showLabels />
            <p className="text-[11px] text-stone-400">
              Speak or test your instrument note to confirm green/amber resonance without clipping.
            </p>
          </div>

          {deviceError && (
            <div className="p-3.5 bg-rose-950/60 text-xs text-rose-300 rounded-2xl shadow-md">
              {deviceError}
            </div>
          )}
        </div>

        {/* Right Col: Studio Calibration & Entry Panel (5 cols) */}
        <div className="lg:col-span-5 relative overflow-hidden bg-[#161226] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
          {/* Top Decorative Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cta to-accent" />

          {/* Session Header */}
          <div className="space-y-1.5 pb-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cta font-mono">
                Studio Pre-Flight Check
              </span>
              {lesson.lessonSource === "TRIAL" ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300">
                  Free Trial
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-purple-300">
                  Course Session
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold font-serif text-white">
              {lesson.instrument} with {lesson.partnerName}
            </h1>
            <p className="text-xs text-stone-400">
              1-to-1 live acoustic music lesson ({lesson.durationMinutes} minutes)
            </p>
          </div>

          {/* Device Selectors */}
          <div className="space-y-3.5 text-xs">
            {/* Microphone */}
            <div className="space-y-1.5">
              <label className="text-stone-300 font-semibold block">Audio Microphone</label>
              <select
                value={selectedAudioDevice}
                onChange={(e) => {
                  setSelectedAudioDevice(e.target.value);
                  handleDeviceChange(e.target.value, selectedVideoDevice);
                }}
                className="w-full bg-[#201A36] rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cta/50 text-xs shadow-inner cursor-pointer"
              >
                {audioDevices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Microphone ${d.deviceId.slice(0, 5)}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Camera */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-stone-300 font-semibold block">Primary Video Camera</label>
                {videoDevices.length > 1 && (
                  <span className="text-[10px] text-accent font-bold px-2 py-0.5 rounded-full bg-accent/15 border-0 flex items-center gap-1">
                    <span>✨</span>
                    <span>{videoDevices.length} Cameras Detected (Dual-Angle Ready)</span>
                  </span>
                )}
              </div>
              <select
                value={selectedVideoDevice}
                onChange={(e) => {
                  setSelectedVideoDevice(e.target.value);
                  handleDeviceChange(selectedAudioDevice, e.target.value);
                }}
                className="w-full bg-[#201A36] rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cta/50 text-xs shadow-inner cursor-pointer"
              >
                {videoDevices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label || `Camera ${d.deviceId.slice(0, 5)}`}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-stone-400">
                💡 You can broadcast a 2nd camera angle (hands, keyboard, or overhead view) anytime during the lesson using the &quot;Multi-Cam&quot; button.
              </p>
            </div>

            {/* Audio Mode Switcher */}
            <div className="space-y-2 pt-1">
              <label className="text-stone-300 font-semibold block">Audio Engine Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAudioMode("TALKING")}
                  className={`p-3 rounded-xl text-left transition-all active:scale-95 cursor-pointer ${
                    audioMode === "TALKING"
                      ? "bg-primary/25 ring-2 ring-primary text-white shadow-md"
                      : "bg-[#201A36] text-stone-400 hover:text-white"
                  }`}
                >
                  <div className="font-bold text-xs text-white flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-300" />
                    <span>Talking Mode</span>
                  </div>
                  <div className="text-[10px] text-stone-400 mt-1 leading-snug">
                    Standard speech filters. Speakers permitted.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAudioMode("PLAYING")}
                  className={`p-3 rounded-xl text-left transition-all active:scale-95 cursor-pointer ${
                    audioMode === "PLAYING"
                      ? "bg-amber-600/30 ring-2 ring-amber-500 text-white shadow-md"
                      : "bg-[#201A36] text-stone-400 hover:text-white"
                  }`}
                >
                  <div className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-amber-400" />
                    <span>Instrument Mode</span>
                  </div>
                  <div className="text-[10px] text-stone-300 mt-1 leading-snug">
                    48kHz stereo. Pure sustain, zero cancel.
                  </div>
                </button>
              </div>
            </div>

            {/* Mandatory Headphone Warning */}
            {audioMode === "PLAYING" && (
              <div className="p-3.5 bg-amber-950/40 ring-1 ring-amber-500/40 rounded-2xl space-y-2 animate-in fade-in">
                <div className="flex items-start gap-2 text-amber-300 font-semibold text-xs">
                  <Headphones className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Headphones Required in Instrument Mode</span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-relaxed">
                  Instrument Mode disables echo cancellation to protect tone harmonics. Headphones prevent audio echo feedback.
                </p>
                <label className="flex items-center gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={headphonesAcknowledged}
                    onChange={(e) => setHeadphonesAcknowledged(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                  />
                  <span className="text-xs text-white font-medium">
                    I am wearing headphones or earphones
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Join CTA */}
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={handleJoin}
              disabled={!canJoin}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-primary via-cta to-accent hover:opacity-95 disabled:opacity-40 text-white font-bold text-sm transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Join Lesson Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onCancel && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-full py-2.5 px-4 rounded-xl bg-[#201A36] hover:bg-[#2A2346] text-stone-300 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Dashboard</span>
              </button>
            )}

            {!canJoin && (
              <p className="text-[10px] text-center text-amber-400 mt-1">
                Please confirm headphone usage to enter in Instrument Mode.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer spacer */}
      <footer className="py-2" />
    </div>
  );
}
