"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu, X, ChevronDown, Building2, GraduationCap,
  LayoutDashboard, LogOut, User, Bell, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const publicNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "Partners" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  {
    label: "Bridge",
    children: [
      { href: "/bridge/profiles", label: "Organisation Directory", icon: Building2 },
      { href: "/bridge/repository", label: "Repository of Practices", icon: GraduationCap },
      { href: "/bridge/career-guidance", label: "Career Guidance", icon: User },
      { href: "/bridge/co-design", label: "Co-Design Service", icon: LayoutDashboard },
      { href: "/bridge/educational-collaboration", label: "Educational Collaboration", icon: GraduationCap },
    ],
  },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const role = session?.user?.role;

  return (
    <nav className="sticky top-0 z-50 bg-brand-900 shadow-md">
      {/* EU Project Strip */}
      <div className="bg-brand-950 px-4 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xs text-brand-300">
            🇪🇺 Erasmus+ KA220-VET · TECH BRIDGE VET
          </span>
          <span className="text-xs text-brand-400 hidden sm:block">
            Funded by the European Union
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
              <span className="text-lg font-bold text-white">TB</span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-base font-bold text-white leading-tight">Tech Bridge Academy</span>
              <span className="block text-[10px] text-brand-300 leading-tight">School · Enterprise · Partnership</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {publicNav.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === item.label ? null : item.label)}
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-100 hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", dropdownOpen === item.label && "rotate-180")} />
                  </button>
                  {dropdownOpen === item.label && (
                    <div className="absolute left-0 top-full mt-1 w-64 rounded-xl bg-white shadow-lg ring-1 ring-slate-200 py-1 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setDropdownOpen(null)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-brand-50 transition-colors",
                            pathname === child.href ? "text-brand-700 font-medium" : "text-slate-700"
                          )}
                        >
                          <child.icon className="h-4 w-4 text-brand-600" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-white/15 text-white"
                      : "text-brand-100 hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}

            {session && (
              <>
                {(role === "SCHOOL" || role === "ADMIN") && (
                  <Link href="/schools" className={cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname.startsWith("/schools") ? "bg-white/15 text-white" : "text-brand-100 hover:bg-white/10")}>
                    Schools
                  </Link>
                )}
                {(role === "COMPANY" || role === "ADMIN") && (
                  <Link href="/smes" className={cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname.startsWith("/smes") ? "bg-white/15 text-white" : "text-brand-100 hover:bg-white/10")}>
                    SMEs
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-2">
                {role === "ADMIN" && (
                  <Link href="/admin" className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-amber-300 hover:bg-white/10 transition-colors">
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-brand-100 hover:bg-white/10 transition-colors">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link href="/profile" className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-brand-100 hover:bg-white/10 transition-colors">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {session.user?.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{session.user?.name?.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-brand-300 hover:bg-white/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" className="rounded-md px-4 py-2 text-sm font-medium text-brand-100 hover:bg-white/10 transition-colors">
                  Log in
                </Link>
                <Link href="/auth/register" className="rounded-md bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700 transition-colors">
                  Register Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden rounded-md p-2 text-brand-100 hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-800 bg-brand-900">
          <div className="px-4 py-4 space-y-1">
            {publicNav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="px-3 py-1 text-xs font-semibold text-brand-400 uppercase tracking-wider">{item.label}</p>
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-brand-200 hover:bg-white/10">
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.href} href={item.href!} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-brand-100 hover:bg-white/10">
                  {item.label}
                </Link>
              )
            )}
            <div className="border-t border-brand-800 pt-3 mt-3">
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-brand-100 hover:bg-white/10">Dashboard</Link>
                  <Link href="/profile" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-brand-100 hover:bg-white/10">My Profile</Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="block w-full text-left rounded-md px-3 py-2 text-sm text-red-400 hover:bg-white/10">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-brand-100 hover:bg-white/10">Log In</Link>
                  <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="block rounded-md bg-accent-600 px-3 py-2 text-sm font-medium text-white mt-2">Register Free</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click-outside handler for dropdowns */}
      {dropdownOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(null)} />
      )}
    </nav>
  );
}
