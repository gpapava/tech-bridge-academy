import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: { value: number; label: string };
  href?: string;
}

export function KPICard({
  title, value, subtitle, icon: Icon,
  iconColor = "text-brand-600", iconBg = "bg-brand-50",
  trend, href
}: KPICardProps) {
  const content = (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", iconBg)}>
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs font-medium rounded-full px-2 py-1",
            trend.value >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          )}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
            <span className="text-slate-400 font-normal">{trend.label}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-slate-900 tabular-nums">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-700">{title}</p>
        {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="card-hover block">
        {content}
      </a>
    );
  }
  return content;
}
