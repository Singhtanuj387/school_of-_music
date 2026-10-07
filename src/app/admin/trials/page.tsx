import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role, TrialRequestStatus } from "@prisma/client";
import {
  AdminTrialsManager,
  AdminTrialRequestItem,
  TeacherOption,
  CourseOption,
  TrialCrmKpiStats,
} from "./AdminTrialsManager";
import { formatInViewerTimezone } from "@/lib/timezone";

export const metadata = {
  title: "Trial Bookings CRM | Admin Portal | Gandharva School of Music",
  description: "Qualify leads, schedule timezone-safe trials, and convert with full attribution.",
};

export default async function AdminTrialsPage() {
  await requireRole(Role.ADMIN);

  const [dbRequests, dbTeachers, dbCourses] = await Promise.all([
    db.trialRequest.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            timezone: true,
            country: true,
            guardianName: true,
            guardianPhone: true,
            age: true,
            gender: true,
          },
        },
        allottedTeacher: {
          select: {
            id: true,
            name: true,
            email: true,
            timezone: true,
          },
        },
        allottedLesson: {
          select: {
            id: true,
            startsAt: true,
            durationMinutes: true,
            trackingCode: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.user.findMany({
      where: { role: Role.TEACHER },
      select: {
        id: true,
        name: true,
        email: true,
        timezone: true,
        teacherProfile: {
          select: {
            instruments: true,
          },
        },
      },
      orderBy: { name: "asc" },
    }),
    db.course.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        instrument: true,
        sessionCount: true,
        level: true,
      },
      orderBy: { title: "asc" },
    }),
  ]);

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const formattedRequests: AdminTrialRequestItem[] = dbRequests.map((r) => {
    const activeStartsAt = r.allottedLesson?.startsAt || r.requestedStartsAt;
    const duration = r.allottedLesson?.durationMinutes || 60;
    const studentTz = r.timezone || r.student?.timezone || "Asia/Kolkata";

    return {
      id: r.id,
      studentId: r.studentId,
      studentName: r.studentName || r.student?.name || "Candidate",
      studentEmail: r.studentEmail || r.student?.email || "",
      studentPhone: r.studentPhone || r.student?.phone || null,
      guardianName: r.student?.guardianName || null,
      guardianPhone: r.student?.guardianPhone || null,
      country: r.student?.country || null,
      age: r.student?.age || null,
      gender: r.student?.gender || null,
      category: r.category,
      instrument: r.instrument,
      requestedStartsAt: activeStartsAt.toISOString(),
      originalRequestedStartsAt: r.requestedStartsAt.toISOString(),
      timezone: studentTz,
      formattedTime: formatInViewerTimezone(
        activeStartsAt,
        studentTz,
        "EEE, MMM d, yyyy 'at' h:mm a (zzz)"
      ),
      preferredTimeSlot: r.preferredTimeSlot,
      ageGroup: r.ageGroup,
      studentNotes: r.studentNotes,
      status: r.status,
      allottedTeacherId: r.allottedTeacherId,
      allottedTeacherName: r.allottedTeacher?.name || null,
      allottedTeacherTimezone: r.allottedTeacher?.timezone || null,
      createdAt: r.createdAt.toISOString(),
      durationMinutes: duration,
      allottedLessonId: r.allottedLessonId || r.allottedLesson?.id || null,
      trackingCode: r.allottedLesson?.trackingCode || null,
      lessonStatus: r.allottedLesson?.status || null,
      isContacted: r.isContacted ?? false,
      contactedAt: r.contactedAt ? r.contactedAt.toISOString() : null,
      followUpAt: r.followUpAt ? r.followUpAt.toISOString() : null,
      leadSource: r.leadSource || "Direct Web",
      leadIntent: r.leadIntent || "HIGH",
      leadOwner: r.leadOwner || null,
      isConverted: r.isConverted ?? false,
      convertedAt: r.convertedAt ? r.convertedAt.toISOString() : null,
      teacherFeedback: r.teacherFeedback || null,
    };
  });

  const total = formattedRequests.length;
  const newLeads = formattedRequests.filter(
    (r) => r.status === TrialRequestStatus.PENDING && !r.isContacted
  );
  const newToday = formattedRequests.filter(
    (r) => new Date(r.createdAt) >= startOfToday
  ).length;

  const contacted = formattedRequests.filter((r) => r.isContacted);
  const trialBooked = formattedRequests.filter(
    (r) => r.status === TrialRequestStatus.ALLOTTED
  );
  const trialComplete = formattedRequests.filter(
    (r) => r.lessonStatus === "COMPLETED"
  );
  const converted = formattedRequests.filter((r) => r.isConverted);

  const initialKpis: TrialCrmKpiStats = {
    newLeadsCount: newLeads.length,
    newLeadsToday: newToday,
    contactedCount: contacted.length,
    contactedPercent: total > 0 ? Math.round((contacted.length / total) * 100) : 0,
    trialBookedCount: trialBooked.length,
    trialCompleteCount: trialComplete.length,
    convertedCount: converted.length,
    conversionPercent: total > 0 ? Math.round((converted.length / total) * 100) : 0,
  };

  const teachers: TeacherOption[] = dbTeachers.map((t) => ({
    id: t.id,
    name: t.name || "Faculty Instructor",
    email: t.email,
    timezone: t.timezone || "UTC",
    instruments: t.teacherProfile?.instruments || [],
  }));

  const courses: CourseOption[] = dbCourses.map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    instrument: c.instrument,
    sessionCount: c.sessionCount,
    level: c.level,
  }));

  return (
    <div className="w-full">
      <AdminTrialsManager
        initialRequests={formattedRequests}
        teachers={teachers}
        courses={courses}
        initialKpis={initialKpis}
      />
    </div>
  );
}
