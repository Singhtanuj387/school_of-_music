import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { AdminTrialsManager, AdminTrialRequestItem, TeacherOption } from "./AdminTrialsManager";
import { formatInViewerTimezone } from "@/lib/timezone";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "Trial Requests & Allotment | Admin Portal | Gandharva School of Music",
  description: "Review incoming student trial lesson preferences and allot certified faculty instructors.",
};

export default async function AdminTrialsPage() {
  await requireRole(Role.ADMIN);

  const [dbRequests, dbTeachers] = await Promise.all([
    db.trialRequest.findMany({
      include: {
        student: { select: { name: true, email: true, timezone: true } },
        allottedTeacher: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.user.findMany({
      where: { role: Role.TEACHER },
      include: {
        teacherProfile: {
          select: {
            instruments: true,
          },
        },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  const formattedRequests: AdminTrialRequestItem[] = dbRequests.map((r) => ({
    id: r.id,
    studentId: r.studentId,
    studentName: r.studentName || r.student?.name || "Student",
    studentEmail: r.studentEmail || r.student?.email || "",
    studentPhone: r.studentPhone,
    category: r.category,
    instrument: r.instrument,
    requestedStartsAt: r.requestedStartsAt.toISOString(),
    timezone: r.timezone || "UTC",
    formattedTime: formatInViewerTimezone(
      r.requestedStartsAt,
      r.timezone || "UTC",
      "EEE, MMM d, yyyy 'at' h:mm a (zzz)"
    ),
    preferredTimeSlot: r.preferredTimeSlot,
    ageGroup: r.ageGroup,
    studentNotes: r.studentNotes,
    status: r.status,
    allottedTeacherId: r.allottedTeacherId,
    allottedTeacherName: r.allottedTeacher?.name || null,
    createdAt: r.createdAt.toISOString(),
  }));

  const teachers: TeacherOption[] = dbTeachers.map((t) => ({
    id: t.id,
    name: t.name || "Faculty Instructor",
    email: t.email,
    instruments: t.teacherProfile?.instruments || [],
  }));

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent-dark font-mono">
          Trial Booking Pipeline
        </span>
        <SplitHeading
          firstClause="Trial Requests &"
          accentClause="Teacher Allotment"
          as="h1"
          size="lg"
          className="mt-1"
        />
        <p className="text-sm text-body mt-1">
          Match students with certified Gandharva faculty based on discipline, student age group, and schedule availability.
        </p>
      </div>

      <AdminTrialsManager initialRequests={formattedRequests} teachers={teachers} />
    </div>
  );
}
