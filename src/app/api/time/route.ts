import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Endpoint providing true UTC internet/server time.
 * Used by client components to synchronize clock offsets and ignore local clock tampering.
 */
export async function GET(): Promise<NextResponse> {
  const now = Date.now();
  return NextResponse.json(
    {
      serverTime: now,
      iso: new Date(now).toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    },
  );
}
