import { z } from "zod";

export const CancelLessonSchema = z.object({
  lessonId: z.string().trim().min(1, "Lesson ID is required"),
  reason: z
    .string()
    .trim()
    .max(500, "Reason must be under 500 characters")
    .optional()
    .or(z.literal("")),
});

export type CancelLessonInput = z.infer<typeof CancelLessonSchema>;
