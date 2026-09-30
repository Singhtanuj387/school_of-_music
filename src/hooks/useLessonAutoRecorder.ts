"use client";

import { useEffect, useRef, useCallback } from "react";
import { Room, RoomEvent, Track, RemoteTrack, RemoteParticipant } from "livekit-client";

interface UseLessonAutoRecorderProps {
  room: Room | undefined | null;
  lessonId: string;
  isTeacher: boolean;
  partnerName: string;
  instrument: string;
}

/**
 * useLessonAutoRecorder
 *
 * Automatically records lesson screen/stage and mixed audio (teacher + student).
 *
 * Features:
 * - 100% silent & discreet in the UI (no distracting indicators).
 * - Highly optimized for zero server impact and minimal client CPU:
 *   - Resolution: 854x480 (480p widescreen).
 *   - Framerate: 15 fps (smooth musical visual feedback, low CPU).
 *   - Bitrate: 450 kbps video + 64 kbps Opus audio (~3.5 MB per 10 minutes).
 * - Web Audio AudioContext mixes local mic and remote audio tracks in real-time.
 * - Slices into memory chunks.
 * - On room exit, automatically POSTs to /api/lessons/[id]/recording which uploads
 *   to Google Drive (with local disk fallback).
 */
export function useLessonAutoRecorder({
  room,
  lessonId,
  isTeacher,
  partnerName,
  instrument,
}: UseLessonAutoRecorderProps) {
  // Only the teacher records to avoid duplicate server uploads and save client resources.
  // If teacher is present, they act as the recording host.
  const isRecorderRole = isTeacher;

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const isRecordingRef = useRef(false);
  const recordingStartTimeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioDestinationRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const hasUploadedRef = useRef(false);

  // Hidden DOM video elements to capture live frames for the offscreen canvas
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement | null>(null);

  // Audio track sources map to disconnect on leave
  const audioSourcesMapRef = useRef<Map<string, MediaStreamAudioSourceNode>>(new Map());

  // Function to finalize and upload recording
  const uploadRecording = useCallback(async () => {
    if (hasUploadedRef.current || recordedChunksRef.current.length === 0) return;
    hasUploadedRef.current = true;

    try {
      const mimeType = mediaRecorderRef.current?.mimeType || "video/webm";
      const blob = new Blob(recordedChunksRef.current, { type: mimeType });

      if (blob.size < 1000) {
        // Less than 1KB, likely empty recording
        return;
      }

      const durationSeconds = Math.round(
        (Date.now() - (recordingStartTimeRef.current || Date.now())) / 1000,
      );

      const formData = new FormData();
      formData.append(
        "file",
        blob,
        `lesson_${lessonId}_${Date.now()}.webm`,
      );
      formData.append("durationSeconds", String(durationSeconds));

      // Use keepalive fetch so the upload completes even during page navigation
      fetch(`/api/lessons/${lessonId}/recording`, {
        method: "POST",
        body: formData,
        keepalive: true,
      }).catch((err) => {
        console.warn("[AutoRecorder] Upload request failed:", err);
      });
    } catch (err) {
      console.warn("[AutoRecorder] Error preparing upload:", err);
    }
  }, [lessonId]);

  // Teardown and stop recorder
  const stopRecording = useCallback(() => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;

    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // Ignore
      }
    }

    // Clean up audio context
    try {
      audioSourcesMapRef.current.forEach((src) => src.disconnect());
      audioSourcesMapRef.current.clear();
      audioContextRef.current?.close();
    } catch {
      // Ignore
    }

    // Upload after stopping
    setTimeout(() => {
      uploadRecording();
    }, 300);
  }, [uploadRecording]);

  useEffect(() => {
    if (!isRecorderRole || !room || !lessonId) return;

    // Check MediaRecorder browser support
    if (typeof window === "undefined" || !window.MediaRecorder) {
      console.warn("[AutoRecorder] MediaRecorder not supported in this browser.");
      return;
    }

    let isCleanedUp = false;

    // Helper: Create hidden video element
    const createHiddenVideo = () => {
      const el = document.createElement("video");
      el.muted = true;
      el.autoplay = true;
      el.playsInline = true;
      el.style.display = "none";
      document.body.appendChild(el);
      return el;
    };

    localVideoRef.current = createHiddenVideo();
    remoteVideoRef.current = createHiddenVideo();
    screenShareVideoRef.current = createHiddenVideo();

    // 1. Initialize AudioContext and Destination
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioCtx = new AudioCtx();
    audioContextRef.current = audioCtx;
    const destination = audioCtx.createMediaStreamDestination();
    audioDestinationRef.current = destination;

    // 2. Connect audio tracks to destination
    const addAudioTrack = (track: MediaStreamTrack, id: string) => {
      if (isCleanedUp || audioSourcesMapRef.current.has(id)) return;
      try {
        const stream = new MediaStream([track]);
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(destination);
        audioSourcesMapRef.current.set(id, source);
      } catch (err) {
        console.warn("[AutoRecorder] Could not connect audio track:", err);
      }
    };

    const removeAudioTrack = (id: string) => {
      const source = audioSourcesMapRef.current.get(id);
      if (source) {
        try {
          source.disconnect();
        } catch {
          // Ignore
        }
        audioSourcesMapRef.current.delete(id);
      }
    };

    // 3. Connect existing local mic
    const checkLocalTracks = () => {
      if (!room.localParticipant) return;
      for (const pub of room.localParticipant.audioTrackPublications.values()) {
        if (pub.track?.mediaStreamTrack) {
          addAudioTrack(pub.track.mediaStreamTrack, "local_audio");
        }
      }
      for (const pub of room.localParticipant.videoTrackPublications.values()) {
        if (pub.track?.mediaStreamTrack && localVideoRef.current) {
          if (pub.source === Track.Source.ScreenShare) {
            screenShareVideoRef.current!.srcObject = new MediaStream([pub.track.mediaStreamTrack]);
            screenShareVideoRef.current!.play().catch(() => {});
          } else if (pub.source === Track.Source.Camera) {
            localVideoRef.current.srcObject = new MediaStream([pub.track.mediaStreamTrack]);
            localVideoRef.current.play().catch(() => {});
          }
        }
      }
    };

    // 4. Connect remote participant tracks
    const handleTrackSubscribed = (
      track: RemoteTrack,
      pub: unknown,
      participant: RemoteParticipant,
    ) => {
      if (track.kind === Track.Kind.Audio) {
        addAudioTrack(track.mediaStreamTrack, `remote_audio_${participant.identity}`);
      } else if (track.kind === Track.Kind.Video) {
        if (track.source === Track.Source.ScreenShare && screenShareVideoRef.current) {
          screenShareVideoRef.current.srcObject = new MediaStream([track.mediaStreamTrack]);
          screenShareVideoRef.current.play().catch(() => {});
        } else if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = new MediaStream([track.mediaStreamTrack]);
          remoteVideoRef.current.play().catch(() => {});
        }
      }
    };

    const handleTrackUnsubscribed = (
      track: RemoteTrack,
      pub: unknown,
      participant: RemoteParticipant,
    ) => {
      if (track.kind === Track.Kind.Audio) {
        removeAudioTrack(`remote_audio_${participant.identity}`);
      }
    };

    room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
    room.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);

    // 5. Canvas Compositing Engine (854x480 @ 15fps)
    const canvas = document.createElement("canvas");
    canvas.width = 854;
    canvas.height = 480;
    const ctx = canvas.getContext("2d", { alpha: false });

    let lastDrawTime = 0;
    const frameInterval = 1000 / 15; // 15 fps for high performance & moderate file size

    const drawFrame = (timestamp: number) => {
      if (isCleanedUp || !ctx) return;

      if (timestamp - lastDrawTime >= frameInterval) {
        lastDrawTime = timestamp;

        // Background: Gandharva luxury dark stage theme
        const grad = ctx.createLinearGradient(0, 0, 854, 480);
        grad.addColorStop(0, "#0E0C18");
        grad.addColorStop(1, "#160A29");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 854, 480);

        const hasScreenShare =
          screenShareVideoRef.current &&
          screenShareVideoRef.current.readyState >= 2 &&
          !screenShareVideoRef.current.paused;

        const hasLocalVideo =
          localVideoRef.current &&
          localVideoRef.current.readyState >= 2 &&
          !localVideoRef.current.paused;

        const hasRemoteVideo =
          remoteVideoRef.current &&
          remoteVideoRef.current.readyState >= 2 &&
          !remoteVideoRef.current.paused;

        if (hasScreenShare) {
          // Screen share dominant layout
          try {
            ctx.drawImage(screenShareVideoRef.current!, 0, 0, 854, 480);
          } catch {
            // Ignore frame render issue
          }

          // Small Picture-in-Picture for speakers in corner
          if (hasLocalVideo) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(16, 320, 192, 108);
            try {
              ctx.drawImage(localVideoRef.current!, 16, 320, 192, 108);
            } catch {}
          }
          if (hasRemoteVideo) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(646, 320, 192, 108);
            try {
              ctx.drawImage(remoteVideoRef.current!, 646, 320, 192, 108);
            } catch {}
          }
        } else if (hasLocalVideo && hasRemoteVideo) {
          // Side-by-side balanced stage layout (419px width each, 8px center gap)
          const feedWidth = 419;
          const feedHeight = 440;
          const feedY = 20;

          // Left feed: Teacher
          ctx.save();
          ctx.beginPath();
          ctx.rect(12, feedY, feedWidth, feedHeight);
          ctx.clip();
          try {
            ctx.drawImage(localVideoRef.current!, 12, feedY, feedWidth, feedHeight);
          } catch {}
          ctx.restore();

          // Right feed: Student
          ctx.save();
          ctx.beginPath();
          ctx.rect(423, feedY, feedWidth, feedHeight);
          ctx.clip();
          try {
            ctx.drawImage(remoteVideoRef.current!, 423, feedY, feedWidth, feedHeight);
          } catch {}
          ctx.restore();

          // Badges
          ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
          ctx.fillRect(20, 420, 140, 24);
          ctx.fillRect(431, 420, 160, 24);

          ctx.fillStyle = "#E7C976";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText("Teacher (Instructor)", 26, 436);
          ctx.fillText(partnerName || "Student", 437, 436);
        } else if (hasLocalVideo) {
          // Only local active
          try {
            ctx.drawImage(localVideoRef.current!, 167, 30, 520, 390);
          } catch {}
        } else if (hasRemoteVideo) {
          // Only remote active
          try {
            ctx.drawImage(remoteVideoRef.current!, 167, 30, 520, 390);
          } catch {}
        }

        // Discreet watermark in header
        ctx.fillStyle = "rgba(231, 201, 118, 0.4)";
        ctx.font = "10px sans-serif";
        ctx.fillText(
          `Gandharva School of Music • ${instrument || "Class"} Session`,
          16,
          16,
        );
      }

      animationFrameIdRef.current = requestAnimationFrame(drawFrame);
    };

    // 6. Start Recording Stream
    const startMediaRecording = () => {
      if (isCleanedUp || isRecordingRef.current) return;

      checkLocalTracks();

      // Check remote participants already in room
      room.remoteParticipants.forEach((p) => {
        p.trackPublications.forEach((pub) => {
          if (pub.track) {
            handleTrackSubscribed(pub.track as RemoteTrack, pub, p);
          }
        });
      });

      // Capture canvas stream at 15fps
      const canvasStream = canvas.captureStream(15);
      const audioTrack = destination.stream.getAudioTracks()[0];

      const tracksToRecord: MediaStreamTrack[] = [...canvasStream.getVideoTracks()];
      if (audioTrack) {
        tracksToRecord.push(audioTrack);
      }

      const combinedStream = new MediaStream(tracksToRecord);

      // Select mime type
      const mimeTypes = [
        "video/webm;codecs=vp8,opus",
        "video/webm;codecs=vp9,opus",
        "video/webm",
        "video/mp4",
      ];
      const selectedMime =
        mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || "";

      try {
        const recorder = new MediaRecorder(combinedStream, {
          mimeType: selectedMime || undefined,
          videoBitsPerSecond: 450_000, // 450 kbps moderate quality, highly optimized
          audioBitsPerSecond: 64_000,  // 64 kbps Opus
        });

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = () => {
          uploadRecording();
        };

        // Slice every 10 seconds into chunks to ensure data availability
        recorder.start(10000);
        mediaRecorderRef.current = recorder;
        isRecordingRef.current = true;
        recordingStartTimeRef.current = Date.now();

        // Start render loop
        animationFrameIdRef.current = requestAnimationFrame(drawFrame);
      } catch (recErr) {
        console.warn("[AutoRecorder] Failed to start MediaRecorder:", recErr);
      }
    };

    if (room.state === "connected") {
      startMediaRecording();
    } else {
      room.once(RoomEvent.Connected, startMediaRecording);
    }

    // Teardown when room leaves or unmounts
    const handleBeforeUnload = () => {
      stopRecording();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      isCleanedUp = true;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handleBeforeUnload);

      room.off(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      room.off(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);

      stopRecording();

      // Clean up hidden video elements
      if (localVideoRef.current?.parentNode) {
        localVideoRef.current.parentNode.removeChild(localVideoRef.current);
      }
      if (remoteVideoRef.current?.parentNode) {
        remoteVideoRef.current.parentNode.removeChild(remoteVideoRef.current);
      }
      if (screenShareVideoRef.current?.parentNode) {
        screenShareVideoRef.current.parentNode.removeChild(screenShareVideoRef.current);
      }
    };
  }, [isRecorderRole, room, lessonId, instrument, partnerName, stopRecording, uploadRecording]);

  return {
    stopAndUpload: stopRecording,
  };
}
