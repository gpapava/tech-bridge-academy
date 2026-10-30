"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Status = "PENDING" | "APPLIED" | "REJECTED";

export default function TranslationActions({ id, status }: { id: string; status: Status }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function setStatus(next: Status) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/translation-suggestions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Updated.");
      router.refresh();
    } catch {
      toast.error("Action failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {status !== "APPLIED" && (
        <button onClick={() => setStatus("APPLIED")} disabled={loading} className="btn-primary text-xs py-2 px-3">
          Mark as applied
        </button>
      )}
      {status !== "REJECTED" && (
        <button onClick={() => setStatus("REJECTED")} disabled={loading} className="btn-secondary text-xs py-2 px-3">
          Reject
        </button>
      )}
      {status !== "PENDING" && (
        <button onClick={() => setStatus("PENDING")} disabled={loading} className="btn-secondary text-xs py-2 px-3">
          Reopen
        </button>
      )}
    </div>
  );
}
