import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, CheckCircle } from "lucide-react";

export const metadata = { title: "GDPR Compliance" };

const rights = [
  { title: "Right to Access", desc: "Request a copy of all personal data we hold about you." },
  { title: "Right to Rectification", desc: "Correct any inaccurate or incomplete personal data." },
  { title: "Right to Erasure", desc: "Request deletion of your data ('right to be forgotten')." },
  { title: "Right to Restrict Processing", desc: "Ask us to limit how we process your data in certain cases." },
  { title: "Right to Data Portability", desc: "Receive your data in a structured, machine-readable format." },
  { title: "Right to Object", desc: "Object to processing based on legitimate interests or direct marketing." },
];

export default function GDPRPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                <Shield className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">GDPR Compliance</h1>
                <p className="text-sm text-slate-400">Your data rights under EU regulation</p>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-8">
              Tech Bridge Academy is fully committed to compliance with the General Data Protection Regulation (GDPR) (EU) 2016/679. This page explains how we protect your data and what rights you have as a platform user.
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">Your Rights Under GDPR</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {rights.map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 mb-8">
              <h2 className="font-semibold text-brand-900 mb-3">How We Protect Your Data</h2>
              <ul className="space-y-2 text-sm text-brand-800">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-500" /> Passwords hashed with bcrypt (never stored in plaintext)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-500" /> All data transmitted over HTTPS/TLS encryption</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-500" /> Role-based access controls on all data operations</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-500" /> Minimal data collection — we only ask for what&apos;s needed</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-500" /> No data sold to third parties, ever</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-brand-500" /> Visibility settings give you control over profile exposure</li>
              </ul>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">Exercise Your Rights</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              To exercise any of your data rights, or to raise a data protection concern, contact our Data Protection point of contact:
            </p>
            <a
              href="mailto:privacy@techbridgeacademy.eu"
              className="btn-primary inline-flex"
            >
              privacy@techbridgeacademy.eu
            </a>

            <p className="text-xs text-slate-400 mt-6">
              You also have the right to lodge a complaint with your national data protection supervisory authority (e.g., the Garante per la protezione dei dati personali in Italy).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
