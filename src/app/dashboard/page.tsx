import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { KPICard } from "@/components/dashboard/KPICard";
import { Badge, OrgTypeBadge, MatchStatusBadge } from "@/components/ui/Badge";
import {
  Building2, GraduationCap, GitMerge, Bell,
  ArrowRight, PlusCircle, Clock, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { MATCH_SCORE_LABEL, formatRelative } from "@/lib/utils";
import { ValidationStatus } from "@prisma/client";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const userId = session.user.id;
  const role = session.user.role;

  const profile = await prisma.organisationProfile.findUnique({
    where: { userId },
    select: { id: true, name: true, orgType: true, validationStatus: true, visibilityStatus: true },
  });

  const [notifications, matches] = await Promise.all([
    prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    profile
      ? prisma.match.findMany({
          where: {
            OR: [{ profileAId: profile.id }, { profileBId: profile.id }],
            status: { in: ["APPROVED", "SENT"] },
          },
          include: {
            profileA: { select: { id: true, name: true, orgType: true } },
            profileB: { select: { id: true, name: true, orgType: true } },
          },
          orderBy: { score: "desc" },
          take: 3,
        })
      : Promise.resolve([]),
  ]);

  const firstName = session.user.name?.split(" ")[0] ?? "there";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome back, {firstName} 👋
              </h1>
              <p className="text-slate-500 mt-1">
                {role === "SCHOOL" ? "School / VET Institution" : role === "COMPANY" ? "Company / SME" : "Administrator"} Account
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!profile ? (
                <Link href="/profile" className="btn-primary">
                  <PlusCircle className="h-4 w-4" />
                  Create Organisation Profile
                </Link>
              ) : (
                <Link href="/profile" className="btn-secondary">
                  Edit My Profile
                </Link>
              )}
              {role === "ADMIN" && (
                <Link href="/admin" className="btn-accent">Admin Panel</Link>
              )}
            </div>
          </div>

          {/* Profile Status Banner */}
          {!profile && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 mb-8 flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Your organisation profile is not set up yet</p>
                <p className="text-sm text-amber-700 mt-1">
                  Create your profile to appear in the directory, receive match suggestions, and access all platform features.
                </p>
                <Link href="/profile" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-amber-800 hover:text-amber-900">
                  Create profile now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {profile && profile.validationStatus === "PENDING" && (
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-5 mb-8 flex items-start gap-4">
              <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Your profile is awaiting validation</p>
                <p className="text-sm text-blue-700 mt-1">
                  Our team will review and validate your organisation profile within 1-2 business days. You&apos;ll be notified once approved.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* My Profile Card */}
              {profile && (
                <section className="card p-6">
                  <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-brand-600" />
                    My Organisation Profile
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${profile.orgType === "SCHOOL" ? "bg-blue-50" : "bg-amber-50"}`}>
                      {profile.orgType === "SCHOOL"
                        ? <GraduationCap className="h-6 w-6 text-blue-600" />
                        : <Building2 className="h-6 w-6 text-amber-600" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{profile.name}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <OrgTypeBadge type={profile.orgType} />
                        <Badge variant={
                          profile.validationStatus === "APPROVED" ? "green" :
                          profile.validationStatus === "REJECTED" ? "red" : "amber"
                        } dot>
                          {profile.validationStatus === "APPROVED" ? "Validated" :
                           profile.validationStatus === "REJECTED" ? "Rejected" : "Pending Review"}
                        </Badge>
                      </div>
                    </div>
                    <Link href={`/bridge/profiles/${profile.id}`} className="btn-secondary text-xs">
                      View Public Profile
                    </Link>
                  </div>
                </section>
              )}

              {/* Matches */}
              {matches.length > 0 && (
                <section className="card p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                      <GitMerge className="h-5 w-5 text-accent-600" />
                      My Match Suggestions
                    </h2>
                    <Link href="/bridge/profiles" className="text-sm text-brand-600 hover:text-brand-700">
                      Browse All →
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {matches.map((match) => {
                      const partner = match.profileA.id === profile?.id ? match.profileB : match.profileA;
                      const { label, color } = MATCH_SCORE_LABEL(match.score);
                      return (
                        <div key={match.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-colors">
                          <div className={`flex h-10 w-10 flex-col items-center justify-center rounded-full border-2 flex-shrink-0 text-xs font-bold ${color}`} style={{ borderColor: "currentColor" }}>
                            {match.score}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{partner.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-xs ${color}`}>{label}</span>
                              <MatchStatusBadge status={match.status} />
                            </div>
                          </div>
                          <Link href={`/bridge/profiles/${partner.id}`} className="text-xs text-brand-600 hover:text-brand-800 flex-shrink-0">
                            View →
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <section className="card p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {[
                    { label: "Browse Organisation Directory", href: "/bridge/profiles", icon: Building2 },
                    { label: "Repository of Good Practices", href: "/bridge/repository", icon: GraduationCap },
                    { label: "Career Guidance Content", href: "/bridge/career-guidance", icon: GraduationCap },
                    ...(role === "COMPANY" ? [
                      { label: "SME Networking", href: "/smes/networking", icon: Building2 },
                    ] : []),
                    ...(role === "SCHOOL" ? [
                      { label: "School Networking", href: "/schools/networking", icon: GraduationCap },
                      { label: "Staff Development", href: "/schools/staff-development", icon: GraduationCap },
                    ] : []),
                  ].map(({ label, href, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-slate-400" />
                      {label}
                    </Link>
                  ))}
                </div>
              </section>

              {/* Notifications */}
              <section className="card p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                  {notifications.length > 0 && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {notifications.length}
                    </span>
                  )}
                </h3>
                {notifications.length === 0 ? (
                  <p className="text-sm text-slate-400">No unread notifications.</p>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <div key={n.id} className="rounded-lg bg-brand-50 border border-brand-100 p-3">
                        <p className="text-xs font-semibold text-brand-800">{n.title}</p>
                        <p className="text-xs text-brand-600 mt-0.5 leading-relaxed">{n.message}</p>
                        <p className="text-[10px] text-brand-400 mt-1">{formatRelative(n.createdAt)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
