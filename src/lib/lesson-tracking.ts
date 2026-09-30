import { db } from "@/lib/db";
import crypto from "crypto";

/**
 * Generates a clean, unique human-readable lesson tracking ID
 * Format: GS-LSN-XXXXXXXX (e.g. GS-LSN-8F2K9M3X)
 * Used across Payment, Accounting, Faculty Payouts, and Student attendance records.
 */
export async function generateUniqueLessonTrackingCode(): Promise<string> {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Exclude similar looking characters like O, 0, I, 1
  let attempts = 0;

  while (attempts < 10) {
    let suffix = "";
    const randomBytes = crypto.randomBytes(8);
    for (let i = 0; i < 8; i++) {
      suffix += chars[randomBytes[i] % chars.length];
    }
    const code = `GS-LSN-${suffix}`;

    // Verify uniqueness in database
    const existing = await db.lesson.findFirst({
      where: { trackingCode: code },
      select: { id: true },
    });

    if (!existing) {
      return code;
    }
    attempts++;
  }

  // Fallback in the ultra-rare event of collision
  return `GS-LSN-${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

/**
 * Returns a standardized tracking code for any lesson, falling back to a clean
 * slice of the lesson ID for legacy rows where trackingCode was not yet populated.
 */
export function getLessonTrackingId(lesson: { trackingCode?: string | null; id: string }): string {
  if (lesson.trackingCode) {
    return lesson.trackingCode;
  }
  return `GS-LSN-${lesson.id.slice(-8).toUpperCase()}`;
}
