import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Globe, ArrowRight } from "lucide-react";
import { bestPractices } from "@/data/best-practices";

export const metadata = { title: "Best Practice Guides" };

export default function BestPracticesPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-gradient-to-br from-brand-900 to-brand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-brand-200 mb-6">
                <Sparkles className="h-4 w-4" />
                Bridge Area · Best Practice Guides
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Best Practice Guides</h1>
              <p className="text-brand-200 text-lg leading-relaxed">
                In-depth, interactive walkthroughs of proven school–enterprise collaboration models from
                across Europe. Read the story, take the lessons that apply to your role, check your
                readiness, and design your own initiative step by step.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestPractices.map((bp) => (
              <Link key={bp.slug} href={`/bridge/best-practices/${bp.slug}`} className="card-hover group block p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="slate">
                    <Globe className="h-3 w-3 mr-1" />
                    {bp.country}
                  </Badge>
                  {bp.badges.slice(0, 2).map((b) => (
                    <Badge key={b} variant="blue">
                      {b}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-semibold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors mb-2">
                  {bp.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">{bp.subtitle}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-700">
                  Explore this practice
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
