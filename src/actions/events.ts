"use server";

import { db } from "@/lib/db";
import { requireRole } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";

export async function registerForEventAction(eventId: string) {
  try {
    const student = await requireRole(Role.STUDENT);

    if (!eventId) {
      return { success: false, error: "Event ID is required.", code: "INVALID_EVENT" };
    }

    const registration = await db.$transaction(
      async (tx) => {
        // Lock event row to prevent overselling capacity under concurrency
        await tx.$executeRaw`SELECT id FROM "Event" WHERE id = ${eventId} FOR UPDATE`;

        const event = await tx.event.findUnique({
          where: { id: eventId },
          include: {
            _count: {
              select: { registrations: true },
            },
          },
        });

        if (!event || !event.isPublished) {
          throw new Error("This event is not available for registration.");
        }

        if (new Date(event.startsAt) < new Date()) {
          throw new Error("This event has already taken place.");
        }

        // Check if already registered
        const existing = await tx.eventRegistration.findUnique({
          where: {
            eventId_studentId: {
              eventId,
              studentId: student.id,
            },
          },
        });

        if (existing) {
          return { alreadyRegistered: true, registration: existing };
        }

        // Check capacity
        if (event.capacity !== null && event._count.registrations >= event.capacity) {
          throw new Error("This event has reached full capacity.");
        }

        const newReg = await tx.eventRegistration.create({
          data: {
            eventId,
            studentId: student.id,
          },
        });

        return { alreadyRegistered: false, registration: newReg };
      },
      { isolationLevel: "Serializable" },
    );

    revalidatePath("/student/dashboard/events");
    revalidatePath("/student/dashboard/calendar");
    revalidatePath("/student/dashboard");
    revalidatePath("/admin/events");
    revalidatePath("/teacher/dashboard/calendar");
    revalidatePath("/teacher/dashboard");

    return {
      success: true,
      alreadyRegistered: registration.alreadyRegistered,
      registrationId: registration.registration.id,
    };
  } catch (error: unknown) {
    const err = error as Error;
    logger.error({ error, eventId }, "Error registering for event");
    return {
      success: false,
      error: err.message || "Failed to register for event.",
    };
  }
}

export async function cancelEventRegistrationAction(eventId: string) {
  try {
    const student = await requireRole(Role.STUDENT);

    await db.eventRegistration.deleteMany({
      where: {
        eventId,
        studentId: student.id,
      },
    });

    revalidatePath("/student/dashboard/events");
    revalidatePath("/student/dashboard/calendar");
    revalidatePath("/student/dashboard");
    revalidatePath("/admin/events");
    revalidatePath("/teacher/dashboard/calendar");
    revalidatePath("/teacher/dashboard");
    return { success: true };
  } catch (error) {
    logger.error({ error, eventId }, "Error cancelling event registration");
    return {
      success: false,
      error: "Failed to cancel event registration.",
    };
  }
}
