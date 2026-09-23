import type { BestPracticeData } from "./types";

export const tkgune: BestPracticeData = {
  slug: "tkgune",
  title: "TKGUNE – Applied innovation projects between VET centres and SMEs (Basque Country)",
  shortName: "TKGUNE",
  country: "Spain",
  subtitle: "Basque Country · Cross-sector: advanced manufacturing, robotics, energy, digitalization · VET innovation network",
  badges: ["Business", "School / VET centre", "Innovation network", "Applied R&D"],
  story: {
    who: "TKGUNE is a collaborative network coordinated by TKNIKA — the Centre for Applied Research and Innovation in Vocational Training of the Basque Country. It connects over 45 VET centres with hundreds of SMEs across advanced manufacturing, robotics, energy efficiency, digitalization, and biotechnology. Projects follow four phases: identification, definition, development, and transfer. The Basque Government provides strategic support.",
    challenge: "SMEs in the Basque Country often lack the internal capacity to invest in applied innovation: no dedicated R&D staff, no advanced equipment, no time to prototype. At the same time, VET centres and teachers risk becoming technologically outdated if disconnected from industry. TKGUNE was designed to solve both problems simultaneously.",
    solutions: "TKGUNE structures school-business collaboration around projects, not placements. Each project starts from a real business challenge. A VET centre works alongside company staff to develop a solution — a process improvement, a prototype, a digitalization plan. Results are transferred both internally (into the VET centre's curriculum) and externally (to the company as an implemented outcome). Each project is tailored to the specific SME and the expertise of the centre.",
    striking: "More than 45 VET centres are active in the network. Teachers who participate report that their professional knowledge is updated directly through project work, which they then integrate into their teaching. Students work on real industrial problems — not simulations.",
    insight: "TKGUNE inverts the typical school-business dynamic: instead of companies being asked to 'host' students, VET centres are positioned as innovation partners that bring expertise and facilities to companies. This repositions VET teachers as technical consultants and SMEs as active co-investigators. The model only works because TKNIKA provides the coordination infrastructure neither party could sustain alone.",
  },
  lessons: {
    school: [
      { title: "Projects are more sustainable than placements as a collaboration model", text: "A TKGUNE-style project creates a defined challenge, assigns resources from both sides, and produces a measurable outcome. Companies engage more actively in projects because they have skin in the game — the output has real operational value for them." },
      { title: "Teacher professional development happens through the work, not in spite of it", text: "In TKGUNE, teachers work on live industrial challenges and integrate what they learn directly into their curriculum. The professional development is embedded in the project, not added on top." },
      { title: "Structure the four phases explicitly — or the project will drift", text: "Without the transfer phase (internal to the school AND external to the company), the value is captured by one side only. Systematising this is what makes it a model, not a one-off." },
    ],
    business: [
      { title: "VET centres have technical expertise you may not have access to", text: "Before assuming that a VET centre is only useful for producing trainees, check whether it has facilities or expertise relevant to your innovation challenges." },
      { title: "A defined project is worth more than an open internship", text: "A student working on a defined innovation project under teacher supervision produces a deliverable. The difference is design: define the challenge before the student arrives." },
      { title: "TKNIKA-style coordination removes your administrative burden", text: "TKNIKA handles matching, agreements, and progress monitoring. If you are put off by administrative complexity, the Academy can play a similar coordination role." },
    ],
  },
  checklist: [
  {
    name: "Project-based collaboration",
    items: [
      "The institution has run at least one project with a company that produced a concrete deliverable",
      "Projects are structured with defined phases: problem definition, development, internal transfer, external transfer",
      "Teacher involvement in projects is recognised and supported by the institution",
    ],
  },
  {
    name: "SME engagement",
    items: [
      "The institution has identified which local SMEs face innovation challenges that its teachers' expertise could address",
      "A mechanism exists to match company challenges with VET centre capabilities",
      "SME projects are used as source material for classroom teaching",
    ],
  },
  {
    name: "Teacher professional development",
    items: [
      "Teachers regularly update professional knowledge through industry contact — not only through formal courses",
      "Industry-facing activities are tracked and valued as part of teacher development",
    ],
  },
  {
    name: "Knowledge transfer",
    items: [
      "Project outcomes are systematically integrated into updated teaching materials",
      "Project results are shared across a network — not kept within one centre",
    ],
  },
  ],
  steps: {
    school: [
      {
        area: "Objective",
        question: "What innovation challenge could a local SME bring that your teachers are actually equipped to work on?",
        hint: "Map your faculty's technical expertise first — then match it to company challenges.",
        example: "e.g. our automation teacher has robotics expertise; local SMEs are trying to automate assembly lines but lack internal know-how",
        engage: null,
      },
      {
        area: "First project",
        question: "What would a minimum viable TKGUNE-style project look like for your institution?",
        hint: "One company, one teacher, one defined challenge, one semester.",
        example: "e.g. a feasibility study for automating a packaging step at a local producer; deliverable: technical report and prototype spec",
        engage: "The Academy can help you identify the right company for your first project and structure the collaboration agreement.",
      },
      {
        area: "Transfer phase",
        question: "Do you have a process for taking what you learn in the project back into your curriculum?",
        hint: "If not, the professional development value stays with the teacher and never reaches students.",
        example: "e.g. no formal process; teacher informally updates notes; no curriculum update mechanism linked to project outputs",
        engage: null,
      },
      {
        area: "Coordination",
        question: "Who in your territory could play the TKNIKA role — coordinating between multiple VET centres and companies?",
        hint: "Is there an equivalent body (sector association, regional agency, the Academy itself) that could facilitate matching?",
        example: "e.g. the local industrial association might be interested; the Academy could play this role initially",
        engage: "The Academy is exploring whether it can play a TKNIKA-equivalent role in your territory.",
      },
    ],
    business: [
      {
        area: "Objective",
        question: "What is the innovation challenge in your company that you don't have internal resources to address?",
        hint: "Not a training need. A real operational challenge: an inefficient process, a product to redesign, a technology to evaluate.",
        example: "e.g. want to reduce waste in our CNC cutting process but don't have an engineer to run the analysis",
        engage: null,
      },
      {
        area: "VET centre capability",
        question: "Which VET centre in your territory has teachers with relevant expertise for your challenge?",
        hint: "Research their faculty before approaching with a vague offer. What machines do they have? What are teachers' specialisations?",
        example: "e.g. the local VET centre has a robotics lab and an industrial automation teacher — exactly what we need",
        engage: "The Academy can help you identify VET centres with relevant technical capabilities.",
      },
      {
        area: "Project definition",
        question: "Can you define your challenge as a project with a clear deliverable, timeline, and defined responsibilities on both sides?",
        hint: "An open-ended collaboration rarely produces results. A defined project creates accountability and measurable value.",
        example: "e.g. challenge: reduce energy in our annealing furnace by 15%; deliverable: energy audit + 3 interventions; timeline: one semester",
        engage: null,
      },
      {
        area: "Reciprocity",
        question: "What would the VET centre gain from this project — beyond student learning?",
        hint: "TKGUNE works because it is explicitly bilateral. Teacher development, curriculum update, equipment access — these are all things a VET centre values.",
        example: "e.g. we can offer access to our production data, facility visits for students, and a guest lecture at project end",
        engage: null,
      },
    ],
  },
};
