import { auth, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { NavbarWrapper } from "./NavbarWrapper";

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
          image: dbUser.image,
          name: dbUser.name || session.user.name,
        };
      }
    } catch {
      // Fallback to session user
    }
  }

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return <NavbarWrapper user={user} signOutAction={handleSignOut} />;
}
