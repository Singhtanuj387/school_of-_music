import pino from "pino";

const isServer = typeof window === "undefined";
const isDev = process.env.NODE_ENV === "development";

/**
 * Structured logger using pino.
 * Server-side: pretty-prints in dev, JSON in production.
 * Client-side: falls back to console (pino works in browsers but transport differs).
 */
export const logger = pino({
  level: process.env.LOG_LEVEL ?? (isDev ? "debug" : "info"),
  ...(isServer && isDev
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:HH:MM:ss",
          },
        },
      }
    : {}),
  ...(isServer && !isDev
    ? {
        // Production: structured JSON, no transport
        formatters: {
          level: (label: string) => ({ level: label }),
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      }
    : {}),
  browser: {
    // Client-side: use console methods
    asObject: false,
  },
});

/**
 * Create a child logger with bound context fields.
 * @example
 * const log = createLogger({ module: "booking", userId: "abc" });
 * log.info("Slot booked");
 */
export function createLogger(bindings: Record<string, unknown>) {
  return logger.child(bindings);
}
