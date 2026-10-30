"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { locales, localeNames, LOCALE_COOKIE, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("nav");

  const change = (next: Locale) => {
    try {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch {
      /* cookies blocked: the page simply stays in the current language */
    }
    router.refresh();
  };

  return (
    <label className={`flex items-center gap-1.5 text-brand-100 ${className}`}>
      <Languages className="h-4 w-4 flex-shrink-0" aria-hidden />
      <span className="sr-only">{t("language")}</span>
      <select
        value={locale}
        onChange={(e) => change(e.target.value as Locale)}
        className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer [&>option]:text-slate-900"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
