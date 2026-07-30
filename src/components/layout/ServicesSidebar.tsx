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
      className="hidden lg:flex lg:flex-col fixed left-0 top-[104px] bottom-0 z-40 w-20 bg-white border-r border-slate-200 shadow-sm"
      aria-label="Our Services"
    >
      <p className="px-2 pt-4 pb-2 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-tight">
        Our Services
      </p>
      <nav className="flex flex-col py-2">
        {services.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "flex flex-col items-center gap-1.5 px-2 py-3 text-center transition-colors",
                isActive ? item.activeBg : "hover:bg-slate-50"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", item.color)} />
              <span
                className={cn(
                  "font-medium leading-tight",
                  item.label.length > 10 ? "text-[9px]" : "text-[11px]",
                  item.color
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
