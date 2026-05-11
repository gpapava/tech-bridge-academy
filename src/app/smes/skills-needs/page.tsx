"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ClipboardList, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

interface Question {
  id: string;
  text: string;
  questionType: string;
  options: string[];
  required: boolean;
  order: number;
}

interface Survey {
  id: string;
  title: string;
  description?: string | null;
  questions: Question[];
  _count?: { responses: number };
}

export default function SkillsNeedsPage() {
  const { data: session, status } = useSession();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [activeSurvey, setActiveSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/auth/login?callbackUrl=/smes/skills-needs";
    }
  }, [status]);

  useEffect(() => {
    fetch("/api/surveys")
      .then((r) => r.json())
      .then((d) => setSurveys(d.data ?? []))
      .catch(() => toast.error("Failed to load surveys"))
      .finally(() => setLoading(false));
  }, []);

  const handleAnswer = (questionId: string, value: string, type: string, checked?: boolean) => {
    if (type === "MULTI_CHOICE") {
      const current = (answers[questionId] as string[]) ?? [];
      if (checked) {
        setAnswers({ ...answers, [questionId]: [...current, value] });
      } else {
        setAnswers({ ...answers, [questionId]: current.filter((v) => v !== value) });
      }
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const handleSubmit = async (surveyId: string) => {
    setSubmitting(true);
    const payload = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value: Array.isArray(value) ? value.join(", ") : value,
    }));

    try {
      const res = await fetch(`/api/surveys/${surveyId}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: payload }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted((prev) => [...prev, surveyId]);
        setActiveSurvey(null);
        setAnswers({});
        toast.success("Survey submitted! Thank you for your contribution.");
      } else {
        toast.error(data.error ?? "Submission failed");
      }
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-gradient-to-br from-amber-900 to-amber-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-amber-200 mb-6">
                <ClipboardList className="h-4 w-4" />
                SME Services · Skills Needs Profile
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Company Skills Needs Surveys</h1>
              <p className="text-amber-100 leading-relaxed">
                Complete our periodic skills needs surveys to help identify skill gaps in the mechanical engineering sector. Your responses — kept strictly confidential — inform curriculum updates at partner VET schools and generate personalised insights for your company.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {surveys.length === 0 ? (
            <div className="text-center py-20">
              <ClipboardList className="h-12 w-12 text-slate-200 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-600">No active surveys at this time</h3>
              <p className="text-slate-400 mt-2">Check back soon or contact the platform administrator.</p>
            </div>
          ) : activeSurvey ? (
            /* Survey Form */
            <div>
              <button onClick={() => { setActiveSurvey(null); setAnswers({}); }} className="btn-ghost mb-6">
                ← Back to Surveys
              </button>
              <div className="card p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{activeSurvey.title}</h2>
                {activeSurvey.description && (
                  <p className="text-slate-500 mb-8 leading-relaxed">{activeSurvey.description}</p>
                )}

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(activeSurvey.id); }} className="space-y-8">
                  {activeSurvey.questions.map((q, idx) => (
                    <div key={q.id} className="border-b border-slate-100 pb-8 last:border-0">
                      <label className="block text-sm font-medium text-slate-800 mb-3">
                        <span className="text-brand-600 font-bold">{idx + 1}.</span>{" "}
                        {q.text}
                        {q.required && <span className="text-red-500 ml-1">*</span>}
                      </label>

                      {q.questionType === "TEXT" && (
                        <input
                          type="text"
                          value={(answers[q.id] as string) ?? ""}
                          onChange={(e) => handleAnswer(q.id, e.target.value, q.questionType)}
                          className="input"
                          required={q.required}
                        />
                      )}

                      {q.questionType === "TEXTAREA" && (
                        <textarea
                          value={(answers[q.id] as string) ?? ""}
                          onChange={(e) => handleAnswer(q.id, e.target.value, q.questionType)}
                          className="input min-h-[120px]"
                          rows={4}
                          required={q.required}
                        />
                      )}

                      {q.questionType === "SINGLE_CHOICE" && (
                        <div className="space-y-2">
                          {q.options.map((opt) => (
                            <label key={opt} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                              answers[q.id] === opt
                                ? "border-brand-400 bg-brand-50"
                                : "border-slate-200 hover:border-brand-200"
                            }`}>
                              <input
                                type="radio"
                                name={q.id}
                                value={opt}
                                checked={answers[q.id] === opt}
                                onChange={(e) => handleAnswer(q.id, e.target.value, q.questionType)}
                                required={q.required}
                                className="text-brand-600"
                              />
                              <span className="text-sm text-slate-700">{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {q.questionType === "MULTI_CHOICE" && (
                        <div className="space-y-2">
                          {q.options.map((opt) => {
                            const checked = ((answers[q.id] as string[]) ?? []).includes(opt);
                            return (
                              <label key={opt} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
                                checked ? "border-brand-400 bg-brand-50" : "border-slate-200 hover:border-brand-200"
                              }`}>
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => handleAnswer(q.id, opt, q.questionType, e.target.checked)}
                                  className="rounded text-brand-600"
                                />
                                <span className="text-sm text-slate-700">{opt}</span>
                                {checked && <CheckCircle className="ml-auto h-4 w-4 text-brand-500 flex-shrink-0" />}
                              </label>
                            );
                          })}
                        </div>
                      )}

                      {q.questionType === "RATING" && (
                        <div className="flex gap-3">
                          {[1, 2, 3, 4, 5].map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => handleAnswer(q.id, String(r), q.questionType)}
                              className={`h-10 w-10 rounded-lg border-2 font-semibold text-sm transition-colors ${
                                answers[q.id] === String(r)
                                  ? "border-brand-600 bg-brand-600 text-white"
                                  : "border-slate-200 text-slate-600 hover:border-brand-300"
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                          <span className="self-center text-xs text-slate-400 ml-2">1 = Not at all important · 5 = Critical</span>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center gap-3 pt-4">
                    <button type="submit" disabled={submitting} className="btn-primary px-8 py-3">
                      {submitting ? "Submitting…" : "Submit Survey"}
                    </button>
                    <p className="text-xs text-slate-400">Your answers are confidential and used only in aggregated form.</p>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Survey List */
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900">Active Surveys</h2>
              {surveys.map((survey) => {
                const done = submitted.includes(survey.id);
                return (
                  <div key={survey.id} className={`card p-6 ${done ? "opacity-70" : ""}`}>
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${done ? "bg-emerald-50" : "bg-amber-50"}`}>
                        {done
                          ? <CheckCircle className="h-6 w-6 text-emerald-600" />
                          : <ClipboardList className="h-6 w-6 text-amber-600" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900">{survey.title}</h3>
                        {survey.description && (
                          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{survey.description}</p>
                        )}
                        <p className="text-xs text-slate-400 mt-2">
                          {survey._count?.responses ?? 0} responses submitted · {survey.questions.length} questions
                        </p>
                      </div>
                      {done ? (
                        <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium flex-shrink-0">
                          <CheckCircle className="h-4 w-4" />
                          Completed
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveSurvey(survey)}
                          className="btn-primary flex-shrink-0"
                        >
                          Start Survey <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
