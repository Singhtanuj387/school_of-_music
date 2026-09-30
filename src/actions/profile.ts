"use server";

import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth-helpers";
import { hashPassword, verifyPassword } from "@/lib/password";
import { revalidatePath } from "next/cache";
import { logger } from "@/lib/logger";

import fs from "fs";
import path from "path";

export type UpdateProfileInput = {
  name: string;
  timezone: string;
};

export async function updateProfileAction(input: UpdateProfileInput) {
  try {
    const user = await requireUser();

    if (!input.name?.trim()) {
      return { success: false, error: "Name is required." };
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        name: input.name.trim(),
        timezone: input.timezone || user.timezone || "UTC",
      },
    });

    revalidatePath("/student/dashboard/profile");
    revalidatePath("/student/dashboard");
    revalidatePath("/teacher/dashboard/profile");
    revalidatePath("/teacher/dashboard");

    return { success: true };
  } catch (error) {
    logger.error({ error }, "Failed to update profile");
    return { success: false, error: "Failed to update profile." };
  }
}

export async function uploadAvatarAction(formData: FormData): Promise<{
  success: boolean;
  error?: string;
  image?: string;
}> {
  try {
    const user = await requireUser();
    const file = formData.get("file") as File | null;

    if (!file) {
      return { success: false, error: "No image file provided." };
    }

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedMimeTypes.includes(file.type.toLowerCase())) {
      return {
        success: false,
        error: "Invalid file type. Only JPEG, PNG, WEBP, and GIF images are allowed.",
      };
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        error: "File size exceeds 5MB limit. Please upload a smaller image.",
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpeg", "jpg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const fileName = `avatar-${user.id}-${Date.now()}.${safeExt}`;

    const avatarsDir = path.join(process.cwd(), "public", "uploads", "avatars");
    if (!fs.existsSync(avatarsDir)) {
      fs.mkdirSync(avatarsDir, { recursive: true });
    }

    // Remove old avatar file if stored locally
    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { image: true },
    });

    if (dbUser?.image && dbUser.image.startsWith("/uploads/avatars/")) {
      const oldPath = path.join(process.cwd(), "public", dbUser.image);
      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
        } catch {
          // Ignore removal error
        }
      }
    }

    const targetPath = path.join(avatarsDir, fileName);
    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/uploads/avatars/${fileName}`;

    await db.user.update({
      where: { id: user.id },
      data: { image: publicUrl },
    });

    logger.info({ userId: user.id, image: publicUrl }, "User avatar updated");

    revalidatePath("/student/dashboard/profile");
    revalidatePath("/student/dashboard");
    revalidatePath("/teacher/dashboard/profile");
    revalidatePath("/teacher/dashboard");
    revalidatePath("/teachers");
    revalidatePath("/");

    return { success: true, image: publicUrl };
  } catch (error) {
    logger.error({ error }, "Failed to upload avatar");
    return { success: false, error: "Failed to upload profile picture." };
  }
}

export async function removeAvatarAction(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const user = await requireUser();

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { image: true },
    });

    if (dbUser?.image && dbUser.image.startsWith("/uploads/avatars/")) {
      const oldPath = path.join(process.cwd(), "public", dbUser.image);
      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
        } catch {
          // Ignore removal error
        }
      }
    }

    await db.user.update({
      where: { id: user.id },
      data: { image: null },
    });

    logger.info({ userId: user.id }, "User avatar removed");

    revalidatePath("/student/dashboard/profile");
    revalidatePath("/student/dashboard");
    revalidatePath("/teacher/dashboard/profile");
    revalidatePath("/teacher/dashboard");
    revalidatePath("/teachers");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    logger.error({ error }, "Failed to remove avatar");
    return { success: false, error: "Failed to remove profile picture." };
  }
}

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export async function changePasswordAction(input: ChangePasswordInput) {
  try {
    const user = await requireUser();

    if (!input.currentPassword || !input.newPassword) {
      return { success: false, error: "All password fields are required." };
    }

    if (input.newPassword.length < 8) {
      return { success: false, error: "New password must be at least 8 characters long." };
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: { passwordHash: true },
    });

    if (!dbUser || !dbUser.passwordHash) {
      return { success: false, error: "Cannot change password for social login accounts." };
    }

    const isValid = await verifyPassword(dbUser.passwordHash, input.currentPassword);
    if (!isValid) {
      return { success: false, error: "Incorrect current password." };
    }

    const newHash = await hashPassword(input.newPassword);
    await db.user.update({
      where: { id: user.id },
      data: { passwordHash: newHash },
    });

    return { success: true };
  } catch (error) {
    logger.error({ error }, "Failed to change password");
    return { success: false, error: "Failed to change password." };
  }
}
