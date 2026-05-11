import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = { title: "Cookie Policy" };

const cookies = [
  {
    name: "next-auth.session-token",
    type: "Essential",
    purpose: "Maintains your login session. Required for authentication.",
    duration: "30 days",
  },
  {
    name: "next-auth.csrf-token",
    type: "Essential",
    purpose: "CSRF protection for form submissions and API calls.",
    duration: "Session",
  },
  {
    name: "next-auth.callback-url",
    type: "Essential",
    purpose: "Stores the URL to redirect to after login.",
    duration: "Session",
  },
];

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8 lg:p-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Cookie Policy</h1>
            <p className="text-sm text-slate-400 mb-10">Last updated: January 2025</p>

            <div className="prose prose-slate max-w-none mb-8">
              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device by your browser. They help websites function correctly and remember your preferences.
              </p>

              <h2>How We Use Cookies</h2>
              <p>
                Tech Bridge Academy uses only <strong>essential cookies</strong> required for the platform to function. We do not use advertising, analytics, or third-party tracking cookies.
              </p>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">Cookies We Set</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Cookie Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Purpose</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {cookies.map((c) => (
                    <tr key={c.name} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-mono text-xs text-slate-700">{c.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          {c.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{c.purpose}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{c.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-5 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-2">Managing Cookies</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You can control or delete cookies through your browser settings. Disabling essential cookies will prevent you from logging in and using the platform. For more information, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">aboutcookies.org</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
