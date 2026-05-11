import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { Newspaper, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata = { title: "News" };
export const revalidate = 1800;

export default async function NewsPage() {
  const news = await prisma.newsPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-slate-900">News &amp; Updates</h1>
            <p className="text-slate-500 mt-2">Latest news from the TECH BRIDGE VET consortium and the Tech Bridge Academy platform</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {news.length === 0 ? (
            <div className="text-center py-20">
              <Newspaper className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400">No news articles published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {news.map((post) => (
                <Link key={post.id} href={`/news/${post.id}`} className="card-hover block p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map((t) => <Badge key={t} variant="blue">{t}</Badge>)}
                  </div>
                  <h2 className="font-semibold text-slate-900 leading-snug hover:text-brand-700 transition-colors mb-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  )}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{formatDate(post.publishedAt)}</span>
                    <span className="text-sm font-medium text-brand-600 flex items-center gap-1">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
