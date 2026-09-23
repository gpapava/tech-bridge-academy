import type { BestPracticeData } from "./types";

export const fav: BestPracticeData = {
  slug: "fav",
  title: "Aldini Valeriani Foundation (FAV) – Structured dialogue and systemic VET-business cooperation",
  shortName: "Aldini Valeriani Foundation (FAV)",
  country: "Italy",
  subtitle: "Bologna / Emilia-Romagna · Mechanical, IT, cross-sector · IeFP, IFTS, ITS, continuing training",
  badges: ["Business", "School / VET centre", "Regional ecosystem", "WBL / Apprenticeship"],
  story: {
    who: "FAV (Fondazione Aldini Valeriani) is an accredited training and employment services provider in the Bologna, Modena and Ferrara area, operating as a local branch of Formindustria Emilia-Romagna — the regional training arm of Confindustria. It operates across three areas: initial vocational training (IeFP), career education for adults and job seekers, and training services for businesses.",
    challenge: "Delivering training across a vast and heterogeneous landscape — from young people in IeFP pathways to unemployed adults needing to retrain, to workers in companies needing to upskill — requires a system that can simultaneously identify needs, mobilise resources, and maintain relevance. Managing this complexity while ensuring quality and employability outcomes across all target groups is the central operational challenge.",
    solutions: "FAV's structural advantage is its embeddedness in the Confindustria system: collaboration with businesses is not a project — it is built into the institution's DNA. A dedicated sales and planning team continuously maps company needs and market trends. Co-design of training is valued in regional funding frameworks. A faculty of ~1,500 practitioner-teachers ensures professional currency. The institution also partners with third sector organisations, universities, and employment centres to remove participation barriers.",
    striking: "FAV's training offer is calibrated directly on data collected from companies, resulting in high employability rates for graduates and high satisfaction among businesses using FAV courses for employee development. The institution manages the full arc: from a school-leaver doing IeFP to a worker upskilling through a company-funded course.",
    insight: "FAV demonstrates that when a VET institution is structurally anchored to an employers' network, training relevance is not a project to be achieved — it is a baseline condition. The model scales by territory and sector, not by individual relationships.",
  },
  lessons: {
    school: [
      { title: "Embed business voice in governance, not just in convention", text: "The most durable school-business relationships are institutional, not personal. FAV's connection to Confindustria is structural — it shapes how priorities are set, how needs are read, and how training is designed. A VET centre that relies only on individual teacher relationships with local companies is one resignation away from losing its market intelligence." },
      { title: "Differentiate your offer by target group — and design accordingly", text: "FAV manages three operationally distinct pathways (IeFP, career education, business training) with different funding logics, different learner profiles, and different co-design mechanisms. A single 'school-business collaboration' approach cannot serve young students, unemployed adults and employed workers at the same time. Each needs its own architecture." },
      { title: "Remove barriers to participation before asking for engagement", text: "Unemployed adults often cannot afford to attend training. FAV works with third sector partners to provide daily allowances. Foreign-language learners need CPIA collaboration. If you want broader participation, solve the access problem first." },
      { title: "Invest in practitioner-teachers systematically", text: "A faculty of ~1,500 practitioner-teachers does not happen by accident. FAV has a scientific advisory system that vets pedagogical and technical skills. This is infrastructure, not improvisation." },
    ],
    business: [
      { title: "Collective voice produces better training than individual requests", text: "FAV's model works because Confindustria aggregates the needs of hundreds of companies and takes them to regional planning tables. An SME going alone to a VET centre produces a one-off course. An SME going through its trade association produces a curriculum change." },
      { title: "Co-design is valued — and rewarded — in public funding frameworks", text: "In Emilia-Romagna, regional calls award additional points to projects that actively involve businesses. Participating in co-design is not just good practice: it unlocks resources. Know your regional funding rules." },
      { title: "Soft skills are not optional extras — they are hiring criteria", text: "FAV systematically includes soft skills modules because businesses consistently flag them as essential. If your company struggles to integrate new hires not for technical reasons but for communication or adaptability — this is where curriculum reform starts." },
    ],
  },
  checklist: [
  {
    name: "Governance and institutional structure",
    items: [
      "The institution has a formal link to a trade association or employers' federation that provides ongoing intelligence on company needs",
      "Training needs are collected systematically — not only when a course needs to be filled",
      "The institution participates in regional or national planning forums where training priorities are set",
    ],
  },
  {
    name: "Training design and delivery",
    items: [
      "Practitioners from the sector (not only retired professionals) teach professional subjects",
      "A system exists to assess the technical and pedagogical skills of practitioner-teachers",
      "Co-design with businesses is part of the standard process for developing courses — not an exception",
      "Soft skills modules are integrated into all training pathways, with dedicated hours",
    ],
  },
  {
    name: "Inclusion and access",
    items: [
      "Mechanisms exist to support learners who face income barriers to participation",
      "Language support is accessible for learners of foreign origin",
      "Prior learning recognition processes are in place — including for non-formal and informal learning",
    ],
  },
  {
    name: "SME engagement",
    items: [
      "Specific outreach activities exist to engage SMEs who do not yet see the value of training partnerships",
      "Company tutors are recognised and supported (evaluation tools, basic training, feedback mechanisms)",
    ],
  },
  ],
  steps: {
    school: [
      {
        area: "Objective",
        question: "What structural gap are you trying to close?",
        hint: "Don't answer 'improve employability.' Which specific group of learners is not being served well, and why? Name the gap precisely.",
        example: "e.g. adult job seekers who drop out because they cannot afford not to work; SMEs whose needs we identify only informally",
        engage: null,
      },
      {
        area: "Stakeholder mapping",
        question: "Which organisations in your territory aggregate business voice?",
        hint: "A single company's opinion is anecdote. A trade association's survey is evidence. Who speaks for the sector in your area — and are you at their table?",
        example: "e.g. local Confindustria branch, CNA, sectoral association; regional planning tables convened by the Region",
        engage: null,
      },
      {
        area: "Training architecture",
        question: "How do you differentiate your offer for different target groups?",
        hint: "IeFP students, adult job seekers, and employed workers have different needs and different co-design logics. Do you treat them the same?",
        example: "e.g. IeFP: co-design limited by national curriculum; adult education: full co-design possible; business training: demand-led design",
        engage: "The Academy can support you in mapping the co-design opportunities available within your funding framework.",
      },
      {
        area: "Practitioner faculty",
        question: "What is your current ratio of practitioner-teachers to full-time academic staff in professional subjects?",
        hint: "This is a diagnostic question, not a target. The answer reveals how connected your teaching is to current industry practice.",
        example: "e.g. 30% of professional subject hours delivered by active practitioners; no formal system to assess pedagogical skills",
        engage: null,
      },
      {
        area: "Soft skills",
        question: "Where do soft skills currently appear in your offer?",
        hint: "If the answer is 'in a one-day module at the start of the year,' your alumni will struggle with professional integration regardless of technical competence.",
        example: "e.g. 40 hours embedded across the year; assessed through workplace tutor evaluations; not currently mapped",
        engage: null,
      },
      {
        area: "Sustainability",
        question: "What makes this collaboration survive a change of head teacher or a key company contact leaving?",
        hint: "If the answer is 'it wouldn't,' you have a relationship, not a system.",
        example: "e.g. formal governance agreement; institutionalised annual needs analysis; participation in regional planning tables",
        engage: "The Academy can help you design governance structures that outlast individual champions.",
      },
    ],
    business: [
      {
        area: "Objective",
        question: "What workforce problem are you trying to solve — and over what time horizon?",
        hint: "A short-term recruitment need and a long-term curriculum influence goal require different strategies. Be specific about which one you are pursuing.",
        example: "e.g. need CNC operators by next year (short-term); want training to include lean manufacturing (long-term)",
        engage: null,
      },
      {
        area: "Collective voice",
        question: "Are you part of a trade association that engages with VET institutions or regional planning?",
        hint: "Individual company requests rarely change curricula. Trade association pressure does. Check whether your association already has a VET working group before going alone.",
        example: "e.g. member of Confindustria local branch; not aware of any VET engagement — gap to fill",
        engage: "The Academy can identify which associations in your sector are already in dialogue with VET institutions.",
      },
      {
        area: "Co-design contribution",
        question: "What expertise can you bring to curriculum design that the school genuinely doesn't have?",
        hint: "Not 'we know what we need.' What specific technical knowledge can your engineers bring into the classroom?",
        example: "e.g. our quality manager can map ISO 9001 requirements for a 20-hour module; our CNC team can define entry-level competencies",
        engage: null,
      },
      {
        area: "Tutor investment",
        question: "Who in your company can supervise a trainee — and how will you support them?",
        hint: "The quality of a work placement depends almost entirely on the company tutor. Do you have someone with both technical competence and patience to teach?",
        example: "e.g. senior technician available; no formal tutor training yet; we use an evaluation form to track trainee progress",
        engage: "The Academy can provide basic tutor training and evaluation tools.",
      },
      {
        area: "Collective impact",
        question: "What would change if 5 companies in your sector did this together?",
        hint: "One SME training one student is a gesture. Five SMEs co-designing a module and sharing a graduate pool is a labour market strategy.",
        example: "e.g. shared apprenticeship exam co-designed with the local VET centre; collective input into regional planning tables",
        engage: "The Academy can help you build that coalition.",
      },
    ],
  },
};
