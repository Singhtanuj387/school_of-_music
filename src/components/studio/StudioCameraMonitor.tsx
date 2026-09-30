"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, VideoOff, Maximize2, Minimize2, FlipHorizontal, Mic, MicOff } from "lucide-react";
import { releaseAllMediaDevices } from "@/lib/media-devices";

interface StudioCameraMonitorProps {
  onMediaStreamReady?: (stream: MediaStream | null) => void;
  isRecording?: boolean;
  isVideoOff?: boolean;
  isMicMuted?: boolean;
  onCameraStateChange?: (isOff: boolean) => void;
  onMicStateChange?: (isMuted: boolean) => void;
  toggleCameraRef?: React.MutableRefObject<(() => void) | null>;
  toggleMicRef?: React.MutableRefObject<(() => void) | null>;
}

export function StudioCameraMonitor({
  onMediaStreamReady,
  isRecording = false,
  isVideoOff: propVideoOff,
  isMicMuted: propMicMuted,
  onCameraStateChange,
  onMicStateChange,
  toggleCameraRef,
  toggleMicRef,
}: StudioCameraMonitorProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const allKnownTracksRef = useRef<Set<MediaStreamTrack>>(new Set());
  const initSeqRef = useRef<number>(0);
  const isCancelledRef = useRef<boolean>(false);

  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const [isMirrored, setIsMirrored] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasPermissionError, setHasPermissionError] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Local fallback states if not controlled by parent
  const [localVideoOff, setLocalVideoOff] = useState<boolean>(false);
  const [localMicMuted, setLocalMicMuted] = useState<boolean>(false);

  const effectiveVideoOff = propVideoOff !== undefined ? propVideoOff : localVideoOff;
  const effectiveMicMuted = propMicMuted !== undefined ? propMicMuted : localMicMuted;

  const isVideoOffRef = useRef<boolean>(effectiveVideoOff);
  const isMicMutedRef = useRef<boolean>(effectiveMicMuted);

  useEffect(() => {
    isVideoOffRef.current = effectiveVideoOff;
  }, [effectiveVideoOff]);

  useEffect(() => {
    isMicMutedRef.current = effectiveMicMuted;
  }, [effectiveMicMuted]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Real Hardware Stop for Camera - Physically turns off webcam sensor & LED
  const stopCameraHardware = useCallback(() => {
    isVideoOffRef.current = true;
    setLocalVideoOff(true);
    onCameraStateChange?.(true);

    // 1. Clear HTML5 video element
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {}
      videoRef.current.srcObject = null;
    }

    // 2. Stop and delete every video track ever recorded in this component
    allKnownTracksRef.current.forEach((track) => {
      if (track.kind === "video") {
        try {
          track.enabled = false;
          track.stop();
        } catch {}
        allKnownTracksRef.current.delete(track);
      }
    });

    // 3. Stop and remove video tracks from current stream
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track: MediaStreamTrack) => {
        try {
          track.enabled = false;
          track.stop();
          streamRef.current?.removeTrack(track);
        } catch {}
      });
    }

    // 4. Terminate any stray video elements holding video tracks
    if (typeof document !== "undefined") {
      document.querySelectorAll<HTMLVideoElement>("video").forEach((vid) => {
        if (vid.srcObject && vid.srcObject instanceof MediaStream) {
          vid.srcObject.getVideoTracks().forEach((t) => {
            try {
              t.enabled = false;
              t.stop();
              (vid.srcObject as MediaStream).removeTrack(t);
            } catch {}
          });
        }
      });
    }

    onMediaStreamReady?.(streamRef.current);
  }, [onCameraStateChange, onMediaStreamReady]);

  // Real Hardware Start for Camera
  const startCameraHardware = useCallback(async () => {
    try {
      isVideoOffRef.current = false;
      setHasPermissionError(false);
      const constraints: MediaTrackConstraints = selectedCameraId
        ? { deviceId: { ideal: selectedCameraId }, width: { ideal: 1280 }, height: { ideal: 720 } }
        : { width: { ideal: 1280 }, height: { ideal: 720 } };

      const camStream = await navigator.mediaDevices.getUserMedia({ video: constraints });
      const newVideoTrack = camStream.getVideoTracks()[0];
      if (!newVideoTrack) return;

      // Check if user turned it off while awaiting getUserMedia
      if (isVideoOffRef.current || isCancelledRef.current) {
        camStream.getTracks().forEach((t) => {
          t.enabled = false;
          t.stop();
        });
        return;
      }

      allKnownTracksRef.current.add(newVideoTrack);

      let targetStream = streamRef.current;
      if (!targetStream) {
        targetStream = new MediaStream([newVideoTrack]);
      } else {
        targetStream.getVideoTracks().forEach((t: MediaStreamTrack) => {
          try {
            t.stop();
            targetStream?.removeTrack(t);
            allKnownTracksRef.current.delete(t);
          } catch {}
        });
        targetStream.addTrack(newVideoTrack);
      }

      streamRef.current = targetStream;
      setStream(targetStream);
      if (videoRef.current) {
        videoRef.current.srcObject = targetStream;
        videoRef.current.play().catch(() => {});
      }
      setLocalVideoOff(false);
      onCameraStateChange?.(false);
      onMediaStreamReady?.(targetStream);

      const devices = await navigator.mediaDevices.enumerateDevices();
      setCameras(devices.filter((d) => d.kind === "videoinput"));
    } catch (err) {
      console.error("Failed to start camera hardware:", err);
      setHasPermissionError(true);
    }
  }, [selectedCameraId, onCameraStateChange, onMediaStreamReady]);

  // Real Hardware Stop for Microphone - Closes AudioContext & releases OS mic driver
  const stopMicHardware = useCallback(() => {
    isMicMutedRef.current = true;
    setLocalMicMuted(true);
    onMicStateChange?.(true);

    // 1. Cancel animation frame for VU meter
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setAudioLevel(0);

    // 2. Disconnect Web Audio source and analyser, and close AudioContext
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.disconnect();
      } catch {}
      sourceNodeRef.current = null;
    }
    if (analyserRef.current) {
      try {
        analyserRef.current.disconnect();
      } catch {}
      analyserRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        if (audioContextRef.current.state !== "closed") {
          audioContextRef.current.close().catch(() => {});
        }
      } catch {}
      audioContextRef.current = null;
    }

    // 3. Stop and delete every audio track ever recorded in this component
    allKnownTracksRef.current.forEach((track) => {
      if (track.kind === "audio") {
        try {
          track.enabled = false;
          track.stop();
        } catch {}
        allKnownTracksRef.current.delete(track);
      }
    });

    // 4. Stop and remove audio tracks from current stream
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track: MediaStreamTrack) => {
        try {
          track.enabled = false;
          track.stop();
          streamRef.current?.removeTrack(track);
        } catch {}
      });
    }

    // 5. Terminate any stray audio elements holding audio tracks
    if (typeof document !== "undefined") {
      document.querySelectorAll<HTMLAudioElement>("audio").forEach((aud) => {
        if (aud.srcObject && aud.srcObject instanceof MediaStream) {
          aud.srcObject.getAudioTracks().forEach((t) => {
            try {
              t.enabled = false;
              t.stop();
              (aud.srcObject as MediaStream).removeTrack(t);
            } catch {}
          });
        }
      });
    }

    onMediaStreamReady?.(streamRef.current);
  }, [onMicStateChange, onMediaStreamReady]);

  // Real Hardware Start for Microphone
  const startMicHardware = useCallback(async () => {
    try {
      isMicMutedRef.current = false;
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      const newAudioTrack = micStream.getAudioTracks()[0];
      if (!newAudioTrack) return;

      // Check if user muted mic while awaiting getUserMedia
      if (isMicMutedRef.current || isCancelledRef.current) {
        micStream.getTracks().forEach((t) => {
          t.enabled = false;
          t.stop();
        });
        return;
      }

      allKnownTracksRef.current.add(newAudioTrack);

      let targetStream = streamRef.current;
      if (!targetStream) {
        targetStream = new MediaStream([newAudioTrack]);
      } else {
        targetStream.getAudioTracks().forEach((t: MediaStreamTrack) => {
          try {
            t.stop();
            targetStream?.removeTrack(t);
            allKnownTracksRef.current.delete(t);
          } catch {}
        });
        targetStream.addTrack(newAudioTrack);
      }

      streamRef.current = targetStream;
      setStream(targetStream);
      setLocalMicMuted(false);
      onMicStateChange?.(false);
      onMediaStreamReady?.(targetStream);

      // Re-setup VU meter AudioContext
      try {
        if (sourceNodeRef.current) {
          sourceNodeRef.current.disconnect();
          sourceNodeRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== "closed") {
          audioContextRef.current.close().catch(() => {});
        }

        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const source = ctx.createMediaStreamSource(new MediaStream([newAudioTrack]));
        sourceNodeRef.current = source;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.6;
        source.connect(analyser);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateAudioLevel = () => {
          if (!analyserRef.current || isMicMutedRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        };
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      } catch (audioErr) {
        console.warn("Audio meter setup failed:", audioErr);
      }
    } catch (err) {
      console.error("Failed to start mic hardware:", err);
    }
  }, [onMicStateChange, onMediaStreamReady]);

  // Toggle Handlers
  const toggleCamera = useCallback(() => {
    if (effectiveVideoOff) {
      startCameraHardware();
    } else {
      stopCameraHardware();
    }
  }, [effectiveVideoOff, startCameraHardware, stopCameraHardware]);

  const toggleMic = useCallback(() => {
    if (effectiveMicMuted) {
      startMicHardware();
    } else {
      stopMicHardware();
    }
  }, [effectiveMicMuted, startMicHardware, stopMicHardware]);

  // Expose toggle functions to parent refs
  useEffect(() => {
    if (toggleCameraRef) toggleCameraRef.current = toggleCamera;
  }, [toggleCamera, toggleCameraRef]);

  useEffect(() => {
    if (toggleMicRef) toggleMicRef.current = toggleMic;
  }, [toggleMic, toggleMicRef]);

  // Initialize camera & mic on first mount
  const initStream = useCallback(async (deviceId?: string) => {
    const currentInitId = ++initSeqRef.current;
    try {
      setHasPermissionError(false);

      // Clean up previous tracks
      allKnownTracksRef.current.forEach((t) => {
        try {
          t.enabled = false;
          t.stop();
        } catch {}
      });
      allKnownTracksRef.current.clear();

      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.disconnect();
        } catch {}
        sourceNodeRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }

      // Check if user turned off camera or mic prior to this init
      const needVideo = !isVideoOffRef.current;
      const needAudio = !isMicMutedRef.current;

      // If user turned off BOTH, do not request any hardware!
      if (!needVideo && !needAudio) {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.srcObject = null;
        }
        setStream(null);
        streamRef.current = null;
        onMediaStreamReady?.(null);
        return;
      }

      const constraints: MediaStreamConstraints = {
        video: needVideo
          ? deviceId
            ? { deviceId: { ideal: deviceId }, width: { ideal: 1280 }, height: { ideal: 720 } }
            : { width: { ideal: 1280 }, height: { ideal: 720 } }
          : false,
        audio: needAudio
          ? {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false,
            }
          : false,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);

      // Stale or cancelled check
      if (currentInitId !== initSeqRef.current || isCancelledRef.current) {
        newStream.getTracks().forEach((t) => {
          t.enabled = false;
          t.stop();
        });
        return;
      }

      // Handle race condition if toggled while awaiting getUserMedia
      if (isVideoOffRef.current) {
        newStream.getVideoTracks().forEach((t) => {
          t.enabled = false;
          t.stop();
          newStream.removeTrack(t);
        });
      }
      if (isMicMutedRef.current) {
        newStream.getAudioTracks().forEach((t) => {
          t.enabled = false;
          t.stop();
          newStream.removeTrack(t);
        });
      }

      newStream.getTracks().forEach((t) => allKnownTracksRef.current.add(t));

      streamRef.current = newStream;
      setStream(newStream);
      onMediaStreamReady?.(newStream);

      if (videoRef.current && !isVideoOffRef.current && newStream.getVideoTracks().length > 0) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play().catch(() => {});
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      setCameras(videoDevices);

      const activeTrack = newStream.getVideoTracks()[0];
      if (activeTrack) {
        const settings = activeTrack.getSettings();
        if (settings.deviceId) {
          setSelectedCameraId(settings.deviceId);
        }
      }

      // Audio VU meter setup if audio track is active
      const activeAudioTrack = newStream.getAudioTracks()[0];
      if (activeAudioTrack && !isMicMutedRef.current) {
        try {
          const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioCtx();
          audioContextRef.current = ctx;

          const source = ctx.createMediaStreamSource(newStream);
          sourceNodeRef.current = source;

          const analyser = ctx.createAnalyser();
          analyser.fftSize = 512;
          analyser.smoothingTimeConstant = 0.6;
          source.connect(analyser);
          analyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const updateAudioLevel = () => {
            if (!analyserRef.current || isMicMutedRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);

            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            const normalized = Math.min(100, Math.round((avg / 128) * 100));
            setAudioLevel(normalized);

            animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
          };

          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        } catch (audioErr) {
          console.warn("Audio meter setup failed:", audioErr);
        }
      }
    } catch (err) {
      console.error("Camera access failed:", err);
      setHasPermissionError(true);
      setStream(null);
      streamRef.current = null;
      onMediaStreamReady?.(null);
    }
  }, [onMediaStreamReady]);

  useEffect(() => {
    isCancelledRef.current = false;
    initStream();

    return () => {
      isCancelledRef.current = true;
      initSeqRef.current++;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.disconnect();
        } catch {}
        sourceNodeRef.current = null;
      }
      if (analyserRef.current) {
        try {
          analyserRef.current.disconnect();
        } catch {}
        analyserRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }

      // Total release of all known tracks
      allKnownTracksRef.current.forEach((t) => {
        try {
          t.enabled = false;
          t.stop();
        } catch {}
      });
      allKnownTracksRef.current.clear();

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => {
          try {
            t.enabled = false;
            t.stop();
          } catch {}
        });
        streamRef.current = null;
      }

      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
        videoRef.current.srcObject = null;
      }

      releaseAllMediaDevices();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCameraChange = (deviceId: string) => {
    setSelectedCameraId(deviceId);
    initStream(deviceId);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video md:aspect-[16/10] bg-[#160A29] rounded-2xl overflow-hidden shadow-lg flex flex-col items-center justify-center group select-none border-0"
    >
      {/* Video or Error / Camera Off Viewport */}
      {hasPermissionError ? (
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 text-stone-200">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400">
            <VideoOff className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-white">Camera Access Needed</h4>
            <p className="text-xs text-stone-300 max-w-sm mt-1 leading-relaxed">
              Please grant camera and microphone permissions in your browser to monitor posture and self-record.
            </p>
          </div>
          <button
            type="button"
            onClick={() => initStream()}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all cursor-pointer shadow-sm border-0"
          >
            Grant Permissions
          </button>
        </div>
      ) : effectiveVideoOff ? (
        /* Camera Off Aesthetic Placeholder (Hardware Truly Released) */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 z-10 bg-[#160A29]">
          <div className="w-16 h-16 rounded-3xl bg-[#251042] flex items-center justify-center text-rose-400 shadow-inner">
            <VideoOff className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base sm:text-lg text-white">Camera is Turned Off</h4>
            <p className="text-xs text-stone-300 max-w-sm leading-relaxed">
              Your camera hardware is fully released. Turn on your camera whenever you want to monitor posture, hand placement, and alignment while rehearsing.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleCamera}
            className="btn-tactile inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-dark text-white font-bold text-xs shadow-md shadow-accent/30 transition-all cursor-pointer active:scale-95 border-0"
          >
            <Camera className="w-4 h-4" />
            <span>Turn Camera On</span>
          </button>
        </div>
      ) : null}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-transform duration-200 ${
          effectiveVideoOff || hasPermissionError ? "hidden" : "block"
        } ${isMirrored ? "scale-x-[-1]" : "scale-x-100"}`}
      />

      {/* Recording Red Pulse Frame */}
      {isRecording && (
        <div className="absolute inset-0 border-2 border-rose-500/90 pointer-events-none rounded-2xl animate-pulse z-20" />
      )}

      {/* Top Floating Control Bar - Zero White Borders */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {isRecording ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-rose-950/60 animate-pulse border-0">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              Recording Active
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A0B2E]/90 text-stone-200 font-mono text-[10.5px] backdrop-blur-md shadow-md border-0">
              <span
                className={`w-2 h-2 rounded-full ${effectiveVideoOff ? "bg-rose-500" : "bg-emerald-400"}`}
              />
              {effectiveVideoOff ? "Camera Off" : "Live Camera"}
            </span>
          )}
        </div>

        {/* Action Controls & Media Toggles Dock - Zero White Borders */}
        <div className="flex items-center gap-1.5 bg-[#1A0B2E]/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border-0">
          {/* Camera On/Off Toggle Button */}
          <button
            type="button"
            onClick={toggleCamera}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 border-0 ${
              effectiveVideoOff
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-sm"
                : "bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200"
            }`}
            title={effectiveVideoOff ? "Turn Camera On" : "Turn Camera Off (Releases Hardware)"}
          >
            {effectiveVideoOff ? <VideoOff className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5 text-accent" />}
            <span className="text-[11px]">{effectiveVideoOff ? "Cam Off" : "Cam On"}</span>
          </button>

          {/* Mic On/Off Toggle Button */}
          <button
            type="button"
            onClick={toggleMic}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 border-0 ${
              effectiveMicMuted
                ? "bg-rose-600 hover:bg-rose-500 text-white shadow-sm"
                : "bg-[#2A134A] hover:bg-[#3D1D69] text-stone-200"
            }`}
            title={effectiveMicMuted ? "Unmute Microphone" : "Mute Microphone (Releases Hardware)"}
          >
            {effectiveMicMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-accent" />}
            <span className="text-[11px]">{effectiveMicMuted ? "Mic Off" : "Mic On"}</span>
          </button>

          {/* Mirror Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsMirrored((m) => !m)}
            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer border-0 ${
              isMirrored ? "bg-accent/25 text-accent" : "text-stone-300 hover:text-white"
            }`}
            title={isMirrored ? "Mirror Mode: ON (Natural View)" : "Mirror Mode: OFF"}
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-xs text-stone-300 hover:text-white transition-all cursor-pointer border-0"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Bottom Floating Info Bar - Zero White Borders */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-20 pointer-events-auto">
        {cameras.length > 1 && !effectiveVideoOff && (
          <div className="flex items-center gap-1.5 bg-[#1A0B2E]/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-xs text-stone-200 shadow-md border-0">
            <Camera className="w-3.5 h-3.5 text-accent" />
            <select
              value={selectedCameraId}
              onChange={(e) => handleCameraChange(e.target.value)}
              className="bg-transparent text-[11px] text-stone-200 outline-none cursor-pointer max-w-[140px] truncate border-0"
            >
              {cameras.map((cam, idx) => (
                <option key={cam.deviceId || idx} value={cam.deviceId} className="bg-[#1A0B2E]">
                  {cam.label || `Camera ${idx + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Live Audio Level VU Meter / Click to Mute or Unmute */}
        <button
          type="button"
          onClick={toggleMic}
          className={`flex items-center gap-2 backdrop-blur-md px-3 py-1.5 rounded-xl ml-auto transition-all cursor-pointer active:scale-95 shadow-md border-0 ${
            effectiveMicMuted
              ? "bg-rose-950/90 text-rose-200 hover:bg-rose-900"
              : "bg-[#1A0B2E]/90 text-stone-200 hover:bg-[#2A134A]"
          }`}
          title={effectiveMicMuted ? "Microphone is Off. Click to Unmute" : "Microphone is Live. Click to Mute"}
        >
          {effectiveMicMuted ? (
            <>
              <MicOff className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wider">
                Muted (Click to Unmute)
              </span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5 text-accent shrink-0" />
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 10 }).map((_, i) => {
                  const threshold = (i + 1) * 10;
                  const isActive = audioLevel >= threshold;
                  const isPeak = i >= 8;
                  const isMid = i >= 5 && i < 8;

                  return (
                    <div
                      key={i}
                      className={`w-1 h-3 rounded-full transition-all duration-75 ${
                        isActive
                          ? isPeak
                            ? "bg-rose-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"
                            : isMid
                            ? "bg-accent shadow-[0_0_6px_rgba(255,120,3,0.6)]"
                            : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]"
                          : "bg-[#2F194E]"
                      }`}
                    />
                  );
                })}
              </div>
              <span className="text-[9px] font-mono text-stone-300">Live</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
