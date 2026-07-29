import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { KPICard } from "@/components/dashboard/KPICard";
import { Users, Building2, GitMerge, BookOpen, Bell, ClipboardList, Calendar, BarChart3 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Analytics — Admin" };

export default async function AdminAnalyticsPage() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const [
    totalUsers, totalProfiles, approvedProfiles, pendingProfiles,
    totalMatches, totalSchools, totalCompanies,
    totalRepository, totalEvents, totalSurveys,
    totalResponses, recentRegistrations,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.organisationProfile.count(),
    prisma.organisationProfile.count({ where: { validationStatus: "APPROVED" } }),
    prisma.organisationProfile.count({ where: { validationStatus: "PENDING" } }),
    prisma.match.count(),
    prisma.organisationProfile.count({ where: { orgType: "SCHOOL" } }),
    prisma.organisationProfile.count({ where: { orgType: "COMPANY" } }),
    prisma.repositoryInitiative.count({ where: { publishStatus: "APPROVED" } }),
    prisma.event.count({ where: { isPublished: true } }),
    prisma.survey.count({ where: { isActive: true } }),
    prisma.surveyResponse.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
  ]);

  const kpis = [
    { title: "Total Users", value: totalUsers, icon: Users },
    { title: "Organisation Profiles", value: totalProfiles, icon: Building2 },
    { title: "Approved Profiles", value: approvedProfiles, icon: Building2 },
    { title: "Pending Validation", value: pendingProfiles, icon: Building2 },
    { title: "Match Pairs", value: totalMatches, icon: GitMerge },
    { title: "Schools", value: totalSchools, icon: Users },
    { title: "Companies", value: totalCompanies, icon: Building2 },
    { title: "Repository Items", value: totalRepository, icon: BookOpen },
    { title: "Survey Responses", value: totalResponses, icon: ClipboardList },
    { title: "Published Events", value: totalEvents, icon: Calendar },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Platform-wide statistics</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        {kpis.map(({ title, value, icon: Icon }) => (
          <KPICard key={title} title={title} value={value} icon={Icon} />
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-brand-600" />
          Recent Registrations
        </h2>
        <div className="space-y-3">
          {recentRegistrations.map((u) => (
            <div key={u.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-800">{u.name ?? "—"}</p>
                <p className="text-xs text-slate-400">{u.email}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-slate-600">{u.role}</p>
                <p className="text-xs text-slate-400">{formatDate(u.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
