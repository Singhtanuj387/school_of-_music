import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { formatInViewerTimezone } from "@/lib/timezone";
import { getLessonTrackingId } from "@/lib/lesson-tracking";
import { TeacherPaymentManager, type TeacherPayoutItem } from "./TeacherPaymentManager";

export const metadata = {
  title: "Payment Management | Faculty Studio | Gandharva School of Music",
  description: "View session payout ledger, track paid vs unpaid sessions, and search by session ID.",
};

export default async function TeacherEarningsPage() {
  const user = await requireRole(Role.TEACHER);
  const teacherTimezone = user.timezone || "UTC";

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    include: {
      teacherProfile: {
        include: {
          lessonsAsTeacher: {
            include: {
              student: {
                select: {
                  name: true,
                  email: true,
                },
              },
              enrollment: {
                include: {
                  course: true,
                },
              },
            },
            orderBy: { startsAt: "desc" },
          },
        },
      },
    },
  });

  const profile = dbUser?.teacherProfile;
  const payoutPerSession = profile?.payoutPerSession || 80000;
  const payoutPerSessionRupees = payoutPerSession / 100;
  const lessons = profile?.lessonsAsTeacher || [];

  const initialItems: TeacherPayoutItem[] = lessons.map((l) => {
    const isPaid = l.payoutStatus === "PAID";
    const amountRupees = (l.payoutAmountMinor ? l.payoutAmountMinor : payoutPerSession) / 100;

    return {
      id: l.id,
      trackingCode: getLessonTrackingId(l),
      dateFormatted: formatInViewerTimezone(
        l.startsAt,
        teacherTimezone,
        "MMM d, yyyy 'at' h:mm a",
      ),
      studentName: l.student.name || "Student",
      studentEmail: l.student.email,
      courseOrTrial:
        l.lessonSource === "TRIAL"
          ? "Free Trial Lesson"
          : l.enrollment?.course?.title || "1:1 Course Session",
      lessonSource: l.lessonSource,
      duration: `${l.durationMinutes}m`,
      amountRupees,
      payoutStatus: isPaid ? "PAID" : "UNPAID",
      payoutPaidAtFormatted: l.payoutPaidAt
        ? formatInViewerTimezone(l.payoutPaidAt, teacherTimezone, "MMM d, yyyy")
        : null,
      payoutTransactionId: l.payoutTransactionId,
      payoutNotes: l.payoutNotes,
      lessonStatus: l.status,
    };
  });

  return (
    <TeacherPaymentManager
      initialItems={initialItems}
      payoutPerSessionRupees={payoutPerSessionRupees}
      teacherUpiId={profile?.upiId}
    />
  );
}
