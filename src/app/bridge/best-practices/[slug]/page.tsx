import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { bestPractices, getBestPractice } from "@/data/best-practices";
import { BestPracticeWidget } from "@/components/best-practices/BestPracticeWidget";

export function generateStaticParams() {
  return bestPractices.map((bp) => ({ slug: bp.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const bp = getBestPractice(params.slug);
  return { title: bp ? `${bp.shortName} – Best Practice` : "Best Practice" };
}

export default function BestPracticeDetailPage({ params }: { params: { slug: string } }) {
  const bp = getBestPractice(params.slug);
  if (!bp) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/bridge/best-practices"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Best Practice Guides
          </Link>

          <div className="rounded-r-xl border-l-[3px] border-brand-700 bg-white shadow-card p-6 mb-6">
            <div className="text-[11px] font-medium uppercase tracking-wide text-brand-700 mb-1.5">
              Best practice · {bp.country}
            </div>
            <h1 className="text-[22px] font-semibold text-slate-900 leading-snug mb-1.5">{bp.title}</h1>
            <p className="text-sm text-slate-500 mb-4">{bp.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {bp.badges.map((b) => (
                <span
                  key={b}
                  className="text-xs px-2.5 py-1 rounded-full bg-accent-50 text-accent-800 border border-accent-100"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <BestPracticeWidget data={bp} />
        </div>
      </main>
      <Footer />
    </>
  );
}
