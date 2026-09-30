"use server";

import { requireRole } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { BookingRequestInput } from "@/schemas/booking";
import { isAppError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { bookLessonCore, type BookingActionResponse } from "@/lib/booking-core";

export type { BookingActionResponse };

/**
 * Book a 1-to-1 music lesson slot.
 *
 * Enforces:
 * 1. Role: Must be an authenticated STUDENT.
 * 2. Verification: Student's email must be verified.
 * 3. Rate limiting: Max 10 booking requests per 5 minutes per user.
 * 4. Validation: Valid teacher profile, instrument, and future start time.
 * 5. Business logic: Teacher must be published; student cannot book themselves.
 * 6. Concurrency: Protected via Serializable transaction + student row lock + Postgres unique constraint.
 * 7. Trial / Enrollment gate: Enforces free trial quota -> active enrollment check.
 * 8. Notifications: Sends dual-timezone confirmation emails with .ics calendar attachments.
 */
export async function bookLessonAction(
  input: BookingRequestInput,
): Promise<BookingActionResponse> {
  try {
    const student = await requireRole(Role.STUDENT);
    return await bookLessonCore(student, input);
  } catch (error: unknown) {
    if (isAppError(error)) {
      return {
        success: false,
        error: error.message,
        code: error.code,
      };
    }

    logger.error({ error }, "Unexpected error in bookLessonAction");
    return {
      success: false,
      error: "An unexpected error occurred while booking. Please try again.",
      code: "INTERNAL_ERROR",
    };
  }
}
