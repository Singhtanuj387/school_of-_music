/**
 * Shared TypeScript types, constants, and enums.
 * Re-exports Prisma-generated types where useful.
 */

// Re-export Prisma enums for use in application code
export {
  Role,
  LessonStatus,
  LessonSource,
  TrialStatus,
  Discipline,
  CourseLevel,
  EnrollmentStatus,
  PaymentStatus,
  EventType,
  TicketCategory,
  TicketStatus,
  MessageType,
  CoursePaymentPlan,
  CourseEmiStatus,
  CourseRequestStatus,
} from "@prisma/client";


// ─── Constants ───────────────────────────────────────────────────────────────

/** Lesson duration options in minutes */
export const LESSON_DURATIONS = [30, 45, 60, 90] as const;
export type LessonDuration = (typeof LESSON_DURATIONS)[number];

/** How many minutes before lesson start the join button activates */
export const JOIN_WINDOW_MINUTES_BEFORE = 10;

/** How many minutes after lesson end a token can still be issued */
export const JOIN_WINDOW_MINUTES_AFTER = 15;

/** How many weeks of availability to show when browsing */
export const AVAILABILITY_WEEKS_AHEAD = 2;

/** Minimum hours before a lesson for cancellation without penalty notice */
export const CANCELLATION_NOTICE_HOURS = 24;

/** Password reset token expiry in minutes */
export const PASSWORD_RESET_EXPIRY_MINUTES = 30;

/** Slot duration: lessons are booked in fixed-length slots */
export const SLOT_DURATION_MINUTES = 60;

export const INSTRUMENTS = [
  "Piano",
  "Electronic Keyboard",
  "Acoustic Guitar",
  "Electric Guitar",
  "Classical Guitar",
  "Ukulele",
  "Violin",
  "Flute",
  "Tabla",
  "Western Vocals",
  "Carnatic Vocals",
  "Hindustani Vocals",
  "Bollywood Vocals",
  "Bharatanatyam",
  "Kathak",
  "Bollywood Dance",
  "Drums",
  "Percussion",
  "Voice",
  "Cello",
  "Saxophone",
  "Bass Guitar",
  "Music Theory",
  "Composition",
] as const;

export type Instrument = (typeof INSTRUMENTS)[number];

// ─── Languages ───────────────────────────────────────────────────────────────

export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Mandarin",
  "Japanese",
  "Korean",
  "Hindi",
  "Arabic",
  "Russian",
  "Dutch",
  "Swedish",
  "Turkish",
] as const;

export type Language = (typeof LANGUAGES)[number];

// ─── Audio modes ─────────────────────────────────────────────────────────────

export const AUDIO_MODES = {
  TALKING: "talking",
  PLAYING: "playing",
} as const;

export type AudioMode = (typeof AUDIO_MODES)[keyof typeof AUDIO_MODES];

// ─── Action result type ──────────────────────────────────────────────────────

/**
 * Standard return type for server actions.
 * Discriminated union on `success`.
 */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
      code?: string;
      fieldErrors?: Record<string, string[]>;
    };
