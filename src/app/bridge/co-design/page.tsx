"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { GitMerge, CheckCircle, ArrowRight, Lock, Send } from "lucide-react";
import toast from "react-hot-toast";

const phases = [
  { step: "1", title: "Expression of Interest", desc: "Submit your co-design request via the platform. Clearly outline your school's educational offer or your company's technical skill needs to kickstart the collaborative curriculum design process." },
  { step: "2", title: "Tailored Skill Matching", desc: "Our dedicated team acts as a premium curation service. We actively review your request and customize the matching process to align mechanical SMEs and VET schools with maximum precision." },
  { step: "3", title: "Guided Partnership Introduction", desc: "To build a strong foundation for co-design, both parties receive a curated introduction report. Our consortium directly facilitates your first exploratory meeting, guiding you smoothly into active cooperation." },
  { step: "4", title: "Co-Design Workshop", desc: "Partners participate in facilitated workshops to map current curricula, identify gaps, and co-create training objectives." },
  { step: "5", title: "Programme Development", desc: "A joint working group develops the curriculum unit, including assessments, learning outcomes, and company tutor guidance." },
  { step: "6", title: "Pilot & Validation", desc: "The co-designed programme is piloted with a student cohort and evaluated jointly by school and company representatives." },
];

export default function CoDesignPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ title: "", description: "", partnerNotes: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) { toast.error("Please sign in to submit a co-design request"); return; }
    setLoading(true);

    try {
      const res = await fetch("/api/co-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        toast.success("Co-design request submitted successfully!");
      } else {
        toast.error(data.error ?? "Submission failed");
      }
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-gradient-to-br from-brand-900 to-brand-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-brand-200 mb-6">
                <GitMerge className="h-4 w-4" />
                Bridge Area · Co-Design Service
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Curriculum Co-Design Service
              </h1>
              <p className="text-brand-200 text-lg leading-relaxed">
                A structured facilitation service that brings schools and companies together to jointly develop training programmes aligned with real industry needs.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* What is Co-Design */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-5">What is Curriculum Co-Design?</h2>
              <div className="prose text-slate-600 leading-relaxed space-y-4">
                <p>
                  Curriculum co-design is a collaborative process where vocational schools and manufacturing companies jointly develop training programmes, modules, or competency frameworks. Unlike traditional curriculum development — which happens entirely within schools — co-design brings company knowledge into the classroom from the start.
                </p>
                <p>
                  The result is a training pathway that reflects real workplace requirements, uses industry-relevant materials and contexts, and produces graduates who are genuinely work-ready.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  { title: "For Schools", items: ["Access to real industry knowledge and equipment", "Higher employability rates for graduates", "Stronger company relationships for WBL placements", "Curriculum validated by sector experts"] },
                  { title: "For Companies", items: ["Shape the skills of future recruits", "Reduce onboarding time and cost", "Access to student talent for projects and internships", "Fulfil CSR and apprenticeship obligations"] },
                ].map(({ title, items }) => (
                  <div key={title} className="card p-5">
                    <h3 className="font-semibold text-slate-900 mb-3">{title}</h3>
                    <ul className="space-y-2">
                      {items.map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-accent-500 flex-shrink-0 mt-0.5" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Timeline */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">How It Works</h2>
              <div className="space-y-1">
                {phases.map((phase, i) => (
                  <div key={phase.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-800 text-sm font-bold text-white">
                        {phase.step}
                      </div>
                      {i < phases.length - 1 && <div className="w-0.5 flex-1 bg-brand-100 my-1" />}
                    </div>
                    <div className={`pb-6 ${i < phases.length - 1 ? "" : ""}`}>
                      <h3 className="font-semibold text-slate-900 text-sm">{phase.title}</h3>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Request Form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900">Request Co-Design Support</h2>
              <p className="text-slate-500 mt-2">
                Submit a request and our consortium team will contact you to discuss next steps.
              </p>
            </div>

            {!session ? (
              <div className="card p-10 text-center border-2 border-dashed border-slate-200">
                <Lock className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-700">Sign in to submit a request</h3>
                <p className="text-sm text-slate-400 mt-2">You need a registered organisation profile to request co-design support.</p>
                <div className="flex justify-center gap-3 mt-6">
                  <Link href="/auth/login" className="btn-primary">Sign In</Link>
                  <Link href="/auth/register" className="btn-secondary">Register Free</Link>
                </div>
              </div>
            ) : submitted ? (
              <div className="card p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Request Submitted!</h3>
                <p className="text-slate-500 mt-3 leading-relaxed">
                  Thank you for your interest. Our consortium team will review your request and contact you within 5 business days to discuss the next steps.
                </p>
                <Link href="/dashboard" className="btn-primary mt-6">
                  Back to Dashboard
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                <div>
                  <label className="label">Request Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="input"
                    placeholder="e.g. Co-design of a CNC programming module for 3rd-year students"
                    required
                  />
                </div>

                <div>
                  <label className="label">Description of your needs / proposal *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="input min-h-[150px]"
                    placeholder="Describe what training gap or curriculum area you would like to address through co-design, what outcomes you expect, and the type of partner you are looking for."
                    required
                    rows={6}
                  />
                </div>

                <div>
                  <label className="label">Notes on ideal partner (optional)</label>
                  <textarea
                    value={form.partnerNotes}
                    onChange={(e) => setForm({ ...form, partnerNotes: e.target.value })}
                    className="input"
                    placeholder="e.g. Sector, region, company size, type of school, specific expertise required"
                    rows={3}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Submit Co-Design Request
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
