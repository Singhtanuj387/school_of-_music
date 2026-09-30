import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { AdminSettingsForm } from "./AdminSettingsForm";
import { SplitHeading } from "@/components/ui/SplitHeading";

export const metadata = {
  title: "Platform Settings | Admin Portal | Gandharva School of Music",
  description: "Configure global trial allocations, institution metadata, and platform policies.",
};

export default async function AdminSettingsPage() {
  await requireRole(Role.ADMIN);

  const settings = await db.platformSettings.findUnique({
    where: { id: 1 },
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent-dark font-mono">
          System Configuration
        </span>
        <SplitHeading
          firstClause="Platform Settings &"
          accentClause="Policies"
          as="h1"
          size="lg"
          className="mt-1"
        />
        <p className="text-sm text-body mt-1">
          Adjust global free trial lesson allocations, billing currency, and institutional operational parameters.
        </p>
      </div>

      <AdminSettingsForm
        initialSettings={{
          freeTrialLessonCount: settings?.freeTrialLessonCount ?? 2,
          googleDriveFolderLink: settings?.googleDriveFolderId
            ? `https://drive.google.com/drive/folders/${settings.googleDriveFolderId}`
            : "",
        }}
      />
    </div>
  );
}
