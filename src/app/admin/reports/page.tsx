import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { FileText } from "lucide-react";

export const metadata = { title: "Reports — Admin" };

export default async function AdminReportsPage() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const reports = await prisma.report.findMany({
    orderBy: { createdAt: "desc" },
  });

  const stats = await Promise.all([
    prisma.user.count(),
    prisma.organisationProfile.count({ where: { validationStatus: "APPROVED" } }),
    prisma.match.count({ where: { status: "APPROVED" } }),
    prisma.surveyResponse.count(),
    prisma.eventRegistration.count(),
  ]);

  const [totalUsers, approvedProfiles, approvedMatches, surveyResponses, eventRegistrations] = stats;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-slate-500 mt-1">Platform activity summary and generated reports</p>
      </div>

      {/* Live Stats Summary */}
      <div className="card p-6 mb-8 bg-gradient-to-br from-brand-50 to-blue-50 border-brand-100">
        <h2 className="font-semibold text-slate-900 mb-5">Current Platform Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { label: "Registered Users", value: totalUsers },
            { label: "Validated Profiles", value: approvedProfiles },
            { label: "Approved Matches", value: approvedMatches },
            { label: "Survey Responses", value: surveyResponses },
            { label: "Event Registrations", value: eventRegistrations },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-brand-700">{value}</p>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Reports */}
      <h2 className="font-semibold text-slate-900 mb-4">Generated Reports</h2>
      {reports.length === 0 ? (
        <div className="card p-12 text-center">
          <FileText className="h-12 w-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400">No reports generated yet.</p>
          <p className="text-sm text-slate-400 mt-1">Reports are generated automatically from match reviews and admin actions.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="card p-5 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium text-slate-900">{report.title}</p>
                  <Badge variant="blue">{report.reportType}</Badge>
                </div>
                <p className="text-xs text-slate-400">Generated {formatDate(report.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
