import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Globe, Mail, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata = { title: "Partners" };

const partners = [
  {
    country: "🇮🇹 Italy",
    name: "Istituto Istruzione Superiore A. Volta",
    type: "Lead Beneficiary",
    role: "Project coordination, WP3 digital platform lead, piloting in Southern Italy",
    website: "https://www.iis-volta.edu.it",
    email: "erasmus@iis-volta.edu.it",
    description: "A leading technical institute in Puglia with extensive experience in European VET projects and school-enterprise collaboration.",
  },
  {
    country: "🇮🇹 Italy",
    name: "Centro Formazione Professionale Bergamo",
    type: "Associated Partner",
    role: "WP2 needs analysis, WP4 piloting in Northern Italy, repository contribution",
    website: "https://www.cfp-bergamo.it",
    email: "progetti@cfp-bergamo.it",
    description: "One of the largest VET centres in Lombardy, specialised in mechanical and metalworking training.",
  },
  {
    country: "🇬🇷 Greece",
    name: "Technical University of Thessaloniki – VET Faculty",
    type: "Partner",
    role: "Skills foresight methodology, WP2 lead, curriculum observatory framework",
    website: "https://www.auth.gr",
    email: "techbridge@auth.gr",
    description: "Research partner contributing expertise in skills foresight, competency mapping, and VET quality assurance.",
  },
  {
    country: "🇸🇰 Slovakia",
    name: "Stredná odborná škola Elektrotechnická Bratislava",
    type: "Partner",
    role: "WP4 piloting in Slovakia, bilingual content, dissemination in Central Europe",
    website: "https://www.sose-ba.sk",
    email: "erasmus@sose-ba.sk",
    description: "Technical secondary school with strong industry links and a dual education track.",
  },
  {
    country: "🇩🇪 Germany",
    name: "Bayerischer Handwerkstag",
    type: "Associated Partner",
    role: "Dual system expertise, master craftsman mentoring methodology, WP5 dissemination",
    website: "https://www.bht.de",
    email: "europa@bht.de",
    description: "Bavarian Chamber of Skilled Crafts — bringing expertise from the German dual apprenticeship system.",
  },
  {
    country: "🇪🇸 Spain",
    name: "Consorci d'Educació de Barcelona",
    type: "Partner",
    role: "Catalan VET network, Spanish language dissemination, WP5 exploitation",
    website: "https://www.edubcn.cat",
    email: "formacioprofessional@edubcn.cat",
    description: "Educational consortium managing VET programmes across the Barcelona metropolitan area.",
  },
];

const typeColors: Record<string, "blue" | "amber" | "green"> = {
  "Lead Beneficiary": "blue",
  "Associated Partner": "amber",
  "Partner": "green",
};

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-900 to-brand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Project Partners</h1>
              <p className="text-brand-200 text-lg leading-relaxed">
                The TECH BRIDGE VET consortium brings together VET institutions, research organisations, industry chambers, and educational agencies from 5 European countries.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {["🇮🇹 Italy", "🇬🇷 Greece", "🇸🇰 Slovakia", "🇩🇪 Germany", "🇪🇸 Spain"].map((c) => (
                  <div key={c} className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-brand-200">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner) => (
              <div key={partner.name} className={`card p-6 ${partner.type === "Lead Beneficiary" ? "border-brand-200 bg-brand-50/20" : ""}`}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-sm text-slate-400">{partner.country}</span>
                    <h3 className="font-bold text-slate-900 mt-0.5">{partner.name}</h3>
                  </div>
                  <Badge variant={typeColors[partner.type] ?? "slate"} className="flex-shrink-0">{partner.type}</Badge>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-4">{partner.description}</p>

                <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 mb-4">
                  <p className="text-xs font-medium text-slate-500 mb-1">Project Role:</p>
                  <p className="text-xs text-slate-600">{partner.role}</p>
                </div>

                <div className="flex items-center gap-4">
                  <a href={partner.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-800 transition-colors">
                    <Globe className="h-4 w-4" />
                    Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href={`mailto:${partner.email}`}
                    className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                    <Mail className="h-4 w-4" />
                    Contact
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* EU Funding */}
          <div className="mt-16 rounded-2xl bg-brand-950 p-8 text-center">
            <div className="text-4xl mb-4">🇪🇺</div>
            <h2 className="text-xl font-bold text-white mb-3">Funded by the European Union</h2>
            <p className="text-brand-300 text-sm max-w-2xl mx-auto leading-relaxed">
              The TECH BRIDGE VET project is funded under the Erasmus+ Programme, Key Action 2 — Cooperation Partnerships in Vocational Education and Training (KA220-VET). The European Commission&apos;s support for the production of this platform does not constitute an endorsement of the contents which reflects the views only of the authors.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
