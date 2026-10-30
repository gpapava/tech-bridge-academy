"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

function LoginForm() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error(t("toastError"));
    } else {
      toast.success(t("toastOk"));
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
              <span className="text-xl font-bold text-white">TB</span>
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-white">Tech Bridge Academy</p>
              <p className="text-xs text-brand-300">Erasmus+ KA220-VET</p>
            </div>
          </Link>
        </div>

        <div className="card p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{t("title")}</h1>
          <p className="text-sm text-slate-400 mb-8">
            {t("noAccount")}{" "}
            <Link href="/auth/register" className="text-brand-600 font-medium hover:text-brand-700">
              {t("registerFree")}
            </Link>
          </p>

          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 mb-6 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error === "OAuthAccountNotLinked"
                ? t("errorLinked")
                : t("errorGeneric")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="label">{t("email")}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@organisation.eu"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="label mb-0">{t("password")}</label>
                <Link href="/auth/forgot-password" className="text-xs text-brand-600 hover:text-brand-700">
                  {t("forgot")}
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {t("signingIn")}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-5 w-5" />
                  {t("signIn")}
                </span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-brand-400 mt-6">
          {t.rich("terms", {
            terms: (chunks) => <Link href="/terms" className="text-brand-300 hover:text-white">{chunks}</Link>,
            privacy: (chunks) => <Link href="/privacy" className="text-brand-300 hover:text-white">{chunks}</Link>,
          })}
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
