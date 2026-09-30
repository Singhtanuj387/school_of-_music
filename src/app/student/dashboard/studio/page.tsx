import { requireRole } from "@/lib/auth-helpers";
import { Role } from "@prisma/client";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";

export const metadata = {
  title: "Solo Music Studio | Student Portal | Gandharva School of Music",
  description:
    "Solo music practice studio where students can rehearse, sing alone, access music sheets, use the practice metronome and Tanpura drone, and record their performances.",
};

export default async function SoloMusicStudioPage() {
  const user = await requireRole(Role.STUDENT);

  return (
    <StudioWorkspace
      studentName={user.name || "Student"}
    />
  );
}
