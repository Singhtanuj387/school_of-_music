import { Suspense } from "react";
import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { formatInViewerTimezone } from "@/lib/timezone";
import {
  OverallPaymentsManager,
  FormattedPaymentItem,
  CourseOption,
} from "./OverallPaymentsManager";

export const metadata = {
  title: "Overall Payments & Revenue Intelligence | Gandharva Admin",
  description:
    "Institutional financial telemetry, course-wise student payments, time-series revenue trends, and transaction ledger.",
};

export default async function AdminOverallPaymentsPage() {
  const admin = await requireRole(Role.ADMIN);
  const adminTimezone = admin.timezone || "Asia/Kolkata";

  const [payments, courses] = await Promise.all([
    db.payment.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        enrollment: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                instrument: true,
                level: true,
                slug: true,
              },
            },
          },
        },
        primaryEnrollment: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                instrument: true,
                level: true,
                slug: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    db.course.findMany({
      select: {
        id: true,
        title: true,
        instrument: true,
        level: true,
        priceMinorUnits: true,
      },
      orderBy: { title: "asc" },
    }),
  ]);

  // Map courses by price for orphan payment matching
  const courseMapByPrice = new Map<number, (typeof courses)[0]>();
  courses.forEach((c) => {
    courseMapByPrice.set(c.priceMinorUnits, c);
  });

  const formattedPayments: FormattedPaymentItem[] = payments.map((p) => {
    const resolvedCourse =
      p.enrollment?.course ||
      p.primaryEnrollment?.course ||
      courseMapByPrice.get(p.amountMinorUnits) || {
        id: "general-tuition",
        title: "General Music Tuition & Coaching",
        instrument: "Vocal & Instrumental",
        level: "All Levels",
      };

    return {
      id: p.id,
      createdAt: p.createdAt.toISOString(),
      createdAtFormatted: formatInViewerTimezone(
        p.createdAt,
        adminTimezone,
        "MMM d, yyyy 'at' h:mm a",
      ),
      dateKey: formatInViewerTimezone(p.createdAt, adminTimezone, "yyyy-MM-dd"),
      amountMinorUnits: p.amountMinorUnits,
      amountRupees: p.amountMinorUnits / 100,
      currency: p.currency,
      gateway: p.gateway,
      gatewayOrderId: p.gatewayOrderId,
      gatewayPaymentId: p.gatewayPaymentId,
      status: p.status,
      notes: p.notes,
      student: {
        id: p.student.id,
        name: p.student.name || "Student",
        email: p.student.email,
        phone: p.student.phone,
        avatarUrl: p.student.image,
      },
      course: {
        id: resolvedCourse.id,
        title: resolvedCourse.title,
        instrument: resolvedCourse.instrument,
        level: resolvedCourse.level,
      },
    };
  });

  const courseOptions: CourseOption[] = courses.map((c) => ({
    id: c.id,
    title: c.title,
    instrument: c.instrument,
    level: c.level,
    priceMinorUnits: c.priceMinorUnits,
  }));

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-body animate-pulse">
          Loading institutional revenue telemetry...
        </div>
      }
    >
      <OverallPaymentsManager
        initialPayments={formattedPayments}
        courses={courseOptions}
      />
    </Suspense>
  );
}
