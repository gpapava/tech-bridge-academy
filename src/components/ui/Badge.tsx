import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "blue" | "green" | "amber" | "red" | "slate" | "purple" | "teal"
  | "schools" | "smes" | "bridge" | "general";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  blue:   "bg-blue-100 text-blue-700 ring-1 ring-blue-200/60",
  green:  "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200/60",
  amber:  "bg-amber-100 text-amber-700 ring-1 ring-amber-200/60",
  red:    "bg-red-100 text-red-700 ring-1 ring-red-200/60",
  slate:  "bg-slate-100 text-slate-600 ring-1 ring-slate-200/60",
  purple: "bg-purple-100 text-purple-700 ring-1 ring-purple-200/60",
  teal:   "bg-teal-100 text-teal-700 ring-1 ring-teal-200/60",
  // Target-group color coding
  schools: "bg-target-schools/10 text-target-schools ring-1 ring-target-schools/30",
  smes:    "bg-target-smes/10 text-target-smes ring-1 ring-target-smes/30",
  bridge:  "bg-target-bridge/10 text-target-bridge ring-1 ring-target-bridge/30",
  general: "bg-target-general/40 text-target-schools ring-1 ring-target-general",
};

const dotColors: Record<BadgeVariant, string> = {
  blue:   "bg-blue-500",
  green:  "bg-emerald-500",
  amber:  "bg-amber-500",
  red:    "bg-red-500",
  slate:  "bg-slate-400",
  purple: "bg-purple-500",
  teal:   "bg-teal-500",
  schools: "bg-target-schools",
  smes:    "bg-target-smes",
  bridge:  "bg-target-bridge",
  general: "bg-target-general",
};

export function Badge({ children, variant = "slate", className, dot }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant], className)}>
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant])} />}
      {children}
    </span>
  );
}

export function OrgTypeBadge({ type }: { type: string }) {
  return type === "SCHOOL"
    ? <Badge variant="schools" dot>School / VET</Badge>
    : <Badge variant="smes" dot>Company / SME</Badge>;
}

export function ValidationBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    PENDING:  { label: "Pending Review", variant: "amber" },
    APPROVED: { label: "Approved", variant: "green" },
    REJECTED: { label: "Rejected", variant: "red" },
  };
  const cfg = map[status] ?? { label: status, variant: "slate" };
  return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
}

export function MatchStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: BadgeVariant }> = {
    PENDING_REVIEW: { label: "Awaiting Review", variant: "amber" },
    APPROVED:       { label: "Approved", variant: "green" },
    REJECTED:       { label: "Rejected", variant: "red" },
    SENT:           { label: "Report Sent", variant: "blue" },
  };
  const cfg = map[status] ?? { label: status, variant: "slate" };
  return <Badge variant={cfg.variant} dot>{cfg.label}</Badge>;
}
