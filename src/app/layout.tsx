import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Tech Bridge Academy",
    template: "%s | Tech Bridge Academy",
  },
  description:
    "Digital platform connecting VET schools, technical colleges, and SMEs in the mechanical engineering sector. Erasmus+ KA220-VET project TECH BRIDGE VET.",
  keywords: [
    "VET", "vocational education", "mechanical engineering", "SME", "apprenticeship",
    "curriculum co-design", "Erasmus+", "school-enterprise", "skills mismatch", "WBL",
  ],
  authors: [{ name: "Tech Bridge VET Consortium" }],
  openGraph: {
    type: "website",
    locale: "en_EU",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://techbridgeacademy.eu",
    siteName: "Tech Bridge Academy",
    title: "Tech Bridge Academy",
    description: "Connecting VET schools and manufacturing SMEs across Europe",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 font-sans">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1e3a8a",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "14px",
              },
              success: { style: { background: "#065f46" } },
              error:   { style: { background: "#991b1b" } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
