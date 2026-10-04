import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NavbarWrapper } from "./NavbarWrapper";
import { signOutAction } from "@/actions/auth";

export async function Navbar() {
  const session = await auth();

  let user = session?.user;
  if (session?.user?.id) {
    try {
      const dbUser = await db.user.findUnique({
        where: { id: session.user.id },
        select: { image: true, name: true, role: true, emailVerified: true },
      });
      if (dbUser) {
        user = {
          ...session.user,
          role: dbUser.role,
          image: dbUser.image,
          name: dbUser.name || session.user.name,
        };
      }
    } catch {
      // Fallback to session user
    }
  }

  return <NavbarWrapper user={user} signOutAction={signOutAction} />;
}

