import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Building2, Network, BookOpen, ArrowRight, Lock } from "lucide-react";

export const metadata = { title: "SME Services" };

export default async function SMEsPage() {
  const session = await getSession();
  const isAuthenticated = Boolean(session);
  const isCompany = session?.user?.role === "COMPANY" || session?.user?.role === "ADMIN";

  const services = [
    {
      title: "SME Networking",
      icon: Network,
      desc: "Connect with other SMEs, training organisations, schools, and sector stakeholders. Browse the directory, send collaboration requests, and join events.",
      href: "/smes/networking",
      restricted: false,
      badge: "Members",
    },
    {
      title: "Learning Expert Coaching for Hosting Learners",
      icon: BookOpen,
      desc: "Self-learning modules for company staff on how to host apprentices and interns effectively — from onboarding to WBL coordination and internal tutoring.",
      href: "/smes/coaching",
      restricted: !isCompany,
      badge: "Companies Only",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-gradient-to-br from-target-smes to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-target-general mb-6">
                <Building2 className="h-4 w-4" />
                SME Services Area
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Services for Companies &amp; SMEs</h1>
              <p className="text-target-general text-lg leading-relaxed">
                A dedicated space for manufacturing companies, SMEs, and continuing education providers to network and develop Learning Expert capacities.
              </p>
              {!isAuthenticated && (
                <div className="mt-8 flex gap-3">
                  <Link href="/auth/register?role=COMPANY" className="btn-accent">Register as Company</Link>
                  <Link href="/auth/login" className="text-target-general hover:text-white underline self-center text-sm">Already registered? Sign in</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(({ title, icon: Icon, desc, href, restricted, badge }) => (
              <div key={title} className={`card p-6 ${restricted ? "opacity-90" : ""}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-target-smes/10">
                    <Icon className="h-6 w-6 text-target-smes" />
                  </div>
                  <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${restricted ? "bg-slate-100 text-slate-500" : "bg-target-smes/10 text-target-smes"}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{desc}</p>
                {restricted ? (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Lock className="h-4 w-4" />
                    <Link href="/auth/register?role=COMPANY" className="text-target-smes hover:opacity-80 font-medium">Register as Company to access</Link>
                  </div>
                ) : (
                  <Link href={href} className="flex items-center gap-1.5 text-sm font-medium text-target-smes hover:opacity-80">
                    Access Service <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
