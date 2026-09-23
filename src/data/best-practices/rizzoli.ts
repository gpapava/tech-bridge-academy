import type { BestPracticeData } from "./types";

export const rizzoli: BestPracticeData = {
  slug: "rizzoli",
  title: "ITS Angelo Rizzoli – Progressive business engagement and listening as a system",
  shortName: "ITS Angelo Rizzoli",
  country: "Italy",
  subtitle: "Lombardy (Milan area) · Graphics, packaging, Industry 5.0, IT, software · ITS / IFTS tertiary VET",
  badges: ["Business", "School / VET centre", "ITS tertiary VET", "WBL / Apprenticeship"],
  story: {
    who: "ITS Angelo Rizzoli is a participatory foundation established in 2011 in Lombardy. Its members — majority businesses — include schools, universities, training centres, and local authorities. All pay a €3,000 contribution (cash or in kind). It offers two-year ITS courses in graphics, packaging, Industry 5.0, IT and software development, and business intelligence. Each course includes 1,160 hours of internship and 840 hours of classroom study. The Director General coordinates the Lombardy Regional ITS Network.",
    challenge: "Enrolments in ITS programmes remain far below European benchmarks. Maintaining genuine market alignment requires continuous, direct intelligence from companies — not periodic surveys. And doing this at scale with SMEs, which lack dedicated HR or training functions, requires a specific and patient approach.",
    solutions: "A dedicated 'Business Relations' office (3 staff) maintains continuous two-way contact with companies: monitoring internship progress, gathering needs, onboarding new companies, running webinars on apprenticeship regulation. Annual/biennial surveys supplement daily intelligence. Training designers cross-reference company feedback with Excelsior survey data. Businesses can join the foundation as members — typically after progressive involvement starting with hosting one intern. Some co-design entire courses (e.g. 'Energy & Digital Process Specialist' with Schneider Electric). PNRR-funded labs are now sought by SMEs for prototyping.",
    striking: "Graduates of ITS Angelo Rizzoli are so sought-after that companies hire them directly — without employment agencies. APLs play no intermediary role because professional profiles are absorbed before hitting the open market.",
    insight: "ITS Rizzoli demonstrates the power of progressive engagement: a company's relationship typically starts with hosting one intern, deepens through teaching hours and curriculum input, and eventually leads to co-membership in the foundation. The entry point is low-friction; the destination is structural co-governance.",
  },
  lessons: {
    school: [
      { title: "Build a Business Relations function — not just a partnerships list", text: "ITS Rizzoli has three dedicated people whose only job is to maintain relationships with companies. This is a function, not a task. If 'company relations' is one item on a coordinator's job description, it will always be crowded out." },
      { title: "Design the escalator: from intern host to foundation member", text: "The most durable company relationships were not recruited — they grew. A company that hosts one intern, gives feedback, delivers teaching hours, then co-designs a module is a very different partner from one that signed a generic MoU. Design the path of progressive deepening deliberately." },
      { title: "Your best laboratories may be your most powerful SME engagement tool", text: "ITS Rizzoli's PNRR-funded labs are so advanced that SMEs want to use them for prototyping. This reverses the usual dynamic. If you have equipment that SMEs lack, that is leverage — use it consciously." },
      { title: "One long internship beats two short ones", text: "ITS Rizzoli moved from two shorter placements to one 840-hour placement in the second year, based on company feedback. Interns need time to build autonomy and contribute meaningfully. Factor this into your WBL design." },
    ],
    business: [
      { title: "Co-design an entire course — if you can aggregate with others", text: "Schneider Electric co-designed the 'Energy & Digital Process Specialist' course with associated companies. If you can identify 3–5 companies in your supply chain with the same skills gap, you have the mass to commission a course rather than wait for one to appear." },
      { title: "Your SME is not too small for ITS collaboration — but you need an honest broker", text: "SMEs sometimes lack the HR capacity to manage internship relationships formally. ITS Rizzoli's Business Relations office fills this gap. If you are an SME, find a training institution with this function — or ask the Academy to play it." },
      { title: "Deliver teaching hours — it is a direct recruitment screen", text: "Delivering a few teaching hours a month means you see how students think and who you want on your team — before they graduate. It costs little and pays back in recruitment quality." },
    ],
  },
  checklist: [
  {
    name: "Business relations infrastructure",
    items: [
      "A dedicated function (person or team) exists to maintain continuous contact with partner companies",
      "Company needs are gathered through multiple channels: structured surveys, daily contact, feedback from internship supervisors",
      "Training designers regularly cross-reference company feedback with external labour market data",
    ],
  },
  {
    name: "Progressive engagement model",
    items: [
      "There is a defined pathway for companies to deepen their involvement over time (intern host → teaching hours → co-design → governance)",
      "New companies are actively recruited in sectors where placement demand is high",
      "Teaching by company professionals is systematically organised and covers a meaningful volume of professional subject hours",
    ],
  },
  {
    name: "Internship quality",
    items: [
      "Internship placement is based on skills matching — not just availability",
      "At least two candidates are proposed per position, with interviews organised",
      "Internship duration and structure have been designed based on company feedback",
      "Mechanisms exist to monitor internship quality in real time",
    ],
  },
  {
    name: "Facilities and infrastructure",
    items: [
      "Laboratories and equipment are up to date with current industry practice",
      "The institution has explored whether its facilities could be offered to companies as a partnership tool",
    ],
  },
  ],
  steps: {
    school: [
      {
        area: "Objective",
        question: "What specific skills mismatch are you trying to close — and how do you know it exists?",
        hint: "Not 'graduates struggle to find work.' Which competences are employers consistently saying are missing? Show the evidence.",
        example: "e.g. packaging companies say graduates lack automation knowledge; companies report 60% of new hires need 3+ months of onboarding",
        engage: null,
      },
      {
        area: "Business relations",
        question: "How does your institution currently collect company intelligence — and who is responsible?",
        hint: "If the answer is 'the director makes calls sometimes,' you have an intelligence gap. Map it honestly.",
        example: "e.g. one coordinator handles company relations alongside four other tasks; no systematic survey",
        engage: "The Academy can help you design a lightweight Business Relations function within your current staffing.",
      },
      {
        area: "Progressive engagement",
        question: "What is the easiest first step a company can take to work with you?",
        hint: "The answer should be so low-friction that a company with no prior relationship says yes.",
        example: "e.g. guest lecture at an open day; feedback session on a draft curriculum module; one-day company visit for a class",
        engage: null,
      },
      {
        area: "Internship design",
        question: "How long are your internships — and was that duration chosen based on company feedback?",
        hint: "If not, run a short survey with your last 10 company partners. You may find, like ITS Rizzoli, that the current structure is not optimal.",
        example: "e.g. 400 hours in year 1 and 400 in year 2; companies prefer one long placement in year 2",
        engage: null,
      },
      {
        area: "Facilities",
        question: "Do you have equipment or labs that companies in your territory lack?",
        hint: "Advanced CNC machines, simulation software, testing equipment — if you have it and local SMEs don't, you have negotiating leverage.",
        example: "e.g. our new welding lab has equipment smaller companies cannot afford; we could offer it for testing in exchange for curriculum input",
        engage: "The Academy can help you structure a facilities-sharing agreement.",
      },
    ],
    business: [
      {
        area: "Objective",
        question: "Which specific technical role is hardest for you to recruit — and what is the cost of vacancy?",
        hint: "Be precise. Not 'we need technicians.' Which role, which skills, and how long does a vacancy typically stay open?",
        example: "e.g. ITS-level software automation specialists; average vacancy open 4+ months",
        engage: null,
      },
      {
        area: "Entry point",
        question: "What is the lowest-effort way you could start a relationship with an ITS or VET centre this month?",
        hint: "The answer is probably 'deliver a 2-hour lecture to a class.' This is a scouting mission, not a commitment.",
        example: "e.g. present our automation challenges to a final-year IT class; offer a half-day visit to our production line",
        engage: null,
      },
      {
        area: "Co-design potential",
        question: "Are there 3–5 companies in your sector or supply chain with the same skills gap?",
        hint: "A single company asking for a curriculum change gets a polite response. A consortium asking for it gets a new course designed.",
        example: "e.g. three companies in our packaging supplier network all struggle to find the same profile",
        engage: "The Academy can help you identify and connect with companies sharing your skills gap.",
      },
      {
        area: "Apprenticeship readiness",
        question: "Do you know how third-level apprenticeship works — and have you tried it?",
        hint: "ITS Rizzoli notes that companies that try third-level apprenticeship almost never abandon it. If you haven't tried it, find out what it involves.",
        example: "e.g. never used it; our employment consultant doesn't know it well enough to recommend it",
        engage: "The Academy can walk you through the apprenticeship mechanism.",
      },
    ],
  },
};
