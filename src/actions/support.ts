"use server";

import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth-helpers";
import { Role, TicketCategory, TicketStatus } from "@/types";
import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";
import { AuthRateLimits } from "@/lib/rate-limit";
import { isAppError } from "@/lib/errors";

export type CreateTicketInput = {
  subject: string;
  category: TicketCategory;
  message: string;
};

export type ReplyTicketInput = {
  ticketId: string;
  message: string;
};

export async function createTicketAction(input: CreateTicketInput) {
  try {
    const user = await requireUser();
    AuthRateLimits.checkTicketCreation(user.id);

    if (!input.subject?.trim() || !input.message?.trim()) {
      return {
        success: false,
        error: "Subject and message are required.",
      };
    }

    const ticket = await db.supportTicket.create({
      data: {
        userId: user.id,
        subject: input.subject.trim(),
        category: input.category || TicketCategory.OTHER,
        status: TicketStatus.OPEN,
        messages: {
          create: {
            senderId: user.id,
            senderRole: user.role,
            body: input.message.trim(),
          },
        },
      },
      include: {
        messages: true,
      },
    });

    logger.info({ ticketId: ticket.id, userId: user.id }, "Support ticket created");
    revalidatePath("/student/dashboard/support");
    revalidatePath("/teacher/dashboard/support");
    revalidatePath("/admin/support");

    return {
      success: true,
      ticketId: ticket.id,
    };
  } catch (error) {
    if (isAppError(error)) {
      return {
        success: false,
        error: error.message,
      };
    }
    logger.error({ error }, "Error creating support ticket");
    return {
      success: false,
      error: "Failed to create support ticket. Please try again.",
    };
  }
}

export async function replyToTicketAction(input: ReplyTicketInput) {
  try {
    const user = await requireUser();

    if (!input.ticketId || !input.message?.trim()) {
      return {
        success: false,
        error: "Message cannot be empty.",
      };
    }

    const ticket = await db.supportTicket.findUnique({
      where: { id: input.ticketId },
    });

    if (!ticket) {
      return {
        success: false,
        error: "Ticket not found.",
      };
    }

    // Only ticket creator or ADMIN can reply
    if (ticket.userId !== user.id && user.role !== Role.ADMIN) {
      return {
        success: false,
        error: "You do not have permission to reply to this ticket.",
      };
    }

    await db.$transaction(async (tx) => {
      await tx.ticketMessage.create({
        data: {
          ticketId: input.ticketId,
          senderId: user.id,
          senderRole: user.role,
          body: input.message.trim(),
        },
      });

      // If non-admin user replies and ticket was closed or resolved, reopen it
      if (user.role !== Role.ADMIN && ticket.status !== TicketStatus.OPEN) {
        await tx.supportTicket.update({
          where: { id: input.ticketId },
          data: { status: TicketStatus.OPEN },
        });
      }
    });

    revalidatePath(`/student/dashboard/support/${input.ticketId}`);
    revalidatePath(`/teacher/dashboard/support/${input.ticketId}`);
    revalidatePath(`/admin/support/${input.ticketId}`);
    revalidatePath("/student/dashboard/support");
    revalidatePath("/teacher/dashboard/support");
    revalidatePath("/admin/support");

    return { success: true };
  } catch (error) {
    logger.error({ error }, "Error replying to support ticket");
    return {
      success: false,
      error: "Failed to send reply. Please try again.",
    };
  }
}
