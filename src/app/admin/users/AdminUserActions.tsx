"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
  currentRole: string;
}

export default function AdminUserActions({ userId, currentRole }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function changeRole(role: string) {
    if (role === currentRole) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      });
      if (!res.ok) throw new Error("Failed to update role");
      toast.success("Role updated.");
      router.refresh();
    } catch {
      toast.error("Could not update role.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={currentRole}
      onChange={(e) => changeRole(e.target.value)}
      disabled={loading}
      className="text-xs rounded-lg border border-slate-200 px-2 py-1.5 text-slate-600 focus:outline-none focus:border-brand-400"
    >
      <option value="SCHOOL">School</option>
      <option value="COMPANY">Company</option>
      <option value="ADMIN">Admin</option>
    </select>
  );
}
