"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, GitMerge, FileText,
  ClipboardList, BarChart3, Bell, Archive, Shield, Settings,
  BookOpen, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/profiles", label: "Profiles & Validation", icon: Building2 },
  { href: "/admin/matches", label: "Match Review", icon: GitMerge },
  { href: "/admin/repository", label: "Repository", icon: BookOpen },
  { href: "/admin/surveys", label: "Surveys", icon: ClipboardList },
  { href: "/admin/reports", label: "Reports", icon: FileText },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/content", label: "Content & News", icon: Archive },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 min-h-screen">
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-900">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Admin Panel</p>
            <p className="text-xs text-slate-500">Tech Bridge Academy</p>
          </div>
        </div>
      </div>

      <nav className="p-3 space-y-0.5">
        {adminNav.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-4 w-4", isActive ? "text-brand-600" : "text-slate-400")} />
                {item.label}
              </div>
              {isActive && <ChevronRight className="h-3.5 w-3.5 text-brand-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-100 mt-auto">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          <Settings className="h-4 w-4" />
          Back to Platform
        </Link>
      </div>
    </aside>
  );
}
