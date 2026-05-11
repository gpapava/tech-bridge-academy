"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  initiativeId: string;
  isPublished: boolean;
}

export default function AdminRepositoryActions({ initiativeId, isPublished }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function togglePublish() {
    setLoading(true);
    try {
      const res = await fetch(`/api/repository/${initiativeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(isPublished ? "Unpublished." : "Published successfully.");
      router.refresh();
    } catch {
      toast.error("Action failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={togglePublish}
      disabled={loading}
      className={isPublished ? "btn-secondary text-xs py-2 px-3" : "btn-primary text-xs py-2 px-3"}
    >
      {loading ? "…" : isPublished ? "Unpublish" : "Publish"}
    </button>
  );
}
