import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await prisma.newsPost.findUnique({ where: { id: params.id }, select: { title: true } });
  return { title: post?.title ?? "News Article" };
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const post = await prisma.newsPost.findUnique({
    where: { id: params.id, isPublished: true },
  });

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>

          <div className="card p-8 lg:p-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((t) => <Badge key={t} variant="blue">{t}</Badge>)}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
              <span className="mx-2">·</span>
              <span>Tech Bridge Academy</span>
            </div>

            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full rounded-xl object-cover mb-8 max-h-64"
              />
            )}

            {/* Render HTML content safely */}
            <div
              className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-brand-600 prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="mt-8 text-center">
            <Link href="/news" className="btn-secondary">
              ← All News
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
