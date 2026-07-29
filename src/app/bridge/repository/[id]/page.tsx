import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Globe, Users, Eye, Download, BookOpen, Calendar, Mail, ExternalLink, Paperclip } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const item = await prisma.repositoryInitiative.findUnique({ where: { id: params.id }, select: { title: true } });
  return { title: item?.title ?? "Repository" };
}

export default async function RepositoryDetailPage({ params }: { params: { id: string } }) {
  const item = await prisma.repositoryInitiative.findUnique({
    where: { id: params.id },
    include: { documents: true },
  });

  if (!item) notFound();

  await prisma.repositoryInitiative.update({
    where: { id: params.id },
    data: { viewCount: { increment: 1 } },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/bridge/repository" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Repository
          </Link>

          <div className="card p-8 lg:p-10 mb-6">
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge variant="general">{item.initiativeType.replace(/_/g, " ")}</Badge>
              {item.sector && <Badge variant="blue">{item.sector}</Badge>}
              {item.country && <Badge variant="slate"><Globe className="h-3 w-3 mr-1" />{item.country}</Badge>}
              {item.region && <Badge variant="slate">{item.region}</Badge>}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4">
              {item.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(item.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {item.viewCount} views
              </span>
              <span className="flex items-center gap-1.5">
                <Download className="h-4 w-4" />
                {item.downloadCount} downloads
              </span>
              {item.actors && (
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {item.actors}
                </span>
              )}
            </div>

            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{item.description}</p>
            </div>

            {item.results && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-8">
                <h2 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Results &amp; Outcomes
                </h2>
                <p className="text-sm text-emerald-800 leading-relaxed whitespace-pre-wrap">{item.results}</p>
              </div>
            )}

            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {item.tags.map((t) => <Badge key={t} variant="blue">{t}</Badge>)}
              </div>
            )}
          </div>

          {(item.contactEmail || item.externalLinks.length > 0) && (
            <div className="card p-6 mb-6">
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-target-smes" />
                Contact &amp; Web Links
              </h2>
              <div className="space-y-2.5">
                {item.contactEmail && (
                  <a href={`mailto:${item.contactEmail}`} className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-target-smes transition-colors">
                    <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    {item.contactEmail}
                  </a>
                )}
                {item.externalLinks.map((link) => (
                  <a key={link} href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-target-smes transition-colors">
                    <Globe className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{link.replace(/^https?:\/\//, "")}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {item.documents.length > 0 && (
            <div className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Paperclip className="h-5 w-5 text-brand-600" />
                Annexes
              </h2>
              <div className="space-y-3">
                {item.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                      {doc.fileType && <p className="text-xs text-slate-400 mt-0.5 uppercase">{doc.fileType}</p>}
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs py-1.5 px-3"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
