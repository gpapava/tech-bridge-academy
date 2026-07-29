import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, CheckCircle } from "lucide-react";

export const metadata = { title: "Learning Expert Coaching & Training" };

const features = [
  "Self-paced online modules designed for SME Learning Experts and owner-operators",
  "Practical templates and ready-to-use documents (agreements, evaluation forms)",
  "Case studies from consortium partner companies across Europe",
  "Live Q&A sessions with Learning Experts (quarterly)",
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
                SME Services · Learning Expert Coaching
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Learning Expert Coaching &amp; Training</h1>
              <p className="text-amber-100 leading-relaxed">
                Practical guidance for manufacturing SMEs looking to strengthen their workforce, build school partnerships, and design effective apprenticeship and talent development programmes.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* What you get */}
          <div className="card p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <h2 className="text-lg font-bold text-slate-900 mb-5">What&apos;s Included</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
