-- Partial unique index preventing a student from being double-booked with the same
-- teacher at the same time. Only applies to SCHEDULED lessons.
-- Multiple students CAN be scheduled at the same slot (group / course lessons).
--
-- Prisma's @@unique() doesn't support WHERE clauses, so this is added manually.
-- Run via: npx prisma migrate dev --create-only, then paste this into the migration file.
-- Or run directly via: npx prisma db execute --file prisma/partial_index.sql

-- Drop old constraint that blocked group lessons
DROP INDEX IF EXISTS "uq_teacher_scheduled_slot";

-- Recreate with studentId included so different students can share a slot
CREATE UNIQUE INDEX IF NOT EXISTS "uq_teacher_scheduled_slot"
ON "Lesson" ("teacherProfileId", "studentId", "startsAt")
WHERE status = 'SCHEDULED';
