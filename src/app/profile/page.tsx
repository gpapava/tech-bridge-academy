"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SECTORS, REGIONS, SCHOOL_TYPE_LABELS, COMPANY_TYPE_LABELS } from "@/lib/utils";
import { PlusCircle, Save, User, Building2, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";

interface ProfileData {
  id?: string;
  orgType: string;
  schoolType?: string;
  companyType?: string;
  name: string;
  description: string;
  mission: string;
  dialogueExperience: string;
  opportunities: string;
  needs: string;
  regions: string[];
  sectors: string[];
  tags: string;
  contactEmail: string;
  telephone: string;
  website: string;
  visibilityStatus: string;
  validationStatus?: string;
}

const defaultForm: ProfileData = {
  orgType: "",
  name: "",
  description: "",
  mission: "",
  dialogueExperience: "",
  opportunities: "",
  needs: "",
  regions: [],
  sectors: [],
  tags: "",
  contactEmail: "",
  telephone: "",
  website: "",
  visibilityStatus: "MEMBERS_ONLY",
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<ProfileData>(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  useEffect(() => {
    if (!session) return;
    fetch(`/api/profiles/${session.user.id}/mine`)
      .then(async (r) => {
        if (r.status === 404) { setIsNew(true); setLoading(false); return; }
        const data = await r.json();
        if (data.data) {
          setForm({
            ...data.data,
            tags: (data.data.tags ?? []).join(", "),
            regions: data.data.regions ?? [],
            sectors: data.data.sectors ?? [],
          });
          setIsNew(false);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  useEffect(() => {
    if (session?.user?.role === "SCHOOL" && !form.orgType) {
      setForm((f) => ({ ...f, orgType: "SCHOOL" }));
    } else if (session?.user?.role === "COMPANY" && !form.orgType) {
      setForm((f) => ({ ...f, orgType: "COMPANY" }));
    }
  }, [session, form.orgType]);

  const handleSectorToggle = (sector: string) => {
    setForm((f) => ({
      ...f,
      sectors: f.sectors.includes(sector)
        ? f.sectors.filter((s) => s !== sector)
        : [...f.sectors, sector],
    }));
  };

  const handleRegionToggle = (region: string) => {
    setForm((f) => ({
      ...f,
      regions: f.regions.includes(region)
        ? f.regions.filter((r) => r !== region)
        : [...f.regions, region],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(isNew ? "/api/profiles" : `/api/profiles/${form.id}`, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(isNew ? "Profile created! Awaiting validation." : "Profile updated. Awaiting re-validation.");
        if (isNew) { setIsNew(false); setForm((f) => ({ ...f, id: data.data?.id })); }
        router.push("/dashboard");
      } else {
        toast.error(data.error ?? "Save failed");
      }
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setSaving(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
              <User className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {isNew ? "Create Organisation Profile" : "Edit Organisation Profile"}
              </h1>
              <p className="text-sm text-slate-500">
                {isNew ? "Set up your profile to appear in the directory and receive match suggestions" : "Update your profile information"}
              </p>
            </div>
          </div>

          {!isNew && form.validationStatus && (
            <div className={`rounded-xl border p-4 mb-6 text-sm ${
              form.validationStatus === "APPROVED" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
              form.validationStatus === "REJECTED" ? "bg-red-50 border-red-200 text-red-800" :
              "bg-amber-50 border-amber-200 text-amber-800"
            }`}>
              <strong>Profile Status:</strong>{" "}
              {form.validationStatus === "APPROVED" ? "✓ Validated and public" :
               form.validationStatus === "REJECTED" ? "✗ Rejected — please review and resubmit" :
               "⏳ Pending validation by the platform team"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Organisation Type */}
            <section className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-5">Organisation Type</h2>

              <div>
                <label className="label">Primary Type *</label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { value: "SCHOOL", icon: GraduationCap, label: "School / VET Institution" },
                    { value: "COMPANY", icon: Building2, label: "Company / SME" },
                  ].map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm({ ...form, orgType: value, schoolType: "", companyType: "" })}
                      disabled={session?.user?.role !== "ADMIN"}
                      className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                        form.orgType === value
                          ? "border-brand-600 bg-brand-50"
                          : "border-slate-200"
                      } ${session?.user?.role !== "ADMIN" ? "cursor-not-allowed opacity-70" : ""}`}
                    >
                      <Icon className="h-5 w-5 text-brand-600" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>

                {form.orgType === "SCHOOL" && (
                  <div>
                    <label className="label">School Type *</label>
                    <select
                      value={form.schoolType ?? ""}
                      onChange={(e) => setForm({ ...form, schoolType: e.target.value })}
                      className="input"
                      required
                    >
                      <option value="">Select school type…</option>
                      {Object.entries(SCHOOL_TYPE_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </div>
                )}

                {form.orgType === "COMPANY" && (
                  <div>
                    <label className="label">Company Type *</label>
                    <select
                      value={form.companyType ?? ""}
                      onChange={(e) => setForm({ ...form, companyType: e.target.value })}
                      className="input"
                      required
                    >
                      <option value="">Select company type…</option>
                      {Object.entries(COMPANY_TYPE_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </section>

            {/* Basic Info */}
            <section className="card p-6 space-y-5">
              <h2 className="font-semibold text-slate-900">Organisation Information</h2>

              <div>
                <label className="label">Organisation Name *</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Official name of your organisation" required />
              </div>

              <div>
                <label className="label">Who We Are / Description *</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" rows={5} placeholder="Describe your organisation, its history, size, key activities, and what makes it distinctive in its field." required />
                <p className="text-xs text-slate-400 mt-1">This is the public-facing description shown to all visitors.</p>
              </div>

              <div>
                <label className="label">Mission *</label>
                <textarea value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} className="input" rows={3} placeholder="Your organisation's mission statement and strategic goals." required />
              </div>

              <div>
                <label className="label">Experience of Dialogue with {form.orgType === "SCHOOL" ? "Industry" : "Schools / VET"}</label>
                <textarea value={form.dialogueExperience} onChange={(e) => setForm({ ...form, dialogueExperience: e.target.value })} className="input" rows={3} placeholder="Describe any previous collaborations, partnerships, or dialogue you have had with your counterpart organisations." />
              </div>
            </section>

            {/* Opportunities & Needs */}
            <section className="card p-6 space-y-5">
              <h2 className="font-semibold text-slate-900">Opportunities &amp; Needs</h2>
              <p className="text-sm text-slate-500">This section is used by our AI matching engine to identify collaboration opportunities. Be as specific as possible.</p>

              <div>
                <label className="label">What We Offer (Opportunities) *</label>
                <textarea value={form.opportunities} onChange={(e) => setForm({ ...form, opportunities: e.target.value })} className="input" rows={5} placeholder="Describe what you can offer to partner organisations: internship/WBL placements, equipment access, guest lecturing, co-design expertise, funding, etc." required />
              </div>

              <div>
                <label className="label">What We Need (Demand) *</label>
                <textarea value={form.needs} onChange={(e) => setForm({ ...form, needs: e.target.value })} className="input" rows={5} placeholder="Describe what you are looking for from partner organisations: specific skills, types of students/graduates, training formats, industry expertise, etc." required />
              </div>
            </section>

            {/* Sectors */}
            <section className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-2">Sectors *</h2>
              <p className="text-sm text-slate-500 mb-4">Select all sectors relevant to your organisation.</p>
              <div className="flex flex-wrap gap-2">
                {SECTORS.map((sector) => (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => handleSectorToggle(sector)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium border transition-colors ${
                      form.sectors.includes(sector)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
              {form.sectors.length === 0 && (
                <p className="text-xs text-red-500 mt-2">Please select at least one sector.</p>
              )}
            </section>

            {/* Regions */}
            <section className="card p-6">
              <h2 className="font-semibold text-slate-900 mb-2">Regions *</h2>
              <p className="text-sm text-slate-500 mb-4">Select all regions where your organisation operates or is interested in collaborating.</p>
              <div className="flex flex-wrap gap-2">
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => handleRegionToggle(region)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium border transition-colors ${
                      form.regions.includes(region)
                        ? "bg-brand-700 text-white border-brand-700"
                        : "bg-white text-slate-600 border-slate-200 hover:border-brand-300"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </section>

            {/* Tags & Contact */}
            <section className="card p-6 space-y-5">
              <h2 className="font-semibold text-slate-900">Tags &amp; Contact</h2>

              <div>
                <label className="label">Keywords / Tags</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="input"
                  placeholder="e.g. CNC, apprenticeship, robotics, WBL (comma-separated)"
                />
                <p className="text-xs text-slate-400 mt-1">Separate with commas. Tags improve matching accuracy.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Contact Email</label>
                  <input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} className="input" placeholder="contact@organisation.eu" />
                </div>
                <div>
                  <label className="label">Telephone</label>
                  <input type="tel" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} className="input" placeholder="+39 xxx xxx xxxx" />
                </div>
              </div>

              <div>
                <label className="label">Website</label>
                <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="input" placeholder="https://www.organisation.eu" />
              </div>

              <div>
                <label className="label">Profile Visibility</label>
                <select value={form.visibilityStatus} onChange={(e) => setForm({ ...form, visibilityStatus: e.target.value })} className="input">
                  <option value="PUBLIC">Public — visible to all visitors</option>
                  <option value="MEMBERS_ONLY">Members Only — full profile visible to registered users</option>
                  <option value="PRIVATE">Private — only visible to me and admins</option>
                </select>
              </div>
            </section>

            <div className="flex items-center gap-4">
              <button type="submit" disabled={saving || form.sectors.length === 0 || form.regions.length === 0} className="btn-primary px-8 py-3 disabled:opacity-50">
                {saving ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    {isNew ? "Create Profile" : "Save Changes"}
                  </span>
                )}
              </button>
              <p className="text-sm text-slate-400">
                {isNew ? "Your profile will be reviewed by the platform team before publication." : "Changes will require re-validation."}
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
