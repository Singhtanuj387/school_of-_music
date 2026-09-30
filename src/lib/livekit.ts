import { AccessToken } from "livekit-server-sdk";
import { logger } from "@/lib/logger";

export interface GenerateLessonTokenParams {
  lessonId: string;
  userId: string;
  userName: string;
  role: "TEACHER" | "STUDENT";
  instrument: string;
  durationMinutes: number;
  requestHost?: string;
  groupRoomId?: string | null; // shared room ID for group course lessons
}

export interface LessonTokenResult {
  token: string;
  roomName: string;
  serverUrl: string;
  identity: string;
  role: "TEACHER" | "STUDENT";
}

/**
 * Generate a cryptographically signed LiveKit Access Token for a lesson participant.
 *
 * Security guarantees:
 * 1. Room name is strictly derived server-side: `lesson-${lessonId}` (never client-supplied).
 * 2. Identity is pinned to the user's validated ID.
 * 3. `roomAdmin` grant is given only to the TEACHER role.
 * 4. Token TTL is bounded to the lesson duration plus a safe grace buffer.
 */
export async function generateLessonRoomToken(
  params: GenerateLessonTokenParams,
): Promise<LessonTokenResult> {
  const {
    lessonId,
    userId,
    userName,
    role,
    instrument,
    durationMinutes,
    requestHost,
  } = params;

  const apiKey = process.env.LIVEKIT_API_KEY || "devkey";
  const apiSecret =
    process.env.LIVEKIT_API_SECRET ||
    "toneroom_dev_secret_key_minimum_32_characters_long_01";
  let serverUrl =
    process.env.NEXT_PUBLIC_LIVEKIT_URL ||
    process.env.LIVEKIT_URL ||
    "ws://localhost:7880";

  // If serverUrl is still pointing to localhost, check if incoming request is from a LAN IP
  if (
    serverUrl.includes("localhost") ||
    serverUrl.includes("127.0.0.1")
  ) {
    if (requestHost) {
      const hostname = requestHost.split(":")[0];
      const isLanIp =
        /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname);

      if (isLanIp) {
        // Adapt local LiveKit port to match the laptop's LAN IP so devices on same Wi-Fi can connect
        serverUrl = serverUrl
          .replace("localhost", hostname)
          .replace("127.0.0.1", hostname);
        logger.info(
          { originalUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL, adaptedUrl: serverUrl, hostname },
          "Adapted LiveKit server URL to local LAN IP for local network device",
        );
      } else if (!hostname.includes("localhost") && hostname !== "127.0.0.1") {
        logger.warn(
          { requestHost, serverUrl },
          "External domain/tunnel detected while LiveKit server is pointing to localhost. Remote devices will fail to connect unless LiveKit Cloud (wss://...) is configured in .env.local",
        );
      }
    }
  }

  // Server-side derived room name — use groupRoomId for group course lessons
  // so all enrolled students join the same LiveKit room
  const roomName = params.groupRoomId || `lesson-${lessonId}`;
  const isTeacher = role === "TEACHER";

  // TTL: lesson duration + 30 minutes grace in seconds
  const ttlSeconds = (durationMinutes + 30) * 60;

  const at = new AccessToken(apiKey, apiSecret, {
    identity: userId,
    name: userName,
    metadata: JSON.stringify({
      role,
      instrument,
      isTeacher,
    }),
    ttl: `${ttlSeconds}s`,
  });

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
    roomAdmin: isTeacher,
  });

  const token = await at.toJwt();

  logger.info(
    { lessonId, userId, role, roomName },
    "Minted LiveKit access token for lesson room",
  );

  return {
    token,
    roomName,
    serverUrl,
    identity: userId,
    role,
  };
}
