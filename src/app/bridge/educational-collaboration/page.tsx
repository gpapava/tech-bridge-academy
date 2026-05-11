import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { GraduationCap, Download, ExternalLink, FileText, Video } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata = { title: "Educational Collaboration" };
export const revalidate = 3600;

const RESOURCE_TYPE_ICONS: Record<string, typeof FileText> = {
  Template: FileText,
  Guide: FileText,
  Toolkit: GraduationCap,
  Video: Video,
  Webinar: Video,
};

export default async function EducationalCollaborationPage() {
  const resources = await prisma.educationalResource.findMany({
    where: { isPublished: true },
    orderBy: [{ category: "asc" }, { createdAt: "desc" }],
  });

  const categories = [...new Set(resources.map((r) => r.category))];

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-blue-200 mb-6">
                <GraduationCap className="h-4 w-4" />
                Bridge Area · Educational Collaboration
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Educational Collaboration Resources</h1>
              <p className="text-blue-100 text-lg leading-relaxed">
                Ready-to-use templates, operational guides, toolkits, and case studies for challenge-based learning, project work, company workshops, and work-based learning programmes.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Format Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["All", "Template", "Guide", "Toolkit", "Video", "Webinar"].map((type) => (
              <button key={type} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:border-brand-300 hover:bg-brand-50 transition-colors">
                {type}
              </button>
            ))}
          </div>

          {resources.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-slate-200" />
              Resources are being added. Check back soon.
            </div>
          ) : (
            categories.map((cat) => (
              <section key={cat} className="mb-14">
                <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3">{cat}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {resources.filter((r) => r.category === cat).map((resource) => {
                    const Icon = RESOURCE_TYPE_ICONS[resource.resourceType] ?? FileText;
                    return (
                      <div key={resource.id} className="card p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 flex-shrink-0">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <Badge variant="slate">{resource.resourceType}</Badge>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2 leading-snug">{resource.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-3">{resource.description}</p>
                        {resource.effort && (
                          <p className="text-xs text-slate-400 mb-3">⏱ Estimated effort: {resource.effort}</p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {resource.fileUrl && (
                            <a href={resource.fileUrl} download className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-800">
                              <Download className="h-3.5 w-3.5" /> Download
                            </a>
                          )}
                          {resource.externalUrl && (
                            <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-800">
                              <ExternalLink className="h-3.5 w-3.5" /> Open
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
