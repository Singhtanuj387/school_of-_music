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
                select: { id: true, name: true, email: true },
              },
            },
            orderBy: { startsAt: "desc" },
            take: 30,
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
            },
          },
        },
      },
      resourcesUploaded: {
        select: {
          id: true,
          title: true,
          category: true,
          fileUrl: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: 15,
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
        take: 10,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Map into TeacherRecord format without dummy data
  const formattedTeachers: TeacherRecord[] = dbUsers.map((u) => {
    const profile = u.teacherProfile;
    const lessons = profile?.lessonsAsTeacher || [];

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
        studentName: l.student?.name || null,
        studentEmail: l.student?.email || null,
        trackingCode: l.trackingCode,
        recordingUrl: l.recordingUrl,
        payoutStatus: l.payoutStatus,
      })),
      courses: u.courseTeachers.map((ct) => ({
        id: ct.course.id,
        title: ct.course.title,
        instrument: ct.course.instrument,
        level: ct.course.level,
        sessionCount: ct.course.sessionCount,
      })),
      resources: u.resourcesUploaded.map((r) => ({
        id: r.id,
        title: r.title,
        category: r.category,
        fileUrl: r.fileUrl,
        createdAt: r.createdAt.toISOString(),
      })),
      trials: u.allottedTrialsAsTeacher.map((t) => ({
        id: t.id,
        instrument: t.instrument,
        status: t.status,
        startsAt: t.requestedStartsAt.toISOString(),
        isConverted: t.isConverted,
      })),
      availabilitySlotsCount: profile?.availabilityRules.length || 0,
    };
  });

  return <AdminTeachersManager initialTeachers={formattedTeachers} />;
}
