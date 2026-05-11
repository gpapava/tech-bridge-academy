import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, CheckCircle, ArrowRight, Briefcase, BookOpen, Target } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export const metadata = { title: "HR Coaching & Training" };

const modules = [
  {
    icon: Briefcase,
    title: "Talent Acquisition in Manufacturing",
    description: "Strategies for attracting VET graduates and apprentices to technical roles. Covers employer branding, partnerships with schools, and internship-to-hire pipelines.",
    tags: ["recruitment", "employer branding", "VET partnerships"],
    duration: "3 hours",
    level: "Beginner",
  },
  {
    icon: Target,
    title: "Competency Framework Design",
    description: "Build role-specific competency maps aligned with Industry 4.0 requirements. Learn to map existing workforce skills against future needs.",
    tags: ["competencies", "Industry 4.0", "skills mapping"],
    duration: "4 hours",
    level: "Intermediate",
  },
  {
    icon: BookOpen,
    title: "Designing Apprenticeship Programmes",
    description: "Step-by-step guide to establishing PCTO or dual apprenticeship agreements with local VET schools. Includes legal framework and administrative templates.",
    tags: ["apprenticeship", "PCTO", "legal framework"],
    duration: "5 hours",
    level: "Intermediate",
  },
  {
    icon: Users,
    title: "Onboarding & Mentorship for Young Professionals",
    description: "Effective onboarding structures and mentorship pairing models that improve retention of young technical staff and apprentices.",
    tags: ["onboarding", "mentorship", "retention"],
    duration: "2 hours",
    level: "Beginner",
  },
];

const features = [
  "Self-paced online modules designed for SME HR managers and owner-operators",
  "Practical templates and ready-to-use documents (agreements, evaluation forms)",
  "Case studies from consortium partner companies in Italy and across Europe",
  "Live Q&A sessions with HR experts (quarterly)",
  "Certificate of completion for each module",
];

export default async function CoachingPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login?callbackUrl=/smes/coaching");

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-gradient-to-br from-amber-900 to-orange-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-amber-200 mb-6">
                <Users className="h-4 w-4" />
                SME Services · HR Coaching
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">HR Coaching &amp; Training</h1>
              <p className="text-amber-100 leading-relaxed">
                Practical HR guidance for manufacturing SMEs looking to strengthen their workforce, build school partnerships, and design effective apprenticeship and talent development programmes.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* What you get */}
          <div className="card p-8 mb-12 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <h2 className="text-lg font-bold text-slate-900 mb-5">What's Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modules */}
          <h2 className="text-xl font-bold text-slate-900 mb-6">Training Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {modules.map(({ icon: Icon, title, description, tags, duration, level }) => (
              <div key={title} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 flex-shrink-0">
                    <Icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="amber">{level}</Badge>
                      <span className="text-xs text-slate-400">{duration}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 leading-snug">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">{description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((t) => <Badge key={t} variant="slate" className="text-xs">{t}</Badge>)}
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <button className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-800">
                    Start Module <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-800 to-orange-900 p-8 text-center">
            <Users className="h-10 w-10 text-amber-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Ready to Build Better Partnerships?</h2>
            <p className="text-amber-200 text-sm max-w-lg mx-auto leading-relaxed mb-6">
              Complete your organisation profile and connect with VET schools in your region to start co-designing training pathways.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/bridge/profiles?orgType=SCHOOL" className="btn-accent">
                Browse Schools →
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
