export const locales = ["en", "it", "el", "sk", "de", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

// Names are shown in each language's own tongue so that a visitor can always find theirs.
export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  el: "Ελληνικά",
  sk: "Slovenčina",
  de: "Deutsch",
  es: "Español",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
