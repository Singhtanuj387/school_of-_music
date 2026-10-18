import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { unstable_cache } from "next/cache";
import {
  StudentResourcesClient,
  StudentReceivedResourceItem,
} from "@/components/resources/StudentResourcesClient";

export const metadata = {
  title: "My Learning Resources | Gandharva School of Music",
  description: "Access sheet music, practice audio tracks, and personal notes sent by your faculty teachers.",
};

const getCachedStudentResources = unstable_cache(
  async (userId: string) => {
    return db.resourceShare.findMany({
      where: { studentId: userId },
      orderBy: { sharedAt: "desc" },
      include: {
        resource: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                teacherProfile: {
                  select: {
                    instruments: true,
                  },
                },
              },
            },
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            instrument: true,
          },
        },
      },
    });
  },
  ["student-resources-data"],
  { revalidate: 30, tags: ["student-resources"] }
);

export default async function StudentResourcesPage() {
  const user = await requireRole(Role.STUDENT);

  let receivedShares: any[] = [];
  try {
    receivedShares = await getCachedStudentResources(user.id);
  } catch (err) {
    console.error("Failed to load cached student resources:", err);
    receivedShares = await db.resourceShare.findMany({
      where: { studentId: user.id },
      orderBy: { sharedAt: "desc" },
      include: {
        resource: {
          include: {
            teacher: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
                teacherProfile: {
                  select: {
                    instruments: true,
                  },
                },
              },
            },
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            instrument: true,
          },
        },
      },
    });
  }

  // Format safely for client
  const formattedItems: StudentReceivedResourceItem[] = receivedShares.map((item: any) => ({
    id: item.id,
    resourceId: item.resourceId,
    teacherNote: item.teacherNote,
    sharedAt: new Date(item.sharedAt).toISOString(),
    isViewed: item.isViewed,
    viewedAt: item.viewedAt ? new Date(item.viewedAt).toISOString() : null,
    resource: {
      id: item.resource.id,
      title: item.resource.title,
      description: item.resource.description,
      category: item.resource.category,
      fileName: item.resource.fileName,
      fileUrl: item.resource.fileUrl,
      fileId: item.resource.fileId,
      fileSizeBytes: item.resource.fileSizeBytes,
      mimeType: item.resource.mimeType,
      teacher: {
        id: item.resource.teacher.id,
        name: item.resource.teacher.name,
        email: item.resource.teacher.email,
        image: item.resource.teacher.image,
        teacherProfile: item.resource.teacher.teacherProfile
          ? {
              instruments: item.resource.teacher.teacherProfile.instruments,
            }
          : null,
      },
    },
    course: item.course
      ? {
          id: item.course.id,
          title: item.course.title,
          instrument: item.course.instrument,
        }
      : null,
  }));

  return <StudentResourcesClient initialResources={formattedItems} />;
}
