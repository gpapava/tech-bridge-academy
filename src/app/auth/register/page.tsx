"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") ?? "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole,
    gdprConsent: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!form.role) {
      setError("Please select your organisation type.");
      return;
    }
    if (!form.gdprConsent) {
      setError("You must consent to our privacy policy to register.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          gdprConsent: form.gdprConsent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Registration failed. Please try again.");
      } else {
        toast.success("Account created! Please sign in.");
        router.push("/auth/login?registered=true");
      }
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: "Too short", color: "text-red-500" };
    if (p.length < 8 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) {
      return { label: "Weak", color: "text-amber-500" };
    }
    return { label: "Strong", color: "text-emerald-500" };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
          <p className="text-sm text-slate-400 mb-8">
            Already registered?{" "}
            <Link href="/auth/login" className="text-brand-600 font-medium hover:text-brand-700">
              Sign in
            </Link>
          </p>

          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3 mb-6 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Organisation Type */}
            <div>
              <label className="label">Organisation Type *</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "SCHOOL", label: "School / VET Institution", emoji: "🎓" },
                  { value: "COMPANY", label: "Company / SME", emoji: "🏭" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: opt.value })}
                    className={`flex items-center gap-2 rounded-xl border-2 p-4 text-left transition-all ${
                      form.role === opt.value
                        ? "border-brand-600 bg-brand-50 ring-1 ring-brand-300"
                        : "border-slate-200 hover:border-brand-200"
                    }`}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="text-sm font-medium text-slate-700">{opt.label}</span>
                    {form.role === opt.value && <CheckCircle className="ml-auto h-4 w-4 text-brand-600" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="name" className="label">Full name / Contact person *</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="label">Email address *</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="you@organisation.eu"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="label">Password *</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input pr-10"
                  placeholder="Min. 8 characters"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {strength && (
                <p className={`text-xs mt-1 ${strength.color}`}>{strength.label} password</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label">Confirm password *</label>
              <input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="input"
                placeholder="Repeat password"
                required
              />
            </div>

            {/* GDPR Consent */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.gdprConsent}
                  onChange={(e) => setForm({ ...form, gdprConsent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <div>
                  <p className="text-sm font-medium text-slate-700">I consent to data processing *</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>{" "}
                    and{" "}
                    <Link href="/gdpr" className="text-brand-600 hover:underline">GDPR Notice</Link>. My data will be processed solely for platform purposes within the Erasmus+ TECH BRIDGE VET project.
                  </p>
                </div>
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating account…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Create Account
                </span>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-brand-400 mt-4">
          Registration is free · Platform funded by the European Union
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
