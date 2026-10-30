import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "./config";

type Messages = { [key: string]: string | Messages };

// Missing keys fall back to English, so a partly translated language never shows raw keys.
function merge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [k, v] of Object.entries(override)) {
    const b = out[k];
    out[k] = typeof v === "object" && typeof b === "object" ? merge(b, v) : v;
  }
  return out;
}

function detectLocale(): Locale {
  const fromCookie = cookies().get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = headers().get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const code = part.trim().split(/[-;]/)[0].toLowerCase();
    if (isLocale(code)) return code;
  }
  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = detectLocale();
  const base = (await import("../../messages/en.json")).default as Messages;
  const messages =
    locale === defaultLocale
      ? base
      : merge(base, (await import(`../../messages/${locale}.json`)).default as Messages);
  return { locale, messages };
});
