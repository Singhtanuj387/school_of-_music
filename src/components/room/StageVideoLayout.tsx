"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  TrackReferenceOrPlaceholder,
  useTracks,
  useLocalParticipant,
  VideoTrack,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { TurnTakingState } from "./TurnTakingControls";
import { AudioMode } from "@/lib/audio-engine";
import {
  MultiCameraState,
  CAMERA_ANGLE_PRESETS,
  CameraAnglePreset,
  MultiCamLayoutMode,
} from "@/hooks/useMultiCamera";
import {
  FlipHorizontal,
  ArrowRightLeft,
  Columns,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Video as VideoIcon,
} from "lucide-react";

interface StageVideoLayoutProps {
  activeFloorState: TurnTakingState;
  isTeacher: boolean;
  audioMode: AudioMode;
  availableCameras: MediaDeviceInfo[];
  selectedCameraId: string;
  onCameraDeviceSwitch: (deviceId: string) => void;
  multiCam?: MultiCameraState;
}

export function StageVideoLayout({
  activeFloorState,
  isTeacher,
  audioMode,
  availableCameras,
  selectedCameraId,
  onCameraDeviceSwitch,
  multiCam,
}: StageVideoLayoutProps) {
  const { localParticipant } = useLocalParticipant();
  const [manuallyPinnedSid, setManuallyPinnedSid] = useState<string | null>(null);
  const [swappedDualAngle, setSwappedDualAngle] = useState(false);

  // Track subscriptions: fetch all published camera and screenshare tracks
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );

  const screenShareTrack = tracks.find(
    (t) => t.source === Track.Source.ScreenShare,
  );

  // Helper to identify secondary camera tracks (name === "secondary-camera")
  const isSecondaryTrack = (t: TrackReferenceOrPlaceholder) =>
    t.publication?.trackName === "secondary-camera";

  // Local camera tracks
  const localPrimaryTrack = tracks.find(
    (t) =>
      t.participant.identity === localParticipant.identity &&
      t.source === Track.Source.Camera &&
      !isSecondaryTrack(t),
  );

  const localSecondaryTrack = tracks.find(
    (t) =>
      t.participant.identity === localParticipant.identity &&
      t.source === Track.Source.Camera &&
      isSecondaryTrack(t),
  );

  // Remote camera tracks
  const remoteCameraTracks = tracks.filter(
    (t) =>
      t.participant.identity !== localParticipant.identity &&
      t.source === Track.Source.Camera,
  );

  // Remote primary & secondary
  const remotePrimaryTracks = remoteCameraTracks.filter((t) => !isSecondaryTrack(t));
  const remoteSecondaryTracks = remoteCameraTracks.filter((t) => isSecondaryTrack(t));

  const isGroupMode = remotePrimaryTracks.length > 1;

  // Layout mode from multiCam or default to SIDE_BY_SIDE
  const stageLayoutMode: MultiCamLayoutMode = multiCam?.layoutMode || "SIDE_BY_SIDE";

  // ─── 1. SCREEN SHARE LAYOUT ───────────────────────────────────────────────
  if (screenShareTrack) {
    const isLocalScreen =
      screenShareTrack.participant.identity === localParticipant.identity;

    // Collect all camera tracks for sidebar
    const allCameraTracks: {
      track: TrackReferenceOrPlaceholder;
      isLocal: boolean;
      isSecondary: boolean;
      angleLabel?: string;
    }[] = [];

    remotePrimaryTracks.forEach((rt) => {
      allCameraTracks.push({
        track: rt,
        isLocal: false,
        isSecondary: false,
        angleLabel: "Face View",
      });
    });

    remoteSecondaryTracks.forEach((rt) => {
      allCameraTracks.push({
        track: rt,
        isLocal: false,
        isSecondary: true,
        angleLabel: "Hands / Instrument",
      });
    });

    if (localPrimaryTrack) {
      allCameraTracks.push({
        track: localPrimaryTrack,
        isLocal: true,
        isSecondary: false,
        angleLabel: "Your Camera",
      });
    }

    if (localSecondaryTrack) {
      allCameraTracks.push({
        track: localSecondaryTrack,
        isLocal: true,
        isSecondary: true,
        angleLabel:
          CAMERA_ANGLE_PRESETS.find((p) => p.id === multiCam?.secondaryAnglePreset)?.shortLabel ||
          "Hands Cam",
      });
    }

    return (
      <div className="relative w-full h-full flex-1 bg-[#0E0C18] p-2 sm:p-4 flex flex-col md:flex-row gap-3 overflow-hidden">
        {/* Main Stage: High-Fidelity Screen Share */}
        <div className="relative flex-1 bg-[#161226] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 min-h-[300px]">
          <StageTile
            trackRef={screenShareTrack}
            isDominant={true}
            isLocal={isLocalScreen}
            audioMode={audioMode}
            availableCameras={availableCameras}
            selectedCameraId={selectedCameraId}
            onCameraDeviceSwitch={onCameraDeviceSwitch}
            onStopScreenShare={() => {
              localParticipant.setScreenShareEnabled(false).catch(() => {});
            }}
          />
        </div>

        {/* Sidebar Strip: All Camera Feeds (Primary + Secondary) */}
        <div className="w-full md:w-72 lg:w-80 flex flex-row md:flex-col gap-3 flex-shrink-0 overflow-x-auto md:overflow-y-auto">
          {allCameraTracks.length > 0 ? (
            allCameraTracks.map((item) => (
              <div
                key={item.track.publication?.trackSid || item.track.participant.sid + (item.isSecondary ? "_sec" : "_pri")}
                className="relative flex-1 min-h-[140px] md:min-h-[170px] bg-[#161226] rounded-2xl overflow-hidden shadow-xl shadow-black/50 flex-shrink-0"
              >
                <StageTile
                  trackRef={item.track}
                  isDominant={false}
                  isLocal={item.isLocal}
                  isSecondary={item.isSecondary}
                  customAngleLabel={item.angleLabel}
                  audioMode={audioMode}
                  availableCameras={availableCameras}
                  selectedCameraId={selectedCameraId}
                  onCameraDeviceSwitch={onCameraDeviceSwitch}
                  multiCam={multiCam}
                />
              </div>
            ))
          ) : (
            <div className="relative flex-1 min-h-[140px] md:min-h-[170px] bg-[#161226]/60 rounded-2xl flex items-center justify-center p-4 text-center flex-shrink-0">
              <div className="space-y-1.5">
                <span className="text-2xl block text-cta font-serif font-black">♪</span>
                <p className="text-xs text-stone-400 font-medium">Waiting for camera streams...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── 2. GROUP COURSE MODE (Multiple Remote Participants) ───────────────────
  if (isGroupMode) {
    let mainStageTrack: TrackReferenceOrPlaceholder | undefined;

    if (manuallyPinnedSid) {
      mainStageTrack = tracks.find((t) => t.publication?.trackSid === manuallyPinnedSid || t.participant.sid === manuallyPinnedSid);
    }
    if (!mainStageTrack) {
      mainStageTrack = remotePrimaryTracks[0];
    }

    // Gallery: all other camera tracks (remote + local)
    const galleryTracks = tracks.filter(
      (t) =>
        t.source === Track.Source.Camera &&
        t.publication?.trackSid !== mainStageTrack?.publication?.trackSid,
    );

    return (
      <div className="relative w-full h-full flex-1 bg-[#0E0C18] p-2 sm:p-4 flex flex-col md:flex-row gap-3 overflow-hidden">
        {/* Main Stage */}
        <div className="relative flex-1 bg-[#161226] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 min-h-[300px] flex items-center justify-center">
          {mainStageTrack ? (
            <StageTile
              trackRef={mainStageTrack}
              isDominant
              isLocal={mainStageTrack.participant.identity === localParticipant.identity}
              isSecondary={isSecondaryTrack(mainStageTrack)}
              audioMode={audioMode}
              availableCameras={availableCameras}
              selectedCameraId={selectedCameraId}
              onCameraDeviceSwitch={onCameraDeviceSwitch}
              multiCam={multiCam}
            />
          ) : (
            <div className="text-center p-6 space-y-3 max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-[#201A36] text-cta flex items-center justify-center text-3xl mx-auto shadow-lg font-serif font-black">
                ♪
              </div>
              <p className="text-white font-serif text-lg font-bold">Waiting for participants...</p>
            </div>
          )}

          {/* Group mode badge */}
          <div className="absolute top-2.5 left-2.5 z-20 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-xl text-xs text-white font-bold shadow-lg flex items-center gap-1.5">
            <span>👥</span>
            <span>{remotePrimaryTracks.length + 1} in classroom</span>
          </div>
        </div>

        {/* Gallery Strip */}
        <div className="w-full md:w-72 lg:w-80 flex flex-row md:flex-col gap-3 flex-shrink-0 overflow-x-auto md:overflow-y-auto scrollbar-thin">
          {galleryTracks.map((gt) => {
            const sid = gt.publication?.trackSid || gt.participant.sid;
            const isLocal = gt.participant.identity === localParticipant.identity;
            const isSec = isSecondaryTrack(gt);
            return (
              <div
                key={sid}
                onClick={() => setManuallyPinnedSid(sid)}
                className="relative flex-1 min-h-[140px] md:min-h-[155px] bg-[#161226] rounded-2xl overflow-hidden shadow-xl shadow-black/50 flex-shrink-0 cursor-pointer group transition-all hover:scale-[1.01] border-0"
                title="Click to pin to main stage"
              >
                <StageTile
                  trackRef={gt}
                  isDominant={false}
                  isLocal={isLocal}
                  isSecondary={isSec}
                  audioMode={audioMode}
                  availableCameras={availableCameras}
                  selectedCameraId={selectedCameraId}
                  onCameraDeviceSwitch={onCameraDeviceSwitch}
                  multiCam={multiCam}
                />
                <div className="absolute top-1.5 right-1.5 bg-black/80 px-2 py-0.5 rounded-lg text-[9px] font-semibold text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  Pin to stage
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ─── 3. 1:1 LESSON WITH MULTI-CAMERA DUAL-ANGLE STAGE ──────────────────────
  const remotePrimary = remotePrimaryTracks[0];
  const remoteSecondary = remoteSecondaryTracks.find(
    (t) => t.participant.identity === remotePrimary?.participant.identity,
  );

  // Determine dominant participant by turn-taking or manual pin
  let dominantIsLocal = false;

  if (manuallyPinnedSid) {
    dominantIsLocal =
      manuallyPinnedSid === localPrimaryTrack?.publication?.trackSid ||
      manuallyPinnedSid === localSecondaryTrack?.publication?.trackSid ||
      manuallyPinnedSid === localParticipant.sid;
  } else {
    // Pedagogy priority: teacher playing -> teacher dominant, student playing -> student dominant
    dominantIsLocal =
      (isTeacher && activeFloorState === "TEACHER_PLAYING") ||
      (!isTeacher && activeFloorState === "STUDENT_PLAYING");
  }

  // Determine dominant pair
  const dominantPrimary = dominantIsLocal ? localPrimaryTrack : remotePrimary;
  const dominantSecondary = dominantIsLocal ? localSecondaryTrack : remoteSecondary;

  // Non-dominant pair (in sidebar)
  const secondaryParticipantPrimary = dominantIsLocal ? remotePrimary : localPrimaryTrack;
  const secondaryParticipantSecondary = dominantIsLocal ? remoteSecondary : localSecondaryTrack;

  // Has dominant participant enabled dual camera angles?
  const isDominantDualCamActive = Boolean(dominantPrimary && dominantSecondary);

  // Primary angle vs secondary angle order when swapped
  const firstAngleTrack = swappedDualAngle ? dominantSecondary : dominantPrimary;
  const secondAngleTrack = swappedDualAngle ? dominantPrimary : dominantSecondary;

  return (
    <div className="relative w-full h-full flex-1 bg-[#0E0C18] p-2 sm:p-4 flex flex-col md:flex-row gap-3 overflow-hidden">
      {/* ─── MAIN STAGE CONTAINER ─────────────────────────────────────────── */}
      <div className="relative flex-1 bg-[#161226] rounded-2xl overflow-hidden shadow-2xl shadow-black/60 min-h-[300px] flex flex-col">
        {/* Floating Multi-Angle Quick Controls (when dominant has 2 angles) */}
        {isDominantDualCamActive && (
          <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 bg-[#140A26]/90 backdrop-blur-md p-1 rounded-2xl shadow-2xl border-0">
            {/* Side-by-Side Dual View */}
            <button
              type="button"
              onClick={() => multiCam?.setLayoutMode("SIDE_BY_SIDE")}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                stageLayoutMode === "SIDE_BY_SIDE"
                  ? "bg-cta text-white shadow-xs font-bold"
                  : "bg-transparent hover:bg-white/10 text-stone-300"
              }`}
              title="Side-by-Side Dual Angle (50/50)"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dual View</span>
            </button>

            {/* Picture-in-Picture Inset */}
            <button
              type="button"
              onClick={() => multiCam?.setLayoutMode("PIP")}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                stageLayoutMode === "PIP"
                  ? "bg-cta text-white shadow-xs font-bold"
                  : "bg-transparent hover:bg-white/10 text-stone-300"
              }`}
              title="Corner Picture-in-Picture Inset"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PiP</span>
            </button>

            {/* Swap Angles Button */}
            <button
              type="button"
              onClick={() => setSwappedDualAngle((prev) => !prev)}
              className="px-2 py-1 rounded-xl bg-[#251245] hover:bg-[#341A5E] text-accent text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer active:scale-95 ml-1"
              title="Swap Left/Right or Main/Inset Camera Angles"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Swap</span>
            </button>
          </div>
        )}

        {/* ─── SCENARIO A: DUAL-ANGLE SIDE-BY-SIDE (50/50 DUAL STAGE) ───────── */}
        {isDominantDualCamActive && stageLayoutMode === "SIDE_BY_SIDE" && firstAngleTrack && secondAngleTrack ? (
          <div className="w-full h-full flex flex-col md:flex-row gap-2 sm:gap-3 p-2 flex-1">
            {/* Angle 1 (e.g. Face / Vocal) */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-[#0E0C18] shadow-lg">
              <StageTile
                trackRef={firstAngleTrack}
                isDominant
                isLocal={firstAngleTrack.participant.identity === localParticipant.identity}
                isSecondary={isSecondaryTrack(firstAngleTrack)}
                customAngleLabel={
                  isSecondaryTrack(firstAngleTrack)
                    ? CAMERA_ANGLE_PRESETS.find((p) => p.id === multiCam?.secondaryAnglePreset)?.shortLabel || "Hands Cam"
                    : "Face & Posture"
                }
                audioMode={audioMode}
                availableCameras={availableCameras}
                selectedCameraId={selectedCameraId}
                onCameraDeviceSwitch={onCameraDeviceSwitch}
                multiCam={multiCam}
              />
            </div>

            {/* Angle 2 (e.g. Hands / Keys / Fretboard) */}
            <div className="relative flex-1 rounded-xl overflow-hidden bg-[#0E0C18] shadow-lg">
              <StageTile
                trackRef={secondAngleTrack}
                isDominant
                isLocal={secondAngleTrack.participant.identity === localParticipant.identity}
                isSecondary={isSecondaryTrack(secondAngleTrack)}
                customAngleLabel={
                  isSecondaryTrack(secondAngleTrack)
                    ? CAMERA_ANGLE_PRESETS.find((p) => p.id === multiCam?.secondaryAnglePreset)?.shortLabel || "Hands Cam"
                    : "Face & Posture"
                }
                audioMode={audioMode}
                availableCameras={availableCameras}
                selectedCameraId={selectedCameraId}
                onCameraDeviceSwitch={onCameraDeviceSwitch}
                multiCam={multiCam}
              />
            </div>
          </div>
        ) : isDominantDualCamActive && stageLayoutMode === "PIP" && firstAngleTrack && secondAngleTrack ? (
          /* ─── SCENARIO B: PICTURE-IN-PICTURE (MAIN STAGE + FLOATING INSET) ─── */
          <div className="relative w-full h-full flex-1">
            {/* Full Stage Dominant Angle */}
            <StageTile
              trackRef={firstAngleTrack}
              isDominant
              isLocal={firstAngleTrack.participant.identity === localParticipant.identity}
              isSecondary={isSecondaryTrack(firstAngleTrack)}
              customAngleLabel={
                isSecondaryTrack(firstAngleTrack)
                  ? CAMERA_ANGLE_PRESETS.find((p) => p.id === multiCam?.secondaryAnglePreset)?.shortLabel || "Hands Cam"
                  : "Main Angle"
              }
              audioMode={audioMode}
              availableCameras={availableCameras}
              selectedCameraId={selectedCameraId}
              onCameraDeviceSwitch={onCameraDeviceSwitch}
              multiCam={multiCam}
            />

            {/* Floating PiP Corner Inset */}
            <div
              onClick={() => setSwappedDualAngle((prev) => !prev)}
              className="absolute bottom-12 right-3 w-44 sm:w-56 aspect-video bg-[#0E0C18] rounded-xl overflow-hidden shadow-2xl border-0 z-20 cursor-pointer group transition-all hover:scale-105 active:scale-95"
              title="Click to swap with main stage view"
            >
              <StageTile
                trackRef={secondAngleTrack}
                isDominant={false}
                isLocal={secondAngleTrack.participant.identity === localParticipant.identity}
                isSecondary={isSecondaryTrack(secondAngleTrack)}
                customAngleLabel={
                  isSecondaryTrack(secondAngleTrack)
                    ? CAMERA_ANGLE_PRESETS.find((p) => p.id === multiCam?.secondaryAnglePreset)?.shortLabel || "Hands Cam"
                    : "Face Angle"
                }
                audioMode={audioMode}
                availableCameras={availableCameras}
                selectedCameraId={selectedCameraId}
                onCameraDeviceSwitch={onCameraDeviceSwitch}
                multiCam={multiCam}
              />
              <div className="absolute top-1.5 right-1.5 bg-black/80 px-2 py-0.5 rounded-md text-[9px] font-semibold text-stone-200 opacity-0 group-hover:opacity-100 transition-opacity">
                ⇄ Click to Swap
              </div>
            </div>
          </div>
        ) : dominantPrimary ? (
          /* ─── SCENARIO C: SINGLE ANGLE DOMINANT STAGE ──────────────────────── */
          <StageTile
            trackRef={dominantPrimary}
            isDominant
            isLocal={dominantPrimary.participant.identity === localParticipant.identity}
            isSecondary={isSecondaryTrack(dominantPrimary)}
            audioMode={audioMode}
            availableCameras={availableCameras}
            selectedCameraId={selectedCameraId}
            onCameraDeviceSwitch={onCameraDeviceSwitch}
            multiCam={multiCam}
          />
        ) : (
          /* Waiting State */
          <div className="text-center p-6 space-y-3 max-w-sm mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#201A36] text-cta flex items-center justify-center text-3xl mx-auto shadow-lg font-serif font-black">
              ♪
            </div>
            <p className="text-white font-serif text-lg font-bold">Waiting for partner to join...</p>
            <p className="text-xs text-stone-400 leading-relaxed">
              The studio classroom is active. When your partner connects, their audio and multi-camera angles will appear here.
            </p>
          </div>
        )}
      </div>

      {/* ─── SIDEBAR / SECONDARY PARTICIPANT STRIP ─────────────────────────── */}
      <div className="w-full md:w-80 flex flex-row md:flex-col gap-3 flex-shrink-0 overflow-x-auto md:overflow-y-auto">
        {secondaryParticipantPrimary ? (
          <div
            onClick={() => setManuallyPinnedSid(secondaryParticipantPrimary.publication?.trackSid || secondaryParticipantPrimary.participant.sid)}
            className="relative flex-1 min-h-[140px] md:min-h-[160px] bg-[#161226] rounded-2xl overflow-hidden shadow-xl shadow-black/50 cursor-pointer transition-all flex-shrink-0 group hover:scale-[1.01] border-0"
            title="Click to focus on main stage"
          >
            <StageTile
              trackRef={secondaryParticipantPrimary}
              isDominant={false}
              isLocal={secondaryParticipantPrimary.participant.identity === localParticipant.identity}
              isSecondary={false}
              customAngleLabel="Face View"
              audioMode={audioMode}
              availableCameras={availableCameras}
              selectedCameraId={selectedCameraId}
              onCameraDeviceSwitch={onCameraDeviceSwitch}
              multiCam={multiCam}
            />
            <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded-lg text-[9px] font-semibold text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Focus
            </div>
          </div>
        ) : (
          <div className="relative flex-1 min-h-[140px] md:min-h-[160px] bg-[#161226]/50 rounded-2xl flex items-center justify-center p-4 text-center border-0">
            <div className="space-y-1">
              <span className="text-xl block text-cta font-serif font-black">♪</span>
              <p className="text-xs text-stone-400 font-medium">Waiting for partner...</p>
            </div>
          </div>
        )}

        {/* Secondary Participant's Second Camera (if they also have multi-cam enabled) */}
        {secondaryParticipantSecondary && (
          <div
            onClick={() => setManuallyPinnedSid(secondaryParticipantSecondary.publication?.trackSid || secondaryParticipantSecondary.participant.sid)}
            className="relative flex-1 min-h-[140px] md:min-h-[160px] bg-[#161226] rounded-2xl overflow-hidden shadow-xl shadow-black/50 cursor-pointer transition-all flex-shrink-0 group hover:scale-[1.01] border-0"
            title="Click to focus on main stage"
          >
            <StageTile
              trackRef={secondaryParticipantSecondary}
              isDominant={false}
              isLocal={secondaryParticipantSecondary.participant.identity === localParticipant.identity}
              isSecondary={true}
              customAngleLabel={
                secondaryParticipantSecondary.participant.identity === localParticipant.identity
                  ? CAMERA_ANGLE_PRESETS.find((p) => p.id === multiCam?.secondaryAnglePreset)?.shortLabel || "Hands Cam"
                  : "Partner Hands Cam"
              }
              audioMode={audioMode}
              availableCameras={availableCameras}
              selectedCameraId={selectedCameraId}
              onCameraDeviceSwitch={onCameraDeviceSwitch}
              multiCam={multiCam}
            />
            <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded-lg text-[9px] font-semibold text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Focus
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StageTileProps {
  trackRef: TrackReferenceOrPlaceholder;
  isDominant: boolean;
  isLocal: boolean;
  isSecondary?: boolean;
  customAngleLabel?: string;
  audioMode: AudioMode;
  availableCameras: MediaDeviceInfo[];
  selectedCameraId: string;
  onCameraDeviceSwitch: (deviceId: string) => void;
  onStopScreenShare?: () => void;
  multiCam?: MultiCameraState;
}

function StageTile({
  trackRef,
  isDominant,
  isLocal,
  isSecondary = false,
  customAngleLabel,
  audioMode,
  availableCameras,
  selectedCameraId,
  onCameraDeviceSwitch,
  onStopScreenShare,
  multiCam,
}: StageTileProps) {
  const isVideoOff =
    !trackRef.publication ||
    trackRef.publication.isMuted ||
    !trackRef.publication.track;

  const isScreenShare = trackRef.source === Track.Source.ScreenShare;
  const tileContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [canPiP, setCanPiP] = useState(false);
  const [fitMode, setFitMode] = useState<"contain" | "cover">("contain");
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [localMirrorOverride, setLocalMirrorOverride] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined" && "pictureInPictureEnabled" in document) {
      setCanPiP(Boolean(document.pictureInPictureEnabled));
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === tileContainerRef.current);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!tileContainerRef.current) return;
    if (!document.fullscreenElement) {
      tileContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const togglePiP = async () => {
    try {
      const videoEl = tileContainerRef.current?.querySelector("video");
      if (!videoEl) return;
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiP(false);
      } else {
        await videoEl.requestPictureInPicture();
        setIsPiP(true);
      }
    } catch (err) {
      console.warn("PiP failed", err);
    }
  };

  let participantMetadata: { role?: string; instrument?: string; isTeacher?: boolean } = {};
  try {
    if (trackRef.participant.metadata) {
      participantMetadata = JSON.parse(trackRef.participant.metadata);
    }
  } catch {
    // Fallback
  }

  const isFaculty =
    participantMetadata.role === "TEACHER" ||
    participantMetadata.isTeacher === true;
  const isStudent =
    participantMetadata.role === "STUDENT" ||
    participantMetadata.isTeacher === false;

  const roleLabel = isFaculty
    ? "Faculty"
    : isStudent
    ? "Student"
    : participantMetadata.role || (isLocal ? "You" : "Participant");

  const displayName = trackRef.participant.name || trackRef.participant.identity;

  // Mirror calculation
  const shouldMirror = useMemo(() => {
    if (isScreenShare) return false;
    if (localMirrorOverride !== null) return localMirrorOverride;
    if (!isLocal) return false;
    if (isSecondary) return Boolean(multiCam?.isMirroredSecondary);
    return true; // Primary local camera mirrors by default
  }, [isScreenShare, localMirrorOverride, isLocal, isSecondary, multiCam?.isMirroredSecondary]);

  // Angle badge label
  const angleDisplay =
    customAngleLabel ||
    (isSecondary
      ? CAMERA_ANGLE_PRESETS.find((p) => p.id === multiCam?.secondaryAnglePreset)?.shortLabel || "Hands Cam"
      : "Face View");

  return (
    <div
      ref={tileContainerRef}
      className="relative w-full h-full bg-[#0E0C18] overflow-hidden select-none"
    >
      {/* Video stream */}
      {!isVideoOff && trackRef.publication?.track ? (
        <VideoTrack
          trackRef={trackRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: isScreenShare ? fitMode : "cover",
            backgroundColor: "#0E0C18",
            transform: isScreenShare
              ? `scale(${zoomScale})`
              : shouldMirror
              ? "scaleX(-1)"
              : "none",
            transformOrigin: "center center",
            transition: "transform 150ms ease-out",
          }}
          className={`absolute inset-0 w-full h-full ${
            isScreenShare
              ? `${fitMode === "contain" ? "object-contain" : "object-cover"} bg-[#0E0C18]`
              : "object-cover"
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 space-y-2">
          {isScreenShare ? (
            <div className="w-16 h-16 rounded-2xl bg-[#201A36] text-cta text-3xl flex items-center justify-center mx-auto shadow-lg">
              🖥️
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3C096C] to-[#160830] text-cta font-serif font-bold text-2xl flex items-center justify-center mx-auto shadow-xl">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <p className="text-xs text-stone-300 font-semibold">
            {isScreenShare ? (isLocal ? "Your Screen Share" : `${displayName}'s Screen`) : displayName}
          </p>
          <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-medium">
            {isScreenShare ? "Connecting Screen..." : isSecondary ? "Secondary Cam Off" : "Camera Off"}
          </span>
        </div>
      )}

      {/* Screen Share Header Bar */}
      {isScreenShare && (
        <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs text-cta font-semibold shadow-xl pointer-events-auto">
            <span>🖥️</span>
            <span className="text-white font-semibold truncate max-w-[120px] sm:max-w-[200px]">
              {isLocal ? "Your Screen" : `${displayName}'s Screen`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto bg-[#161226]/95 backdrop-blur-md p-1 rounded-2xl shadow-2xl">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFitMode((m) => (m === "contain" ? "cover" : "contain"));
              }}
              className="px-2.5 py-1 rounded-xl bg-[#201A36] hover:bg-[#2A2346] text-stone-200 hover:text-white text-xs font-semibold shadow transition-all cursor-pointer active:scale-95"
            >
              <span>{fitMode === "contain" ? "↕ Fit" : "↔ Fill"}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="px-2.5 py-1 rounded-xl bg-[#201A36] hover:bg-[#2A2346] text-stone-200 hover:text-white text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>{isFullscreen ? "🗗" : "⛶"}</span>
            </button>

            {isLocal && onStopScreenShare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStopScreenShare();
                }}
                className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>⏹</span>
                <span>Stop</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Floating Badge: Angle Label & Mirror Quick Toggle */}
      {!isScreenShare && (
        <div
          className={`absolute z-20 pointer-events-auto flex items-center gap-1.5 ${
            isDominant ? "top-2.5 left-2.5" : "top-1.5 left-1.5"
          }`}
        >
          {/* Angle Indicator Tag */}
          <div
            className={`flex items-center gap-1 bg-black/80 backdrop-blur-md rounded-xl font-bold shadow-lg border-0 ${
              isDominant ? "px-2.5 py-1 text-[11px]" : "px-2 py-0.5 text-[9px]"
            } ${
              isSecondary ? "text-accent" : "text-purple-300"
            }`}
          >
            <span>{isSecondary ? "🎹" : "📷"}</span>
            <span className="truncate max-w-[120px]">{angleDisplay}</span>
          </div>

          {/* Quick Mirror Toggle for Local Camera */}
          {isLocal && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLocalMirrorOverride(!shouldMirror);
              }}
              className={`bg-black/80 backdrop-blur-md rounded-xl text-stone-300 hover:text-white shadow-lg transition-all cursor-pointer ${
                isDominant ? "p-1.5 text-xs" : "p-1 text-[10px]"
              }`}
              title={shouldMirror ? "Disable Mirroring" : "Enable Mirroring"}
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Primary Camera Device Switcher (when multiple hardware webcams exist) */}
          {isLocal && !isSecondary && availableCameras.length > 1 && (
            <div
              className={`flex items-center gap-1 bg-black/80 backdrop-blur-md rounded-xl text-stone-300 shadow-lg ${
                isDominant ? "px-2 py-0.5 text-[10px]" : "px-1.5 py-0.5 text-[9px]"
              }`}
            >
              <select
                value={selectedCameraId}
                onChange={(e) => onCameraDeviceSwitch(e.target.value)}
                className="bg-transparent text-stone-200 font-medium focus:outline-none cursor-pointer truncate max-w-[90px] sm:max-w-[130px]"
                title="Switch Primary Camera Device"
              >
                {availableCameras.map((cam, i) => (
                  <option key={cam.deviceId} value={cam.deviceId} className="bg-[#161226] text-stone-200">
                    {cam.label || `Camera ${i + 1}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Bottom Status Bar */}
      {!isScreenShare && (
        <div
          className={`absolute flex items-center justify-between gap-1.5 pointer-events-none z-10 ${
            isDominant ? "bottom-2.5 left-2.5 right-2.5" : "bottom-1.5 left-1.5 right-1.5"
          }`}
        >
          {/* Left: Participant Name & Role Tag */}
          <div
            className={`flex items-center gap-1.5 bg-black/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden ${
              isDominant
                ? "px-3 py-1.5 text-xs max-w-[calc(100%-80px)]"
                : "px-2 py-1 text-[11px] max-w-[calc(100%-55px)]"
            }`}
          >
            <span
              className={`font-semibold text-white whitespace-nowrap truncate ${
                isDominant ? "max-w-[110px] sm:max-w-[180px]" : "max-w-[75px] sm:max-w-[110px]"
              }`}
            >
              {isLocal ? (isDominant ? `${displayName} (You)` : "You") : displayName}
            </span>
            <span
              className={`uppercase tracking-wider rounded-lg font-bold whitespace-nowrap flex-shrink-0 ${
                isDominant ? "text-[9px] px-2 py-0.5" : "text-[8px] px-1.5 py-0.5"
              } ${
                isFaculty ? "bg-primary/30 text-purple-200" : "bg-emerald-500/25 text-emerald-300"
              }`}
            >
              {roleLabel}
            </span>
          </div>

          {/* Right: Audio Mode Indicator (Local Track only) */}
          {isLocal && !isSecondary && (
            <div
              className={`flex items-center gap-1.5 bg-black/80 backdrop-blur-md rounded-xl text-cta font-semibold shadow-lg flex-shrink-0 whitespace-nowrap ${
                isDominant ? "px-2.5 py-1 text-[10px]" : "px-1.5 py-0.5 text-[9px]"
              }`}
              title={`Audio calibration: ${audioMode === "PLAYING" ? "48kHz Pure Tone" : "Speech Mode"}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{audioMode === "PLAYING" ? "48kHz" : isDominant ? "Speech" : "Mic"}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
