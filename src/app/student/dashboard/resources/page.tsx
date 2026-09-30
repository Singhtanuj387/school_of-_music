import { requireRole } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { getStudentReceivedResources } from "@/actions/resources";
import {
  StudentResourcesClient,
  StudentReceivedResourceItem,
} from "@/components/resources/StudentResourcesClient";

export const metadata = {
  title: "My Learning Resources | Gandharva School of Music",
  description: "Access sheet music, practice audio tracks, and personal notes sent by your faculty teachers.",
};

export default async function StudentResourcesPage() {
  await requireRole(Role.STUDENT);

  const receivedShares = await getStudentReceivedResources();

  // Format safely for client
  const formattedItems: StudentReceivedResourceItem[] = receivedShares.map((item) => ({
    id: item.id,
    resourceId: item.resourceId,
    teacherNote: item.teacherNote,
    sharedAt: item.sharedAt.toISOString(),
    isViewed: item.isViewed,
    viewedAt: item.viewedAt?.toISOString() || null,
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
