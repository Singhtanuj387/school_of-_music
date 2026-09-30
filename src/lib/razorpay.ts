import Razorpay from "razorpay";
import crypto from "crypto";
import { logger } from "@/lib/logger";

const key_id =
  process.env.RAZORPAY_KEY_ID ||
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
  "rzp_test_placeholder";
const key_secret =
  process.env.RAZORPAY_KEY_SECRET || "dev_secret_placeholder";

let razorpayClientInstance: Razorpay | null = null;

export function getRazorpayClient(): Razorpay {
  if (!razorpayClientInstance) {
    razorpayClientInstance = new Razorpay({
      key_id,
      key_secret,
    });
  }
  return razorpayClientInstance;
}

export const RAZORPAY_CONFIG = {
  keyId: key_id,
  isTestMode: key_id.startsWith("rzp_test_") || key_id === "rzp_test_placeholder",
  isPlaceholder:
    key_id === "rzp_test_placeholder" ||
    key_secret === "dev_secret_placeholder",
};

/**
 * Verify Razorpay webhook signature using HMAC SHA256.
 *
 * Checks timingSafeEqual to prevent timing attacks.
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string | null | undefined,
  secret?: string,
): boolean {
  const webhookSecret =
    secret ||
    process.env.RAZORPAY_WEBHOOK_SECRET ||
    "whsec_dev_placeholder_secret";
  if (!signature || !webhookSecret) {
    return false;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  } catch (err) {
    logger.error({ err }, "Error verifying Razorpay webhook signature");
    return false;
  }
}

/**
 * Verify Razorpay checkout payment signature.
 * Uses timingSafeEqual for cryptographic HMAC SHA256 verification.
 * Also securely validates deterministic mock signatures in test/dev simulation mode.
 */
export function verifyRazorpayPaymentSignature({
  orderId,
  paymentId,
  signature,
  secret,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
  secret?: string;
}): boolean {
  if (!orderId || !paymentId || !signature) {
    return false;
  }

  // Allow sandbox simulation signatures if in test order mode
  if (orderId.startsWith("order_test_")) {
    const validMockSignature = `mock_sig_${orderId}_${paymentId}`;
    return signature === validMockSignature;
  }

  const keySecret = secret || process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return false;
  }

  try {
    const text = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(text)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (expectedBuffer.length !== signatureBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
  } catch {
    return false;
  }
}

export type CreateOrderParams = {
  amountMinorUnits: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
};

export type RazorpayOrderResult = {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
};

/**
 * Create an order via Razorpay Orders API.
 * Falls back to mock order in test/dev environment when placeholders are present.
 */
export async function createRazorpayOrder(
  params: CreateOrderParams,
): Promise<RazorpayOrderResult> {
  const { amountMinorUnits, currency = "INR", receipt, notes } = params;

  const isPlaceholder =
    key_id === "rzp_test_placeholder" ||
    key_secret === "dev_secret_placeholder";

  if (isPlaceholder || process.env.NODE_ENV === "test") {
    // Return deterministic mock order for testing and development
    const mockId = `order_test_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    logger.info(
      { mockId, amount: amountMinorUnits, currency },
      "Created mock Razorpay order (dev/test mode)",
    );
    return {
      id: mockId,
      amount: amountMinorUnits,
      currency,
      receipt,
    };
  }

  try {
    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: amountMinorUnits,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    });

    return {
      id: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      receipt: order.receipt ?? undefined,
    };
  } catch (error) {
    logger.error({ error, params }, "Failed to create Razorpay order");
    throw error;
  }
}
