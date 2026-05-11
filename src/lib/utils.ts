import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return format(new Date(date), "d MMM yyyy");
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return format(new Date(date), "d MMM yyyy, HH:mm");
}

export function formatRelative(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const SECTORS = [
  "Mechanical Engineering",
  "CNC Machining",
  "Automation & Robotics",
  "Metalworking & Welding",
  "Precision Mechanics",
  "Additive Manufacturing",
  "Electronics & Electrical",
  "Smart Manufacturing / Industry 4.0",
  "Automotive",
  "Aerospace",
  "Medical Devices",
  "Toolmaking",
  "Quality Control & Metrology",
  "Hydraulics & Pneumatics",
  "Mechatronics",
  "3D Printing & Prototyping",
  "PLC / SCADA / Industrial IT",
  "Maintenance & Repair",
  "Plastics & Composites",
  "Other",
] as const;

export const REGIONS = [
  "Northern Italy",
  "Central Italy",
  "Southern Italy",
  "Lombardy",
  "Puglia",
  "Campania",
  "Emilia-Romagna",
  "Veneto",
  "Tuscany",
  "Sicily",
  "Sardinia",
  "Piemonte",
  "Lazio",
  "Calabria",
  "Basilicata",
  "Greece – Attica",
  "Greece – Central Macedonia",
  "Slovakia – Bratislava Region",
  "Slovakia – Banská Bystrica",
  "Germany – Bavaria",
  "Germany – Baden-Württemberg",
  "Spain – Catalonia",
  "Spain – Madrid",
  "Cross-regional / National",
  "Other",
] as const;

export const SCHOOL_TYPE_LABELS: Record<string, string> = {
  SCIENTIFIC_TECHNICAL_SIXTH_FORM: "Scientific/Technical Sixth Form College",
  VOCATIONAL_COLLEGE: "Vocational College",
  VET_CENTRE: "Vocational Training Centre (VET)",
  HIGHER_TECHNICAL_INSTITUTE: "Higher Technical Institute (ITS)",
  OTHER: "Other",
};

export const COMPANY_TYPE_LABELS: Record<string, string> = {
  MANUFACTURING_SME: "Manufacturing SME",
  MICRO_ENTERPRISE: "Micro-enterprise / Craftsman",
  LARGE_ENTERPRISE: "Large Enterprise",
  CONTINUING_EDUCATION: "Continuing Education Provider",
  OTHER: "Other",
};

export const MATCH_SCORE_LABEL = (score: number) => {
  if (score >= 80) return { label: "Excellent", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };
  if (score >= 60) return { label: "Strong", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" };
  if (score >= 40) return { label: "Good", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" };
  return { label: "Potential", color: "text-slate-500", bg: "bg-slate-50 border-slate-200" };
};

export const VALIDATION_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pending Review", color: "bg-amber-100 text-amber-700" },
  APPROVED: { label: "Approved", color: "bg-emerald-100 text-emerald-700" },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700" },
};

export const MATCH_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING_REVIEW: { label: "Awaiting Review", color: "bg-amber-100 text-amber-700" },
  APPROVED: { label: "Approved", color: "bg-emerald-100 text-emerald-700" },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700" },
  SENT: { label: "Report Sent", color: "bg-blue-100 text-blue-700" },
};
