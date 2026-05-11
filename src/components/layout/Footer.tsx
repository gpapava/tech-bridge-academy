import Link from "next/link";
import { Mail, Globe, ExternalLink } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "About Tech Bridge Academy", href: "/about" },
    { label: "Partner Organisations", href: "/partners" },
    { label: "News & Updates", href: "/news" },
    { label: "Events Calendar", href: "/events" },
  ],
  Bridge: [
    { label: "Organisation Directory", href: "/bridge/profiles" },
    { label: "Repository of Practices", href: "/bridge/repository" },
    { label: "Career Guidance", href: "/bridge/career-guidance" },
    { label: "Co-Design Service", href: "/bridge/co-design" },
  ],
  "For Members": [
    { label: "SME Services", href: "/smes" },
    { label: "School Services", href: "/schools" },
    { label: "My Dashboard", href: "/dashboard" },
    { label: "Register", href: "/auth/register" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "GDPR Statement", href: "/gdpr" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-200">
      {/* EU Funding Banner */}
      <div className="border-b border-brand-800 bg-brand-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-2xl">🇪🇺</div>
              <div>
                <p className="text-sm font-semibold text-white">Funded by the European Union</p>
                <p className="text-xs text-brand-400">Erasmus+ Programme · KA220-VET · Project TECH BRIDGE VET</p>
              </div>
            </div>
            <div className="sm:ml-auto text-center sm:text-right">
              <p className="text-xs text-brand-400">
                Views and opinions expressed are those of the authors only and do not necessarily reflect
                those of the European Union or the European Education and Culture Executive Agency.
              </p>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
                <span className="text-sm font-bold text-white">TB</span>
              </div>
              <span className="font-bold text-white">Tech Bridge Academy</span>
            </div>
            <p className="text-sm text-brand-400 leading-relaxed">
              A digital hub connecting VET schools and manufacturing SMEs to reduce skills mismatch in the mechanical engineering sector.
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
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-300 mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-brand-400 hover:text-white transition-colors">
                      {link.label}
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
            © {new Date().getFullYear()} Tech Bridge Academy. All rights reserved. Erasmus+ TECH BRIDGE VET Consortium.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-brand-500">Project Agreement No. 2024-XX-XXXXX</span>
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
