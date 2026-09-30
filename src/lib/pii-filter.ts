/**
 * PII (Personal Identifiable Information) filter for chat messages.
 * Strips phone numbers, email addresses, and other contact information
 * to prevent students and teachers from sharing personal details.
 */

// ─── PII Detection Patterns ─────────────────────────────────────────────────

/** Matches phone numbers in various formats (international and domestic) */
const PHONE_PATTERNS = [
  /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g, // +91-12345-67890, (123) 456-7890
  /\b\d{10,13}\b/g, // 10-13 digit numbers
  /(?:\+\d{1,3}\s?)?\d{3}[-.\s]\d{3}[-.\s]\d{4}/g, // 123-456-7890
];

/** Matches email addresses */
const EMAIL_PATTERN = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

/** Matches URLs (http, https, www) */
const URL_PATTERN =
  /(?:https?:\/\/|www\.)[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+/gi;

/** Matches social media handles (@username patterns) */
const SOCIAL_HANDLE_PATTERN = /(?:^|\s)@[a-zA-Z0-9_]{3,30}\b/g;

/** Matches common social media keywords with identifiers */
const SOCIAL_MEDIA_PATTERNS = [
  /(?:instagram|insta|ig)\s*[:\-]?\s*[a-zA-Z0-9._]{3,30}/gi,
  /(?:whatsapp|wa|wapp)\s*[:\-]?\s*[\d\s+\-().]{7,}/gi,
  /(?:telegram|tg)\s*[:\-]?\s*[a-zA-Z0-9._]{3,30}/gi,
  /(?:facebook|fb)\s*[:\-]?\s*[a-zA-Z0-9._]{3,30}/gi,
  /(?:snapchat|snap)\s*[:\-]?\s*[a-zA-Z0-9._]{3,30}/gi,
  /(?:discord)\s*[:\-]?\s*[a-zA-Z0-9._#]{3,40}/gi,
  /(?:skype)\s*[:\-]?\s*[a-zA-Z0-9._]{3,30}/gi,
  /(?:twitter|x\.com)\s*[:\-]?\s*[a-zA-Z0-9._]{3,30}/gi,
];

/** Matches Aadhaar-like numbers (India) */
const AADHAAR_PATTERN = /\b\d{4}\s?\d{4}\s?\d{4}\b/g;

/** Matches PAN card numbers (India) */
const PAN_PATTERN = /\b[A-Z]{5}\d{4}[A-Z]\b/g;

const PII_REPLACEMENT = "[removed for privacy]";

// ─── Types ───────────────────────────────────────────────────────────────────

export type PIICheckResult = {
  isClean: boolean;
  sanitizedText: string;
  detectedTypes: string[];
};

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Check message text for PII and return a sanitized version.
 * Always returns a result; the caller decides whether to block or allow.
 */
export function checkAndSanitizePII(text: string): PIICheckResult {
  const detectedTypes: string[] = [];
  let sanitized = text;

  // Check and replace emails
  if (EMAIL_PATTERN.test(sanitized)) {
    detectedTypes.push("email");
    sanitized = sanitized.replace(EMAIL_PATTERN, PII_REPLACEMENT);
  }

  // Check and replace phone numbers
  for (const pattern of PHONE_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    if (regex.test(sanitized)) {
      detectedTypes.push("phone");
      sanitized = sanitized.replace(
        new RegExp(pattern.source, pattern.flags),
        PII_REPLACEMENT,
      );
      break; // Only add "phone" once
    }
  }

  // Check and replace URLs
  if (URL_PATTERN.test(sanitized)) {
    detectedTypes.push("url");
    sanitized = sanitized.replace(
      new RegExp(URL_PATTERN.source, URL_PATTERN.flags),
      PII_REPLACEMENT,
    );
  }

  // Check and replace social handles
  if (SOCIAL_HANDLE_PATTERN.test(sanitized)) {
    detectedTypes.push("social_handle");
    sanitized = sanitized.replace(
      new RegExp(SOCIAL_HANDLE_PATTERN.source, SOCIAL_HANDLE_PATTERN.flags),
      ` ${PII_REPLACEMENT}`,
    );
  }

  // Check and replace social media patterns
  for (const pattern of SOCIAL_MEDIA_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    if (regex.test(sanitized)) {
      if (!detectedTypes.includes("social_media")) {
        detectedTypes.push("social_media");
      }
      sanitized = sanitized.replace(
        new RegExp(pattern.source, pattern.flags),
        PII_REPLACEMENT,
      );
    }
  }

  // Check and replace Aadhaar numbers
  if (AADHAAR_PATTERN.test(sanitized)) {
    detectedTypes.push("aadhaar");
    sanitized = sanitized.replace(
      new RegExp(AADHAAR_PATTERN.source, AADHAAR_PATTERN.flags),
      PII_REPLACEMENT,
    );
  }

  // Check and replace PAN numbers
  if (PAN_PATTERN.test(sanitized)) {
    detectedTypes.push("pan");
    sanitized = sanitized.replace(
      new RegExp(PAN_PATTERN.source, PAN_PATTERN.flags),
      PII_REPLACEMENT,
    );
  }

  return {
    isClean: detectedTypes.length === 0,
    sanitizedText: sanitized.trim(),
    detectedTypes,
  };
}

/**
 * Validate that a filename is an allowed attachment type.
 * Only PDF and DOC/DOCX files are permitted.
 */
export function isAllowedFileType(filename: string): boolean {
  const ext = filename.toLowerCase().split(".").pop();
  return ["pdf", "doc", "docx"].includes(ext || "");
}

/** Maximum file size: 10MB */
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

/**
 * Validate file attachment constraints.
 */
export function validateFileAttachment(
  filename: string,
  sizeBytes: number,
): { valid: boolean; error?: string } {
  if (!isAllowedFileType(filename)) {
    return {
      valid: false,
      error: "Only PDF and DOC/DOCX files are allowed.",
    };
  }
  if (sizeBytes > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: "File size cannot exceed 10MB.",
    };
  }
  return { valid: true };
}
