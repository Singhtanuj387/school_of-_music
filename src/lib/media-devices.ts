import { Room, LocalTrackPublication, LocalTrack } from "livekit-client";

/**
 * Universally and synchronously terminates all active MediaStreamTracks associated with:
 * 1. A LiveKit Room instance (local participant publications: mic, camera, screenshare).
 * 2. Any additional MediaStream, MediaStreamTrack, or LocalTrack passed in.
 * 3. Any active <video> or <audio> DOM elements with MediaStream srcObjects.
 *
 * This ensures browser camera and microphone hardware indicators (LEDs and OS recording dots)
 * turn off immediately upon exiting the lesson room or unmounting components.
 */
export function releaseAllMediaDevices(
  room?: Room | null,
  additionalStreamsOrTracks?: (
    | MediaStream
    | MediaStreamTrack
    | LocalTrack
    | null
    | undefined
  )[],
): void {
  try {
    // 1. Release all tracks published in the LiveKit room
    if (room && room.localParticipant) {
      const participant = room.localParticipant;

      // Iterate all track publications on local participant
      participant.trackPublications.forEach((pub: LocalTrackPublication) => {
        try {
          if (pub.track) {
            pub.track.stop();
            if (pub.track.mediaStreamTrack) {
              pub.track.mediaStreamTrack.stop();
            }
          }
        } catch (err) {
          console.warn("Error stopping publication track:", err);
        }
      });

      // Explicitly check audioTrackPublications
      participant.audioTrackPublications.forEach((pub: LocalTrackPublication) => {
        try {
          if (pub.track) {
            pub.track.stop();
            if (pub.track.mediaStreamTrack) {
              pub.track.mediaStreamTrack.stop();
            }
          }
        } catch {}
      });

      // Explicitly check videoTrackPublications
      participant.videoTrackPublications.forEach((pub: LocalTrackPublication) => {
        try {
          if (pub.track) {
            pub.track.stop();
            if (pub.track.mediaStreamTrack) {
              pub.track.mediaStreamTrack.stop();
            }
          }
        } catch {}
      });

      // Disable hardware track state at participant level
      try {
        participant.setCameraEnabled(false).catch(() => {});
        participant.setMicrophoneEnabled(false).catch(() => {});
        participant.setScreenShareEnabled(false).catch(() => {});
      } catch {}
    }

    // 2. Stop any explicitly passed MediaStream or MediaStreamTrack objects
    if (additionalStreamsOrTracks && additionalStreamsOrTracks.length > 0) {
      for (const item of additionalStreamsOrTracks) {
        if (!item) continue;
        if (typeof MediaStream !== "undefined" && item instanceof MediaStream) {
          item.getTracks().forEach((track) => {
            try {
              track.stop();
            } catch {}
          });
        } else if (
          typeof MediaStreamTrack !== "undefined" &&
          item instanceof MediaStreamTrack
        ) {
          try {
            item.stop();
          } catch {}
        } else if (item instanceof LocalTrack) {
          try {
            item.stop();
            if (item.mediaStreamTrack) {
              item.mediaStreamTrack.stop();
            }
          } catch {}
        }
      }
    }

    // 3. Clean up any active DOM media elements holding MediaStream references
    if (typeof document !== "undefined") {
      const mediaElements = document.querySelectorAll<HTMLMediaElement>("video, audio");
      mediaElements.forEach((el) => {
        try {
          if (
            typeof MediaStream !== "undefined" &&
            el.srcObject &&
            el.srcObject instanceof MediaStream
          ) {
            el.srcObject.getTracks().forEach((track) => {
              try {
                track.stop();
              } catch {}
            });
            el.srcObject = null;
          }
          el.pause();
        } catch {}
      });
    }
  } catch (globalErr) {
    console.warn("Error in releaseAllMediaDevices:", globalErr);
  }
}
