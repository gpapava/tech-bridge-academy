// Shared type for the interactive Best Practice widgets (story / lessons /
// checklist / design-your-initiative stepper). Content is curated editorial
// material sourced from partner-submitted case studies, not user-generated —
// kept as static data rather than in the database. See sibling files for the
// content itself.

export interface BestPracticeStep {
  area: string;
  question: string;
  hint: string;
  example: string;
  /** One-sentence prompt shown in an "Academy can help" banner for this step, if any. */
  engage: string | null;
}

export interface BestPracticeLesson {
  title: string;
  text: string;
}

export interface BestPracticeChecklistCategory {
  name: string;
  items: string[];
}

export interface BestPracticeData {
  /** URL slug, e.g. "ciac" -> /bridge/best-practices/ciac */
  slug: string;
  /** Full title, e.g. "CIAC – Systemic vision and shared governance for vocational training" */
  title: string;
  /** Short organisation name for breadcrumbs and cards, e.g. "CIAC" */
  shortName: string;
  country: string;
  /** Region · sectors · programme type, e.g. "Canavese (Piedmont) · Mechanical, IT · IeFP" */
  subtitle: string;
  badges: string[];
  story: {
    who: string;
    challenge: string;
    solutions: string;
    striking: string;
    insight: string;
  };
  lessons: {
    school: BestPracticeLesson[];
    business: BestPracticeLesson[];
  };
  checklist: BestPracticeChecklistCategory[];
  steps: {
    school: BestPracticeStep[];
    business: BestPracticeStep[];
  };
}
