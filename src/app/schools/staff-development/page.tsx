import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookOpen, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StaffResourceList } from "@/components/schools/StaffResourceList";
import Link from "next/link";

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
              {resources.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <BookOpen className="h-10 w-10 mx-auto mb-3 text-slate-200" />
                  Resources are being added. Check back soon.
                </div>
              ) : (
                <StaffResourceList resources={resources} />
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
                    "Curricular Internships planning", "Expert guest lectures", "Technological trends",
                    "Guidance methodology", "Curriculum innovation", "International practices",
                  ].map((t) => (
                    <Badge key={t} variant="blue" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-800 to-blue-950 p-8 text-center mt-12">
            <Users className="h-10 w-10 text-blue-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Ready to Build Better Partnership</h2>
            <p className="text-blue-200 text-sm max-w-lg mx-auto leading-relaxed mb-6">
              Complete your organisation profile and connect with manufacturing SMEs in your region to start co-designing training pathways.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/bridge/profiles?orgType=COMPANY" className="btn-accent">
                Browse Companies →
              </Link>
              <Link href="/bridge/co-design" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
                Co-Design a Programme
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
