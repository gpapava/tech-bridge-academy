"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Building2, GitMerge } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    href: "/schools",
    label: "Schools",
    icon: GraduationCap,
    color: "text-target-schools",
    activeBg: "bg-target-schools/10",
  },
  {
    href: "/smes",
    label: "SMEs",
    icon: Building2,
    color: "text-target-smes",
    activeBg: "bg-target-smes/10",
  },
  {
    href: "/bridge",
    label: "Bridging the Two Worlds",
    icon: GitMerge,
    color: "text-target-bridge",
    activeBg: "bg-target-bridge/10",
  },
];

export function ServicesSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:block group fixed left-0 top-[104px] bottom-0 z-40 w-14 hover:w-64 bg-white border-r border-slate-200 shadow-sm hover:shadow-lg transition-[width] duration-200 ease-out overflow-hidden"
      aria-label="Our Services"
    >
      <p className="px-4 pt-4 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Our Services
      </p>
      <nav className="py-2">
        {services.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                isActive ? item.activeBg : "hover:bg-slate-50"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", item.color)} />
              <span className={cn("whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity", item.color)}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
