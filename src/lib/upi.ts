import QRCode from "qrcode";

export interface UpiPaymentDetails {
  upiId: string;
  payeeName?: string;
  amount?: number;
  trackingCode?: string;
  customNote?: string;
  includeAmount?: boolean;
  includeNote?: boolean;
  includePayeeName?: boolean;
}

/**
 * Clean string for standard UPI transaction note (max 45 chars, alphanumeric + spaces only).
 * Some bank switches reject hyphens, slashes, or special symbols in P2P transaction notes.
 */
function sanitizeUpiNote(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 45)
    .trim();
}

/**
 * Builds compliant NPCI UPI URI scheme (upi://pay?...)
 * Crucial: 'pa' must contain literal '@' (NOT '%40') so UPI scanners (PhonePe, GPay, Paytm)
 * recognize the VPA handle without treating it as an invalid/expired code.
 */
export function buildUpiPaymentUri({
  upiId,
  payeeName,
  amount,
  trackingCode,
  customNote,
  includeAmount = true,
  includeNote = true,
  includePayeeName = true,
}: UpiPaymentDetails): string {
  // Strip any invisible zero-width unicode characters and leading/trailing whitespace
  const cleanUpi = upiId
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .toLowerCase();

  const cleanName = (payeeName || "")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 45);

  const numAmount = Number(amount || 0);
  const formattedAmount = numAmount > 0 ? numAmount.toFixed(2) : "";

  // Note containing session ID and teacher name
  const noteContent =
    customNote ||
    (trackingCode
      ? `Session ${trackingCode.replace(/[^a-zA-Z0-9]/g, "")} ${cleanName}`
      : `${cleanName} Remuneration`);
  const cleanNote = sanitizeUpiNote(noteContent);

  // Construct NPCI standard parameters manually to prevent URLSearchParams encoding '@' as '%40'
  const queryParts: string[] = [`pa=${cleanUpi}`];

  if (includePayeeName && cleanName) {
    queryParts.push(`pn=${encodeURIComponent(cleanName)}`);
  }

  if (includeAmount && numAmount > 0) {
    queryParts.push(`am=${formattedAmount}`);
  }

  queryParts.push("cu=INR");

  if (includeNote && cleanNote) {
    queryParts.push(`tn=${encodeURIComponent(cleanNote)}`);
  }

  return `upi://pay?${queryParts.join("&")}`;
}

/**
 * Returns API link to internal QR code generator endpoint
 */
export function getInternalQrApiUrl(upiUri: string, size = 360): string {
  return `/api/qr?data=${encodeURIComponent(upiUri)}&size=${size}`;
}

/**
 * Returns public external API link to qrserver.com as fallback/direct URL
 */
export function getPublicQrApiUrl(upiUri: string, size = 360): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(upiUri)}&margin=4`;
}

/**
 * Generate client-side base64 Data URL for instant rendering with pure black for maximum camera scanner readability
 */
export async function generateClientQrDataUrl(
  upiUri: string,
  size = 360,
): Promise<string> {
  return QRCode.toDataURL(upiUri, {
    width: size,
    margin: 2,
    errorCorrectionLevel: "M",
    color: {
      dark: "#000000", // Pure black for standard camera binarization in GPay, PhonePe & Paytm
      light: "#ffffff",
    },
  });
}
