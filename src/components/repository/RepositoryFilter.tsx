"use client";

import { useEffect, useState } from "react";
import { Search, Tag, X } from "lucide-react";
import { cn, SECTORS, REGIONS } from "@/lib/utils";

export interface RepositoryFilters {
  search: string;
  sector: string;
  region: string;
  tag: string;
}

interface RepositoryFilterProps {
  onFilter: (filters: RepositoryFilters) => void;
  resultCount?: number;
}

export function RepositoryFilter({ onFilter, resultCount }: RepositoryFilterProps) {
  const [filters, setFilters] = useState<RepositoryFilters>({ search: "", sector: "", region: "", tag: "" });
  const [popularTags, setPopularTags] = useState<{ tag: string; count: number }[]>([]);

  useEffect(() => {
    fetch("/api/repository/tags")
      .then((res) => res.json())
      .then((data) => setPopularTags(data.tags ?? []))
      .catch(() => setPopularTags([]));
  }, []);

  const handleChange = (key: keyof RepositoryFilters, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter(updated);
  };

  const clearAll = () => {
    const empty = { search: "", sector: "", region: "", tag: "" };
    setFilters(empty);
    onFilter(empty);
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="card p-4 space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search good practices by title, description, actors…"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="input pl-10 pr-4"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={filters.sector}
          onChange={(e) => handleChange("sector", e.target.value)}
          className="input w-auto text-sm py-2"
        >
          <option value="">All Sectors</option>
          {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={filters.region}
          onChange={(e) => handleChange("region", e.target.value)}
          className="input w-auto text-sm py-2"
        >
          <option value="">All Regions</option>
          {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}

        {resultCount !== undefined && (
          <span className="ml-auto text-sm text-slate-400">
            {resultCount} practice{resultCount !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      {/* Popular tags */}
      {popularTags.length > 0 && (
        <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-slate-400 uppercase tracking-wider mr-1">
            <Tag className="h-3.5 w-3.5" /> Tags
          </span>
          {popularTags.map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => handleChange("tag", filters.tag === tag ? "" : tag)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                filters.tag === tag
                  ? "bg-target-smes text-white border-target-smes"
                  : "bg-white text-slate-600 border-slate-200 hover:border-target-smes/50 hover:bg-target-smes/5"
              )}
            >
              {tag} <span className="opacity-60">({count})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
