"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LandingHeader } from "@/components/home/LandingHeader";
import { NotificationBell } from "@/components/notifications/NotificationBell";

export type NavbarUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
  emailVerified?: Date | null;
  image?: string | null;
};

export function NavbarWrapper({
  user,
  signOutAction,
}: {
  user?: NavbarUser | null;
  signOutAction: () => Promise<void>;
}) {
  const pathname = usePathname();

  // On the landing page ("/") without a logged-in user, render the authentic Gandharva landing header
  if (!user && pathname === "/") {
    return <LandingHeader />;
  }

  // Otherwise (authenticated, or on /login, /signup, /teachers, /courses, etc.),
  // render the platform navbar which is sticky with fixed height and never submerges content!
  return (
    <nav className="sticky top-0 z-50 border-0 bg-primary shadow-md backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand: Gandharva School of Music */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-95"
          aria-label="Gandharva School of Music"
        >
          <Image
            src="/cropped-Add-a-subheading-5-png-scaled.webp"
            alt="Gandharva School of Music"
            width={150}
            height={48}
            className="h-9 sm:h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Navigation items */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/teachers"
            className="hidden xs:inline-block text-xs sm:text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            Browse Teachers
          </Link>

          {user ? (
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Notification Bell in top right corner */}
              <NotificationBell userRole={user.role} />

              <Link
                href={
                  user.role === "ADMIN"
                    ? "/admin"
                    : user.role === "TEACHER"
                    ? "/teacher/dashboard"
                    : "/student/dashboard"
                }
                className="flex items-center gap-2 rounded-xl bg-white/15 pl-2 pr-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-white/25 btn-tactile whitespace-nowrap"
              >
                {user.image ? (
                  <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-white/40 shrink-0">
                    <Image
                      src={user.image}
                      alt={user.name || "Profile"}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent/30 text-accent font-bold text-[10px] flex items-center justify-center border border-white/20 shrink-0">
                    {user.name?.slice(0, 1).toUpperCase() || "U"}
                  </div>
                )}
                <span>Dashboard</span>
              </Link>

              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-lg px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm text-white/70 transition-colors hover:text-white btn-tactile whitespace-nowrap"
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="rounded-lg px-2.5 py-1.5 text-xs sm:px-3 sm:py-1.5 sm:text-sm font-medium text-white/90 transition-colors hover:text-white whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                href="/book-trial"
                id="nav-book-trial-cta"
                className="rounded-xl bg-cta hover:bg-cta-hover active:bg-cta-active px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-black/20 transition-all btn-tactile whitespace-nowrap"
              >
                Book Free Trial
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Unverified email warning banner */}
      {user && !user.emailVerified && (
        <div className="border-t border-accent/20 bg-accent-subtle px-4 py-2 text-center text-xs text-accent-dark font-medium">
          Your email is not verified yet. Please check your inbox or{" "}
          <Link
            href="/verify-email"
            className="font-bold underline decoration-accent underline-offset-2 hover:text-accent-active"
          >
            verify your email
          </Link>{" "}
          to unlock lesson booking and profile publishing.
        </div>
      )}
    </nav>
  );
}
