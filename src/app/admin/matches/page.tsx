"use client";

import { useState, useEffect, useCallback } from "react";
import { MatchCard } from "@/components/matching/MatchCard";
import { InlineLoader } from "@/components/ui/LoadingSpinner";
import { GitMerge } from "lucide-react";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  { value: "", label: "All Matches" },
  { value: "PENDING_REVIEW", label: "Pending Review" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "SENT", label: "Report Sent" },
];

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), ...(statusFilter && { status: statusFilter }) });
      const res = await fetch(`/api/matches?${params}`);
      const data = await res.json();
      setMatches(data.data ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      toast.error("Failed to load matches");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => { fetchMatches(); }, [fetchMatches]);

  const reviewMatch = async (id: string, action: string, adminNotes?: string) => {
    const res = await fetch(`/api/matches/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, adminNotes }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      fetchMatches();
    } else {
      toast.error(data.error ?? "Action failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <GitMerge className="h-6 w-6 text-brand-600" />
            Match Review
          </h1>
          <p className="text-slate-500 mt-1">{total} total matches in the system</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { setStatusFilter(opt.value); setPage(1); }}
            className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              statusFilter === opt.value
                ? "bg-brand-800 text-white border-brand-800"
                : "bg-white text-slate-600 border-slate-200 hover:border-brand-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {loading ? <InlineLoader /> : (
        <>
          {matches.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <GitMerge className="h-12 w-12 mx-auto mb-4 text-slate-200" />
              No matches found for the selected filter.
            </div>
          ) : (
            <div className="space-y-5">
              {matches.map((match) => (
                <MatchCard
                  key={match.id}
                  {...match}
                  showAdminActions
                  onApprove={(id) => reviewMatch(id, "approve")}
                  onReject={(id) => reviewMatch(id, "reject")}
                  onSendReport={(id) => reviewMatch(id, "send_report")}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="btn-secondary disabled:opacity-40">← Prev</button>
              <span className="text-sm text-slate-500">Page {page} / {totalPages}</span>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="btn-secondary disabled:opacity-40">Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
