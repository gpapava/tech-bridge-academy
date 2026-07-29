import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BarChart3, Globe, TrendingUp, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata = { title: "Curriculum Educational Observatory" };

const observatoryItems = [
  {
    category: "National Best Practices",
    icon: BookOpen,
    items: [
      { title: "Italian ITS Model: Post-Diploma Technical Education", country: "Italy", tags: ["ITS", "post-diploma", "mechanics"], year: "2024" },
      { title: "Curricular Internships Work Placement Framework: Updated Guidelines", country: "Italy", tags: ["Curricular Internships", "WBL", "VET"], year: "2024" },
    ],
  },
  {
    category: "International Benchmarks",
    icon: Globe,
    items: [
      { title: "German Dual Apprenticeship System: Key Metrics 2024", country: "Germany", tags: ["dual system", "apprenticeship", "benchmark"], year: "2024" },
      { title: "Swiss VET Quality Framework: Lessons for EU Partners", country: "Switzerland", tags: ["quality", "VET", "benchmark"], year: "2023" },
    ],
  },
  {
    category: "Emerging Competency Models",
    icon: TrendingUp,
    items: [
      { title: "Industry 4.0 Competencies for VET Graduates", country: "EU", tags: ["Industry 4.0", "digital skills", "competencies"], year: "2024" },
      { title: "Green Manufacturing Skills Framework", country: "EU", tags: ["green skills", "sustainability", "manufacturing"], year: "2024" },
    ],
  },
];

export default async function ObservatoryPage() {
  const session = await getSession();
  if (!session || (session.user.role !== "SCHOOL" && session.user.role !== "ADMIN")) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-blue-200 mb-6">
                <BarChart3 className="h-4 w-4" />
                Schools Area · Observatory
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Curriculum Educational Observatory</h1>
              <p className="text-blue-100 leading-relaxed">
                Monitor national and international best practices, teaching innovations, emerging competency models, and curriculum trends in the mechanical engineering and manufacturing sector.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* What is the Observatory */}
          <div className="card p-8 mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: "International Monitoring", desc: "Track curriculum and VET policy developments across EU partner countries and beyond." },
                { icon: TrendingUp, title: "Skills Foresight", desc: "Early warning on emerging skills demands from industry surveys and sector intelligence." },
                { icon: BookOpen, title: "Innovation Toolkit", desc: "Ready-to-use tools and methodologies for curriculum innovation and co-design." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 mx-auto mb-3">
                    <Icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {observatoryItems.map(({ category, icon: Icon, items }) => (
              <section key={category}>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {items.map((item) => (
                    <div key={item.title} className="card p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="slate">{item.country}</Badge>
                        <span className="text-xs text-slate-400">{item.year}</span>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-3 leading-snug">{item.title}</h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map((t) => <Badge key={t} variant="blue" className="text-xs">{t}</Badge>)}
                      </div>
                      <button className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-800">
                        Read more <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Periodic Reports CTA */}
          <div className="mt-16 rounded-2xl bg-brand-900 p-8 text-center">
            <BarChart3 className="h-10 w-10 text-brand-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Periodic Observatory Reports</h2>
            <p className="text-brand-300 text-sm max-w-lg mx-auto leading-relaxed mb-6">
              The observatory publishes annual reports summarising curriculum trends, skills demands, and innovation benchmarks. Reports are available to all registered school members.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
