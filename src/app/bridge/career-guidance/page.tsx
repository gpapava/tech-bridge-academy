import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { Play, User, Briefcase, TrendingUp, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata = { title: "Career Guidance" };
export const revalidate = 3600;

const CATEGORY_CONFIG: Record<string, { icon: typeof Play; color: string }> = {
  "Day in the Life": { icon: User, color: "blue" },
  "Discovering Mechanical Engineering Careers": { icon: Briefcase, color: "amber" },
  "Industry Trends": { icon: TrendingUp, color: "green" },
  "Master Craftsman + Young Apprentice": { icon: Star, color: "purple" },
  "Junior Interviews": { icon: User, color: "teal" },
};

export default async function CareerGuidancePage() {
  const content = await prisma.careerContent.findMany({
    where: { isPublished: true },
    orderBy: [{ category: "asc" }, { createdAt: "desc" }],
  });

  const categories = [...new Set(content.map((c) => c.category))];

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-gradient-to-br from-teal-900 to-teal-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-teal-200 mb-6">
                <Play className="h-4 w-4" />
                Bridge Area · Career Guidance
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Career Guidance &amp; Industry Branding</h1>
              <p className="text-teal-100 text-lg leading-relaxed">
                Videos, interviews, and content helping students and families discover the exciting career opportunities in mechanical engineering and manufacturing.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Students", "Families", "Career Counsellors"].map((a) => (
                  <div key={a} className="rounded-full bg-white/10 px-3 py-1 text-sm text-teal-200">{a}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {content.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <Play className="h-12 w-12 mx-auto mb-4 text-slate-200" />
              <p>Career guidance content is being curated. Check back soon.</p>
            </div>
          ) : (
            categories.map((cat) => {
              const items = content.filter((c) => c.category === cat);
              const cfg = CATEGORY_CONFIG[cat] ?? { icon: Play, color: "slate" };
              const Icon = cfg.icon;

              return (
                <section key={cat} className="mb-16">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-${cfg.color}-50`}>
                      <Icon className={`h-5 w-5 text-${cfg.color}-600`} />
                    </div>
                    {cat}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((item) => (
                      <div key={item.id} className="card overflow-hidden">
                        {item.videoUrl ? (
                          <div className="aspect-video bg-slate-900 flex items-center justify-center cursor-pointer group relative">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                              <Play className="h-6 w-6 text-white ml-1" />
                            </div>
                            <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0" aria-label="Play video" />
                          </div>
                        ) : item.imageUrl ? (
                          <div className="aspect-video bg-slate-100 overflow-hidden">
                            <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className={`aspect-video flex items-center justify-center bg-${cfg.color}-50`}>
                            <Icon className={`h-12 w-12 text-${cfg.color}-200`} />
                          </div>
                        )}
                        <div className="p-5">
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {item.targetAudience.map((a) => (
                              <Badge key={a} variant="slate" className="text-[10px]">{a}</Badge>
                            ))}
                          </div>
                          <h3 className="font-semibold text-slate-900 leading-snug">{item.title}</h3>
                          <p className="text-sm text-slate-500 mt-2 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
