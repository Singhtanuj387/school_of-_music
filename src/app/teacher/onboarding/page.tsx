import { requireRole } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { INSTRUMENTS, LANGUAGES } from "@/types";
import { TeacherOnboardingClient } from "./TeacherOnboardingClient";

export default async function TeacherOnboardingPage() {
  const user = await requireRole(Role.TEACHER);

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    include: {
      teacherProfile: {
        include: {
          availabilityRules: true,
        },
      },
    },
  });

  const profile = dbUser?.teacherProfile;
  const isEmailVerified = !!dbUser?.emailVerified;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          Teacher Setup
        </span>
        <h1 className="font-serif text-3xl font-bold text-stone-100 sm:text-4xl">
          Complete your studio profile
        </h1>
        <p className="mt-2 text-sm text-stone-400">
          Follow the steps below to set up your instruments, bio, hourly rate, and weekly availability before publishing your profile to students.
        </p>
      </div>

      <TeacherOnboardingClient
        profile={{
          bio: profile?.bio || "",
          instruments: profile?.instruments || [],
          expertInstruments: profile?.expertInstruments || [],
          moderateInstruments: profile?.moderateInstruments || [],
          yearsTeaching: profile?.yearsTeaching || 0,
          hourlyRate: (profile?.hourlyRate || 5000) / 100, // minor units to dollars
          languages: profile?.languages || ["English"],
          isPublished: profile?.isPublished || false,
          approvalStatus: profile?.approvalStatus || "PENDING",
          rejectionReason: profile?.rejectionReason || null,
        }}
        availabilityRules={
          profile?.availabilityRules.map((r) => ({
            dayOfWeek: r.dayOfWeek,
            startMinute: r.startMinute,
            endMinute: r.endMinute,
          })) || []
        }
        timezone={user.timezone}
        isEmailVerified={isEmailVerified}
        availableInstruments={[...INSTRUMENTS]}
        availableLanguages={[...LANGUAGES]}
      />
    </div>
  );
}
