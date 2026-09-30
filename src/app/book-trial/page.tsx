import { getCurrentUser } from "@/lib/auth-helpers";
import { db } from "@/lib/db";
import { BookTrialClient } from "./BookTrialClient";

export const metadata = {
  title: "Book Free Trial Lesson | Gandharva School of Music",
  description: "Schedule your complimentary 1-to-1 live trial lesson with our accredited music faculty.",
};

export default async function BookTrialPage() {
  const user = await getCurrentUser();
  let dbUser = null;

  if (user?.id) {
    dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        phoneVerified: true,
        timezone: true,
      },
    });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-bg via-bg-alt/25 to-bg py-12 pt-16 sm:pt-20 pb-16">
      <BookTrialClient
        currentUser={
          dbUser
            ? {
                id: dbUser.id,
                name: dbUser.name ?? null,
                email: dbUser.email ?? null,
                phone: dbUser.phone ?? null,
                phoneVerified: !!dbUser.phoneVerified,
                timezone: dbUser.timezone || "UTC",
              }
            : null
        }
      />
    </div>
  );
}
