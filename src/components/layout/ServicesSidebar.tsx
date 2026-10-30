"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { GraduationCap, Building2, GitMerge } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    href: "/schools",
    key: "schools",
    icon: GraduationCap,
    color: "text-target-schools",
    activeBg: "bg-target-schools/10",
  },
  {
    href: "/smes",
    key: "smes",
    icon: Building2,
    color: "text-target-smes",
    activeBg: "bg-target-smes/10",
  },
  {
    href: "/bridge",
    key: "bridge",
    icon: GitMerge,
    color: "text-target-bridge",
    activeBg: "bg-target-bridge/10",
  },
];

export function ServicesSidebar() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <aside
      className="hidden lg:flex lg:flex-col fixed left-0 top-[104px] bottom-0 z-40 w-20 bg-white border-r border-slate-200 shadow-sm"
      aria-label={t("ourServices")}
    >
      <p className="px-2 pt-4 pb-2 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-tight">
        {t("ourServices")}
      </p>
      <nav className="flex flex-col py-2">
        {services.map((item) => {
          const label = t(item.key);
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={label}
              className={cn(
                "flex flex-col items-center gap-1.5 px-2 py-3 text-center transition-colors",
                isActive ? item.activeBg : "hover:bg-slate-50"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", item.color)} />
              <span
                className={cn(
                  "font-medium leading-tight",
                  label.length > 10 ? "text-[9px]" : "text-[11px]",
                  item.color
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
