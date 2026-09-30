import { z } from "zod";

export const TeacherProfileSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(20, "Bio must be at least 20 characters")
    .max(2000, "Bio must be under 2,000 characters"),
  instruments: z
    .array(z.string().trim().min(1))
    .min(1, "Please select at least one instrument or discipline"),
  expertInstruments: z.array(z.string().trim().min(1)).optional().default([]),
  moderateInstruments: z.array(z.string().trim().min(1)).optional().default([]),
  yearsTeaching: z
    .coerce
    .number()
    .int()
    .min(0, "Years teaching cannot be negative")
    .max(70, "Please enter a valid number of years"),
  hourlyRate: z
    .coerce
    .number()
    .min(1, "Minimum hourly rate is 1")
    .max(100000, "Maximum hourly rate is 100,000"),
  languages: z
    .array(z.string().trim().min(1))
    .min(1, "Please select at least one language"),
});

export type TeacherProfileInput = z.infer<typeof TeacherProfileSchema>;

export const AvailabilityRuleItemSchema = z
  .object({
    dayOfWeek: z.coerce.number().int().min(0).max(6), // 0 = Sunday, 6 = Saturday
    startMinute: z.coerce.number().int().min(0).max(1440),
    endMinute: z.coerce.number().int().min(0).max(1440),
  })
  .refine((data) => data.startMinute < data.endMinute, {
    message: "Start time must be before end time",
    path: ["endMinute"],
  });

export type AvailabilityRuleItem = z.infer<typeof AvailabilityRuleItemSchema>;

export const AvailabilityRulesSchema = z
  .array(AvailabilityRuleItemSchema)
  .refine(
    (rules) => {
      // Group by day of week and check for overlaps
      const byDay = new Map<number, AvailabilityRuleItem[]>();
      for (const rule of rules) {
        const list = byDay.get(rule.dayOfWeek) || [];
        list.push(rule);
        byDay.set(rule.dayOfWeek, list);
      }

      for (const [, dayRules] of byDay.entries()) {
        // Sort by start minute
        const sorted = [...dayRules].sort(
          (a, b) => a.startMinute - b.startMinute,
        );
        for (let i = 0; i < sorted.length - 1; i++) {
          if (sorted[i].endMinute > sorted[i + 1].startMinute) {
            return false; // Overlap detected
          }
        }
      }
      return true;
    },
    {
      message: "Availability time windows on the same day cannot overlap.",
    },
  );

export const AvailabilityExceptionSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  isBlocked: z.boolean().default(true),
  startMinute: z.coerce.number().int().min(0).max(1440).optional().nullable(),
  endMinute: z.coerce.number().int().min(0).max(1440).optional().nullable(),
});

export type AvailabilityExceptionInput = z.infer<
  typeof AvailabilityExceptionSchema
>;
