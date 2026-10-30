import Link from "next/link";
import Image from "next/image";
import { Mail, Globe, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

const footerLinks = {
  platform: [
    { key: "about", href: "/about" },
    { key: "partners", href: "/partners" },
    { key: "news", href: "/news" },
    { key: "events", href: "/events" },
  ],
  bridge: [
    { key: "directory", href: "/bridge/profiles" },
    { key: "repository", href: "/bridge/repository" },
    { key: "careerGuidance", href: "/bridge/career-guidance" },
    { key: "coDesign", href: "/bridge/co-design" },
    { key: "networking", href: "/bridge/networking" },
  ],
  members: [
    { key: "smes", href: "/smes" },
    { key: "schools", href: "/schools" },
    { key: "dashboard", href: "/dashboard" },
    { key: "register", href: "/auth/register" },
  ],
  legal: [
    { key: "privacy", href: "/privacy" },
    { key: "gdpr", href: "/gdpr" },
    { key: "terms", href: "/terms" },
    { key: "cookies", href: "/cookies" },
  ],
} as const;

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-brand-950 text-brand-200">
      {/* EU Funding Banner */}
      <div className="border-b border-brand-800 bg-brand-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Image
              src="/images/co_funded.png"
              alt={t("coFundedAlt")}
              width={280}
              height={60}
              className="object-contain"
            />
            <div className="sm:ml-auto text-center sm:text-right">
              <p className="text-xs text-brand-400">{t("disclaimer")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/tech_bridge_logo.jpg"
                alt="Tech Bridge Academy"
                width={32}
                height={32}
                className="rounded-lg object-contain"
              />
              <span className="font-bold text-white">Tech Bridge Academy</span>
            </div>
            <p className="text-sm text-brand-400 leading-relaxed">
              {t("description")}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="mailto:info@techbridgeacademy.eu" className="text-brand-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://techbridgeacademy.eu" className="text-brand-400 hover:text-white transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-300 mb-4">{t(`sections.${section}`)}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-brand-400 hover:text-white transition-colors">
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-brand-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-500">
            © {new Date().getFullYear()} Tech Bridge Academy. {t("rights")} {t("consortium")}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-brand-500">{t("projectNo")}</span>
            <a
              href="https://erasmus-plus.ec.europa.eu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-brand-400 hover:text-white transition-colors"
            >
              Erasmus+ <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
