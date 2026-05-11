"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export default function AdminContentActions({ postId, isPublished, isFeatured }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function update(data: object) {
    setLoading(true);
    try {
      const res = await fetch(`/api/news/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    <div className="flex gap-2">
      <button
        onClick={() => update({ isFeatured: !isFeatured })}
        disabled={loading}
        className="btn-secondary text-xs py-2 px-3"
      >
        {isFeatured ? "Unfeature" : "Feature"}
      </button>
      <button
        onClick={() => update({ isPublished: !isPublished, publishedAt: !isPublished ? new Date().toISOString() : null })}
        disabled={loading}
        className={isPublished ? "btn-secondary text-xs py-2 px-3" : "btn-primary text-xs py-2 px-3"}
      >
        {loading ? "…" : isPublished ? "Unpublish" : "Publish"}
      </button>
    </div>
  );
}
