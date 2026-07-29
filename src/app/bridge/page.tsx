import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Search, BookOpen, Play, GitMerge, GraduationCap, ArrowRight, Megaphone, MapPin } from "lucide-react";

export const metadata = { title: "The Bridge" };

const bridgeAreas = [
  {
    title: "Organisation Directory",
    icon: Search,
    desc: "Search and explore profiles of VET schools, technical colleges, and manufacturing companies. Filter by sector, region, type, and more.",
    href: "/bridge/profiles",
    color: "brand",
    badge: "Public",
  },
  {
    title: "Repository of Practices",
    icon: BookOpen,
    desc: "A curated library of successful school–enterprise collaboration models, co-design initiatives, and good practices from across Europe.",
    href: "/bridge/repository",
    color: "accent",
    badge: "Public",
  },
  {
    title: "Career Guidance",
    icon: Play,
    desc: "Videos, interviews, and content for students and families discovering career opportunities in mechanical engineering and manufacturing.",
    href: "/bridge/career-guidance",
    color: "teal",
    badge: "Public",
  },
  {
    title: "Co-Design Service",
    icon: GitMerge,
    desc: "A facilitated service for schools and companies to jointly develop training programmes, modules, and competency frameworks.",
    href: "/bridge/co-design",
    color: "purple",
    badge: "Members",
  },
  {
    title: "Educational Collaboration",
    icon: GraduationCap,
    desc: "Templates, toolkits, and resources for challenge-based learning, project work, company workshops, and work-based learning projects.",
    href: "/bridge/educational-collaboration",
    color: "blue",
    badge: "Members",
  },
  {
    title: "Networking",
    icon: Megaphone,
    desc: "A shared notice board to post announcements, look for partners, or offer collaboration opportunities across the network.",
    href: "/bridge/networking",
    color: "smes",
    badge: "Public",
  },
  {
    title: "Stakeholder Map",
    icon: MapPin,
    desc: "See validated schools, companies, and organisations plotted on an interactive map. Click a pin for a quick preview and link to the full profile.",
    href: "/bridge/map",
    color: "brand",
    badge: "Public",
  },
];

export default function BridgePage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-gradient-to-br from-target-bridge to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-target-general mb-6">
                <GitMerge className="h-4 w-4" />
                The Bridge Area
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">The Bridge</h1>
              <p className="text-target-general text-xl leading-relaxed">
                The operational core of Tech Bridge Academy — the space where schools and companies find each other, share knowledge, and build lasting collaboration.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bridgeAreas.map(({ title, icon: Icon, desc, href, badge }) => (
              <Link key={title} href={href} className="card-hover block p-6 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-target-bridge/10">
                    <Icon className="h-6 w-6 text-target-bridge" />
                  </div>
                  <span className={`text-xs font-medium rounded-full px-2.5 py-1 ${badge === "Public" ? "bg-emerald-100 text-emerald-700" : "bg-target-bridge/10 text-target-bridge"}`}>
                    {badge}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-target-bridge transition-colors">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-1 text-sm font-medium text-target-bridge">
                  Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
