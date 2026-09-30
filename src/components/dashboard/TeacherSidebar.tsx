"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  Calendar,
  Users,
  Clock,
  CircleDollarSign,
  HelpCircle,
  UserCheck,
  MessageSquare,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const navItems: NavItem[] = [
  {
    name: "Upcoming Sessions",
    href: "/teacher/dashboard",
    icon: CalendarCheck,
    exact: true,
  },
  {
    name: "Studio Calendar",
    href: "/teacher/dashboard/calendar",
    icon: Calendar,
  },
  {
    name: "My Students",
    href: "/teacher/dashboard/students",
    icon: Users,
  },
  {
    name: "Messages",
    href: "/teacher/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Availability & Schedule",
    href: "/teacher/dashboard/availability",
    icon: Clock,
  },
  {
    name: "Payment Management",
    href: "/teacher/dashboard/earnings",
    icon: CircleDollarSign,
  },
  {
    name: "Help & Support",
    href: "/teacher/dashboard/support",
    icon: HelpCircle,
  },
  {
    name: "Profile & Settings",
    href: "/teacher/dashboard/profile",
    icon: UserCheck,
  },
];

export function TeacherSidebar({
  teacherName,
  teacherEmail,
  teacherImage,
}: {
  teacherName?: string;
  teacherEmail?: string;
  teacherImage?: string | null;
}) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Desktop Persistent 256px Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-surface-muted/80 shrink-0 sticky top-16 h-[calc(100vh-4rem)] p-4 justify-between shadow-xs">
        <div className="space-y-6">
          {/* Faculty Brand Mini-Header */}
          <div className="px-2 py-2 flex items-center justify-between border-b border-surface-muted/80 pb-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/cropped-Add-a-subheading-5-png-scaled.webp"
                alt="Gandharva School of Music"
                width={130}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-accent/15 text-accent-dark">
              Faculty
            </span>
          </div>

          <nav className="space-y-1.5 flex-1">
            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`btn-tactile flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    active
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-xs font-bold"
                      : "text-body hover:text-heading hover:bg-bg-alt/30"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon
                      className={`w-4 h-4 transition-colors shrink-0 ${
                        active
                          ? "text-primary"
                          : "text-body/60 group-hover:text-heading"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {active && (
                    <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3">
          {/* Faculty Profile Card */}
          <Link
            href="/teacher/dashboard/profile"
            className="btn-tactile p-2.5 bg-bg-alt/25 hover:bg-bg-alt/50 border border-surface-muted/80 hover:border-primary/30 rounded-xl flex items-center gap-3 transition-colors group cursor-pointer"
            title="Manage Faculty Profile & Photo"
          >
            {teacherImage ? (
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 shadow-xs border border-primary/20">
                <Image
                  src={teacherImage}
                  alt={teacherName || "Faculty"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs uppercase shrink-0 shadow-xs">
                {teacherName?.slice(0, 2) || "FC"}
              </div>
            )}
            <div className="overflow-hidden min-w-0">
              <div className="text-xs font-bold text-heading group-hover:text-primary transition-colors truncate">
                {teacherName || "Faculty Studio"}
              </div>
              <div className="text-[11px] text-body truncate">
                {teacherEmail || "Edit Profile & Photo"}
              </div>
            </div>
          </Link>

          {/* Quick Help Footer */}
          <div className="p-3 rounded-xl bg-bg-alt/25 border border-surface-muted/80 space-y-1">
            <p className="text-[11px] font-bold text-heading">Gandharva Faculty</p>
            <p className="text-[10px] text-body leading-relaxed">
              Institutional flat session payout model. For schedule questions, contact administration.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Horizontal Navigation Tabs (375px+ responsive) */}
      <div className="md:hidden sticky top-16 z-30 bg-white/95 border-b border-surface-muted/80 backdrop-blur-md px-3 py-2 overflow-x-auto scrollbar-none flex gap-1.5 shadow-xs">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                active
                  ? "bg-primary text-white shadow-xs font-bold"
                  : "text-body hover:text-heading bg-bg-alt/40 border border-surface-muted/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
