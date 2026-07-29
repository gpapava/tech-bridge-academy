"use client";

import { useCallback, useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { InlineLoader } from "@/components/ui/LoadingSpinner";
import { InitiativeCard } from "@/components/repository/InitiativeCard";
import { RepositoryFilter, type RepositoryFilters } from "@/components/repository/RepositoryFilter";

interface Initiative {
  id: string;
  title: string;
  description: string;
  actors: string;
  country?: string | null;
  region?: string | null;
  sector?: string | null;
  tags: string[];
  viewCount: number;
  downloadCount: number;
  videoUrl?: string | null;
  createdAt: string;
}

const emptyFilters: RepositoryFilters = { search: "", sector: "", region: "", tag: "" };

export function RepositoryBrowser() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<RepositoryFilters>(emptyFilters);

  const fetchInitiatives = useCallback(async (currentFilters: RepositoryFilters, currentPage: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        ...(currentFilters.search && { search: currentFilters.search }),
        ...(currentFilters.sector && { sector: currentFilters.sector }),
        ...(currentFilters.region && { region: currentFilters.region }),
        ...(currentFilters.tag && { tag: currentFilters.tag }),
      });

      const res = await fetch(`/api/repository?${params}`);
      const data = await res.json();
      setInitiatives(data.data ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      toast.error("Failed to load repository");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitiatives(filters, page);
  }, [filters, page, fetchInitiatives]);

  const handleFilter = (newFilters: RepositoryFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <>
      <div className="mb-6">
        <RepositoryFilter onFilter={handleFilter} resultCount={total} />
      </div>

      {loading ? (
        <InlineLoader />
      ) : initiatives.length === 0 ? (
        <div className="text-center py-24">
          <BookOpen className="h-12 w-12 text-slate-200 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700">No initiatives found</h3>
          <p className="text-slate-400 mt-2">Try adjusting your search, sector, region, or tag filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
            {initiatives.map((init) => (
              <InitiativeCard
                key={init.id}
                id={init.id}
                title={init.title}
                description={init.description}
                actors={init.actors}
                country={init.country}
                region={init.region}
                sector={init.sector}
                tags={init.tags}
                viewCount={init.viewCount}
                downloadCount={init.downloadCount}
                hasVideo={Boolean(init.videoUrl)}
                createdAt={new Date(init.createdAt)}
                onTagClick={(tag) => handleFilter({ ...filters, tag })}
                onSectorClick={(sector) => handleFilter({ ...filters, sector })}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="btn-secondary px-4 py-2 disabled:opacity-40"
              >
                ← Previous
              </button>
              <span className="text-sm text-slate-500 px-4">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="btn-secondary px-4 py-2 disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
