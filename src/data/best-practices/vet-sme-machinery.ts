import type { BestPracticeData } from "./types";

export const vetSmeMachinery: BestPracticeData = {
  slug: "vet-sme-machinery",
  title: "VET–SME Cooperation in the Machinery Sector – Slovakia's dual training ecosystem",
  shortName: "VET–SME Cooperation in the Machinery Sector",
  country: "Slovakia",
  subtitle: "National (Trenčín, Žilina regions) · Mechanical engineering, mechatronics, CNC, automotive · Dual VET ecosystem",
  badges: ["Business", "School / VET centre", "Dual system", "Regional ecosystem", "EU-funded cooperation"],
  story: {
    who: "This best practice describes the ecosystem of VET-SME cooperation in Slovakia's machinery sector, built around the 2015 Dual Education Act and shaped by national and EU-funded projects. Key actors include vocational secondary schools with engineering focus, SMEs in machinery and automotive supply chains, the Slovak-German Chamber of Commerce, regional authorities, and Erasmus+ partners from Germany, Austria and the Czech Republic. Regional dual training centres act as coordination hubs.",
    challenge: "Slovak machinery SMEs face a critical skills gap in CNC operators, machinery mechanics, and toolmakers — confirmed by Slovak-German Chamber surveys. Dual education, introduced in 2015, offered a structural solution, but uptake was slow due to bureaucratic complexity, limited SME capacity to host and mentor apprentices, and persistent public preference for academic pathways.",
    solutions: "The ecosystem combines multiple mechanisms: formal dual apprenticeship contracts, company advisory boards in schools, equipment donations from companies to school workshops, Erasmus+ mobility projects that expose Slovak teachers to German and Czech VET practices, and regional training hubs that pool shared equipment and coordinate placements across clusters of SMEs. The 'Step Ahead' Erasmus+ project and a Czech-Slovak eTwinning partnership co-created CNC and automation curricula adopted in both countries.",
    striking: "Many apprentices in the dual system are hired by the SMEs that trained them — directly eliminating recruitment cost and onboarding lag. Regional training centres make this possible even for SMEs too small to run apprenticeships independently, by sharing coordination and equipment across clusters.",
    insight: "Slovakia's machinery VET ecosystem demonstrates that the dual model is a territory-level infrastructure decision. When regional hubs coordinate across multiple schools and companies, the model becomes accessible to SMEs that could not sustain it alone. EU-funded projects were not substitutes for the system — they were accelerators that brought international know-how into local practice.",
  },
  lessons: {
    school: [
      { title: "Advisory boards are your most underused governance tool", text: "Slovak machinery schools with company advisory boards update curricula faster and more accurately than those without. An advisory board costs nothing: 4 company representatives, two meetings a year, a structured feedback format. The output is worth far more than any consultant report." },
      { title: "Regional hubs make the dual model accessible to SMEs that can't do it alone", text: "A single SME with 15 employees cannot host and mentor an apprentice full-time. But five SMEs in the same area, coordinated by a regional hub, can. If dual education is not scaling in your territory, the bottleneck may be coordination infrastructure, not willingness." },
      { title: "Erasmus+ is not a project — it is a curriculum modernisation tool", text: "The Slovak-Czech eTwinning project produced new CNC and automation curricula now used in both systems. If you are planning an Erasmus+ project, design it from the start to produce a curriculum output — not just mobility experiences." },
    ],
    business: [
      { title: "Donate or loan equipment — you get it back in trained graduates", text: "Slovak machinery companies that provided CNC machines to school workshops created a cohort of graduates already familiar with their equipment. The cost: a decommissioned machine. The return: technicians productive from day one." },
      { title: "If you can't host alone, build a cluster", text: "Regional dual training centres show that coordination infrastructure enables SME participation at scale. If you are too small to host an apprentice independently, organise with neighbouring companies to share the cost and supervision." },
      { title: "Influence the curriculum through the advisory board before you need the graduate", text: "Companies that participate in school advisory boards shape what students learn 1–2 years before they graduate. By the time you post the job opening, the curriculum has already been updated to produce the profile you need." },
    ],
  },
  checklist: [
  {
    name: "Dual model mechanics",
    items: [
      "Students have formal apprenticeship contracts with partner companies — not only informal internship agreements",
      "60–80% of vocational training hours are spent in the company under the dual model",
      "The curriculum is co-designed by school and company at the start of each academic year",
    ],
  },
  {
    name: "Advisory boards",
    items: [
      "An advisory board with company representatives meets at least twice a year to review training content",
      "Advisory board input is formally documented and integrated into the curriculum review process",
      "The advisory board includes SMEs, not only large companies",
    ],
  },
  {
    name: "Equipment and facilities",
    items: [
      "Companies have donated or loaned equipment to school workshops in the last 3 years",
      "School workshops are equipped with machinery representative of current industry practice",
    ],
  },
  {
    name: "Regional coordination",
    items: [
      "A coordination mechanism exists that organises apprenticeship placements across multiple schools and companies",
      "SMEs too small to host independently can participate through the coordination mechanism",
    ],
  },
  {
    name: "International cooperation",
    items: [
      "The institution has participated in Erasmus+ projects that produced curriculum materials or teacher development outcomes",
      "International partnerships produced tangible outputs beyond mobility reports",
    ],
  },
  ],
  steps: {
    school: [
      {
        area: "Objective",
        question: "What would it take to shift from internships to genuine dual apprenticeship?",
        hint: "Name the barriers — legal, contractual, operational — and which ones the Academy could help address.",
        example: "e.g. need companies willing to sign apprenticeship contracts; curriculum needs redesigning for 60% company time",
        engage: "The Academy can walk you through the dual education framework and connect you with institutions that have made this transition.",
      },
      {
        area: "Advisory board",
        question: "Do you have a company advisory board? If not, which 3–5 companies should be in it?",
        hint: "Two meetings a year, structured agenda, documented outputs. This is the highest-leverage investment in curriculum relevance you can make.",
        example: "e.g. no formal board; two company representatives informally consulted; no documented outputs",
        engage: null,
      },
      {
        area: "Equipment",
        question: "What are the 3 most critical pieces of equipment your students never see — but will need to operate from day one?",
        hint: "Ask your recent graduates and their employers. This is also your negotiation starting point with partner companies.",
        example: "e.g. 5-axis CNC machining centres, collaborative robots, laser cutting — none in our workshops",
        engage: "The Academy can help you approach companies for equipment donations or loan agreements.",
      },
      {
        area: "Regional coordination",
        question: "Are there other VET institutions in your area training for the same sector?",
        hint: "If yes, you are competing for the same placements and donations. If you coordinated, you could create a regional hub more attractive to companies than any individual school.",
        example: "e.g. two other VET centres within 20km; no coordination; some competition for the same placements",
        engage: "The Academy can facilitate a first coordination meeting with peer institutions.",
      },
    ],
    business: [
      {
        area: "Objective",
        question: "Which specific skills will your production lines require in 3–5 years — and are local VET programmes producing them?",
        hint: "Answer both parts. The gap between what you will need and what the current curriculum produces is your co-design mandate.",
        example: "e.g. moving to collaborative robotics; no VET programme in the region covers cobot programming",
        engage: null,
      },
      {
        area: "Equipment",
        question: "Do you have machinery being replaced or decommissioned that a local VET school could use?",
        hint: "Before calling the scrap dealer, call the school. A machine outdated for your production may be perfect for training.",
        example: "e.g. replacing 3 older CNC lathes this year; not aware of any school that might want them",
        engage: "The Academy can identify VET institutions looking for this type of equipment.",
      },
      {
        area: "Cluster",
        question: "Which other SMEs in your sector face the same recruitment challenge?",
        hint: "Two companies that approach a VET centre together carry more weight than one. Three companies proposing to co-fund an advisory board position change the school's institutional calculus entirely.",
        example: "e.g. our main supplier and one competitor both struggle with the same CNC shortage; we have never discussed this together",
        engage: "The Academy can facilitate a first conversation between companies with the same skills gap.",
      },
    ],
  },
};
