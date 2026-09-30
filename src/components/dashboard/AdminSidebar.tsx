"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  Video,
  Calendar,
  HelpCircle,
  Settings,
  ShieldAlert,
  Sparkles,
  GraduationCap,
  UserCheck,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const navItems: NavItem[] = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Faculty Approvals",
    href: "/admin/teachers",
    icon: UserCheck,
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Courses Catalog",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    name: "1:1 Course Scheduling",
    href: "/admin/enrollments",
    icon: GraduationCap,
  },
  {
    name: "Trial Requests",
    href: "/admin/trials",
    icon: Sparkles,
  },
  {
    name: "Global Lessons",
    href: "/admin/lessons",
    icon: Video,
  },
  {
    name: "Payment Management",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    name: "Events & Workshops",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    name: "Support Desk",
    href: "/admin/support",
    icon: HelpCircle,
  },
  {
    name: "Platform Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      {/* Desktop Persistent 240px Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-border-default/60 bg-white min-h-[calc(100vh-4rem)] p-4 space-y-6 shadow-xs">
        <div className="px-2 py-2 flex items-center justify-between border-b border-border-default/60 pb-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/cropped-Add-a-subheading-5-png-scaled.webp"
              alt="Gandharva School of Music"
              width={130}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary">
            Admin
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
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                  active
                    ? "bg-primary text-white shadow-xs font-bold"
                    : "text-body hover:text-heading hover:bg-bg-alt/30 font-medium"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    active ? "text-white" : "text-body group-hover:text-heading"
                  }`}
                />
                <span className="truncate flex-1">{item.name}</span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Status indicator */}
        <div className="p-3.5 rounded-xl bg-bg-alt/30 border border-border-default/60 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="text-[11px] font-bold text-heading">System Operational</p>
          </div>
          <p className="text-[10px] text-body leading-relaxed">
            Role gate: ADMIN active. All operational audit events are recorded.
          </p>
        </div>
      </aside>

      {/* Mobile Horizontal Navigation Tabs (375px+ responsive) */}
      <div className="md:hidden border-b border-border-default bg-white sticky top-16 z-30 overflow-x-auto no-scrollbar shadow-xs">
        <div className="flex items-center gap-1.5 px-3 py-2 min-w-max">
          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? "bg-primary text-white shadow-xs font-bold"
                    : "text-body hover:text-heading hover:bg-neutral-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
