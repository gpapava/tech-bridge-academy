import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Globe, Mail, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("partnersPage");
  return { title: t("metaTitle") };
}

const partners = [
  {
    country: "it",
    name: "Istituto Istruzione Superiore A. Volta",
    type: "Lead Beneficiary",
    website: "https://www.iis-volta.edu.it",
    email: "erasmus@iis-volta.edu.it",
  },
  {
    country: "it",
    name: "Centro Formazione Professionale Bergamo",
    type: "Associated Partner",
    website: "https://www.cfp-bergamo.it",
    email: "progetti@cfp-bergamo.it",
  },
  {
    country: "gr",
    name: "Technical University of Thessaloniki – VET Faculty",
    type: "Partner",
    website: "https://www.auth.gr",
    email: "techbridge@auth.gr",
  },
  {
    country: "sk",
    name: "Stredná odborná škola Elektrotechnická Bratislava",
    type: "Partner",
    website: "https://www.sose-ba.sk",
    email: "erasmus@sose-ba.sk",
  },
  {
    country: "de",
    name: "Bayerischer Handwerkstag",
    type: "Associated Partner",
    website: "https://www.bht.de",
    email: "europa@bht.de",
  },
  {
    country: "es",
    name: "Consorci d'Educació de Barcelona",
    type: "Partner",
    website: "https://www.edubcn.cat",
    email: "formacioprofessional@edubcn.cat",
  },
];

const typeColors: Record<string, "blue" | "amber" | "green"> = {
  "Lead Beneficiary": "blue",
  "Associated Partner": "amber",
  "Partner": "green",
};

const typeKeys: Record<string, string> = {
  "Lead Beneficiary": "lead",
  "Associated Partner": "associated",
  "Partner": "partner",
};

export default function PartnersPage() {
  const t = useTranslations("partnersPage");

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-900 to-brand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("title")}</h1>
              <p className="text-brand-200 text-lg leading-relaxed">
                {t("intro")}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {["it", "gr", "sk", "de", "es"].map((c) => (
                  <div key={c} className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-brand-200">{t(`countries.${c}`)}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partners.map((partner, idx) => (
              <div key={partner.name} className={`card p-6 ${partner.type === "Lead Beneficiary" ? "border-brand-200 bg-brand-50/20" : ""}`}>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="text-sm text-slate-400">{t(`countries.${partner.country}`)}</span>
                    <h3 className="font-bold text-slate-900 mt-0.5">{partner.name}</h3>
                  </div>
                  <Badge variant={typeColors[partner.type] ?? "slate"} className="flex-shrink-0">{t(`types.${typeKeys[partner.type]}`)}</Badge>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-4">{t(`p${idx + 1}.description`)}</p>

                <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 mb-4">
                  <p className="text-xs font-medium text-slate-500 mb-1">{t("projectRole")}</p>
                  <p className="text-xs text-slate-600">{t(`p${idx + 1}.role`)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <a href={partner.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-800 transition-colors">
                    <Globe className="h-4 w-4" />
                    {t("website")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href={`mailto:${partner.email}`}
                    className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
                    <Mail className="h-4 w-4" />
                    {t("contact")}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* EU Funding */}
          <div className="mt-16 rounded-2xl bg-brand-950 p-8 text-center">
            <div className="text-4xl mb-4">🇪🇺</div>
            <h2 className="text-xl font-bold text-white mb-3">{t("fundedTitle")}</h2>
            <p className="text-brand-300 text-sm max-w-2xl mx-auto leading-relaxed">
              {t("fundedText")}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
