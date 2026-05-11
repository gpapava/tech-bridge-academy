import { prisma } from "@/lib/prisma";
import { KPICard } from "@/components/dashboard/KPICard";
import {
  Users, Building2, GraduationCap, GitMerge, BookOpen,
  ClipboardList, Bell, AlertCircle, CheckCircle, Clock
} from "lucide-react";
import Link from "next/link";
import { ValidationStatus } from "@prisma/client";
import { formatRelative } from "@/lib/utils";
import { Badge, MatchStatusBadge, ValidationBadge } from "@/components/ui/Badge";

export const metadata = { title: "Admin Dashboard" };

export const revalidate = 60;

export default async function AdminDashboardPage() {
  const [
    totalUsers,
    pendingProfiles,
    approvedProfiles,
    pendingMatches,
    totalMatches,
    pendingRepository,
    recentUsers,
    recentMatches,
    notifications,
  ] = await Promise.all([
    prisma.user.count({ where: { role: { not: "ADMIN" } } }),
    prisma.organisationProfile.count({ where: { validationStatus: ValidationStatus.PENDING } }),
    prisma.organisationProfile.count({ where: { validationStatus: ValidationStatus.APPROVED } }),
    prisma.match.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.match.count(),
    prisma.repositoryInitiative.count({ where: { publishStatus: ValidationStatus.PENDING } }),
    prisma.user.findMany({
      where: { role: { not: "ADMIN" } },
      select: { id: true, name: true, email: true, role: true, createdAt: true, profile: { select: { name: true, validationStatus: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.match.findMany({
      where: { status: "PENDING_REVIEW" },
      include: {
        profileA: { select: { id: true, name: true, orgType: true } },
        profileB: { select: { id: true, name: true, orgType: true } },
      },
      orderBy: { score: "desc" },
      take: 5,
    }),
    prisma.notification.findMany({
      where: { user: { role: "ADMIN" } },
      include: { user: { select: { id: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const alertCount = pendingProfiles + pendingMatches + pendingRepository;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Tech Bridge Academy Platform Overview</p>
        </div>
        {alertCount > 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-800">
              {alertCount} item{alertCount > 1 ? "s" : ""} awaiting review
            </span>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <KPICard title="Total Members" value={totalUsers} icon={Users} iconColor="text-brand-600" iconBg="bg-brand-50" href="/admin/users" />
        <KPICard title="Validated Profiles" value={approvedProfiles} icon={Building2} iconColor="text-emerald-600" iconBg="bg-emerald-50" href="/admin/profiles" />
        <KPICard
          title="Pending Validation"
          value={pendingProfiles}
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          href="/admin/profiles"
        />
        <KPICard title="Total Matches" value={totalMatches} icon={GitMerge} iconColor="text-purple-600" iconBg="bg-purple-50" href="/admin/matches" />
      </div>

      {/* Action Needed */}
      {alertCount > 0 && (
        <div className="card p-5 mb-8">
          <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Action Required
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pendingProfiles > 0 && (
              <Link href="/admin/profiles" className="flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 hover:bg-amber-100 transition-colors">
                <Building2 className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-semibold text-amber-800">{pendingProfiles}</p>
                  <p className="text-xs text-amber-600">Profile{pendingProfiles > 1 ? "s" : ""} to validate</p>
                </div>
              </Link>
            )}
            {pendingMatches > 0 && (
              <Link href="/admin/matches" className="flex items-center gap-3 rounded-xl bg-purple-50 border border-purple-200 p-4 hover:bg-purple-100 transition-colors">
                <GitMerge className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-semibold text-purple-800">{pendingMatches}</p>
                  <p className="text-xs text-purple-600">Match{pendingMatches > 1 ? "es" : ""} to review</p>
                </div>
              </Link>
            )}
            {pendingRepository > 0 && (
              <Link href="/admin/repository" className="flex items-center gap-3 rounded-xl bg-blue-50 border border-blue-200 p-4 hover:bg-blue-100 transition-colors">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">{pendingRepository}</p>
                  <p className="text-xs text-blue-600">Repositor{pendingRepository > 1 ? "ies" : "y"} to review</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-600" />
              Recent Registrations
            </h2>
            <Link href="/admin/users" className="text-xs text-brand-600 hover:text-brand-800">View all →</Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 flex-shrink-0">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{user.name ?? user.email}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <Badge variant={user.role === "SCHOOL" ? "blue" : "amber"}>{user.role}</Badge>
                  {user.profile && <ValidationBadge status={user.profile.validationStatus} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Matches */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <GitMerge className="h-5 w-5 text-purple-600" />
              Matches Awaiting Review
            </h2>
            <Link href="/admin/matches" className="text-xs text-brand-600 hover:text-brand-800">View all →</Link>
          </div>
          {recentMatches.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-emerald-300" />
              All matches reviewed!
            </div>
          ) : (
            <div className="space-y-3">
              {recentMatches.map((match) => (
                <Link key={match.id} href="/admin/matches" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-colors">
                  <div className="flex h-10 w-10 flex-col items-center justify-center rounded-full border-2 border-purple-300 flex-shrink-0 text-xs font-bold text-purple-600">
                    {match.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 truncate">{match.profileA.name}</p>
                    <p className="text-xs text-slate-500 truncate">↔ {match.profileB.name}</p>
                  </div>
                  <MatchStatusBadge status={match.status} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Run Matching Engine */}
        <RunMatchingCard />
      </div>
    </div>
  );
}

function RunMatchingCard() {
  return (
    <div className="card p-6">
      <h2 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
        <GitMerge className="h-5 w-5 text-brand-600" />
        Matching Engine
      </h2>
      <p className="text-sm text-slate-500 mb-5 leading-relaxed">
        Run the matching algorithm across all validated profiles to generate new match suggestions. The engine uses rule-based scoring (sector, region, tags, needs/opportunities) and AI report generation if an API key is configured.
      </p>
      <RunMatchingButton />
    </div>
  );
}

// Client component for the button
import RunMatchingButton from "./RunMatchingButton";
