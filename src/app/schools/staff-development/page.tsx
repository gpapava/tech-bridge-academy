import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookOpen, Video, FileText, Calendar, Download, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ValidationStatus } from "@prisma/client";

export const metadata = { title: "Staff Development" };

export default async function StaffDevelopmentPage() {
  const session = await getSession();
  if (!session || (session.user.role !== "SCHOOL" && session.user.role !== "ADMIN")) {
    redirect("/dashboard");
  }

  const resources = await prisma.educationalResource.findMany({
    where: { isPublished: true, OR: [{ targetRole: null }, { targetRole: "SCHOOL" }] },
    orderBy: { createdAt: "desc" },
  });

  const events = await prisma.event.findMany({
    where: {
      isPublished: true,
      startDate: { gte: new Date() },
      OR: [{ targetRole: null }, { targetRole: "SCHOOL" }],
    },
    orderBy: { startDate: "asc" },
    take: 5,
  });

  const categories = [...new Set(resources.map((r) => r.category))];

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-blue-200 mb-6">
                <BookOpen className="h-4 w-4" />
                Schools Area · Staff Development
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Teacher &amp; Staff Development</h1>
              <p className="text-blue-100 leading-relaxed">
                Resources, webinars, and events to support school staff in developing skills for effective school-enterprise collaboration, work-based learning coordination, and curriculum innovation.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resources */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Resources Library</h2>

              {categories.map((cat) => (
                <section key={cat} className="mb-10">
                  <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide mb-4 pb-2 border-b border-slate-100">{cat}</h3>
                  <div className="space-y-3">
                    {resources.filter((r) => r.category === cat).map((resource) => (
                      <div key={resource.id} className="card p-5 flex items-start gap-4">
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
                          resource.resourceType === "Video" ? "bg-purple-50" :
                          resource.resourceType === "Template" ? "bg-blue-50" :
                          resource.resourceType === "Webinar" ? "bg-green-50" : "bg-slate-50"
                        }`}>
                          {resource.resourceType === "Video"
                            ? <Video className="h-5 w-5 text-purple-600" />
                            : resource.fileUrl
                              ? <Download className="h-5 w-5 text-blue-600" />
                              : <FileText className="h-5 w-5 text-slate-500" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="font-medium text-slate-900">{resource.title}</h4>
                            <Badge variant="slate">{resource.resourceType}</Badge>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed">{resource.description}</p>
                          {resource.effort && (
                            <p className="text-xs text-slate-400 mt-1">⏱ {resource.effort}</p>
                          )}
                          <div className="flex gap-3 mt-3">
                            {resource.fileUrl && (
                              <a href={resource.fileUrl} download className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-800">
                                <Download className="h-3.5 w-3.5" />
                                Download
                              </a>
                            )}
                            {resource.externalUrl && (
                              <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-800">
                                <ExternalLink className="h-3.5 w-3.5" />
                                Open Resource
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {resources.length === 0 && (
                <div className="text-center py-16 text-slate-400">
                  <BookOpen className="h-10 w-10 mx-auto mb-3 text-slate-200" />
                  Resources are being added. Check back soon.
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="card p-5 mb-5">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brand-600" />
                  Upcoming Events for Schools
                </h3>
                {events.length === 0 ? (
                  <p className="text-sm text-slate-400">No events scheduled.</p>
                ) : (
                  <div className="space-y-3">
                    {events.map((ev) => (
                      <div key={ev.id} className="rounded-lg bg-slate-50 border border-slate-100 p-3">
                        <p className="text-sm font-medium text-slate-800">{ev.title}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(ev.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
                          {ev.isVirtual ? " · Online" : ev.location ? ` · ${ev.location}` : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="card p-5 bg-blue-50 border-blue-100">
                <h3 className="font-semibold text-slate-900 mb-2">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Company visits", "Virtual tours", "WBL coordination",
                    "PCTO planning", "Expert guest lectures", "Technological trends",
                    "Guidance methodology", "Curriculum innovation", "International practices",
                  ].map((t) => (
                    <Badge key={t} variant="blue" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
