/**
 * Generate RFC 5545 compliant iCalendar (.ics) event string for a music lesson.
 */

interface LessonIcsParams {
  lessonId: string;
  instrument: string;
  startsAt: Date;
  durationMinutes: number;
  teacherName: string;
  studentName: string;
  teacherEmail?: string;
  studentEmail?: string;
}

function formatIcsUtc(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export function generateLessonIcs({
  lessonId,
  instrument,
  startsAt,
  durationMinutes,
  teacherName,
  studentName,
}: LessonIcsParams): string {
  const endsAt = new Date(startsAt.getTime() + durationMinutes * 60_000);
  const now = new Date();
  const appUrl =
    process.env.NEXTAUTH_URL ||
    process.env.APP_URL ||
    "http://localhost:3000";
  const roomUrl = `${appUrl}/lesson/${lessonId}`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gandharva School of Music//Online Music Platform//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:lesson-${lessonId}@gandharvaschoolofmusic.com`,
    `DTSTAMP:${formatIcsUtc(now)}`,
    `DTSTART:${formatIcsUtc(startsAt)}`,
    `DTEND:${formatIcsUtc(endsAt)}`,
    `SUMMARY:Gandharva Lesson: ${instrument} (${teacherName} & ${studentName})`,
    `DESCRIPTION:Gandharva School of Music 1-to-1 live lesson.\\nInstrument: ${instrument}\\nTeacher: ${teacherName}\\nStudent: ${studentName}\\nJoin lesson: ${roomUrl}`,
    `URL:${roomUrl}`,
    `LOCATION:${roomUrl}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}
