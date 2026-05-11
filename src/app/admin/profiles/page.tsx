"use client";

import { useState, useEffect, useCallback } from "react";
import { Building2, GraduationCap, CheckCircle, XCircle, Eye } from "lucide-react";
import { Badge, OrgTypeBadge, ValidationBadge } from "@/components/ui/Badge";
import { InlineLoader } from "@/components/ui/LoadingSpinner";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminProfilesPage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        perPage: "20",
        ...(statusFilter && { validationStatus: statusFilter }),
      });
      const res = await fetch(`/api/admin/profiles?${params}`);
      const data = await res.json();
      setProfiles(data.data ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.totalPages ?? 1);
    } catch {
      toast.error("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => { fetchProfiles(); }, [fetchProfiles]);

  const updateStatus = async (profileId: string, validationStatus: string) => {
    const res = await fetch(`/api/profiles/${profileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ validationStatus }),
    });
    if (res.ok) {
      toast.success(`Profile ${validationStatus === "APPROVED" ? "approved" : "rejected"}`);
      fetchProfiles();
    } else {
      toast.error("Action failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile Validation</h1>
          <p className="text-slate-500 mt-1">{total} profiles in view</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { label: "Pending Review", value: "PENDING" },
          { label: "Approved", value: "APPROVED" },
          { label: "Rejected", value: "REJECTED" },
          { label: "All", value: "" },
        ].map((opt) => (
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
        <div className="space-y-3">
          {profiles.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <CheckCircle className="h-10 w-10 mx-auto mb-3 text-emerald-300" />
              No profiles match this filter.
            </div>
          ) : (
            profiles.map((profile: any) => (
              <div key={profile.id} className="card p-5 flex items-center gap-4">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${profile.orgType === "SCHOOL" ? "bg-blue-50" : "bg-amber-50"}`}>
                  {profile.orgType === "SCHOOL"
                    ? <GraduationCap className="h-5 w-5 text-blue-600" />
                    : <Building2 className="h-5 w-5 text-amber-600" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-medium text-slate-900">{profile.name}</p>
                    <OrgTypeBadge type={profile.orgType} />
                    <ValidationBadge status={profile.validationStatus} />
                  </div>
                  <p className="text-xs text-slate-400">
                    {profile.user?.email} · Submitted {formatDate(profile.createdAt)}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {profile.sectors?.slice(0, 3).map((s: string) => (
                      <Badge key={s} variant="blue" className="text-[10px]">{s}</Badge>
                    ))}
                    {profile.regions?.slice(0, 2).map((r: string) => (
                      <Badge key={r} variant="slate" className="text-[10px]">{r}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/bridge/profiles/${profile.id}`} className="btn-ghost text-xs py-2">
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Link>
                  {profile.validationStatus !== "APPROVED" && (
                    <button
                      onClick={() => updateStatus(profile.id, "APPROVED")}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      Approve
                    </button>
                  )}
                  {profile.validationStatus !== "REJECTED" && (
                    <button
                      onClick={() => updateStatus(profile.id, "REJECTED")}
                      className="flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200 transition-colors"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
          {totalPages > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="btn-secondary disabled:opacity-40">← Prev</button>
              <span className="text-sm self-center text-slate-500">Page {page} / {totalPages}</span>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="btn-secondary disabled:opacity-40">Next →</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
