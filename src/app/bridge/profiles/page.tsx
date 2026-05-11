"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileCard } from "@/components/profiles/ProfileCard";
import { ProfileFilter } from "@/components/profiles/ProfileFilter";
import { InlineLoader } from "@/components/ui/LoadingSpinner";
import { Building2, GraduationCap, Search } from "lucide-react";
import toast from "react-hot-toast";

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

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "", orgType: "", schoolType: "", companyType: "", sector: "", region: "",
  });

  const fetchProfiles = useCallback(async (currentFilters: typeof filters, currentPage: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(currentPage),
        perPage: "12",
        ...(currentFilters.search && { search: currentFilters.search }),
        ...(currentFilters.orgType && { orgType: currentFilters.orgType }),
        ...(currentFilters.schoolType && { schoolType: currentFilters.schoolType }),
        ...(currentFilters.companyType && { companyType: currentFilters.companyType }),
        ...(currentFilters.sector && { sector: currentFilters.sector }),
        ...(currentFilters.region && { region: currentFilters.region }),
      });

      const res = await fetch(`/api/profiles?${params}`);
      const data = await res.json();
      setProfiles(data.data ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      toast.error("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles(filters, page);
  }, [filters, page, fetchProfiles]);

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                <Search className="h-5 w-5 text-brand-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Organisation Directory</h1>
                <p className="text-slate-500 text-sm">Find schools, VET providers, and manufacturing companies to collaborate with</p>
              </div>
            </div>

            {/* Type quick filters */}
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { label: "All Organisations", value: "", icon: null },
                { label: "Schools & VET", value: "SCHOOL", icon: GraduationCap },
                { label: "Companies & SMEs", value: "COMPANY", icon: Building2 },
              ].map(({ label, value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => handleFilter({ ...filters, orgType: value })}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
                    filters.orgType === value
                      ? "bg-brand-800 text-white border-brand-800"
                      : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:bg-brand-50"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Panel */}
          <div className="mb-6">
            <ProfileFilter onFilter={handleFilter} resultCount={total} />
          </div>

          {/* Results */}
          {loading ? (
            <InlineLoader />
          ) : profiles.length === 0 ? (
            <div className="text-center py-24">
              <Search className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">No organisations found</h3>
              <p className="text-slate-400 mt-2">Try adjusting your search filters or broadening your criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {profiles.map((profile) => (
                  <ProfileCard key={profile.id} {...profile} />
                ))}
              </div>

              {/* Pagination */}
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
        </div>
      </main>
      <Footer />
    </>
  );
}
