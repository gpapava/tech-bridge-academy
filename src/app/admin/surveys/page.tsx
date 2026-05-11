import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import AdminSurveyActions from "./AdminSurveyActions";

export const metadata = { title: "Surveys — Admin" };

export default async function AdminSurveysPage() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const surveys = await prisma.survey.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { questions: true, responses: true } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Surveys</h1>
          <p className="text-slate-500 mt-1">{surveys.length} surveys</p>
        </div>
        <Link href="/smes/skills-needs" className="btn-primary">
          <PlusCircle className="h-4 w-4" />
          Preview Surveys
        </Link>
      </div>

      <div className="space-y-4">
        {surveys.length === 0 ? (
          <div className="card p-12 text-center text-slate-400">No surveys yet.</div>
        ) : (
          surveys.map((survey) => (
            <div key={survey.id} className="card p-6 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-slate-900">{survey.title}</h3>
                  <Badge variant={survey.isActive ? "green" : "slate"} dot>
                    {survey.isActive ? "Active" : "Inactive"}
                  </Badge>
                  {survey.targetRole && (
                    <Badge variant="blue">{survey.targetRole}</Badge>
                  )}
                </div>
                {survey.description && (
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">{survey.description}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{survey._count.questions} questions</span>
                  <span>·</span>
                  <span>{survey._count.responses} responses</span>
                  <span>·</span>
                  <span>Created {formatDate(survey.createdAt)}</span>
                </div>
              </div>
              <AdminSurveyActions surveyId={survey.id} isActive={survey.isActive} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
