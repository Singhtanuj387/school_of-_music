import { requireRole } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { getTeacherResources, getTeacherAllottedStudents } from "@/actions/resources";
import { getConfiguredFolderId } from "@/lib/google-drive";
import { TeacherResourcesClient, TeacherResourceItem } from "@/components/resources/TeacherResourcesClient";

export const metadata = {
  title: "Learning Resources | Faculty Studio | Gandharva School of Music",
  description: "Upload, manage, and share sheet music, practice exercises, and audio tracks with your students.",
};

export default async function TeacherResourcesPage() {
  await requireRole(Role.TEACHER);

  const [resources, allottedStudents, driveFolderId] = await Promise.all([
    getTeacherResources(),
    getTeacherAllottedStudents(),
    getConfiguredFolderId(),
  ]);

  const isDriveReady = Boolean(driveFolderId);

  // Format resources safely
  const formattedResources: TeacherResourceItem[] = resources.map((r) => ({
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
    <TeacherResourcesClient
      initialResources={formattedResources}
      allottedStudents={allottedStudents}
      isDriveReady={isDriveReady}
    />
  );
}
