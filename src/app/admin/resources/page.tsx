import { requireRole } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { getAdminResources, getAdminAllStudents } from "@/actions/resources";
import { getConfiguredFolderId } from "@/lib/google-drive";
import { AdminResourcesClient, AdminResourceItem } from "./AdminResourcesClient";

export const metadata = {
  title: "Academy Learning Resources | Admin Portal | Gandharva School of Music",
  description:
    "Institutional repository of sheet music, audio tracks, lesson notes, and practice exercises synced with Google Drive.",
};

export default async function AdminResourcesPage() {
  await requireRole(Role.ADMIN);

  // Sequential execution to avoid connection pool exhaustion
  const resources = await getAdminResources();
  const allStudents = await getAdminAllStudents();
  const driveFolderId = await getConfiguredFolderId();

  const isDriveReady = Boolean(driveFolderId);

  // Format resources safely for client component
  const formattedResources: AdminResourceItem[] = resources.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    category: r.category,
    fileName: r.fileName,
    fileUrl: r.fileUrl,
    fileId: r.fileId,
    fileSizeBytes: r.fileSizeBytes,
    mimeType: r.mimeType,
    createdAt: r.createdAt.toISOString(),
    teacher: {
      id: r.teacher.id,
      name: r.teacher.name,
      email: r.teacher.email,
      image: r.teacher.image,
    },
    shares: r.shares.map((s) => ({
      id: s.id,
      studentId: s.studentId,
      teacherNote: s.teacherNote,
      sharedAt: s.sharedAt.toISOString(),
      isViewed: s.isViewed,
      student: {
        id: s.student.id,
        name: s.student.name,
        email: s.student.email,
        image: s.student.image,
      },
      course: s.course
        ? {
            id: s.course.id,
            title: s.course.title,
            instrument: s.course.instrument,
          }
        : null,
    })),
  }));

  return (
    <AdminResourcesClient
      initialResources={formattedResources}
      allStudents={allStudents}
      isDriveReady={isDriveReady}
    />
  );
}
