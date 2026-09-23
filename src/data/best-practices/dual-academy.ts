import type { BestPracticeData } from "./types";

export const dualAcademy: BestPracticeData = {
  slug: "dual-academy",
  title: "Dual Academy Slovakia – First certified Industrial Training Centre in the country",
  shortName: "Dual Academy Slovakia",
  country: "Slovakia",
  subtitle: "Bratislava · Mechanical engineering, automation, industrial mechanics, tool technology · Dual VET",
  badges: ["Business", "School / VET centre", "Dual system", "WBL / Apprenticeship"],
  story: {
    who: "The Dual Academy, established in 2016 in Bratislava's Devínska Nová Ves district, is Slovakia's first certified Industrial Training Centre. It operates on the dual education model with major industry partners including Volkswagen Slovakia, Siemens, and Matador Holding. It offers 4-year programmes in mechanical engineering, automation, industrial mechanics, and tool technology, as well as accredited adult courses in automation, robotics, and electrical installation.",
    challenge: "Despite a strong industrial base in Slovakia's automotive and engineering sector, VET pathways suffer from persistent social stigma. Families and students prefer academic routes. Companies face acute shortages of technically qualified workers in precision manufacturing and automation. The challenge is simultaneously to raise the quality and the reputation of VET in Slovakia's most industrially dense region.",
    solutions: "The Dual Academy embeds companies directly into the training model: students spend structured time in partner company workshops. Graduates receive certifications recognised by both national bodies and the Slovak-German Chamber of Industry and Commerce — an international quality stamp. Adult education programmes extend the model beyond initial VET, enabling workers to continuously upskill as automation advances.",
    striking: "The Dual Academy became the benchmark for vocational quality in Slovakia not by being the largest VET institution, but by being the most certified. International recognition of its graduates signals quality to employers across borders.",
    insight: "The Dual Academy shows that VET quality can be credentialled in ways that bypass national stigma. When a certification is issued by an internationally recognised body, it carries labour market weight that shifts perception over time. The model scales by replication in other regions using the same certification framework.",
  },
  lessons: {
    school: [
      { title: "Industry co-governance is the quality signal", text: "The Dual Academy's credibility comes from the fact that Volkswagen, Siemens, and Matador are not sponsors — they are co-designers and validators. If your industry partners appear only in a logo on your brochure, students and families notice." },
      { title: "International certification changes the value equation", text: "When graduates hold a Slovak-German Chamber certificate alongside their state diploma, the market signal is different. Explore whether sector-specific certifications from chambers or international bodies could complement your national qualification." },
      { title: "Lifelong learning is the sustainability mechanism", text: "Adult upskilling programmes generate revenue that subsidises initial VET and deepen company relationships. A company that sends its workers for upskilling is far more invested than one that only hosts interns." },
    ],
    business: [
      { title: "Co-certification multiplies your recruitment reach", text: "A certificate co-signed by an industry body that you helped design signals quality to other employers in the sector. You have effectively raised the floor for the whole local labour market." },
      { title: "Dual training turns your production line into a talent pipeline", text: "When students spend structured time in your facility under the dual model, you are training future employees in your specific processes, on your specific machines. Hiring from this pool eliminates the standard 3–6 month onboarding lag." },
      { title: "Invest in adult upskilling as a retention tool", text: "Offering your workers a structured upskilling path reduces resistance to new technologies, improves adoption, and signals that the company invests in its people." },
    ],
  },
  checklist: [
  {
    name: "Dual model infrastructure",
    items: [
      "The institution offers a genuine dual training model where students split time between classroom and company workplace",
      "Industry partners are contractually involved in programme design and student assessment — not only in hosting",
      "Company supervisors have defined roles and preparation for their training function",
    ],
  },
  {
    name: "Certification and recognition",
    items: [
      "Graduates receive certifications recognised beyond the state diploma — by chambers, sector associations or international bodies",
      "The institution has explored certification frameworks available from sectoral or bilateral chambers",
    ],
  },
  {
    name: "Lifelong learning",
    items: [
      "The institution offers training for employed workers, not only for initial VET students",
      "Business relationships are sustained through continuing education services, not only through annual internship rounds",
    ],
  },
  {
    name: "Attractiveness and image",
    items: [
      "The institution uses industry partners' names visibly to signal quality to students and families",
      "There is an active orientation strategy targeting lower-secondary students and parents",
    ],
  },
  ],
  steps: {
    school: [
      {
        area: "Objective",
        question: "What is the reputation problem you are trying to solve — and for whom?",
        hint: "Low enrolment, poor employer perception, and student dropout are three different problems with three different solutions.",
        example: "e.g. families see VET as a second choice; employer satisfaction is high but enrolments are falling",
        engage: null,
      },
      {
        area: "Industry co-governance",
        question: "Which companies in your territory could move from 'partner' to 'co-owner' of a training programme?",
        hint: "At least one or two anchor partners at governance level changes everything about your institutional credibility.",
        example: "e.g. two major manufacturers have expressed interest in deeper involvement; no formal mechanism exists yet",
        engage: "The Academy can help you design a governance model that fits your legal and institutional context.",
      },
      {
        area: "Certification",
        question: "Are any internationally recognised certifications available in your field that could complement the national diploma?",
        hint: "Research bilateral chambers, European sector associations, and professional bodies.",
        example: "e.g. the bilateral chamber in our sector offers a certification exam — we have never explored it",
        engage: null,
      },
      {
        area: "Lifelong learning",
        question: "Could your institution offer upskilling courses for workers at your partner companies?",
        hint: "A company that sends its employees for upskilling is invested in your institution's quality in a way that an internship host is not.",
        example: "e.g. no adult offer currently; companies have asked about automation training; we could start with a 40-hour module",
        engage: "The Academy can connect you with companies looking for structured upskilling offers.",
      },
    ],
    business: [
      {
        area: "Objective",
        question: "Which technical roles will be hardest to fill in 3 years — not today?",
        hint: "The dual training cycle lasts 4 years. The investment you make today produces graduates in 2028. Are you planning for that horizon?",
        example: "e.g. automation technicians — we are implementing new robotics lines and there are no trained profiles available locally",
        engage: null,
      },
      {
        area: "Co-design commitment",
        question: "What would it take for your company to become a co-designer of a training programme?",
        hint: "This means sending technical staff to curriculum meetings, defining competency standards, co-assessing graduates. Who would own this?",
        example: "e.g. our engineering director is interested; we have never been asked; we need to understand the time commitment",
        engage: "The Academy can walk you through what co-design involvement looks like in practice.",
      },
      {
        area: "Adult upskilling",
        question: "What automation or digital skills do your current employees need in the next 2 years?",
        hint: "Sending workers to a VET centre for structured upskilling is cheaper than turnover and more systematic than informal on-the-job learning.",
        example: "e.g. 12 operators need retraining on new CNC systems; no formal plan exists yet",
        engage: "The Academy can help you design a structured upskilling pathway for your current workforce.",
      },
    ],
  },
};
