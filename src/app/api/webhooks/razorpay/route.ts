import { NextRequest, NextResponse } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay";
import { processSuccessfulPaymentWebhook } from "@/lib/payment-core";
import { logger } from "@/lib/logger";

/**
 * Razorpay Webhook Handler
 *
 * Enforces:
 * 1. Cryptographic HMAC SHA256 signature verification with RAZORPAY_WEBHOOK_SECRET
 * 2. Strict rejection of tampered/unauthenticated payloads with HTTP 400 before any DB access
 * 3. Idempotent processing of payment.captured & order.paid events
 * 4. Atomic Payment update (PAID) + Enrollment creation + Welcome email dispatch
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      logger.warn(
        "Razorpay webhook received without x-razorpay-signature header",
      );
      return NextResponse.json(
        { error: "Missing webhook signature" },
        { status: 400 },
      );
    }

    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      logger.warn(
        { signature },
        "Rejected Razorpay webhook with invalid signature",
      );
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 },
      );
    }

    let payload: {
      event?: string;
      payload?: {
        payment?: {
          entity?: {
            id?: string;
            order_id?: string;
            notes?: Record<string, string>;
          };
        };
        order?: {
          entity?: {
            id?: string;
            notes?: Record<string, string>;
          };
        };
      };
    };

    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 },
      );
    }

    const event = payload.event;
    logger.info({ event }, "Received verified Razorpay webhook");

    if (event === "payment.captured") {
      const paymentEntity = payload.payload?.payment?.entity;
      const gatewayOrderId = paymentEntity?.order_id;
      const gatewayPaymentId = paymentEntity?.id;
      const courseId = paymentEntity?.notes?.courseId;

      if (!gatewayOrderId || !gatewayPaymentId) {
        return NextResponse.json(
          {
            error:
              "Missing order_id or payment_id in payment.captured payload",
          },
          { status: 400 },
        );
      }

      const result = await processSuccessfulPaymentWebhook({
        gatewayOrderId,
        gatewayPaymentId,
        courseId,
      });

      return NextResponse.json(result, { status: 200 });
    }

    if (event === "order.paid") {
      const orderEntity = payload.payload?.order?.entity;
      const paymentEntity = payload.payload?.payment?.entity;
      const gatewayOrderId = orderEntity?.id;
      const gatewayPaymentId =
        paymentEntity?.id || `pay_${Date.now()}`;
      const courseId =
        orderEntity?.notes?.courseId || paymentEntity?.notes?.courseId;

      if (!gatewayOrderId) {
        return NextResponse.json(
          { error: "Missing order_id in order.paid payload" },
          { status: 400 },
        );
      }

      const result = await processSuccessfulPaymentWebhook({
        gatewayOrderId,
        gatewayPaymentId,
        courseId,
      });

      return NextResponse.json(result, { status: 200 });
    }

    // Ignore other unhandled Razorpay events safely
    return NextResponse.json(
      { status: "ignored", event },
      { status: 200 },
    );
  } catch (error) {
    logger.error({ error }, "Error processing Razorpay webhook");
    return NextResponse.json(
      { error: "Internal server error processing webhook" },
      { status: 500 },
    );
  }
}
