"use client";

import { useState, useEffect } from "react";

// Global in-memory reference for synchronized internet/server time
let baseServerTime: number | null = null;
let basePerformanceTime: number = 0;
let isSynchronizing = false;
let isSynchronizedWithApi = false;

/**
 * Initialize the baseline server time.
 * Call this from SSR-rendered props or layout to seed the internet clock.
 */
export function initializeServerTime(serverTime: number) {
  if (baseServerTime === null) {
    baseServerTime = serverTime;
    basePerformanceTime =
      typeof performance !== "undefined" ? performance.now() : 0;
  }
}

/**
 * Get current internet/server time in milliseconds.
 *
 * Guaranteed properties:
 * 1. Monotonic: Uses `performance.now()` elapsed offset. Changing the local
 *    laptop system clock DOES NOT alter or distort this time.
 * 2. Synchronized: Tied to server/NTP time.
 */
export function getSyncedInternetTime(fallbackServerTime?: number): number {
  if (baseServerTime === null) {
    if (typeof fallbackServerTime === "number") {
      initializeServerTime(fallbackServerTime);
    } else {
      return Date.now();
    }
  }

  if (typeof performance !== "undefined" && baseServerTime !== null) {
    const elapsed = performance.now() - basePerformanceTime;
    return baseServerTime + elapsed;
  }

  return baseServerTime || Date.now();
}

/**
 * Calibrate client clock against `/api/time` using Cristian's algorithm
 * to eliminate network latency skew.
 */
export async function syncWithServer(): Promise<number> {
  if (typeof fetch === "undefined") return getSyncedInternetTime();
  if (isSynchronizing) return getSyncedInternetTime();

  isSynchronizing = true;
  try {
    const t0 =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const res = await fetch("/api/time", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch server time");
    const data = (await res.json()) as { serverTime: number };

    const t1 =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const roundTripTime = Math.max(0, t1 - t0);

    // Calibrate: server timestamp + half of round-trip network latency
    baseServerTime = data.serverTime + Math.floor(roundTripTime / 2);
    basePerformanceTime = t1;
    isSynchronizedWithApi = true;
  } catch {
    // If offline or network error, fallback gracefully to existing baseServerTime
  } finally {
    isSynchronizing = false;
  }

  return getSyncedInternetTime();
}

/**
 * React hook that returns live synced internet time, ticking every `tickMs` ms.
 *
 * Prevents React hydration mismatches:
 * - On the initial SSR render and first client hydration pass, it evaluates to `initialServerTime`.
 * - After hydration completes, it continuously updates using monotonic `performance.now()`,
 *   unaffected by any changes to the user's local laptop clock.
 */
export function useSyncedTime(
  initialServerTime?: number,
  tickMs: number = 1000,
): number {
  // Use initialServerTime during SSR and first client hydration render
  const [time, setTime] = useState<number>(() => {
    if (typeof initialServerTime === "number") {
      initializeServerTime(initialServerTime);
      return initialServerTime;
    }
    return getSyncedInternetTime();
  });

  useEffect(() => {
    // On mount, if not yet calibrated via API, fetch /api/time in the background
    if (!isSynchronizedWithApi) {
      syncWithServer().then((synced) => {
        setTime(synced);
      });
    }

    const interval = setInterval(() => {
      setTime(getSyncedInternetTime(initialServerTime));
    }, tickMs);

    return () => clearInterval(interval);
  }, [initialServerTime, tickMs]);

  return time;
}
