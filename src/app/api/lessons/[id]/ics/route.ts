import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { generateLessonIcs } from "@/lib/ical";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const lesson = await db.lesson.findUnique({
      where: { id },
      include: {
        teacher: { select: { name: true, email: true } },
        student: { select: { name: true, email: true } },
      },
    });

    if (
      !lesson ||
      (lesson.studentId !== user.id && lesson.teacherId !== user.id)
    ) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const icsContent = generateLessonIcs({
      lessonId: lesson.id,
      instrument: lesson.instrument,
      startsAt: new Date(lesson.startsAt),
      durationMinutes: lesson.durationMinutes,
      teacherName: lesson.teacher.name || "Teacher",
      studentName: lesson.student.name || "Student",
      teacherEmail: lesson.teacher.email || undefined,
      studentEmail: lesson.student.email || undefined,
    });

    return new NextResponse(icsContent, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="lesson-${lesson.id}.ics"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
