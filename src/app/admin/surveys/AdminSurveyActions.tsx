"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  surveyId: string;
  isActive: boolean;
}

export default function AdminSurveyActions({ surveyId, isActive }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/surveys/${surveyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(isActive ? "Survey deactivated." : "Survey activated.");
      router.refresh();
    } catch {
      toast.error("Action failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={isActive ? "btn-secondary text-xs py-2 px-3" : "btn-primary text-xs py-2 px-3"}
    >
      {loading ? "…" : isActive ? "Deactivate" : "Activate"}
    </button>
  );
}
