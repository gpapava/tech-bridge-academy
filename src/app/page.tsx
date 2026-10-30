import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { KPICard } from "@/components/dashboard/KPICard";
import {
  Building2, GraduationCap, GitMerge, Calendar, BookOpen,
  Users, CheckCircle, Globe, Zap, Shield,
  ChevronRight, Star
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ValidationStatus } from "@prisma/client";
import { getLocale, getTranslations } from "next-intl/server";

async function getStats() {
  const [companies, schools, matches, events, initiatives] = await Promise.all([
    prisma.organisationProfile.count({ where: { orgType: "COMPANY", validationStatus: ValidationStatus.APPROVED } }),
    prisma.organisationProfile.count({ where: { orgType: "SCHOOL", validationStatus: ValidationStatus.APPROVED } }),
    prisma.match.count(),
    prisma.event.count({ where: { isPublished: true } }),
    prisma.repositoryInitiative.count({ where: { publishStatus: ValidationStatus.APPROVED } }),
  ]);
  return { companies, schools, matches, events, initiatives };
}

async function getLatestNews() {
  return prisma.newsPost.findMany({
    where: { isPublished: true },
    select: { id: true, title: true, excerpt: true, tags: true, publishedAt: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });
}

async function getUpcomingEvents() {
  return prisma.event.findMany({
    where: { isPublished: true, startDate: { gte: new Date() } },
    select: { id: true, title: true, eventType: true, startDate: true, isVirtual: true, location: true },
    orderBy: { startDate: "asc" },
    take: 3,
  });
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const dateLocale = locale === "en" ? "en-GB" : locale;
  const [stats, news, events] = await Promise.all([
    getStats(),
    getLatestNews(),
    getUpcomingEvents(),
  ]);

  return (
    <>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-brand-400 blur-3xl" />
          <div className="absolute bottom-10 right-20 h-56 w-56 rounded-full bg-accent-400 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-4xl">
            {/* EU Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20 mb-8">
              <span className="text-lg">🇪🇺</span>
              <span className="text-sm text-brand-200">Erasmus+ KA220-VET · TECH BRIDGE VET</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-balance">
              {t.rich("heroTitle", { accent: (chunks) => <span className="text-accent-400">{chunks}</span> })}
            </h1>

            <p className="mt-6 text-xl text-brand-200 leading-relaxed max-w-2xl">
              {t("heroText")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/auth/register?role=SCHOOL"
                className="inline-flex items-center gap-2 rounded-lg bg-target-schools px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
              >
                <GraduationCap className="h-5 w-5" />
                {t("registerSchool")}
              </Link>
              <Link
                href="/auth/register?role=COMPANY"
                className="inline-flex items-center gap-2 rounded-lg bg-target-smes px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
              >
                <Building2 className="h-5 w-5" />
                {t("registerSme")}
              </Link>
              <Link href="/bridge/profiles" className="btn-secondary text-base px-6 py-3 bg-white/10 text-white ring-white/30 hover:bg-white/20">
                {t("exploreDirectory")}
              </Link>
            </div>

            {/* Quick stats strip */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: t("stats.schools"), value: stats.schools },
                { label: t("stats.companies"), value: stats.companies },
                { label: t("stats.matches"), value: stats.matches },
                { label: t("stats.practices"), value: stats.initiatives },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/10 text-center">
                  <p className="text-2xl font-bold text-white">{s.value.toLocaleString()}</p>
                  <p className="text-xs text-brand-300 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What is Tech Bridge Academy ──────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 mb-6">
                <Zap className="h-4 w-4" />
                {t("about.badge")}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 text-balance">
                {t("about.title")}
              </h2>
              <p className="mt-5 text-lg text-slate-500 leading-relaxed">
                {t.rich("about.text", { strong: (chunks) => <strong>{chunks}</strong> })}
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Building2, text: t("about.f1") },
                  { icon: GitMerge, text: t("about.f2") },
                  { icon: BookOpen, text: t("about.f3") },
                  { icon: Globe, text: t("about.f4") },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent-50">
                      <Icon className="h-4 w-4 text-accent-600" />
                    </div>
                    <p className="text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-primary mt-8 inline-flex">
                {t("about.learnMore")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 p-8 border border-brand-100">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: t("about.cardSchools"), icon: GraduationCap, color: "blue", count: stats.schools },
                    { label: t("about.cardCompanies"), icon: Building2, color: "amber", count: stats.companies },
                    { label: t("about.cardMatches"), icon: GitMerge, color: "green", count: stats.matches },
                    { label: t("about.cardEvents"), icon: Calendar, color: "purple", count: stats.events },
                  ].map(({ label, icon: Icon, color, count }) => (
                    <div key={label} className={`rounded-xl bg-white p-4 shadow-card border ${
                      color === "blue" ? "border-blue-100" :
                      color === "amber" ? "border-amber-100" :
                      color === "green" ? "border-emerald-100" : "border-purple-100"
                    }`}>
                      <Icon className={`h-6 w-6 mb-2 ${
                        color === "blue" ? "text-blue-500" :
                        color === "amber" ? "text-amber-500" :
                        color === "green" ? "text-emerald-500" : "text-purple-500"
                      }`} />
                      <p className="text-2xl font-bold text-slate-900">{count}</p>
                      <p className="text-xs text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-white p-4 shadow-card border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-900">
                      <Star className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t("about.aiTitle")}</p>
                      <p className="text-xs text-slate-400">{t("about.aiText")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KPI Ecosystem Dashboard ──────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2>{t("kpi.title")}</h2>
            <p>{t("kpi.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title={t("kpi.schools")} value={stats.schools} icon={GraduationCap} iconColor="text-blue-600" iconBg="bg-blue-50" href="/bridge/profiles?orgType=SCHOOL" />
            <KPICard title={t("kpi.companies")} value={stats.companies} icon={Building2} iconColor="text-amber-600" iconBg="bg-amber-50" href="/bridge/profiles?orgType=COMPANY" />
            <KPICard title={t("kpi.matches")} value={stats.matches} icon={GitMerge} iconColor="text-emerald-600" iconBg="bg-emerald-50" href="/bridge" />
            <KPICard title={t("kpi.practices")} value={stats.initiatives} icon={BookOpen} iconColor="text-purple-600" iconBg="bg-purple-50" href="/bridge/repository" />
          </div>
        </div>
      </section>

      {/* ── Platform Areas ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2>{t("services.title")}</h2>
            <p>{t("services.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: t("services.bridge.title"),
                subtitle: t("services.bridge.subtitle"),
                icon: GitMerge,
                color: "brand",
                features: [
                  t("services.bridge.f1"),
                  t("services.bridge.f2"),
                  t("services.bridge.f3"),
                  t("services.bridge.f4"),
                  t("services.bridge.f5"),
                ],
                href: "/bridge",
                badge: t("services.bridge.badge"),
              },
              {
                title: t("services.sme.title"),
                subtitle: t("services.sme.subtitle"),
                icon: Building2,
                color: "amber",
                features: [
                  t("services.sme.f1"),
                  t("services.sme.f2"),
                ],
                href: "/smes",
                badge: t("services.membersOnly"),
              },
              {
                title: t("services.school.title"),
                subtitle: t("services.school.subtitle"),
                icon: GraduationCap,
                color: "blue",
                features: [
                  t("services.school.f1"),
                  t("services.school.f2"),
                  t("services.school.f3"),
                  t("services.school.f4"),
                  t("services.school.f5"),
                ],
                href: "/schools",
                badge: t("services.membersOnly"),
              },
            ].map(({ title, subtitle, icon: Icon, color, features, href, badge }) => (
              <div key={title} className={`card border-t-4 ${color === "brand" ? "border-t-brand-700" : color === "amber" ? "border-t-amber-500" : "border-t-blue-500"} p-6`}>
                <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium mb-4 ${color === "brand" ? "bg-brand-50 text-brand-700" : color === "amber" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
                  {badge}
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl mb-4 ${color === "brand" ? "bg-brand-50" : color === "amber" ? "bg-amber-50" : "bg-blue-50"}`}>
                  <Icon className={`h-6 w-6 ${color === "brand" ? "text-brand-700" : color === "amber" ? "text-amber-600" : "text-blue-600"}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-400 mb-5">{subtitle}</p>
                <ul className="space-y-2.5 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="h-4 w-4 text-accent-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={href} className={`w-full text-center block rounded-lg py-2.5 text-sm font-semibold transition-colors ${color === "brand" ? "bg-brand-800 text-white hover:bg-brand-900" : color === "amber" ? "bg-amber-500 text-white hover:bg-amber-600" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                  {t("services.explore", { title })}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest News ───────────────────────────────────────────────────── */}
      {news.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{t("news.title")}</h2>
                <p className="text-slate-500 mt-1">{t("news.subtitle")}</p>
              </div>
              <Link href="/news" className="btn-secondary">{t("news.all")}</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((post) => (
                <Link key={post.id} href={`/news/${post.id}`} className="card-hover block p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="badge badge-blue">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-slate-900 leading-snug hover:text-brand-700 transition-colors">{post.title}</h3>
                  {post.excerpt && <p className="mt-2 text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>}
                  <p className="mt-4 text-xs text-slate-400">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" }) : ""}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20 mb-6">
            <Shield className="h-4 w-4 text-accent-400" />
            <span className="text-sm text-brand-200">{t("cta.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">
            {t("cta.title")}
          </h2>
          <p className="mt-5 text-lg text-brand-200 leading-relaxed">
            {t("cta.text")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register?role=SCHOOL"
              className="inline-flex items-center gap-2 rounded-lg bg-target-schools px-8 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              <GraduationCap className="h-5 w-5" />
              {t("registerSchool")}
            </Link>
            <Link
              href="/auth/register?role=COMPANY"
              className="inline-flex items-center gap-2 rounded-lg bg-target-smes px-8 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              <Building2 className="h-5 w-5" />
              {t("registerSme")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
