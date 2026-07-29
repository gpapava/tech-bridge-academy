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
              Connecting VET Schools{" "}
              <span className="text-accent-400">&amp; Industry</span>{" "}
              Across Europe
            </h1>

            <p className="mt-6 text-xl text-brand-200 leading-relaxed max-w-2xl">
              Tech Bridge Academy is the digital hub where vocational schools, technical colleges, and manufacturing SMEs collaborate to reduce skills mismatch and build the workforce of tomorrow.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/auth/register?role=SCHOOL"
                className="inline-flex items-center gap-2 rounded-lg bg-target-schools px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
              >
                <GraduationCap className="h-5 w-5" />
                Register as VET School
              </Link>
              <Link
                href="/auth/register?role=COMPANY"
                className="inline-flex items-center gap-2 rounded-lg bg-target-smes px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
              >
                <Building2 className="h-5 w-5" />
                Register as SME
              </Link>
              <Link href="/bridge/profiles" className="btn-secondary text-base px-6 py-3 bg-white/10 text-white ring-white/30 hover:bg-white/20">
                Explore Directory
              </Link>
            </div>

            {/* Quick stats strip */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Schools & VET", value: stats.schools },
                { label: "Companies & SMEs", value: stats.companies },
                { label: "Matches Made", value: stats.matches },
                { label: "Good Practices", value: stats.initiatives },
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
                About the Platform
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 text-balance">
                Bridging the Gap Between Education and Industry
              </h2>
              <p className="mt-5 text-lg text-slate-500 leading-relaxed">
                Tech Bridge Academy is the operational platform of the <strong>TECH BRIDGE VET</strong> Erasmus+ project — designed to create structured, two-way collaboration between VET schools and SMEs in the mechanical engineering and manufacturing sector.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Building2, text: "Structured profiles for schools and companies with AI-powered matching" },
                  { icon: GitMerge, text: "Curriculum co-design tools connecting school programmes with industry needs" },
                  { icon: BookOpen, text: "Repository of best practices from across Europe" },
                  { icon: Globe, text: "Multilingual platform connecting partners from 5+ EU countries" },
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
                Learn More About TECH BRIDGE VET
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-accent-50 p-8 border border-brand-100">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "VET Schools", icon: GraduationCap, color: "blue", count: stats.schools },
                    { label: "SMEs & Companies", icon: Building2, color: "amber", count: stats.companies },
                    { label: "Active Matches", icon: GitMerge, color: "green", count: stats.matches },
                    { label: "Events Hosted", icon: Calendar, color: "purple", count: stats.events },
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
                      <p className="text-sm font-semibold text-slate-900">AI-Powered Matching</p>
                      <p className="text-xs text-slate-400">Automatically connecting schools with the right companies</p>
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
            <h2>Ecosystem Dashboard</h2>
            <p>Live platform metrics across the Tech Bridge Academy network</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KPICard title="Registered Schools & VET" value={stats.schools} icon={GraduationCap} iconColor="text-blue-600" iconBg="bg-blue-50" href="/bridge/profiles?orgType=SCHOOL" />
            <KPICard title="Registered Companies & SMEs" value={stats.companies} icon={Building2} iconColor="text-amber-600" iconBg="bg-amber-50" href="/bridge/profiles?orgType=COMPANY" />
            <KPICard title="Matches Generated" value={stats.matches} icon={GitMerge} iconColor="text-emerald-600" iconBg="bg-emerald-50" href="/bridge" />
            <KPICard title="Good Practices Published" value={stats.initiatives} icon={BookOpen} iconColor="text-purple-600" iconBg="bg-purple-50" href="/bridge/repository" />
          </div>
        </div>
      </section>

      {/* ── Platform Areas ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-header">
            <h2>Platform Services</h2>
            <p>Three integrated areas covering the full school-enterprise collaboration lifecycle</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Bridge",
                subtitle: "For All Members",
                icon: GitMerge,
                color: "brand",
                features: [
                  "AI-powered school-company matching",
                  "Organisation directory & profiles",
                  "Repository of co-operation practices",
                  "Career guidance for students",
                  "Curriculum co-design service",
                ],
                href: "/bridge",
                badge: "Core Area",
              },
              {
                title: "SME Services",
                subtitle: "For Companies",
                icon: Building2,
                color: "amber",
                features: [
                  "SME networking & directory",
                  "Learning Expert coaching resources",
                ],
                href: "/smes",
                badge: "Members Only",
              },
              {
                title: "School Services",
                subtitle: "For Schools & VET",
                icon: GraduationCap,
                color: "blue",
                features: [
                  "School networking & exchange",
                  "Teacher & staff development",
                  "Curriculum educational observatory",
                  "Company visit & tour calendar",
                  "Curricular Internships / WBL planning resources",
                ],
                href: "/schools",
                badge: "Members Only",
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
                  Explore {title} →
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
                <h2 className="text-2xl font-bold text-slate-900">Latest News</h2>
                <p className="text-slate-500 mt-1">Updates from the TECH BRIDGE VET consortium</p>
              </div>
              <Link href="/news" className="btn-secondary">All News →</Link>
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
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : ""}
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
            <span className="text-sm text-brand-200">GDPR Compliant · Erasmus+ Funded</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">
            Join the Tech Bridge Academy Network
          </h2>
          <p className="mt-5 text-lg text-brand-200 leading-relaxed">
            Create your free organisation profile and start connecting with schools or companies in your sector. Registration is free for all Erasmus+ partner organisations and their networks.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register?role=SCHOOL"
              className="inline-flex items-center gap-2 rounded-lg bg-target-schools px-8 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              <GraduationCap className="h-5 w-5" />
              Register as VET School
            </Link>
            <Link
              href="/auth/register?role=COMPANY"
              className="inline-flex items-center gap-2 rounded-lg bg-target-smes px-8 py-3 text-base font-medium text-white shadow-sm hover:opacity-90 transition-opacity"
            >
              <Building2 className="h-5 w-5" />
              Register as SME
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
