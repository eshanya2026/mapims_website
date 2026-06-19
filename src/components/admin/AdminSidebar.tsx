"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Briefcase,
  Stethoscope,
  CalendarClock,
  Inbox,
  Users,
  Settings,
  LogOut,
  Trash2,
} from "lucide-react";
import {
  ADMIN_ROLES,
  ROLE_PERMISSIONS,
  canAccessTrash,
  type AdminPermission,
  type AdminRole,
} from "@/lib/admin-roles";
import { cn } from "@/lib/utils";

const links: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  permission: AdminPermission;
}[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true, permission: "dashboard" },
  { href: "/admin/posts", label: "Posts", icon: Newspaper, permission: "posts" },
  { href: "/admin/doctors", label: "Doctors", icon: Stethoscope, permission: "doctors" },
  {
    href: "/admin/appointment-schedules",
    label: "Appointment Schedules",
    icon: CalendarClock,
    permission: "appointment_schedules",
  },
  { href: "/admin/jobs", label: "Careers", icon: Briefcase, permission: "jobs" },
  { href: "/admin/inquiries", label: "Enquiries", icon: Inbox, permission: "inquiries" },
  { href: "/admin/users", label: "Users", icon: Users, permission: "users" },
  { href: "/admin/settings", label: "Settings", icon: Settings, permission: "settings" },
];

type AdminSidebarProps = {
  role: AdminRole;
  email: string;
  name: string | null;
};

export default function AdminSidebar({ role, email, name }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const allowed = new Set(ROLE_PERMISSIONS[role]);
  const visibleLinks = links.filter((link) => allowed.has(link.permission));
  const showTrash = canAccessTrash(role);

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-900 text-white">
      <div className="border-b border-slate-800 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
          MAPIMS CMS
        </p>
        <h1 className="mt-1 text-lg font-bold">Admin Panel</h1>
        <p className="mt-2 text-xs text-slate-400">{name ?? email}</p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
          {ADMIN_ROLES[role]}
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {visibleLinks.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-red-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
        {showTrash ? (
          <Link
            href="/admin/trash"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              pathname.startsWith("/admin/trash")
                ? "bg-red-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Trash2 className="h-4 w-4" />
            Trash
          </Link>
        ) : null}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
