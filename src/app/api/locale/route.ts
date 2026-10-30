import { NextRequest, NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE } from "@/i18n/config";

// Shareable language link: /api/locale?lang=el&next=/bridge
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang");
  const next = searchParams.get("next") ?? "/";
  // Only allow same-site relative redirects.
  const target = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  const res = NextResponse.redirect(new URL(target, req.url));
  if (isLocale(lang)) {
    res.cookies.set(LOCALE_COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return res;
}
