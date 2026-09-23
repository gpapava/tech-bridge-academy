import type { BestPracticeData } from "./types";

export const epalLamia: BestPracticeData = {
  slug: "epal-lamia",
  title: "EPAL Lamia & Technomechaniki S.A. – How to design a structured internship that actually works",
  shortName: "EPAL Lamia & Technomechaniki S.A.",
  country: "Greece",
  subtitle: "Lamia (Central Greece) · Mechanical engineering, industrial maintenance · Vocational High School (EPAL) + SME",
  badges: ["Business", "School / VET centre", "Structured internship", "WBL design"],
  story: {
    who: "The 1st Vocational High School (EPAL) of Lamia is a public VET institution offering programmes in mechanical engineering and related fields. Technomechaniki S.A. is a local SME specialising in mechanical constructions and maintenance services for industrial equipment. In 2019 they initiated a collaborative apprenticeship programme with support from the Hellenic Ministry of Education and the local Chamber of Commerce.",
    challenge: "Both parties faced a version of the same problem: students were graduating with theoretical knowledge but limited practical experience, while Technomechaniki was spending months onboarding new recruits before they could work independently. Standard internship arrangements — students placed in a company without a defined learning plan — produced inconsistent outcomes and little mutual value. The question was whether a more structured approach could change this.",
    solutions: "A six-month structured apprenticeship was integrated into students' final year curriculum. Four design decisions made it work differently from a standard internship: joint development of training modules ensuring consistency between school content and company practice; assignment of dedicated company mentors for each apprentice; regular joint evaluation sessions between school instructors and company supervisors; and a completion certificate acknowledging practical training. The local Chamber of Commerce facilitated the initial connection and later helped expand the model to other local businesses.",
    striking: "Nearly 60% of participating students received job offers — either from Technomechaniki itself or from other companies in the Lamia industrial area. Employers cited the students' practical experience and familiarity with workplace protocols as the key reasons for recruitment. For a structured internship programme without external funding, this is a significant labour market outcome.",
    insight: "What made this programme distinctive was not the internship itself — many schools run internships — but the joint design of learning tasks, the shared evaluation framework, and the feedback loop between school and company that improved the curriculum over time. The multiplier effect was also notable: inspired by the results, other SMEs in the Lamia area began approaching the school for similar arrangements. One well-designed collaboration created the conditions for a local ecosystem.",
  },
  lessons: {
    school: [
      { title: "A structured internship is a design problem, not an administrative one", text: "The difference between a placement that produces a job offer and one that produces a certificate the student forgets about is entirely in the design: defined tasks, a dedicated mentor, joint evaluation, a feedback loop back to the curriculum. None of this requires external funding — it requires a conversation before the student arrives." },
      { title: "Joint evaluation is the mechanism that improves the curriculum", text: "EPAL Lamia improved its curriculum directly because of feedback from Technomechaniki supervisors: greater emphasis on diagnostic tools, safety protocols, and preventive maintenance. This only happened because there were structured debriefing sessions between teachers and company staff. Without those sessions, the feedback stays informal and nothing changes." },
      { title: "One well-designed collaboration is your best recruitment tool for the next", text: "After the EPAL-Technomechaniki programme produced visible results, other SMEs in the area began approaching the school. The Chamber of Commerce facilitated this expansion. The lesson: invest in making the first collaboration work exceptionally well, and the network effect does the rest." },
      { title: "Soft skills preparation is as important as technical preparation", text: "The programme revealed that students struggled not only with technical gaps but with punctuality, professional communication, and workplace hierarchy. A pre-internship orientation module on workplace culture — brief, practical, possibly delivered by an HR professional from a partner company — would have eased the transition significantly." },
    ],
    business: [
      { title: "Define what 'productive' looks like before the student arrives", text: "The companies that got the most from the EPAL-Lamia programme were those that defined specific tasks and learning objectives before the placement started. Not 'the student will learn maintenance' but 'by week 8, the student will be able to perform a Level 2 preventive maintenance check independently.' The specificity is what makes the experience trainable rather than just observable." },
      { title: "Your mentor is your most important investment — choose carefully", text: "The quality of the placement depended almost entirely on the company mentor: their technical competence, their patience, and their ability to explain what they do. This is not the most senior person — it is the person who is good at teaching. Identify them before the programme starts and recognise their contribution formally." },
      { title: "Shared assessment tools create shared standards", text: "EPAL and Technomechaniki had no common rubric for evaluating student progress — which created inconsistencies and made it hard to compare outcomes across apprentices. Co-developing a simple assessment form (a single page, five competency areas, three performance levels) before the first placement takes two hours and saves weeks of ambiguity." },
      { title: "A Chamber of Commerce is a free matchmaker", text: "The local Chamber facilitated the initial EPAL-Technomechaniki connection and later helped expand the model to other businesses. If you are an SME interested in structured placements but unsure where to start, your Chamber is the lowest-friction entry point — it already has relationships with both businesses and schools." },
    ],
  },
  checklist: [
  {
    name: "Before the placement starts — joint design",
    items: [
      "A learning plan exists for the placement — with defined tasks, competency objectives, and a timeline",
      "The learning plan was developed jointly by the school and the company — not just signed off by one side",
      "The company mentor has been identified and briefed on their pedagogical role before the student arrives",
      "A pre-placement orientation session on workplace culture and professional behaviour is included in the student's preparation",
    ],
  },
  {
    name: "During the placement — mentoring and monitoring",
    items: [
      "The mentor meets with the student at least weekly for a structured check-in (not just supervision)",
      "The school tutor makes at least one site visit during the placement to observe and collect feedback",
      "A shared progress tracking tool exists — used by both the school tutor and the company mentor",
      "There is a defined process for managing problems (student difficulties, scheduling conflicts, mismatch of expectations)",
    ],
  },
  {
    name: "At the end of the placement — evaluation and improvement",
    items: [
      "A joint evaluation session takes place between school instructors and company supervisors at the end of the placement",
      "Student performance is assessed using a shared rubric — not separate school and company forms",
      "The student receives a completion certificate that documents specific competencies acquired",
      "Company feedback is formally integrated into a curriculum review process — not just filed",
    ],
  },
  {
    name: "Multiplier effect",
    items: [
      "Results from the placement (employment rate, competency gains, employer satisfaction) are documented and shared",
      "At least one other company has been approached to replicate the model based on the results",
      "The local Chamber or a sector association is aware of the collaboration and could help expand it",
    ],
  },
  ],
  steps: {
    school: [
      {
        area: "Objective",
        question: "What do you want students to be able to do at the end of the placement that they cannot do today?",
        hint: "Start from the competency gap, not from the administrative requirement. The answer to this question is the core of your learning plan.",
        example: "e.g. perform Level 2 preventive maintenance independently; read and interpret technical drawings to 0.1mm tolerance; manage a worksite safety check",
        engage: null,
      },
      {
        area: "Company partner",
        question: "What makes a company a good host — and which companies in your territory meet that standard?",
        hint: "A good host has a mentor with time and patience, work that matches your curriculum, and a culture of showing rather than just telling. Size is less important than willingness.",
        example: "e.g. Technomechaniki: 20 employees, mechanical maintenance, owner personally interested; another SME: right sector but no dedicated mentor — not ready yet",
        engage: "The Academy can help you identify companies in your territory that are ready for a structured placement partnership.",
      },
      {
        area: "Learning plan",
        question: "Have you co-designed a learning plan with the company — or does the school write it and the company signs it?",
        hint: "The difference matters. A learning plan co-designed by the company includes tasks the company actually assigns, competencies the company actually values, and timelines the company can actually commit to.",
        example: "e.g. currently: school writes the plan based on the national curriculum; company signs; no joint session; this is what we want to change",
        engage: null,
      },
      {
        area: "Mentor",
        question: "Who is the mentor at each partner company — and what preparation do they receive?",
        hint: "Name them before the student arrives. Brief them on the learning plan. Give them a simple tool for tracking progress. This is two hours of investment that changes the quality of the entire placement.",
        example: "e.g. no formal mentor designated; supervisor assigned informally; no preparation; no progress tracking tool",
        engage: "The Academy can provide a mentor briefing template and a simple progress tracking form.",
      },
      {
        area: "Evaluation",
        question: "How do you assess whether the placement was successful — and for whom?",
        hint: "You need evidence on three dimensions: student competency gain, employer satisfaction, and curriculum relevance. If you only collect the first, you are missing the most actionable feedback.",
        example: "e.g. currently: end-of-placement form filled by student only; no employer satisfaction data; no curriculum review linked to placement feedback",
        engage: null,
      },
      {
        area: "Multiplier",
        question: "How do you tell the story of a successful placement to attract the next company?",
        hint: "A placement that produced a job offer and a curriculum change is a case study. Write it up in one page. Share it with the Chamber. Use it in your next open day.",
        example: "e.g. we have never documented outcomes formally; employers have given positive feedback verbally; nothing written",
        engage: "The Academy can help you produce a one-page case study from your best placement results to use in partner recruitment.",
      },
    ],
    business: [
      {
        area: "Objective",
        question: "What would a student need to be able to do by the end of their time with you to be worth hiring — or worth recommending to a colleague?",
        hint: "This is not about what the school teaches. It is about what productive looks like in your company. Start there and work backwards.",
        example: "e.g. set up and run a basic CNC programme without supervision; perform a safety inspection using our standard checklist; handle customer-facing communication in a technical context",
        engage: null,
      },
      {
        area: "Readiness",
        question: "Does your company have the conditions to host a student properly right now?",
        hint: "Honest self-assessment: do you have a mentor with time available? Work that matches the student's learning level? A culture that tolerates questions and mistakes? If not, what would need to change?",
        example: "e.g. we have the work and the technical skills; our problem is the mentor — our best technician has no patience for trainees; we need to identify a different person",
        engage: null,
      },
      {
        area: "Learning plan",
        question: "Are you willing to co-design the learning plan with the school — not just receive it?",
        hint: "Your input makes the plan realistic and operationally feasible. The school's input makes it pedagogically coherent. Neither is complete without the other.",
        example: "e.g. we have never been asked to co-design; we would be willing; we would need a one-hour meeting with the school coordinator",
        engage: "The Academy can facilitate a joint learning plan session between you and a partner school.",
      },
      {
        area: "Mentor",
        question: "Who in your company will be the mentor — and how will you recognise their contribution?",
        hint: "This person is doing skilled work. Name them, brief them, give them a simple tool, and acknowledge their effort formally — in their objectives, their review, or at minimum a public thank-you at the end of the placement.",
        example: "e.g. our quality manager is the natural choice; she has never done this formally; we have never recognised tutor work in any formal way",
        engage: null,
      },
      {
        area: "Assessment",
        question: "How will you know whether the placement worked?",
        hint: "Define two or three competency checkpoints before the student arrives. At each checkpoint, spend 15 minutes with the student and the school tutor. The conversation is the assessment — you don't need a form, but you need the conversation.",
        example: "e.g. currently: we fill in a one-page form at the end; no mid-placement check; no shared rubric with the school",
        engage: null,
      },
      {
        area: "Next step",
        question: "Would you host a second student — and would you tell another company to do the same?",
        hint: "If the answer to both is yes, you have a model. Document it: what worked, what you would change, what the student achieved. Share it with your Chamber. This is how a local ecosystem builds.",
        example: "e.g. yes to both; but we have never written anything down; the Chamber has asked us for a testimonial and we have not responded",
        engage: "The Academy can help you structure your experience as a short case study for peer-to-peer dissemination.",
      },
    ],
  },
};
