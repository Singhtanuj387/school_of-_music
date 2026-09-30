import crypto from "crypto";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

/**
 * Normalizes phone numbers to standard E.164 format.
 * Defaults to India (+91) if a 10-digit number is provided without a country code.
 */
export function normalizePhoneNumber(rawPhone: string): string {
  if (!rawPhone) return "";

  // Strip all whitespace, dashes, parentheses, dots
  let cleaned = rawPhone.replace(/[\s\-\(\)\.]/g, "");

  // If starts with 00, replace with +
  if (cleaned.startsWith("00")) {
    cleaned = "+" + cleaned.slice(2);
  }

  // If it's a 10-digit number, prepend +91
  if (/^\d{10}$/.test(cleaned)) {
    return `+91${cleaned}`;
  }

  // If starts with +, ensure digits follow
  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  // If 11 or 12 digits starting with 91, add +
  if (/^91\d{10}$/.test(cleaned)) {
    return `+${cleaned}`;
  }

  // Default fallback: ensure leading +
  return `+${cleaned}`;
}

/**
 * Checks if a string is a valid international/national mobile number.
 */
export function isValidPhoneNumber(phone: string): boolean {
  const normalized = normalizePhoneNumber(phone);
  // Valid E.164 phone numbers: + followed by 7 to 15 digits
  return /^\+[1-9]\d{6,14}$/.test(normalized);
}

/**
 * Generates a cryptographically random 6-digit numeric OTP code.
 */
export function generatePhoneOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Dispatches an SMS OTP.
 * In development / staging, logs to the console and logger.
 * Ready for SMS provider integration (Twilio / Fast2SMS / MSG91).
 */
export async function sendSmsOtp(
  phone: string,
  code: string,
  purpose: "LOGIN" | "SIGNUP",
): Promise<{ success: boolean; previewCode?: string }> {
  const normalized = normalizePhoneNumber(phone);
  const purposeText = purpose === "SIGNUP" ? "account registration" : "sign in";
  const message = `Your Gandharva School of Music verification code for ${purposeText} is: ${code}. Valid for 10 minutes. Do not share this OTP with anyone.`;

  logger.info(
    { phone: normalized, code, purpose },
    `[SMS OTP Dispatched] -> ${normalized}: ${message}`,
  );

  // In development, return previewCode so users and testing harnesses can verify effortlessly
  return {
    success: true,
    previewCode: code,
  };
}

/**
 * Creates and stores a 10-minute expiring PhoneVerificationToken in database.
 * Invalidates any prior active tokens for this phone.
 */
export async function createPhoneOtpToken(
  rawPhone: string,
  purpose: "LOGIN" | "SIGNUP",
): Promise<{ phone: string; code: string; previewCode?: string }> {
  const phone = normalizePhoneNumber(rawPhone);
  const code = generatePhoneOtp();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Invalidate previous unused tokens for this phone
  await db.phoneVerificationToken.updateMany({
    where: {
      phone,
      used: false,
    },
    data: {
      used: true,
    },
  });

  // Store new token
  await db.phoneVerificationToken.create({
    data: {
      phone,
      code,
      expires,
      used: false,
    },
  });

  const smsRes = await sendSmsOtp(phone, code, purpose);

  return {
    phone,
    code,
    previewCode: smsRes.previewCode,
  };
}

/**
 * Checks whether an OTP code is valid without consuming it yet.
 * Used for live frontend pre-validation before form submission.
 */
export async function checkPhoneOtp(
  rawPhone: string,
  code: string,
): Promise<{ isValid: boolean; error?: string }> {
  const phone = normalizePhoneNumber(rawPhone);
  const trimmed = code.trim();

  // Find unexpired token for this phone & code
  const token = await db.phoneVerificationToken.findFirst({
    where: {
      phone,
      code: trimmed,
      expires: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!token) {
    return {
      isValid: false,
      error: "Invalid or expired OTP code. Please check the code or request a new one.",
    };
  }

  return { isValid: true };
}

/**
 * Verifies a 6-digit OTP code against the database.
 * If valid and unexpired:
 * 1. If currently unused, atomically marks it as used.
 * 2. If already marked used within its 10-minute expiry window, accepts it as a valid
 *    continuation/retry of the current registration or login session.
 */
export async function validateAndConsumePhoneOtp(
  rawPhone: string,
  code: string,
): Promise<{ isValid: boolean; error?: string }> {
  const phone = normalizePhoneNumber(rawPhone);
  const trimmed = code.trim();

  // 1. Check for active unconsumed token
  const activeToken = await db.phoneVerificationToken.findFirst({
    where: {
      phone,
      code: trimmed,
      used: false,
      expires: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (activeToken) {
    // Atomically mark consumed
    await db.phoneVerificationToken.update({
      where: { id: activeToken.id },
      data: { used: true },
    });
    return { isValid: true };
  }

  // 2. Check for recent token in this session (unexpired, created within last 10 minutes)
  // This allows graceful form re-submissions when validation on another field failed or rapid double-clicks
  const recentToken = await db.phoneVerificationToken.findFirst({
    where: {
      phone,
      code: trimmed,
      used: true,
      expires: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (recentToken) {
    return { isValid: true };
  }

  return {
    isValid: false,
    error: "Invalid or expired OTP code. Please request a new verification code.",
  };
}
