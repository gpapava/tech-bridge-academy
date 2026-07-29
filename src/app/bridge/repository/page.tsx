import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RepositoryBrowser } from "@/components/repository/RepositoryBrowser";
import { prisma } from "@/lib/prisma";
import { ValidationStatus } from "@prisma/client";
import { BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Repository of Good Practices" };

export const revalidate = 3600;

export default async function RepositoryPage() {
  const [total, agg] = await Promise.all([
    prisma.repositoryInitiative.count({ where: { publishStatus: ValidationStatus.APPROVED } }),
    prisma.repositoryInitiative.aggregate({
      where: { publishStatus: ValidationStatus.APPROVED },
      _sum: { viewCount: true, downloadCount: true },
    }),
  ]);

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-900 to-brand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-brand-200 mb-6">
                <BookOpen className="h-4 w-4" />
                Bridge Area · Repository
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Repository of Skill Match Initiatives
              </h1>
              <p className="text-brand-200 text-lg leading-relaxed">
                A curated collection of proven school–enterprise collaboration models, co-design initiatives, and good practices from across Europe in the mechanical engineering sector.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{total}</p>
                  <p className="text-xs text-brand-400">Published Cases</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{(agg._sum.viewCount ?? 0).toLocaleString()}</p>
                  <p className="text-xs text-brand-400">Total Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{(agg._sum.downloadCount ?? 0).toLocaleString()}</p>
                  <p className="text-xs text-brand-400">Downloads</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Submit CTA */}
          <div className="rounded-2xl bg-accent-50 border border-accent-200 p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-accent-600">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">Share Your Good Practice</h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Have you implemented a successful school–enterprise collaboration? Submit it to the repository to share with the network.
              </p>
            </div>
            <Link href="/bridge/repository/submit" className="btn-accent flex-shrink-0">
              Submit a Case →
            </Link>
          </div>

          {/* Categorised, filterable browser */}
          <RepositoryBrowser />
        </div>
      </main>
      <Footer />
    </>
  );
}
