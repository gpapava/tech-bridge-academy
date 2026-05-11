import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ERROR_MESSAGES: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The sign in link is no longer valid. It may have been used already or has expired.",
  Default: "An error occurred during sign in. Please try again.",
};

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const message = ERROR_MESSAGES[searchParams.error ?? "Default"] ?? ERROR_MESSAGES.Default;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Sign In Error</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">{message}</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/login" className="btn-primary">
              Try Again
            </Link>
            <Link href="/" className="btn-secondary">
              Go Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
