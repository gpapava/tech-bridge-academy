import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Globe, Target, Users, CheckCircle, BookOpen, GitMerge } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About TECH BRIDGE VET" };

const workPackages = [
  { wp: "WP1", title: "Project Management & Quality Assurance", desc: "Coordination of all project activities, financial management, quality monitoring, and risk mitigation across the consortium." },
  { wp: "WP2", title: "Needs Analysis & Ecosystem Mapping", desc: "In-depth analysis of skills mismatch in the mechanical engineering sector across partner countries, mapping of existing school-enterprise dialogue mechanisms." },
  { wp: "WP3", title: "Digital Platform Development", desc: "Design and development of the Tech Bridge Academy platform — the operational core of this project, enabling all digital collaboration services." },
  { wp: "WP4", title: "Pilot Testing & Validation", desc: "Structured piloting of platform services with real schools and companies in all partner countries, with evaluation and iteration." },
  { wp: "WP5", title: "Dissemination & Exploitation", desc: "Dissemination of project results across European VET networks, policy recommendations, and sustainability plan for the platform beyond the project period." },
];

const objectives = [
  "Reduce skills mismatch in the mechanical engineering and manufacturing sector",
  "Create a sustainable digital infrastructure for structured school-enterprise dialogue",
  "Develop and validate an AI-assisted matching system for VET schools and SMEs",
  "Produce a European repository of good practices in skills match initiatives",
  "Support curriculum co-design processes between educational institutions and industry",
  "Generate skills foresight data to inform VET curriculum planning",
  "Train teachers and company HR in effective school-enterprise collaboration",
];

export default function AboutPage() {
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
              <h1 className="text-4xl font-bold text-white mb-5">About Tech Bridge Academy</h1>
              <p className="text-xl text-brand-200 leading-relaxed">
                Tech Bridge Academy is the digital platform of the <strong>TECH BRIDGE VET</strong> Erasmus+ project — a transnational initiative connecting VET schools, technical colleges, and manufacturing SMEs across Europe to reduce skills mismatch in the mechanical engineering sector.
              </p>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">The Challenge</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The mechanical engineering and manufacturing sector across Europe faces a growing skills mismatch: companies cannot find graduates with the right technical and digital competencies, while VET schools struggle to keep curricula aligned with rapidly evolving industry needs.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Traditional dialogue between schools and companies is fragmented, informal, and dependent on individual relationships. There is no structured, scalable mechanism to continuously connect what companies need with what schools teach.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  TECH BRIDGE VET addresses this gap by creating a permanent digital infrastructure for two-way, structured collaboration — with AI-assisted matching, curriculum co-design tools, and a shared repository of proven practices.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-5">Project Objectives</h2>
                <ul className="space-y-3">
                  {objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm leading-relaxed">{obj}</span>
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
                { icon: Globe, label: "Countries", value: "5+", desc: "Italy, Greece, Slovakia, Germany, Spain" },
                { icon: Users, label: "Consortium Partners", value: "8", desc: "Schools, universities, companies, agencies" },
                { icon: Target, label: "Project Duration", value: "24 months", desc: "2024–2026" },
                { icon: BookOpen, label: "Funding Programme", value: "Erasmus+", desc: "KA220-VET · European Commission" },
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
              <h2>Project Work Packages</h2>
              <p>The project is structured in five work packages, each addressing a specific set of deliverables</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {workPackages.map((wp) => (
                <div key={wp.wp} className={`card p-6 ${wp.wp === "WP3" ? "border-brand-300 bg-brand-50/30" : ""}`}>
                  <div className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-bold mb-4 ${wp.wp === "WP3" ? "bg-brand-800 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {wp.wp}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{wp.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{wp.desc}</p>
                  {wp.wp === "WP3" && (
                    <p className="text-xs font-medium text-brand-600 mt-3">← You are here: Tech Bridge Academy</p>
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
              <h2>Platform Architecture</h2>
              <p>Tech Bridge Academy is structured in three integrated areas covering the full collaboration lifecycle</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "The Bridge Area",
                  icon: GitMerge,
                  features: ["AI-powered school-company matching", "Organisation profiles & directory", "Repository of good practices", "Career guidance content", "Curriculum co-design service", "Educational collaboration tools"],
                  color: "brand",
                },
                {
                  title: "SME Services Area",
                  icon: Users,
                  features: ["B2B networking tools", "HR coaching for hosting learners", "Periodic skills needs surveys", "Personalised company reports", "Industry benchmark analytics"],
                  color: "amber",
                },
                {
                  title: "Schools Area",
                  icon: BookOpen,
                  features: ["Teacher networking", "Staff development resources", "Curriculum observatory", "Company visit calendar", "WBL planning tools", "International benchmarks"],
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
              The TECH BRIDGE VET project is funded by the European Union under the Erasmus+ Programme (KA220-VET – Cooperation Partnerships in Vocational Education and Training). The views and opinions expressed are those of the consortium and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor the EACEA can be held responsible for them.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
