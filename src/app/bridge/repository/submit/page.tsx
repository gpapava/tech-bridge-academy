"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Send, Plus, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SECTORS, REGIONS } from "@/lib/utils";

const INITIATIVE_TYPES = [
  "WORK_BASED_LEARNING",
  "CURRICULUM_INNOVATION",
  "PARTNERSHIP",
  "MOBILITY",
  "INTERNATIONAL_TRAINING_ACTIVITIES",
  "OTHER",
];

interface AnnexRow {
  name: string;
  url: string;
}

export default function SubmitInitiativePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    initiativeType: "PARTNERSHIP",
    description: "",
    country: "",
    region: "",
    actors: "",
    results: "",
    sector: "",
    tags: "",
    contactEmail: "",
    externalLinks: "",
  });
  const [annexes, setAnnexes] = useState<AnnexRow[]>([{ name: "", url: "" }]);

  function updateAnnex(index: number, field: keyof AnnexRow, value: string) {
    setAnnexes((rows) => rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  function addAnnex() {
    setAnnexes((rows) => [...rows, { name: "", url: "" }]);
  }

  function removeAnnex(index: number) {
    setAnnexes((rows) => rows.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        externalLinks: form.externalLinks.split(",").map((l) => l.trim()).filter(Boolean),
        documents: annexes.filter((a) => a.name.trim() && a.url.trim()),
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
                  required
                  value={form.actors}
                  onChange={(e) => setForm({ ...form, actors: e.target.value })}
                  placeholder="e.g. 3 VET schools, 5 manufacturing SMEs, Regional Authority"
                />
              </div>

              <div>
                <label className="label">Results &amp; Outcomes <span className="text-red-500">*</span></label>
                <textarea
                  className="input min-h-[100px] resize-y"
                  required
                  value={form.results}
                  onChange={(e) => setForm({ ...form, results: e.target.value })}
                  placeholder="What results or impact did this initiative achieve?"
                />
              </div>

              <div>
                <label className="label">Sector</label>
                <select
                  className="input"
                  value={form.sector}
                  onChange={(e) => setForm({ ...form, sector: e.target.value })}
                >
                  <option value="">Select sector</option>
                  {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
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

              {/* Contact & Web Links */}
              <div className="border-t border-slate-100 pt-6 space-y-6">
                <div>
                  <label className="label">Contact Email</label>
                  <input
                    type="email"
                    className="input"
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    placeholder="contact@organisation.eu"
                  />
                </div>

                <div>
                  <label className="label">Web Links</label>
                  <input
                    className="input"
                    value={form.externalLinks}
                    onChange={(e) => setForm({ ...form, externalLinks: e.target.value })}
                    placeholder="Comma-separated — institutional website, LinkedIn profile, or other social/professional links"
                  />
                </div>
              </div>

              {/* Annexes */}
              <div className="border-t border-slate-100 pt-6">
                <label className="label">Annexes</label>
                <p className="text-xs text-slate-400 mb-3">
                  Link to downloadable materials such as corporate brochures, school presentations, or other supporting documents.
                </p>
                <div className="space-y-3">
                  {annexes.map((annex, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className="input flex-1"
                        value={annex.name}
                        onChange={(e) => updateAnnex(i, "name", e.target.value)}
                        placeholder="Document name, e.g. Programme Brochure"
                      />
                      <input
                        className="input flex-1"
                        value={annex.url}
                        onChange={(e) => updateAnnex(i, "url", e.target.value)}
                        placeholder="https://..."
                      />
                      {annexes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAnnex(i)}
                          className="flex-shrink-0 rounded-lg border border-slate-200 p-2.5 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors"
                          aria-label="Remove annex"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addAnnex}
                  className="mt-3 flex items-center gap-1.5 text-sm font-medium text-target-smes hover:opacity-80 transition-opacity"
                >
                  <Plus className="h-4 w-4" />
                  Add another annex
                </button>
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
