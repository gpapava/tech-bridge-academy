import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Globe, Target, Users, CheckCircle, BookOpen, GitMerge } from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("aboutPage");
  return { title: t("metaTitle") };
}

const workPackages = ["WP1", "WP2", "WP3", "WP4", "WP5"] as const;

const objectives = ["obj1", "obj2", "obj3", "obj4", "obj5", "obj6", "obj7"] as const;

export default function AboutPage() {
  const t = useTranslations("aboutPage");

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div className="bg-gradient-to-br from-brand-900 to-brand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-brand-200 mb-6">
                🇪🇺 Erasmus+ KA220-VET · TECH BRIDGE VET
              </div>
              <h1 className="text-4xl font-bold text-white mb-5">{t("title")}</h1>
              <p className="text-xl text-brand-200 leading-relaxed">
                {t.rich("intro", { strong: (chunks) => <strong>{chunks}</strong> })}
              </p>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">{t("challengeTitle")}</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t("challenge1")}
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t("challenge2")}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {t("challenge3")}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">{t("objectivesTitle")}</h2>
                <ul className="space-y-3">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm leading-relaxed">{t(obj)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Info */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Globe, label: t("kf.countries"), value: "5+", desc: t("kf.countriesDesc") },
                { icon: Users, label: t("kf.partners"), value: "8", desc: t("kf.partnersDesc") },
                { icon: Target, label: t("kf.duration"), value: t("kf.durationValue"), desc: "2024–2026" },
                { icon: BookOpen, label: t("kf.funding"), value: "Erasmus+", desc: t("kf.fundingDesc") },
              ].map(({ icon: Icon, label, value, desc }) => (
                <div key={label} className="card p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 mx-auto mb-4">
                    <Icon className="h-6 w-6 text-brand-600" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="font-medium text-slate-700 text-sm mt-0.5">{label}</p>
                  <p className="text-xs text-slate-400 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Packages */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header">
              <h2>{t("wpTitle")}</h2>
              <p>{t("wpSubtitle")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {workPackages.map((wp) => (
                <div key={wp} className={`card p-6 ${wp === "WP3" ? "border-brand-300 bg-brand-50/30" : ""}`}>
                  <div className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-bold mb-4 ${wp === "WP3" ? "bg-brand-800 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {wp}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{t(`wp.${wp}.title`)}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{t(`wp.${wp}.desc`)}</p>
                  {wp === "WP3" && (
                    <p className="text-xs font-medium text-brand-600 mt-3">{t("youAreHere")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-header">
              <h2>{t("archTitle")}</h2>
              <p>{t("archSubtitle")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: t("area.bridge"),
                  icon: GitMerge,
                  features: [t("b1"), t("b2"), t("b3"), t("b4"), t("b5"), t("b6")],
                  color: "brand",
                },
                {
                  title: t("area.sme"),
                  icon: Users,
                  features: [t("s1"), t("s2")],
                  color: "amber",
                },
                {
                  title: t("area.schools"),
                  icon: BookOpen,
                  features: [t("c1"), t("c2"), t("c3"), t("c4"), t("c5"), t("c6")],
                  color: "blue",
                },
              ].map(({ title, icon: Icon, features, color }) => (
                <div key={title} className="card p-6">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-4 ${color === "brand" ? "bg-brand-50" : color === "amber" ? "bg-amber-50" : "bg-blue-50"}`}>
                    <Icon className={`h-5 w-5 ${color === "brand" ? "text-brand-600" : color === "amber" ? "text-amber-600" : "text-blue-600"}`} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="text-sm text-slate-500 flex items-start gap-2">
                        <span className="text-accent-400 mt-0.5">›</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EU Disclaimer */}
        <section className="py-10 bg-brand-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-brand-400 leading-relaxed">
              {t("disclaimer")}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
