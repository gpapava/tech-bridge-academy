import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import AdminRepositoryActions from "./AdminRepositoryActions";

export const metadata = { title: "Repository — Admin" };

export default async function AdminRepositoryPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const statusFilter =
    searchParams.status === "published" ? "APPROVED" :
    searchParams.status === "pending" ? "PENDING" :
    undefined;

  const initiatives = await prisma.repositoryInitiative.findMany({
    where: statusFilter !== undefined ? { publishStatus: statusFilter } : {},
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { documents: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Repository Moderation</h1>
          <p className="text-slate-500 mt-1">{initiatives.length} initiatives</p>
        </div>
        <Link href="/bridge/repository/submit" className="btn-secondary">
          Preview Submit Form
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        {[
          { label: "All", value: undefined },
          { label: "Pending Review", value: "pending" },
          { label: "Published", value: "published" },
        ].map(({ label, value }) => (
          <a
            key={label}
            href={value ? `?status=${value}` : "?"}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              searchParams.status === value
                ? "bg-brand-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:border-brand-300"
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="space-y-4">
        {initiatives.length === 0 ? (
          <div className="card p-12 text-center text-slate-400">No initiatives found.</div>
        ) : (
          initiatives.map((item) => (
            <div key={item.id} className="card p-6 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <Badge variant={item.publishStatus === "APPROVED" ? "green" : "amber"} dot>
                    {item.publishStatus === "APPROVED" ? "Published" : "Pending Review"}
                  </Badge>
                  {item.sector && <Badge variant="blue">{item.sector}</Badge>}
                  {item.country && <Badge variant="slate">{item.country}</Badge>}
                </div>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{item._count.documents} documents</span>
                  <span>·</span>
                  <span>{item.viewCount} views</span>
                  <span>·</span>
                  <span>Submitted {formatDate(item.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/bridge/repository/${item.id}`} className="btn-secondary text-xs py-2 px-3">
                  Preview
                </Link>
                <AdminRepositoryActions initiativeId={item.id} isPublished={item.publishStatus === "APPROVED"} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
