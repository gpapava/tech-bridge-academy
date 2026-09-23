"use client";

import { useMemo, useState } from "react";
import {
  Map,
  Sparkles,
  CheckSquare,
  GraduationCap,
  Building2,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BestPracticeData, BestPracticeStep } from "@/data/best-practices/types";

type SectionId = "story" | "lessons" | "checklist" | "design";
type Role = "school" | "business";

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "story", label: "The story" },
  { id: "lessons", label: "What you learn" },
  { id: "checklist", label: "Checklist" },
  { id: "design", label: "Design your initiative" },
];

const ROLE_LABEL: Record<Role, string> = {
  school: "I'm a school / VET centre",
  business: "I'm a business",
};

const ROLE_ICON: Record<Role, typeof GraduationCap> = {
  school: GraduationCap,
  business: Building2,
};

const LESSON_COLORS = [
  { border: "border-accent-600", bg: "bg-accent-50", title: "text-accent-800", text: "text-accent-700" },
  { border: "border-teal-600", bg: "bg-teal-50", title: "text-teal-800", text: "text-teal-700" },
  { border: "border-amber-600", bg: "bg-amber-50", title: "text-amber-800", text: "text-amber-700" },
];

const ACADEMY_EMAIL = "academy@techbridge.eu";

export function BestPracticeWidget({ data }: { data: BestPracticeData }) {
  const [section, setSection] = useState<SectionId>("story");

  return (
    <div>
      <nav className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Best practice sections">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={section === s.id}
            onClick={() => setSection(s.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium border transition-colors",
              section === s.id
                ? "bg-brand-800 text-white border-brand-800"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {section === "story" && <StorySection data={data} />}
      {section === "lessons" && <LessonsSection data={data} />}
      {section === "checklist" && <ChecklistSection data={data} />}
      {section === "design" && <DesignSection data={data} />}
    </div>
  );
}

function StorySection({ data }: { data: BestPracticeData }) {
  const { story } = data;
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900 mb-4">
          <Map className="h-[18px] w-[18px] text-brand-700" />
          The context
        </h2>
        {[
          ["Who they are", story.who],
          ["The challenge", story.challenge],
          ["The solutions adopted", story.solutions],
        ].map(([label, text]) => (
          <div key={label} className="border-l-2 border-slate-200 pl-4 mb-4 last:mb-0">
            <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-1">{label}</div>
            <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
      <div className="card p-5">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900 mb-4">
          <Sparkles className="h-[18px] w-[18px] text-brand-700" />
          The striking figure
        </h2>
        <div className="rounded-lg border border-accent-100 bg-accent-50 p-4 mb-3">
          <p className="text-sm text-accent-900 leading-relaxed">{story.striking}</p>
        </div>
        <div className="rounded-lg border border-teal-100 bg-teal-50 p-4">
          <p className="text-sm text-teal-900 leading-relaxed">{story.insight}</p>
        </div>
      </div>
    </div>
  );
}

function RoleTabs({ role, onChange }: { role: Role; onChange: (r: Role) => void }) {
  return (
    <div className="flex gap-2 mb-4">
      {(["school", "business"] as Role[]).map((r) => {
        const Icon = ROLE_ICON[r];
        return (
          <button
            key={r}
            type="button"
            onClick={() => onChange(r)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm border transition-colors",
              role === r
                ? "bg-slate-100 text-slate-900 font-medium border-slate-300"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            )}
          >
            <Icon className="h-4 w-4" />
            {ROLE_LABEL[r]}
          </button>
        );
      })}
    </div>
  );
}

function LessonsSection({ data }: { data: BestPracticeData }) {
  const [role, setRole] = useState<Role>("school");
  const lessons = data.lessons[role];
  return (
    <div>
      <RoleTabs role={role} onChange={setRole} />
      <div className="space-y-2.5">
        {lessons.map((lesson, i) => {
          const c = LESSON_COLORS[i % LESSON_COLORS.length];
          return (
            <div key={lesson.title} className={cn("border-l-[3px] rounded-r-lg p-4", c.border, c.bg)}>
              <div className={cn("text-sm font-medium mb-1", c.title)}>{lesson.title}</div>
              <p className={cn("text-sm leading-relaxed", c.text)}>{lesson.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChecklistSection({ data }: { data: BestPracticeData }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const totalItems = useMemo(
    () => data.checklist.reduce((sum, c) => sum + c.items.length, 0),
    [data.checklist]
  );

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const pct = totalItems === 0 ? 0 : Math.round((checked.size / totalItems) * 100);

  return (
    <div className="card p-5">
      <h2 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900 mb-1.5">
        <CheckSquare className="h-[18px] w-[18px] text-brand-700" />
        Are you ready to replicate this model?
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        Tick the elements already present in your context. The unticked ones are your next steps.
      </p>

      <div className="mb-4">
        <div className="h-1 rounded-full bg-slate-100 overflow-hidden mb-1.5">
          <div
            className="h-full rounded-full bg-brand-700 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-xs text-slate-400">
          {checked.size} / {totalItems} elements completed
        </div>
      </div>

      {data.checklist.map((cat, ci) => (
        <div key={cat.name}>
          <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mt-4 mb-1.5 first:mt-0">
            {cat.name}
          </div>
          {cat.items.map((item, ii) => {
            const key = `${ci}-${ii}`;
            const isChecked = checked.has(key);
            return (
              <label
                key={key}
                className="flex items-start gap-2.5 py-2.5 border-b border-slate-100 last:border-b-0 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(key)}
                  className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 rounded-[4px] border-slate-300 text-brand-700 focus:ring-brand-500/30"
                />
                <span
                  className={cn(
                    "text-sm leading-relaxed",
                    isChecked ? "text-slate-400 line-through" : "text-slate-800"
                  )}
                >
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function DesignSection({ data }: { data: BestPracticeData }) {
  const [role, setRole] = useState<Role>("school");
  return (
    <div>
      <RoleTabs role={role} onChange={setRole} />
      <DesignStepper key={role} role={role} steps={data.steps[role]} />
    </div>
  );
}

function DesignStepper({ role, steps }: { role: Role; steps: BestPracticeStep[] }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showCanvas, setShowCanvas] = useState(false);

  const step = steps[index];
  const isLast = index === steps.length - 1;

  const goTo = (i: number) => {
    setIndex(i);
    setShowCanvas(false);
  };

  const mailBody = useMemo(() => {
    const summary = steps.map((s, i) => `${s.area}: ${answers[i]?.trim() || "not specified"}`).join("; ");
    return encodeURIComponent(
      `Hello,\n\nI have completed my initiative canvas on the Tech Bridge Academy platform. Here is my profile:\n\n${summary}\n\nI would like to start the process with an Academy expert. Please get in touch.\n\nThank you.`
    );
  }, [steps, answers]);

  if (showCanvas) {
    return (
      <div>
        <div className="text-xs text-slate-400 mb-4">Canvas completed</div>
        <div className="rounded-xl border border-slate-200 overflow-hidden mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200">
            {steps.map((s, i) => {
              const val = answers[i]?.trim();
              return (
                <div key={s.area} className="bg-white p-4">
                  <div className="text-[11px] font-medium uppercase tracking-wide text-brand-700 mb-1">
                    {s.area}
                  </div>
                  {val ? (
                    <div className="text-[13px] text-slate-800 leading-relaxed">{val}</div>
                  ) : (
                    <div className="text-[13px] text-slate-400 italic">Not filled in</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-xl border border-teal-100 bg-teal-50 p-5">
          <h3 className="flex items-center gap-2 text-[15px] font-medium text-teal-900 mb-2">
            <Rocket className="h-[18px] w-[18px]" />
            Your canvas is ready
          </h3>
          <p className="text-[13px] text-teal-800 leading-relaxed mb-4">
            You have defined the foundations of your initiative. The next steps — finding the right
            partners, setting up the first meeting, building the formal agreement — are exactly what
            the Academy does. Bring this canvas to an expert: let&rsquo;s turn it into a concrete action
            plan.
          </p>
          <a
            href={`mailto:${ACADEMY_EMAIL}?subject=${encodeURIComponent(
              "Canvas ready – Academy pathway request"
            )}&body=${mailBody}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2.5 w-full transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            Talk to our experts — turn your canvas into action ↗
          </a>
          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={() => goTo(0)}
              className="text-sm text-teal-700 border border-teal-600 rounded-lg px-3.5 py-1.5 hover:bg-teal-100/60 transition-colors"
            >
              ← Go back and edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-[2px] mb-5 rounded-md overflow-hidden">
        {steps.map((_, i) => (
          <div
            key={i}
            className={cn("flex-1 h-[3px] transition-colors", i <= index ? "bg-brand-700" : "bg-slate-200")}
          />
        ))}
      </div>
      <div className="text-xs text-slate-400 mb-4">
        Step {index + 1} of {steps.length}
      </div>

      {step.engage && (
        <div className="flex items-start gap-3 rounded-xl border border-accent-100 bg-accent-50 p-4 mb-4">
          <Sparkles className="h-[22px] w-[22px] text-accent-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-accent-900 mb-1">Need support with this step?</div>
            <div className="text-sm text-accent-800 leading-relaxed mb-2">{step.engage}</div>
            <a
              href={`mailto:${ACADEMY_EMAIL}?subject=${encodeURIComponent("Request: Talk to an Academy expert")}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent-600 bg-white text-accent-700 text-sm px-3.5 py-1.5 hover:bg-accent-50 transition-colors"
            >
              Talk to an Academy expert ↗
            </a>
          </div>
        </div>
      )}

      <div className="card p-5 mb-4">
        <div className="text-[11px] font-medium uppercase tracking-wide text-brand-700 mb-1.5">
          {step.area}
        </div>
        <div className="text-[15px] font-medium text-slate-900 leading-snug mb-1.5">{step.question}</div>
        <div className="flex items-start gap-1.5 text-[13px] text-slate-500 leading-relaxed mb-3">
          <Lightbulb className="h-3.5 w-3.5 text-brand-700 flex-shrink-0 mt-0.5" />
          {step.hint}
        </div>
        <div className="text-xs text-slate-400 italic rounded-lg bg-slate-50 border-l-2 border-slate-200 px-3 py-2 mb-3">
          {step.example}
        </div>
        <textarea
          value={answers[index] ?? ""}
          onChange={(e) => setAnswers((prev) => ({ ...prev, [index]: e.target.value }))}
          placeholder="Write your answer here..."
          rows={3}
          className="input text-[13px]"
        />
      </div>

      <div className="flex items-center gap-2">
        {index > 0 && (
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 text-slate-600 text-sm px-3.5 py-1.5 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
        )}
        <button
          type="button"
          onClick={() => (isLast ? setShowCanvas(true) : goTo(index + 1))}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-brand-800 hover:bg-brand-900 text-white text-sm px-4 py-1.5 transition-colors"
        >
          {isLast ? "See your canvas" : "Next"}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
