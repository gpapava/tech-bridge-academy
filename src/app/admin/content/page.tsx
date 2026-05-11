import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Newspaper, PlusCircle } from "lucide-react";
import AdminContentActions from "./AdminContentActions";

export const metadata = { title: "Content & News — Admin" };

export default async function AdminContentPage() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const posts = await prisma.newsPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content &amp; News</h1>
          <p className="text-slate-500 mt-1">{posts.length} articles</p>
        </div>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="card p-12 text-center text-slate-400">No news articles yet.</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="card p-6 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="font-semibold text-slate-900 truncate">{post.title}</h3>
                  <Badge variant={post.isPublished ? "green" : "amber"} dot>
                    {post.isPublished ? "Published" : "Draft"}
                  </Badge>
                  {post.isFeatured && <Badge variant="blue">Featured</Badge>}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((t) => (
                    <Badge key={t} variant="slate" className="text-xs">{t}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{formatDate(post.createdAt)}</span>
                  {post.publishedAt && <><span>·</span><span>Published {formatDate(post.publishedAt)}</span></>}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a href={`/news/${post.id}`} target="_blank" className="btn-secondary text-xs py-2 px-3">
                  View
                </a>
                <AdminContentActions postId={post.id} isPublished={post.isPublished} isFeatured={post.isFeatured} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
