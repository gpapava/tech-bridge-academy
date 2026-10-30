export interface EduWidget {
  slug: string;
  title: string;
  description: string;
  file: string;
  resourceType: string;
  effort: string;
}

export const eduWidgets: EduWidget[] = [
  {
    slug: "collaboration-scale",
    title: "How schools and businesses collaborate — a practical guide",
    description:
      "An overview of 10 forms of school-business collaboration — from low-commitment first contacts to full territorial training ecosystems — with purposes, required resources, and links to in-depth tools for each mode.",
    file: "collab_scale_modes_en.html",
    resourceType: "Toolkit",
    effort: "15 min to explore · deeper on demand",
  },
  {
    slug: "project-work",
    title: "Project Work",
    description: "A deep-dive guide to project work as a form of school-business collaboration, with worked examples.",
    file: "project_work_en.html",
    resourceType: "Guide",
    effort: "On demand",
  },
  {
    slug: "challenge",
    title: "Challenge",
    description: "A deep-dive guide to challenge-based collaboration between schools and businesses.",
    file: "challenge_en.html",
    resourceType: "Guide",
    effort: "On demand",
  },
  {
    slug: "internship",
    title: "Curricular Internship",
    description: "A deep-dive guide to curricular internships as a form of school-business collaboration.",
    file: "internship_en.html",
    resourceType: "Guide",
    effort: "On demand",
  },
];

export const getEduWidget = (slug: string) => eduWidgets.find((w) => w.slug === slug);
