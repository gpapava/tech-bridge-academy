import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { GraduationCap, Network, BookOpen, BarChart3, ArrowRight, Lock } from "lucide-react";

export const metadata = { title: "School Services" };

export default async function SchoolsPage() {
  const session = await getSession();
  const isAuthenticated = Boolean(session);
  const isSchool = session?.user?.role === "SCHOOL" || session?.user?.role === "ADMIN";

  const services = [
    {
      title: "School Networking",
      icon: Network,
      desc: "Connect with other schools, VET centres, and teachers. Share practices, explore collaboration, and build a professional exchange network.",
      href: "/schools/networking",
      restricted: false,
    },
    {
      title: "Teacher & Staff Development",
      icon: BookOpen,
      desc: "Resources, webinars, company visit opportunities, and guidance methodology training for school staff involved in WBL and school-enterprise dialogue.",
      href: "/schools/staff-development",
      restricted: !isSchool,
    },
    {
      title: "Curriculum Educational Observatory",
      icon: BarChart3,
      desc: "Monitor national and international best practices, curriculum innovations, and emerging competency models. Access periodic reports and innovation toolkits.",
      href: "/schools/observatory",
      restricted: !isSchool,
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-gradient-to-br from-target-schools to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-target-general mb-6">
                <GraduationCap className="h-4 w-4" />
                Schools Area
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Services for Schools &amp; VET Providers</h1>
              <p className="text-target-general text-lg leading-relaxed">
                A dedicated space for VET schools, technical colleges, and training centres to network with peers, access professional development resources, and stay ahead of curriculum trends.
              </p>
              {!isAuthenticated && (
                <div className="mt-8 flex gap-3">
                  <Link href="/auth/register?role=SCHOOL" className="btn-accent">Register as School</Link>
                  <Link href="/auth/login" className="text-target-general hover:text-white underline self-center text-sm">Already registered? Sign in</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(({ title, icon: Icon, desc, href, restricted }) => (
              <div key={title} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-target-schools/10 mb-4">
                  <Icon className="h-6 w-6 text-target-schools" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{desc}</p>
                {restricted ? (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Lock className="h-4 w-4" />
                    <Link href="/auth/register?role=SCHOOL" className="text-target-schools hover:opacity-80 font-medium">Register as School to access</Link>
                  </div>
                ) : (
                  <Link href={href} className="flex items-center gap-1.5 text-sm font-medium text-target-schools hover:opacity-80">
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
