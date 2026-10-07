"use server";

import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth-helpers";
import { Role, PaymentStatus, EnrollmentStatus, LessonStatus, LessonSource } from "@prisma/client";
import { hashPassword } from "@/lib/password";
import { revalidatePath } from "next/cache";
import { generateUniqueLessonTrackingCode } from "@/lib/lesson-tracking";

export type StudentActionResponse<T = unknown> = {
  success: boolean;
  error?: string;
  message?: string;
  data?: T;
};

// ─── 1. Create Student ───────────────────────────────────────────────────────
export async function createStudentAction(input: {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  timezone?: string;
  age?: number;
  gender?: string;
  guardianName?: string;
  guardianPhone?: string;
  address?: string;
}): Promise<StudentActionResponse> {
  try {
    await requireRole(Role.ADMIN);

    const email = input.email.trim().toLowerCase();
    if (!email || !input.name.trim()) {
      return { success: false, error: "Student name and valid email are required." };
    }

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: "A user with this email address already exists." };
    }

    const passwordHash = await hashPassword("student123");

    const student = await db.user.create({
      data: {
        name: input.name.trim(),
        email,
        phone: input.phone?.trim() || null,
        country: input.country?.trim() || "India",
        timezone: input.timezone?.trim() || "Asia/Kolkata",
        age: input.age ? Number(input.age) : null,
        gender: input.gender?.trim() || null,
        guardianName: input.guardianName?.trim() || null,
        guardianPhone: input.guardianPhone?.trim() || null,
        address: input.address?.trim() || null,
        role: Role.STUDENT,
        isActive: true,
        passwordHash,
      },
    });

    revalidatePath("/admin/students");
    revalidatePath("/admin/users");

    return {
      success: true,
      message: `Student account for ${student.name} created successfully.`,
      data: { studentId: student.id },
    };
  } catch (error) {
    console.error("Failed to create student:", error);
    return { success: false, error: "An unexpected error occurred while creating the student." };
  }
}

// ─── 2. Record Payment ───────────────────────────────────────────────────────
export async function recordStudentPaymentAction(input: {
  studentId: string;
  amountRupees: number;
  paymentMethod: "UPI" | "CARD" | "NETBANKING" | "CASH" | "BANK_TRANSFER";
  referenceId?: string;
  notes?: string;
}): Promise<StudentActionResponse> {
  try {
    await requireRole(Role.ADMIN);

    const amountMinorUnits = Math.round(input.amountRupees * 100);
    if (amountMinorUnits <= 0) {
      return { success: false, error: "Payment amount must be greater than zero." };
    }

    const student = await db.user.findUnique({
      where: { id: input.studentId },
      select: { id: true, name: true },
    });

    if (!student) {
      return { success: false, error: "Student not found." };
    }

    const receiptRef =
      input.referenceId?.trim() ||
      `MANUAL-${Date.now().toString().slice(-6)}`;

    await db.payment.create({
      data: {
        studentId: student.id,
        amountMinorUnits,
        currency: "INR",
        gateway: input.paymentMethod.toLowerCase(),
        gatewayOrderId: `rec_order_${receiptRef}`,
        gatewayPaymentId: receiptRef,
        status: PaymentStatus.PAID,
      },
    });

    revalidatePath("/admin/students");
    revalidatePath("/admin/payments");

    return {
      success: true,
      message: `Recorded payment of ₹${input.amountRupees.toLocaleString("en-IN")} for ${student.name}.`,
    };
  } catch (error) {
    console.error("Failed to record student payment:", error);
    return { success: false, error: "Could not record payment." };
  }
}

// ─── 3. Create Enrollment ───────────────────────────────────────────────────
export async function createStudentEnrollmentAction(input: {
  studentId: string;
  courseId: string;
  teacherId?: string;
  sessionsRemaining?: number;
}): Promise<StudentActionResponse> {
  try {
    await requireRole(Role.ADMIN);

    const course = await db.course.findUnique({
      where: { id: input.courseId },
      select: { id: true, title: true, sessionCount: true },
    });

    if (!course) {
      return { success: false, error: "Selected course not found." };
    }

    const sessions =
      input.sessionsRemaining !== undefined
        ? Number(input.sessionsRemaining)
        : course.sessionCount;

    const enrollment = await db.enrollment.create({
      data: {
        studentId: input.studentId,
        courseId: course.id,
        teacherId: input.teacherId || null,
        sessionsRemaining: Math.max(1, sessions),
        status: EnrollmentStatus.ACTIVE,
      },
    });

    revalidatePath("/admin/students");
    revalidatePath("/admin/enrollments");

    return {
      success: true,
      message: `Successfully enrolled in ${course.title}.`,
      data: { enrollmentId: enrollment.id },
    };
  } catch (error) {
    console.error("Failed to create student enrollment:", error);
    return { success: false, error: "Could not create enrollment." };
  }
}

// ─── 4. Quick Schedule Lesson ───────────────────────────────────────────────
export async function scheduleStudentLessonAction(input: {
  studentId: string;
  teacherId: string;
  instrument: string;
  startsAtIso: string;
  durationMinutes?: number;
}): Promise<StudentActionResponse> {
  try {
    await requireRole(Role.ADMIN);

    const teacher = await db.user.findUnique({
      where: { id: input.teacherId },
      include: { teacherProfile: true },
    });

    if (!teacher || teacher.role !== Role.TEACHER || !teacher.teacherProfile) {
      return { success: false, error: "Selected faculty profile not found or inactive." };
    }

    const trackingCode = await generateUniqueLessonTrackingCode();
    const startsAt = new Date(input.startsAtIso);

    if (isNaN(startsAt.getTime())) {
      return { success: false, error: "Invalid date or time." };
    }

    const lesson = await db.lesson.create({
      data: {
        studentId: input.studentId,
        teacherId: teacher.id,
        teacherProfileId: teacher.teacherProfile.id,
        instrument: input.instrument,
        startsAt,
        durationMinutes: input.durationMinutes || 60,
        status: LessonStatus.SCHEDULED,
        lessonSource: LessonSource.ENROLLMENT,
        trackingCode,
      },
    });

    revalidatePath("/admin/students");
    revalidatePath("/admin/lessons");

    return {
      success: true,
      message: `Class scheduled for ${startsAt.toLocaleDateString("en-IN")} at ${startsAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} IST.`,
      data: { lessonId: lesson.id },
    };
  } catch (error) {
    console.error("Failed to schedule lesson:", error);
    return { success: false, error: "Could not schedule lesson." };
  }
}
