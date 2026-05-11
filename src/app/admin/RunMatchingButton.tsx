"use client";

import { useState } from "react";
import { GitMerge, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function RunMatchingButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ newMatches: number; updatedMatches: number; errors: string[] } | null>(null);

  const handleRun = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/matching/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ threshold: 30 }) });
      const data = await res.json();
      if (res.ok) {
        setResult(data.data);
        toast.success(`Matching complete: ${data.data.newMatches} new matches found`);
      } else {
        toast.error(data.error ?? "Matching failed");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleRun} disabled={loading} className="btn-primary">
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Running matching engine…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <GitMerge className="h-4 w-4" />
            Run Matching Engine Now
          </span>
        )}
      </button>

      {result && (
        <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-4 text-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-medium mb-2">
            <CheckCircle className="h-4 w-4" />
            Matching complete
          </div>
          <p>New matches created: <strong>{result.newMatches}</strong></p>
          <p>Matches updated: <strong>{result.updatedMatches}</strong></p>
          {result.errors.length > 0 && (
            <div className="mt-2 text-red-600">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              {result.errors.length} error(s) — check server logs
            </div>
          )}
        </div>
      )}
    </div>
  );
}
