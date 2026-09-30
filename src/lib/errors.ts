/**
 * Typed application errors.
 * These are thrown from server actions and route handlers,
 * caught by error boundaries, and rendered with user-facing messages.
 *
 * Convention: always include `what happened` and `what to do`.
 */

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(message: string, code: string, statusCode: number = 400) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

// ─── Auth errors ─────────────────────────────────────────────────────────────

export class UnauthorizedError extends AppError {
  constructor(message = "You must be signed in to do this.") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You don't have permission to access this resource.") {
    super(message, "FORBIDDEN", 403);
    this.name = "ForbiddenError";
  }
}

// ─── Resource errors ─────────────────────────────────────────────────────────

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const detail = id ? ` (${id})` : "";
    super(`${resource}${detail} was not found.`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, "CONFLICT", 409);
    this.name = "ConflictError";
  }
}

// ─── Validation errors ───────────────────────────────────────────────────────

export class ValidationError extends AppError {
  public readonly fieldErrors: Record<string, string[]>;

  constructor(
    message: string,
    fieldErrors: Record<string, string[]> = {},
  ) {
    super(message, "VALIDATION_ERROR", 422);
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
  }
}

// ─── Rate limiting ───────────────────────────────────────────────────────────

export class RateLimitError extends AppError {
  public readonly retryAfterSeconds: number;

  constructor(arg1: number | string = 60, arg2?: number | string) {
    let retryAfterSeconds = 60;
    let message = "Too many requests. Please try again later.";

    if (typeof arg1 === "number") {
      retryAfterSeconds = arg1;
      message = typeof arg2 === "string" ? arg2 : `Too many requests. Please try again in ${retryAfterSeconds} seconds.`;
    } else if (typeof arg1 === "string") {
      message = arg1;
      retryAfterSeconds = typeof arg2 === "number" ? arg2 : 60;
    }

    super(message, "RATE_LIMIT", 429);
    this.name = "RateLimitError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

// ─── Lesson-specific errors ──────────────────────────────────────────────────

export class LessonTooEarlyError extends AppError {
  constructor(minutesUntilOpen: number) {
    super(
      `This lesson room opens ${minutesUntilOpen} minutes before the start time. Please come back later.`,
      "LESSON_TOO_EARLY",
      403,
    );
    this.name = "LessonTooEarlyError";
  }
}

export class LessonExpiredError extends AppError {
  constructor() {
    super(
      "This lesson has ended. The room is no longer available.",
      "LESSON_EXPIRED",
      403,
    );
    this.name = "LessonExpiredError";
  }
}

export class SlotUnavailableError extends ConflictError {
  constructor() {
    super(
      "This time slot has already been booked. Please choose a different time.",
    );
    this.name = "SlotUnavailableError";
  }
}

export class NoTrialOrEnrollmentError extends AppError {
  constructor(
    message = "You have no remaining trial lessons or active course enrollments. Please explore our courses to continue.",
  ) {
    super(message, "NO_TRIAL_OR_ENROLLMENT", 403);
    this.name = "NoTrialOrEnrollmentError";
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Serialize an AppError to a plain object safe for client consumption.
 * Strips stack traces in production.
 */
export function serializeError(error: AppError) {
  return {
    code: error.code,
    message: error.message,
    statusCode: error.statusCode,
    ...(error instanceof ValidationError
      ? { fieldErrors: error.fieldErrors }
      : {}),
    ...(error instanceof RateLimitError
      ? { retryAfterSeconds: error.retryAfterSeconds }
      : {}),
  };
}

/**
 * Type guard for AppError instances.
 * Checks instanceof as well as structural duck-typing for cross-bundle resilience.
 */
export function isAppError(error: unknown): error is AppError {
  if (error instanceof AppError) return true;
  if (!error || typeof error !== "object") return false;
  const e = error as Record<string, unknown>;
  return (
    typeof e.statusCode === "number" &&
    typeof e.code === "string" &&
    typeof e.message === "string"
  );
}
