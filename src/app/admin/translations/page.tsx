import Link from "next/link";
import { redirect } from "next/navigation";
import { Download } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { locales, localeNames, isLocale } from "@/i18n/config";
import { SuggestionStatus } from "@prisma/client";
import TranslationActions from "./TranslationActions";

export const metadata = { title: "Translations — Admin" };

const STATUS_FILTERS = [
  { label: "Pending", value: "PENDING" },
  { label: "Applied", value: "APPLIED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "All", value: "" },
];

const STATUS_BADGE = { PENDING: "amber", APPLIED: "green", REJECTED: "red" } as const;

export default async function AdminTranslationsPage({
  searchParams,
}: {
  searchParams: { status?: string; locale?: string };
}) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") redirect("/dashboard");

  const status = searchParams.status === undefined ? "PENDING" : searchParams.status;
  const statusFilter = status in SuggestionStatus ? (status as SuggestionStatus) : undefined;
  const locale = isLocale(searchParams.locale) ? searchParams.locale : undefined;

  const suggestions = await prisma.translationSuggestion.findMany({
    where: { ...(statusFilter ? { status: statusFilter } : {}), ...(locale ? { locale } : {}) },
    orderBy: { createdAt: "desc" },
  });

  const href = (s: string, l?: string) => {
    const q = new URLSearchParams();
    q.set("status", s);
    if (l) q.set("locale", l);
    return `/admin/translations?${q}`;
  };
  const exportQuery = new URLSearchParams({ format: "csv", ...(statusFilter ? { status: statusFilter } : {}), ...(locale ? { locale } : {}) });

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Translation Suggestions</h1>
          <p className="text-slate-500 mt-1">
            Corrections sent by native speakers with the &ldquo;Suggest a correction&rdquo; button. {suggestions.length} shown.
          </p>
        </div>
        <a href={`/api/admin/translation-suggestions?${exportQuery}`} className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {STATUS_FILTERS.map((f) => (
          <Link
            key={f.value}
            href={href(f.value, locale)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border ${
              status === f.value ? "bg-brand-800 text-white border-brand-800" : "bg-white text-slate-600 border-slate-200 hover:border-brand-300"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href={href(status)} className={`rounded-full px-3 py-1 text-xs font-medium border ${!locale ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200"}`}>
          All languages
        </Link>
        {locales.map((l) => (
          <Link key={l} href={href(status, l)} className={`rounded-full px-3 py-1 text-xs font-medium border ${locale === l ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200"}`}>
            {localeNames[l]}
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {suggestions.length === 0 ? (
          <div className="card p-12 text-center text-slate-400">No suggestions match this filter.</div>
        ) : (
          suggestions.map((s) => (
            <div key={s.id} className="card p-6">
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <Badge variant="blue">{localeNames[s.locale as keyof typeof localeNames] ?? s.locale}</Badge>
                <Badge variant={STATUS_BADGE[s.status]} dot>{s.status.charAt(0) + s.status.slice(1).toLowerCase()}</Badge>
                <Link href={s.pageUrl} target="_blank" className="text-xs text-brand-600 hover:underline truncate max-w-xs">{s.pageUrl}</Link>
                <span className="text-xs text-slate-400 ml-auto">{formatDate(s.createdAt)}</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Current text</p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap rounded-lg bg-red-50 border border-red-100 p-3">{s.originalText}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Suggested text</p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap rounded-lg bg-emerald-50 border border-emerald-100 p-3">{s.suggestedText}</p>
                </div>
              </div>
              {s.comment && <p className="text-sm text-slate-500 mt-3"><span className="font-medium text-slate-600">Comment:</span> {s.comment}</p>}
              <div className="flex items-center justify-between gap-4 flex-wrap mt-4">
                <p className="text-xs text-slate-400">
                  {s.authorName || "Anonymous"}
                  {s.authorEmail && <> · <a href={`mailto:${s.authorEmail}`} className="hover:underline">{s.authorEmail}</a></>}
                </p>
                <TranslationActions id={s.id} status={s.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
