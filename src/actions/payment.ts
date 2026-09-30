"use server";

import { requireRole } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { isAppError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { AuthRateLimits } from "@/lib/rate-limit";
import {
  createCourseOrderCore,
  enrollCourseDirectCore,
  verifyAndCompleteCoursePaymentCore,
  type PaymentActionResponse,
  type CreateCourseOrderResult,
  type WebhookProcessResult,
} from "@/lib/payment-core";
import { revalidatePath } from "next/cache";

export type { PaymentActionResponse, CreateCourseOrderResult, WebhookProcessResult };

/**
 * Server action to initiate a course order for Razorpay checkout.
 * Enforces STUDENT role and rate limits order creation.
 */
export async function createCourseOrderAction(
  courseId: string,
): Promise<PaymentActionResponse> {
  try {
    const student = await requireRole(Role.STUDENT);
    AuthRateLimits.checkPayment(student.id);
    return await createCourseOrderCore(student, courseId);
  } catch (error: unknown) {
    if (isAppError(error)) {
      return {
        success: false,
        error: error.message,
        code: error.code,
      };
    }

    logger.error({ error }, "Unexpected error in createCourseOrderAction");
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
      code: "INTERNAL_ERROR",
    };
  }
}

/**
 * Direct course enrollment action (for instant purchase, demo mode, and testing).
 * Automatically schedules all course lessons and updates both student and teacher calendars.
 */
export async function enrollCourseDirectAction(
  courseId: string,
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const student = await requireRole(Role.STUDENT);
    const result = await enrollCourseDirectCore(student, courseId);

    revalidatePath("/student/dashboard");
    revalidatePath("/student/dashboard/calendar");
    revalidatePath("/teacher/dashboard");
    revalidatePath("/teacher/dashboard/calendar");
    revalidatePath("/admin/enrollments");
    revalidatePath("/admin/lessons");

    return { success: true, data: result };
  } catch (error: unknown) {
    const err = error as Error;
    logger.error({ error }, "Error in enrollCourseDirectAction");
    return {
      success: false,
      error: err.message || "Failed to complete course enrollment.",
    };
  }
}

/**
 * Server action to cryptographically verify Razorpay checkout payment signature
 * and atomically activate course enrollment and schedule all syllabus lessons.
 */
export async function verifyAndCompleteCoursePaymentAction(params: {
  orderId: string;
  paymentId: string;
  signature: string;
  courseId: string;
}): Promise<WebhookProcessResult> {
  try {
    const student = await requireRole(Role.STUDENT);
    AuthRateLimits.checkPayment(student.id);

    const result = await verifyAndCompleteCoursePaymentCore({
      studentId: student.id,
      orderId: params.orderId,
      paymentId: params.paymentId,
      signature: params.signature,
      courseId: params.courseId,
    });

    if (result.success) {
      revalidatePath("/student/dashboard");
      revalidatePath("/student/dashboard/calendar");
      revalidatePath("/student/dashboard/courses");
      revalidatePath(`/student/dashboard/courses/${params.courseId}`);
      revalidatePath("/student/dashboard/payments");
      revalidatePath("/teacher/dashboard");
      revalidatePath("/teacher/dashboard/calendar");
      revalidatePath("/admin/enrollments");
      revalidatePath("/admin/lessons");
    }

    return result;
  } catch (error: unknown) {
    if (isAppError(error)) {
      return {
        success: false,
        error: error.message,
        code: error.code,
      };
    }

    logger.error({ error, params }, "Error in verifyAndCompleteCoursePaymentAction");
    return {
      success: false,
      error: "An unexpected error occurred while verifying your payment.",
      code: "VERIFICATION_ERROR",
    };
  }
}

