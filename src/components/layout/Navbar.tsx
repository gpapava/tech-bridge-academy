"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu, X, GraduationCap, Building2, GitMerge,
  LayoutDashboard, LogOut, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const publicNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "Partners" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
];

const servicesNav = [
  { href: "/schools", label: "Schools", icon: GraduationCap, colorClass: "text-target-schools" },
  { href: "/smes", label: "SMEs", icon: Building2, colorClass: "text-target-smes" },
  { href: "/bridge", label: "Bridging the Two Worlds", icon: GitMerge, colorClass: "text-target-bridge" },
];

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-brand-900 shadow-md">
      {/* EU Project Strip */}
      <div className="bg-brand-950 px-4 py-1">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xs text-brand-300">
            🇪🇺 Erasmus+ KA220-VET · TECH BRIDGE VET · Project No. 2024-1-IT01-KA220-VET-000255000
          </span>
          <span className="text-xs text-brand-400 hidden sm:block">
            Funded by the European Union
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/tech_bridge_logo.jpg"
              alt="Tech Bridge Academy"
              width={80}
              height={80}
              className="rounded-lg object-contain"
            />
            <div className="hidden sm:block">
              <span className="block text-base font-bold text-white leading-tight">Tech Bridge Academy</span>
              <span className="block text-[10px] italic text-brand-300 leading-tight">Connecting education and industry.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-white/15 text-white"
                    : "text-brand-100 hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
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
            {publicNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-2 text-sm text-brand-100 hover:bg-white/10">
                {item.label}
              </Link>
            ))}

            <div className="pt-2">
              <p className="px-3 py-1 text-xs font-semibold text-brand-400 uppercase tracking-wider">Our Services</p>
              {servicesNav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-brand-100 hover:bg-white/10">
                  <item.icon className={cn("h-4 w-4", item.colorClass)} />
                  {item.label}
                </Link>
              ))}
            </div>

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
    </nav>
  );
}
