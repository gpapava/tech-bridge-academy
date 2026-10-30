import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { eduWidgets, getEduWidget } from "@/data/edu-widgets";
import { WidgetFrame } from "@/components/widgets/WidgetFrame";

export function generateStaticParams() {
  return eduWidgets.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const w = getEduWidget(params.slug);
  return { title: w ? `${w.title} – Educational Collaboration` : "Educational Collaboration" };
}

export default function EduWidgetPage({ params }: { params: { slug: string } }) {
  const w = getEduWidget(params.slug);
  if (!w) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/bridge/educational-collaboration"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Educational Collaboration
          </Link>
          <WidgetFrame src={`/widgets/${w.file}`} title={w.title} />
        </div>
      </main>
      <Footer />
    </>
  );
}
