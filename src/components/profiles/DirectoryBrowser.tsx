"use client";

import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { ProfileCard } from "@/components/profiles/ProfileCard";
import { InlineLoader } from "@/components/ui/LoadingSpinner";

interface Profile {
  id: string;
  orgType: string;
  schoolType?: string | null;
  companyType?: string | null;
  name: string;
  description: string;
  mission: string;
  regions: string[];
  sectors: string[];
  tags: string[];
  logoUrl?: string | null;
  validationStatus: string;
  createdAt: string;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "name_asc", label: "Name (A–Z)" },
  { value: "name_desc", label: "Name (Z–A)" },
];

interface DirectoryBrowserProps {
  orgType: "SCHOOL" | "COMPANY";
  perPage?: number;
}

export function DirectoryBrowser({ orgType, perPage = 9 }: DirectoryBrowserProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  const fetchProfiles = useCallback(async (currentSearch: string, currentSort: string, currentPage: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        orgType,
        perPage: String(perPage),
        page: String(currentPage),
        sort: currentSort,
        ...(currentSearch && { search: currentSearch }),
      });
      const res = await fetch(`/api/profiles?${params}`);
      const data = await res.json();
      setProfiles(data.data ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      toast.error("Failed to load directory");
    } finally {
      setLoading(false);
    }
  }, [orgType, perPage]);

  useEffect(() => {
    const timeout = setTimeout(() => fetchProfiles(search, sort, page), search ? 300 : 0);
    return () => clearTimeout(timeout);
  }, [search, sort, page, fetchProfiles]);

  return (
    <div>
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, description, or tags…"
            className="input pl-10 pr-4"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="input w-auto text-sm"
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {loading ? (
        <InlineLoader />
      ) : profiles.length === 0 ? (
        <p className="text-slate-400">No matching organisations found.</p>
      ) : (
        <>
          <p className="text-xs text-slate-400 mb-4">{total} result{total !== 1 ? "s" : ""}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {profiles.map((p) => (
              <ProfileCard key={p.id} {...p} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
              >
                ← Previous
              </button>
              <span className="text-sm text-slate-500 px-4">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="btn-secondary px-4 py-2 text-sm disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
