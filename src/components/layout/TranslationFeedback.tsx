"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { MessageSquareWarning, X } from "lucide-react";
import toast from "react-hot-toast";
import { localeNames, type Locale } from "@/i18n/config";

const MAX = 2000;

// Selected text may be on the page or inside an embedded same-origin guide (iframe).
function readSelection(): string {
  const own = window.getSelection()?.toString().trim();
  if (own) return own;
  for (const frame of Array.from(document.querySelectorAll("iframe"))) {
    try {
      const sel = frame.contentWindow?.getSelection()?.toString().trim();
      if (sel) return sel;
    } catch {
      /* cross-origin frame: ignore */
    }
  }
  return "";
}

export function TranslationFeedback() {
  const t = useTranslations("feedback");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ originalText: "", suggestedText: "", comment: "", authorName: "", authorEmail: "", website: "" });
  const lastSelection = useRef("");

  // Remember the latest selection: clicking the button can clear it before we read it.
  useEffect(() => {
    const remember = () => {
      const s = readSelection();
      if (s) lastSelection.current = s.slice(0, MAX);
    };
    document.addEventListener("selectionchange", remember);
    document.addEventListener("pointerup", remember);
    return () => {
      document.removeEventListener("selectionchange", remember);
      document.removeEventListener("pointerup", remember);
    };
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const openForm = () => {
    const selected = readSelection().slice(0, MAX) || lastSelection.current;
    setForm((f) => ({
      ...f,
      originalText: selected,
      suggestedText: selected,
      authorName: f.authorName || session?.user?.name || "",
      authorEmail: f.authorEmail || session?.user?.email || "",
    }));
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/translation-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          locale,
          pageUrl: window.location.pathname + window.location.search,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success(t("thanks"));
      lastSelection.current = "";
      setForm((f) => ({ ...f, originalText: "", suggestedText: "", comment: "" }));
      setOpen(false);
    } catch {
      toast.error(t("error"));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openForm}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-brand-800 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-brand-900 transition-colors"
      >
        <MessageSquareWarning className="h-4 w-4" aria-hidden />
        <span className="hidden sm:inline">{t("button")}</span>
        <span className="sr-only sm:hidden">{t("button")}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <form onSubmit={submit} className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">{t("title")}</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600" aria-label={t("cancel")}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-slate-500">{t("intro")}</p>
            {!form.originalText && <p className="text-xs text-slate-400">{t("tip")}</p>}

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="label">{t("language")}</span>
                <p className="text-slate-700">{localeNames[locale]}</p>
              </div>
              <div className="min-w-0">
                <span className="label">{t("page")}</span>
                <p className="text-slate-700 truncate">{pathname}</p>
              </div>
            </div>

            <div>
              <label className="label">{t("original")} *</label>
              <textarea className="input" rows={2} maxLength={MAX} required value={form.originalText} onChange={(e) => setForm({ ...form, originalText: e.target.value })} />
            </div>
            <div>
              <label className="label">{t("suggestion")} *</label>
              <textarea className="input" rows={3} maxLength={MAX} required value={form.suggestedText} onChange={(e) => setForm({ ...form, suggestedText: e.target.value })} />
            </div>
            <div>
              <label className="label">{t("comment")}</label>
              <textarea className="input" rows={2} maxLength={1000} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="label">{t("name")}</label>
                <input className="input" type="text" maxLength={100} value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} />
              </div>
              <div>
                <label className="label">{t("email")}</label>
                <input className="input" type="email" maxLength={200} value={form.authorEmail} onChange={(e) => setForm({ ...form, authorEmail: e.target.value })} />
              </div>
            </div>

            {/* Honeypot, hidden from people */}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setOpen(false)} className="btn-secondary px-4 py-2">{t("cancel")}</button>
              <button type="submit" disabled={sending} className="btn-primary px-5 py-2 disabled:opacity-50">
                {sending ? t("sending") : t("send")}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
