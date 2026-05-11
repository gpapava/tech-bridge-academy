"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SECTORS, REGIONS } from "@/lib/utils";

const INITIATIVE_TYPES = [
  "WORK_BASED_LEARNING",
  "CURRICULUM_INNOVATION",
  "PARTNERSHIP",
  "MOBILITY",
  "RESEARCH",
  "TOOL",
  "OTHER",
];

export default function SubmitInitiativePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    initiativeType: "PARTNERSHIP",
    country: "",
    region: "",
    actors: "",
    outcomes: "",
    sectors: [] as string[],
    tags: "",
  });

  function toggleSector(s: string) {
    setForm((f) => ({
      ...f,
      sectors: f.sectors.includes(s) ? f.sectors.filter((x) => x !== s) : [...f.sectors, s],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        ...form,
        actors: form.actors.split(",").map((a) => a.trim()).filter(Boolean),
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      const res = await fetch("/api/repository", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      toast.success("Initiative submitted for review!");
      router.push("/bridge/repository");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/bridge/repository" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Repository
          </Link>

          <div className="card p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Submit a Good Practice</h1>
            <p className="text-slate-500 text-sm mb-8">
              Share an initiative, partnership model, or innovation to contribute to the repository. Submissions are reviewed by the platform team before publication.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">Title <span className="text-red-500">*</span></label>
                <input
                  className="input"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Dual Apprenticeship Programme with Local SMEs"
                />
              </div>

              <div>
                <label className="label">Initiative Type <span className="text-red-500">*</span></label>
                <select
                  className="input"
                  value={form.initiativeType}
                  onChange={(e) => setForm({ ...form, initiativeType: e.target.value })}
                >
                  {INITIATIVE_TYPES.map((t) => (
                    <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">Description <span className="text-red-500">*</span></label>
                <textarea
                  className="input min-h-[120px] resize-y"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the initiative, its context, objectives, and approach..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Country</label>
                  <input
                    className="input"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    placeholder="e.g. Italy"
                  />
                </div>
                <div>
                  <label className="label">Region</label>
                  <select
                    className="input"
                    value={form.region}
                    onChange={(e) => setForm({ ...form, region: e.target.value })}
                  >
                    <option value="">Select region</option>
                    {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Actors Involved</label>
                <input
                  className="input"
                  value={form.actors}
                  onChange={(e) => setForm({ ...form, actors: e.target.value })}
                  placeholder="Comma-separated, e.g. Schools, SMEs, Regional Authority"
                />
              </div>

              <div>
                <label className="label">Outcomes &amp; Results</label>
                <textarea
                  className="input min-h-[100px] resize-y"
                  value={form.outcomes}
                  onChange={(e) => setForm({ ...form, outcomes: e.target.value })}
                  placeholder="What results or impact did this initiative achieve?"
                />
              </div>

              <div>
                <label className="label">Relevant Sectors</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SECTORS.slice(0, 12).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSector(s)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        form.sectors.includes(s)
                          ? "bg-brand-600 text-white border-brand-600"
                          : "bg-white text-slate-600 border-slate-200 hover:border-brand-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Tags</label>
                <input
                  className="input"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="Comma-separated, e.g. WBL, dual system, apprenticeship"
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? "Submitting…" : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit for Review
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-400 text-center mt-3">
                  Your submission will be reviewed by the platform team before appearing in the repository.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
