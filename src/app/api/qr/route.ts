import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

/**
 * GET /api/qr?data=<encoded_string>&size=300&margin=2
 * Generates dynamic PNG QR code for payment URIs, UPI IDs, etc.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const data = searchParams.get("data") || searchParams.get("text");

    if (!data) {
      return NextResponse.json(
        { error: "Query parameter 'data' or 'text' is required" },
        { status: 400 },
      );
    }

    const size = Math.min(
      1000,
      Math.max(100, parseInt(searchParams.get("size") || "320", 10)),
    );
    const margin = Math.min(
      10,
      Math.max(0, parseInt(searchParams.get("margin") || "2", 10)),
    );

    const buffer = await QRCode.toBuffer(data, {
      type: "png",
      width: size,
      margin,
      errorCorrectionLevel: "M",
      color: {
        dark: "#000000", // Standard pure black for universal phone camera scanner recognition
        light: "#ffffff",
      },
    });

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating QR code via /api/qr:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 },
    );
  }
}
