import { z } from "zod";

export const BookingRequestSchema = z.object({
  teacherProfileId: z
    .string()
    .trim()
    .min(1, "Teacher profile ID is required"),
  startsAt: z
    .string()
    .trim()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start time format",
    })
    .refine((val) => new Date(val).getTime() > Date.now() + 60_000, {
      message: "Lesson must be booked at least 1 minute in advance",
    }),
  instrument: z
    .string()
    .trim()
    .min(1, "Please select an instrument"),
});

export type BookingRequestInput = z.infer<typeof BookingRequestSchema>;
