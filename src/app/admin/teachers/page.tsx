import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { AdminTeachersManager, TeacherRecord } from "./AdminTeachersManager";

export const metadata = {
  title: "Teachers | Admin Portal | Gandharva School of Music",
  description: "Faculty accreditation, master credentials, remuneration control, and verified teaching timeline.",
};

export default async function AdminTeachersPage() {
  await requireRole(Role.ADMIN);

  // Query all teacher users and full relational profiles from database
  const dbUsers = await db.user.findMany({
    where: { role: Role.TEACHER },
    include: {
      teacherProfile: {
        include: {
          lessonsAsTeacher: {
            include: {
              student: {
                select: { id: true, name: true, email: true, phone: true },
              },
            },
            orderBy: { startsAt: "desc" },
            take: 100,
          },
          availabilityRules: {
            select: { id: true },
          },
        },
      },
      courseTeachers: {
        include: {
          course: {
            select: {
              id: true,
              title: true,
              instrument: true,
              level: true,
              sessionCount: true,
              syllabusSummary: true,
              priceMinorUnits: true,
            },
          },
        },
      },
      resourcesUploaded: {
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          fileName: true,
          fileUrl: true,
          fileSizeBytes: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      },
      allottedTrialsAsTeacher: {
        select: {
          id: true,
          instrument: true,
          status: true,
          requestedStartsAt: true,
          isConverted: true,
        },
        orderBy: { requestedStartsAt: "desc" },
        take: 20,
      },
      conversationsAsTeacher: {
        include: {
          student: {
            select: { id: true, name: true, email: true, phone: true },
          },
          messages: {
            include: {
              sender: {
                select: { id: true, name: true, role: true },
              },
            },
            orderBy: { createdAt: "asc" },
            take: 200,
          },
        },
        orderBy: { updatedAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const teacherUserIds = dbUsers.map((u) => u.id);

  // Query enrollments assigned to any of these teachers
  const dbEnrollments = await db.enrollment.findMany({
    where: {
      teacherId: { in: teacherUserIds },
    },
    include: {
      student: {
        select: { id: true, name: true, email: true, phone: true },
      },
      course: {
        select: {
          id: true,
          title: true,
          instrument: true,
          level: true,
          sessionCount: true,
        },
      },
    },
    orderBy: { startedAt: "desc" },
  });

  // Map into TeacherRecord format without dummy data
  const formattedTeachers: TeacherRecord[] = dbUsers.map((u) => {
    const profile = u.teacherProfile;
    const lessons = profile?.lessonsAsTeacher || [];

    // Combine allotted students from enrollments and conducted lessons
    const teacherEnrollments = dbEnrollments.filter((e) => e.teacherId === u.id);
    const studentMap = new Map<
      string,
      {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        enrolledCourseTitle: string | null;
        instrument: string | null;
        courseLevel: string | null;
        sessionsRemaining: number;
        totalSessions: number;
        enrollmentStatus: string;
        startedAt: string | null;
        completedLessonsCount: number;
        upcomingLessonsCount: number;
      }
    >();

    teacherEnrollments.forEach((e) => {
      if (e.student) {
        studentMap.set(e.student.id, {
          id: e.student.id,
          name: e.student.name || "Student",
          email: e.student.email,
          phone: e.student.phone,
          enrolledCourseTitle: e.course?.title || null,
          instrument: e.course?.instrument || null,
          courseLevel: e.course?.level || null,
          sessionsRemaining: e.sessionsRemaining,
          totalSessions: e.course?.sessionCount || 0,
          enrollmentStatus: e.status,
          startedAt: e.startedAt.toISOString(),
          completedLessonsCount: 0,
          upcomingLessonsCount: 0,
        });
      }
    });

    lessons.forEach((l) => {
      if (l.student) {
        let entry = studentMap.get(l.student.id);
        if (!entry) {
          entry = {
            id: l.student.id,
            name: l.student.name || "Student",
            email: l.student.email,
            phone: l.student.phone,
            enrolledCourseTitle: null,
            instrument: l.instrument,
            courseLevel: null,
            sessionsRemaining: 0,
            totalSessions: 0,
            enrollmentStatus: "ACTIVE",
            startedAt: null,
            completedLessonsCount: 0,
            upcomingLessonsCount: 0,
          };
          studentMap.set(l.student.id, entry);
        }
        if (l.status === "COMPLETED") {
          entry.completedLessonsCount += 1;
        } else if (l.status === "SCHEDULED") {
          entry.upcomingLessonsCount += 1;
        }
      }
    });

    const allottedStudents = Array.from(studentMap.values());

    return {
      id: profile?.id || u.id,
      userId: u.id,
      name: u.name || "Faculty Applicant",
      email: u.email,
      phone: u.phone,
      phoneVerified: !!u.phoneVerified,
      image: u.image,
      timezone: u.timezone || "Asia/Kolkata",
      country: u.country || "India",
      createdAt: u.createdAt.toISOString(),
      isActive: u.isActive,
      bio: profile?.bio || "",
      instruments: profile?.instruments || [],
      expertInstruments: profile?.expertInstruments || [],
      moderateInstruments: profile?.moderateInstruments || [],
      languages: profile?.languages || ["English"],
      yearsTeaching: profile?.yearsTeaching || 0,
      hourlyRate: profile?.hourlyRate || 0,
      payoutPerSession: profile?.payoutPerSession || 80000,
      upiId: profile?.upiId || null,
      isPublished: !!profile?.isPublished,
      approvalStatus: profile?.approvalStatus || "PENDING",
      approvedAt: profile?.approvedAt ? profile.approvedAt.toISOString() : null,
      rejectedAt: profile?.rejectedAt ? profile.rejectedAt.toISOString() : null,
      rejectionReason: profile?.rejectionReason || null,
      adminNotes: profile?.adminNotes || null,
      lessons: lessons.map((l) => ({
        id: l.id,
        instrument: l.instrument,
        startsAt: l.startsAt.toISOString(),
        durationMinutes: l.durationMinutes,
        status: l.status,
        studentId: l.student?.id || null,
        studentName: l.student?.name || null,
        studentEmail: l.student?.email || null,
        studentPhone: l.student?.phone || null,
        trackingCode: l.trackingCode,
        recordingUrl: l.recordingUrl,
        payoutStatus: l.payoutStatus,
        payoutAmountMinor: l.payoutAmountMinor,
        payoutPaidAt: l.payoutPaidAt ? l.payoutPaidAt.toISOString() : null,
        payoutTransactionId: l.payoutTransactionId,
        payoutNotes: l.payoutNotes,
      })),
      allottedStudents,
      courses: u.courseTeachers.map((ct) => ({
        id: ct.course.id,
        title: ct.course.title,
        instrument: ct.course.instrument,
        level: ct.course.level,
        sessionCount: ct.course.sessionCount,
        syllabusSummary: ct.course.syllabusSummary,
        priceMinorUnits: ct.course.priceMinorUnits,
      })),
      resources: u.resourcesUploaded.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description,
        category: r.category,
        fileName: r.fileName,
        fileUrl: r.fileUrl,
        fileSizeBytes: r.fileSizeBytes,
        createdAt: r.createdAt.toISOString(),
      })),
      trials: u.allottedTrialsAsTeacher.map((t) => ({
        id: t.id,
        instrument: t.instrument,
        status: t.status,
        startsAt: t.requestedStartsAt.toISOString(),
        isConverted: t.isConverted,
      })),
      conversations: (u.conversationsAsTeacher || []).map((c) => ({
        id: c.id,
        studentId: c.studentId,
        studentName: c.student?.name || "Student",
        studentEmail: c.student?.email || "",
        studentPhone: c.student?.phone || null,
        instrument: c.instrument,
        isActive: c.isActive,
        updatedAt: c.updatedAt.toISOString(),
        messages: (c.messages || []).map((m) => ({
          id: m.id,
          senderId: m.senderId,
          senderName: m.sender?.name || "User",
          senderRole: m.sender?.role || "STUDENT",
          messageType: m.messageType,
          body: m.body,
          fileName: m.fileName,
          fileUrl: m.fileUrl,
          fileSizeBytes: m.fileSizeBytes,
          isRead: m.isRead,
          createdAt: m.createdAt.toISOString(),
        })),
      })),
      availabilitySlotsCount: profile?.availabilityRules.length || 0,
    };
  });

  return <AdminTeachersManager initialTeachers={formattedTeachers} />;
}
