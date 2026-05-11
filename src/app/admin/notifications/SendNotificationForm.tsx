"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";

export default function SendNotificationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", targetRole: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Notification sent.");
      setForm({ title: "", message: "", targetRole: "" });
      router.refresh();
    } catch {
      toast.error("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-slate-900 mb-5 flex items-center gap-2">
        <Bell className="h-5 w-5 text-brand-600" />
        Send Notification
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Target Audience</label>
          <select
            className="input"
            value={form.targetRole}
            onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
          >
            <option value="">All Users</option>
            <option value="SCHOOL">Schools</option>
            <option value="COMPANY">Companies</option>
            <option value="ADMIN">Admins</option>
          </select>
        </div>
        <div>
          <label className="label">Title <span className="text-red-500">*</span></label>
          <input
            className="input"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Notification title"
          />
        </div>
        <div>
          <label className="label">Message <span className="text-red-500">*</span></label>
          <textarea
            className="input min-h-[100px] resize-y"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Notification body text…"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          {loading ? "Sending…" : "Send Notification"}
        </button>
      </form>
    </div>
  );
}
