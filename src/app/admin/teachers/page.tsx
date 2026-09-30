import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { AdminTeachersManager, AdminTeacherProfileData } from "./AdminTeachersManager";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "Faculty Accreditation & Approvals | Admin Portal | Gandharva School of Music",
  description: "Review teacher registrations, verify academic credentials, approve faculty profiles, and manage remuneration.",
};

export default async function AdminTeachersPage() {
  await requireRole(Role.ADMIN);

  // Query all teacher users and profiles
  const dbUsers = await db.user.findMany({
    where: { role: Role.TEACHER },
    include: {
      teacherProfile: {
        include: {
          lessonsAsTeacher: {
            select: { id: true, status: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Format into AdminTeacherProfileData
  const formattedTeachers: AdminTeacherProfileData[] = dbUsers.map((u) => {
    const profile = u.teacherProfile;
    const lessons = profile?.lessonsAsTeacher || [];
    const scheduled = lessons.filter((l) => l.status === "SCHEDULED").length;
    const completed = lessons.filter((l) => l.status === "COMPLETED").length;

    return {
      id: profile?.id || u.id,
      userId: u.id,
      name: u.name || "Faculty Applicant",
      email: u.email,
      phone: u.phone,
      phoneVerified: !!u.phoneVerified,
      image: u.image,
      timezone: u.timezone || "UTC",
      createdAt: u.createdAt.toISOString(),
      bio: profile?.bio || "",
      instruments: profile?.instruments || [],
      expertInstruments: (profile as any)?.expertInstruments || [],
      moderateInstruments: (profile as any)?.moderateInstruments || [],
      languages: profile?.languages || ["English"],
      yearsTeaching: profile?.yearsTeaching || 0,
      hourlyRate: profile?.hourlyRate || 0,
      payoutPerSession: profile?.payoutPerSession || 80000,
      upiId: profile?.upiId || null,
      paymentQrCodeUrl: profile?.paymentQrCodeUrl || null,
      isPublished: !!profile?.isPublished,
      approvalStatus: profile?.approvalStatus || "PENDING",
      approvedAt: profile?.approvedAt ? profile.approvedAt.toISOString() : null,
      rejectedAt: profile?.rejectedAt ? profile.rejectedAt.toISOString() : null,
      rejectionReason: profile?.rejectionReason || null,
      adminNotes: profile?.adminNotes || null,
      scheduledLessonsCount: scheduled,
      completedLessonsCount: completed,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent font-sans">
          Academic Governance
        </span>
        <SplitHeading
          firstClause="Faculty Approvals &"
          accentClause="Accreditation"
          as="h1"
          size="lg"
        />
        <p className="text-xs text-body mt-1 max-w-2xl">
          Review incoming instructor applications, approve verified teaching credentials, configure session remuneration rates, and control discoverability across the platform.
        </p>
      </div>

      <AdminTeachersManager initialTeachers={formattedTeachers} />
    </div>
  );
}
