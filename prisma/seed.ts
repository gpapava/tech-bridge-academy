import { PrismaClient, UserRole, OrgType, SchoolType, CompanyType, ValidationStatus, VisibilityStatus, SurveyQuestionType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Tech Bridge Academy database...");

  // ── Admin user ──────────────────────────────────────────────────────────────
  const adminHash = await bcrypt.hash("Admin@TBA2024", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@techbridgeacademy.eu" },
    update: {},
    create: {
      email: "admin@techbridgeacademy.eu",
      name: "Platform Admin",
      password: adminHash,
      role: UserRole.ADMIN,
      gdprConsent: true,
    },
  });
  console.log("✅ Admin user:", admin.email);

  // ── School users & profiles ─────────────────────────────────────────────────
  const schoolData = [
    {
      email: "info@iis-volta.edu.it",
      name: "IISS Alessandro Volta",
      password: "School@123",
      role: UserRole.SCHOOL,
      profile: {
        orgType: OrgType.SCHOOL,
        schoolType: SchoolType.SCIENTIFIC_TECHNICAL_SIXTH_FORM,
        name: "IISS Alessandro Volta – Technical Institute",
        description: "A leading technical institute in Southern Italy with over 50 years of expertise in mechanical engineering, electronics, and automation education.",
        mission: "To train skilled technicians for the manufacturing sector by blending academic excellence with practical, hands-on learning experiences in partnership with local industry.",
        dialogueExperience: "We have 8 years of experience collaborating with local SMEs through internships, apprenticeships, and co-designed curriculum units in CNC machining and robotics.",
        opportunities: "We offer company internship placements for 3rd and 4th year students (40 hrs/year), access to our fully equipped CNC lab, joint research projects on Industry 4.0, and co-design of training modules aligned to ITS standards.",
        needs: "We are seeking manufacturing SMEs willing to offer work-based learning placements, define real-world challenges for project-based learning, and co-design competency frameworks in additive manufacturing and digital fabrication.",
        regions: ["Puglia", "Southern Italy"],
        city: "Bari",
        country: "Italy",
        latitude: 41.1171,
        longitude: 16.8719,
        sectors: ["Mechanical Engineering", "CNC Machining", "Automation", "Robotics", "Electronics"],
        tags: ["CNC", "robotics", "apprenticeship", "ITS", "Industry 4.0", "PCTO", "WBL"],
        contactEmail: "info@iis-volta.edu.it",
        telephone: "+39 080 1234567",
        website: "https://www.iis-volta.edu.it",
        visibilityStatus: VisibilityStatus.PUBLIC,
        validationStatus: ValidationStatus.APPROVED,
      },
    },
    {
      email: "info@cfp-bergamo.it",
      name: "CFP Bergamo",
      password: "School@123",
      role: UserRole.SCHOOL,
      profile: {
        orgType: OrgType.SCHOOL,
        schoolType: SchoolType.VET_CENTRE,
        name: "CFP Bergamo – Vocational Training Centre",
        description: "A renowned VET centre in Lombardy providing initial vocational training and continuing education for the mechanical and metalworking industries.",
        mission: "To equip young people and adults with the practical skills demanded by the mechanical sector through close cooperation with enterprises and industry associations.",
        dialogueExperience: "Long-standing partnerships with Confindustria Bergamo; 12 years of co-designed training courses with local manufacturing companies.",
        opportunities: "We offer certified vocational training courses, short skills bootcamps for company employees (upskilling), and testing of teaching materials developed with enterprises.",
        needs: "Seeking SMEs to host practical demonstrations, provide expert guest lecturers for our courses, and co-finance certification pathways for young apprentices.",
        regions: ["Lombardy", "Bergamo", "Northern Italy"],
        city: "Bergamo",
        country: "Italy",
        latitude: 45.6983,
        longitude: 9.6773,
        sectors: ["Metalworking", "Precision Mechanics", "Welding", "Toolmaking", "Quality Control"],
        tags: ["apprenticeship", "upskilling", "metalworking", "welding", "certification", "VET"],
        contactEmail: "info@cfp-bergamo.it",
        telephone: "+39 035 9876543",
        website: "https://www.cfp-bergamo.it",
        visibilityStatus: VisibilityStatus.PUBLIC,
        validationStatus: ValidationStatus.APPROVED,
      },
    },
    {
      email: "contact@its-meccatronica.edu.it",
      name: "ITS Meccatronica Sud",
      password: "School@123",
      role: UserRole.SCHOOL,
      profile: {
        orgType: OrgType.SCHOOL,
        schoolType: SchoolType.HIGHER_TECHNICAL_INSTITUTE,
        name: "ITS Meccatronica Sud",
        description: "Higher Technical Institute specialised in mechatronics, automation, and smart manufacturing for the post-diploma pathway.",
        mission: "To bridge the gap between academic training and industry needs by delivering two-year post-diploma programmes co-designed with leading manufacturing firms.",
        dialogueExperience: "Founded by a consortium of schools, companies, and research centres. All courses are co-designed with enterprise partners who also provide 30% classroom hours.",
        opportunities: "We offer 800-hour internships for students, dedicated company projects, access to our digital twin lab, and customised upskilling for enterprise employees.",
        needs: "Looking for SMEs to integrate into our curriculum governance board, provide mentors and company tutors, and propose real manufacturing challenges as final project themes.",
        regions: ["Campania", "Basilicata", "Southern Italy"],
        city: "Naples",
        country: "Italy",
        latitude: 40.8518,
        longitude: 14.2681,
        sectors: ["Mechatronics", "Automation", "Smart Manufacturing", "IoT", "Additive Manufacturing"],
        tags: ["mechatronics", "smart manufacturing", "ITS", "digital twin", "IoT", "internship"],
        contactEmail: "contact@its-meccatronica.edu.it",
        telephone: "+39 081 4567890",
        website: "https://www.its-meccatronica.edu.it",
        visibilityStatus: VisibilityStatus.PUBLIC,
        validationStatus: ValidationStatus.APPROVED,
      },
    },
  ];

  for (const s of schoolData) {
    const hash = await bcrypt.hash(s.password, 12);
    const user = await prisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        email: s.email,
        name: s.name,
        password: hash,
        role: s.role,
        gdprConsent: true,
      },
    });
    await prisma.organisationProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id, ...s.profile },
    });
    console.log("✅ School:", s.name);
  }

  // ── Company users & profiles ────────────────────────────────────────────────
  const companyData = [
    {
      email: "hr@precisionfab.it",
      name: "Precision Fab Srl",
      password: "Company@123",
      role: UserRole.COMPANY,
      profile: {
        orgType: OrgType.COMPANY,
        companyType: CompanyType.MANUFACTURING_SME,
        name: "Precision Fab Srl – CNC Precision Components",
        description: "A 45-person SME specialising in CNC machining of precision components for the aerospace, automotive, and medical device sectors. ISO 9001:2015 certified.",
        mission: "To produce zero-defect precision parts while nurturing the next generation of skilled CNC operators and mechanical engineers through close collaboration with VET schools.",
        dialogueExperience: "We have hosted 12 students in work-based learning over the past 3 years and co-developed a practical CNC module with a local technical institute.",
        opportunities: "We offer 3-month WBL placements for VET students (CNC, quality control, metrology), mentoring by senior technicians, real production challenges for project-based learning, and potential apprenticeship contracts for outstanding students.",
        needs: "We need VET schools and ITS providing students trained in 5-axis CNC programming, CAD/CAM software (Mastercam, SolidWorks), and quality inspection. We also seek co-design of a micro-module on aerospace tolerances.",
        regions: ["Puglia", "Bari", "Southern Italy"],
        city: "Bari",
        country: "Italy",
        latitude: 41.1171,
        longitude: 16.8719,
        sectors: ["CNC Machining", "Aerospace Components", "Automotive", "Medical Devices", "Metrology"],
        tags: ["CNC", "CAD/CAM", "aerospace", "apprenticeship", "WBL", "metrology", "quality control"],
        contactEmail: "hr@precisionfab.it",
        telephone: "+39 080 2345678",
        website: "https://www.precisionfab.it",
        visibilityStatus: VisibilityStatus.PUBLIC,
        validationStatus: ValidationStatus.APPROVED,
      },
    },
    {
      email: "info@meccanica-rossi.com",
      name: "Meccanica Rossi & Figli",
      password: "Company@123",
      role: UserRole.COMPANY,
      profile: {
        orgType: OrgType.COMPANY,
        companyType: CompanyType.MICRO_ENTERPRISE,
        name: "Meccanica Rossi & Figli – Artisan Workshop",
        description: "A family-run artisan mechanical workshop with 8 employees, producing custom metal parts and small-batch tooling for local manufacturing firms.",
        mission: "To preserve traditional craftsmanship while adopting digital tools and welcoming apprentices who can learn the trade through practice alongside master craftsmen.",
        dialogueExperience: "Regularly hosts 1-2 apprentices per year through agreements with local vocational schools. Participated in a regional pilot for master craftsman mentoring.",
        opportunities: "Offering long-term apprenticeship contracts (3 years), side-by-side training with an experienced master craftsman, real project work from day one, and flexible WBL scheduling.",
        needs: "Seeking VET centres offering certified welding and manual machining programmes. Interested in connecting with schools for dual-system apprenticeships under national VET regulations.",
        regions: ["Lombardy", "Brescia"],
        city: "Brescia",
        country: "Italy",
        latitude: 45.5416,
        longitude: 10.2118,
        sectors: ["Toolmaking", "Welding", "Mechanical Repair", "Custom Manufacturing"],
        tags: ["apprenticeship", "master craftsman", "welding", "dual system", "artisan"],
        contactEmail: "info@meccanica-rossi.com",
        telephone: "+39 030 3456789",
        website: "",
        visibilityStatus: VisibilityStatus.PUBLIC,
        validationStatus: ValidationStatus.APPROVED,
      },
    },
    {
      email: "training@industrialflex.eu",
      name: "IndustrialFlex Group",
      password: "Company@123",
      role: UserRole.COMPANY,
      profile: {
        orgType: OrgType.COMPANY,
        companyType: CompanyType.LARGE_ENTERPRISE,
        name: "IndustrialFlex Group – Smart Factory Solutions",
        description: "A 300-person enterprise offering smart factory integration, industrial automation, and digital transformation services across European markets.",
        mission: "To accelerate Industry 4.0 adoption in the manufacturing sector while developing a pipeline of digitally skilled technicians in partnership with VET and ITS providers.",
        dialogueExperience: "Corporate Social Responsibility programme with 5 technical schools; annual Hackathon for VET students; funded 2 scholarships for ITS mechatronics students.",
        opportunities: "We offer structured 6-month internships with defined learning outcomes, access to our Innovation Lab, co-sponsorship of school equipment, job placement for top graduates, and in-company WBL modules on PLC programming and HMI design.",
        needs: "We need schools producing graduates with skills in SCADA systems, PLC (Siemens/Allen-Bradley), industrial networking, and digital quality inspection. Seeking co-design partners for a post-diploma programme in Smart Factory Operations.",
        regions: ["Lombardy", "Emilia-Romagna", "Veneto", "Northern Italy"],
        city: "Milan",
        country: "Italy",
        latitude: 45.4642,
        longitude: 9.1900,
        sectors: ["Smart Manufacturing", "Industrial Automation", "PLC/SCADA", "Digital Transformation", "IoT"],
        tags: ["Industry 4.0", "PLC", "SCADA", "internship", "innovation", "digital skills", "automation"],
        contactEmail: "training@industrialflex.eu",
        telephone: "+39 02 6789012",
        website: "https://www.industrialflex.eu",
        visibilityStatus: VisibilityStatus.PUBLIC,
        validationStatus: ValidationStatus.APPROVED,
      },
    },
    {
      email: "hr@additive-solutions.it",
      name: "Additive Solutions Italia",
      password: "Company@123",
      role: UserRole.COMPANY,
      profile: {
        orgType: OrgType.COMPANY,
        companyType: CompanyType.MANUFACTURING_SME,
        name: "Additive Solutions Italia – 3D Printing & AM",
        description: "A 30-person SME at the frontier of metal additive manufacturing, offering design-for-AM services, prototype production, and small-series manufacturing.",
        mission: "To pioneer additive manufacturing adoption in Italian industry while building skills in the next generation through school-enterprise collaboration.",
        dialogueExperience: "Delivered 4 guest lectures at ITS programmes; co-authored a practical module on Design for Additive Manufacturing with an engineering faculty.",
        opportunities: "Offering project placements for students interested in AM technology, co-authorship of teaching materials, company visits, and seed funding for school 3D printer labs.",
        needs: "Seeking schools with interest in additive manufacturing curricula, students proficient in CAD modelling (SolidWorks, Fusion 360), and partners to co-design a short certification course in Metal AM post-processing.",
        regions: ["Emilia-Romagna", "Modena", "Northern Italy"],
        city: "Modena",
        country: "Italy",
        latitude: 44.6471,
        longitude: 10.9252,
        sectors: ["Additive Manufacturing", "3D Printing", "Prototyping", "Design Engineering"],
        tags: ["additive manufacturing", "3D printing", "CAD", "SolidWorks", "Fusion 360", "prototyping"],
        contactEmail: "hr@additive-solutions.it",
        telephone: "+39 059 7890123",
        website: "https://www.additive-solutions.it",
        visibilityStatus: VisibilityStatus.PUBLIC,
        validationStatus: ValidationStatus.APPROVED,
      },
    },
  ];

  for (const c of companyData) {
    const hash = await bcrypt.hash(c.password, 12);
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        email: c.email,
        name: c.name,
        password: hash,
        role: c.role,
        gdprConsent: true,
      },
    });
    await prisma.organisationProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id, ...c.profile },
    });
    console.log("✅ Company:", c.name);
  }

  // ── News posts ──────────────────────────────────────────────────────────────
  await prisma.newsPost.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Tech Bridge Academy Platform Launched Under Erasmus+ KA220-VET",
        excerpt: "The TECH BRIDGE VET consortium is proud to announce the launch of the Tech Bridge Academy platform, connecting VET schools and SMEs across Europe.",
        content: `<p>We are delighted to announce the official launch of the <strong>Tech Bridge Academy</strong> digital platform as part of the Erasmus+ KA220-VET project "TECH BRIDGE VET".</p>
        <p>This platform represents a groundbreaking digital hub designed to reduce skills mismatch in the mechanical engineering and manufacturing sector by connecting VET schools, technical colleges, and SMEs across Europe.</p>
        <h2>What the platform offers</h2>
        <ul>
          <li>Structured organisation profiles for schools and companies</li>
          <li>AI-powered matching between school capabilities and company needs</li>
          <li>Repository of co-operation good practices</li>
          <li>Skills needs survey and reporting system</li>
          <li>Events calendar and networking tools</li>
        </ul>
        <p>We invite all partner organisations to register and create their profile today.</p>`,
        tags: ["launch", "Erasmus+", "platform", "VET"],
        isPublished: true,
        publishedAt: new Date("2024-09-01"),
      },
      {
        title: "Call for Participation: Skills Needs Survey for Manufacturing SMEs",
        excerpt: "We are launching the first edition of our Skills Needs Survey, targeting manufacturing SMEs across the consortium regions.",
        content: `<p>The Tech Bridge Academy team invites all registered manufacturing companies and SMEs to participate in our first edition <strong>Skills Needs Survey</strong>.</p>
        <p>The survey takes approximately 15 minutes and covers:</p>
        <ul>
          <li>Current and emerging skill gaps in your workforce</li>
          <li>Technical competencies most urgently needed</li>
          <li>Soft skills priorities</li>
          <li>Openness to hosting apprentices and interns</li>
        </ul>
        <p>Results will be aggregated and shared with VET schools to inform curriculum updates. Individual company responses are kept confidential.</p>`,
        tags: ["survey", "skills", "SME", "manufacturing"],
        isPublished: true,
        publishedAt: new Date("2024-10-15"),
      },
      {
        title: "New Repository Entry: CNC Dual Apprenticeship Model from Bavaria",
        excerpt: "A new good practice has been added to the Repository: a successful dual apprenticeship model for CNC operators from a Bavarian VET centre.",
        content: `<p>We have published a new entry in the Repository of Skill Match Initiatives, describing the <strong>Bavarian Dual Apprenticeship Model for CNC Operators</strong>.</p>
        <p>This case study documents a three-year collaboration between three technical schools and five manufacturing SMEs in Bavaria, Germany, resulting in a structured dual apprenticeship programme that has placed 87 graduates in full employment.</p>
        <p>Key features of the model include shared curriculum governance, alternating school/company weeks, and a joint certification process recognised by both the education system and the industry association.</p>`,
        tags: ["repository", "CNC", "apprenticeship", "Germany", "good practice"],
        isPublished: true,
        publishedAt: new Date("2024-11-10"),
      },
    ],
  });
  console.log("✅ News posts seeded");

  // ── Events ──────────────────────────────────────────────────────────────────
  await prisma.event.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Tech Bridge Academy – Launch Webinar",
        description: "Join the official launch webinar of the Tech Bridge Academy platform. We will present all platform features and demonstrate how schools and companies can benefit from registration.",
        eventType: "Webinar",
        startDate: new Date("2025-01-20T10:00:00Z"),
        endDate: new Date("2025-01-20T12:00:00Z"),
        isVirtual: true,
        meetingUrl: "https://zoom.us/j/123456789",
        isPublished: true,
      },
      {
        title: "School–Enterprise Dialogue Day: Mechanical Engineering",
        description: "A face-to-face networking event bringing together VET schools and manufacturing SMEs to explore collaboration opportunities, co-design possibilities, and apprenticeship agreements.",
        eventType: "Networking",
        startDate: new Date("2025-03-15T09:00:00Z"),
        endDate: new Date("2025-03-15T17:00:00Z"),
        location: "Chamber of Commerce, Bari, Italy",
        isVirtual: false,
        isPublished: true,
      },
      {
        title: "Workshop: Co-designing Curriculum for Industry 4.0",
        description: "A practical workshop for teachers and HR managers to learn and practise curriculum co-design methodology, with real examples from the mechanical engineering sector.",
        eventType: "Workshop",
        startDate: new Date("2025-04-22T09:30:00Z"),
        endDate: new Date("2025-04-22T16:00:00Z"),
        isVirtual: true,
        isPublished: true,
      },
      {
        title: "Erasmus+ TECH BRIDGE VET – Transnational Partner Meeting",
        description: "The third transnational project meeting for consortium partners to review progress on WP3 deliverables, validate platform content, and plan dissemination activities.",
        eventType: "Partner Meeting",
        startDate: new Date("2025-05-08T09:00:00Z"),
        endDate: new Date("2025-05-09T17:00:00Z"),
        location: "Thessaloniki, Greece",
        isVirtual: false,
        isPublished: true,
      },
    ],
  });
  console.log("✅ Events seeded");

  // ── Repository initiatives ──────────────────────────────────────────────────
  await prisma.repositoryInitiative.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "Dual Apprenticeship Excellence: CNC Operators in Bavaria",
        actors: "3 VET schools, 5 manufacturing SMEs, Bavarian Chamber of Skilled Crafts, Local Industry Association",
        description: "A structured three-year dual apprenticeship programme for CNC operators co-designed by VET schools and manufacturing companies in Bavaria. The programme alternates one week in school with one week in the company, with a shared curriculum governance board ensuring alignment between theoretical content and workplace practice.",
        results: "87 graduates over 3 cohorts; 94% employment rate within 6 months; average salary 18% above regional median; 4 partner SMEs reported productivity gains from hiring graduates.",
        challenges: "Initial resistance from school teachers to share curriculum ownership; need for a common digital platform to coordinate school/company schedules; legal complexity of dual-system contracts.",
        lessons: "A structured governance board with equal school and company representation is essential. Start co-design with one module and expand gradually. Invest in orientation for company tutors.",
        externalLinks: ["https://www.bibb.de", "https://www.bmbf.de"],
        tags: ["dual apprenticeship", "CNC", "Bavaria", "curriculum co-design", "manufacturing", "VET"],
        country: "Germany",
        region: "Bavaria",
        sector: "Mechanical Engineering / CNC Machining",
        publishStatus: ValidationStatus.APPROVED,
        viewCount: 145,
      },
      {
        title: "SME–School Innovation Hub: 3-Year Partnership Model",
        actors: "ITS Meccatronica (Italy), Precision Parts SpA, Regional Innovation Agency",
        description: "A three-year partnership establishing a physical and digital innovation hub shared between an ITS institute and a precision manufacturing company. Students work on real production challenges, while company engineers deliver guest lectures and serve as mentors.",
        results: "32 student projects completed; 8 patent-worthy innovations identified; 15 students hired by the company or its suppliers; curriculum updated in 3 modules based on company feedback.",
        challenges: "NDA agreements for student projects; IP ownership of student innovations; coordinating company engineers' time with school schedules.",
        lessons: "A clear IP agreement signed before the partnership begins removes major friction. Budget for a dedicated coordinator role shared 50/50 between school and company.",
        tags: ["innovation hub", "ITS", "precision manufacturing", "Italy", "curriculum", "partnership"],
        country: "Italy",
        region: "Lombardy",
        sector: "Precision Mechanics / Smart Manufacturing",
        publishStatus: ValidationStatus.APPROVED,
        viewCount: 98,
      },
      {
        title: "Skills Foresight Observatory: Mechanical Sector Trends in Greece",
        actors: "VET schools consortium (Thessaloniki), Hellenic Federation of Enterprises, Regional Employment Office",
        description: "A bi-annual survey and analysis system tracking emerging skill needs in the Greek mechanical engineering sector. Results are published as open reports and directly feed into VET curriculum revisions at participating schools.",
        results: "4 reports published; 12 curriculum modules updated; 3 new specialisation pathways created; identified top 5 critical skill gaps per year.",
        challenges: "Low initial response rate from SMEs; data harmonisation across different school reporting systems; resistance from teachers to curriculum changes.",
        lessons: "Incentivise SME participation with personalised skills gap reports. Co-present findings with industry association representatives to increase credibility with schools.",
        tags: ["skills observatory", "foresight", "Greece", "survey", "curriculum", "VET"],
        country: "Greece",
        region: "Central Macedonia",
        sector: "Mechanical Engineering / Manufacturing",
        publishStatus: ValidationStatus.APPROVED,
        viewCount: 73,
      },
    ],
  });
  console.log("✅ Repository initiatives seeded");

  // ── Skills needs survey ─────────────────────────────────────────────────────
  const survey = await prisma.survey.create({
    data: {
      title: "2025 Skills Needs Profile – Manufacturing SMEs",
      description: "Help us understand the current and emerging skill needs in your company. Results will be shared in aggregated form with VET schools to inform curriculum updates. Takes approx. 15 minutes.",
      targetRole: UserRole.COMPANY,
      isActive: true,
      startsAt: new Date("2025-01-01"),
      endsAt: new Date("2025-06-30"),
      questions: {
        create: [
          { text: "What is the approximate size of your company (number of employees)?", questionType: SurveyQuestionType.SINGLE_CHOICE, options: ["1-9 (micro)", "10-49 (small)", "50-249 (medium)", "250+ (large)"], required: true, order: 1 },
          { text: "Which technical skills are most critically needed in your current workforce?", questionType: SurveyQuestionType.MULTI_CHOICE, options: ["CNC machining / programming", "CAD/CAM software", "PLC / industrial automation", "Welding / joining", "Quality control / metrology", "Additive manufacturing", "Robotics", "IoT / industrial networking", "CAD (SolidWorks, CATIA)", "Material science"], required: true, order: 2 },
          { text: "Which soft skills are most important when hiring young technicians?", questionType: SurveyQuestionType.MULTI_CHOICE, options: ["Problem-solving", "Teamwork / collaboration", "Digital literacy", "Adaptability / learning agility", "Communication", "Precision and attention to detail", "Safety awareness", "Initiative / proactivity"], required: true, order: 3 },
          { text: "How urgently does your company need to fill current skill gaps?", questionType: SurveyQuestionType.SINGLE_CHOICE, options: ["Urgently (within 6 months)", "Medium-term (within 1-2 years)", "Long-term (planning ahead, 3+ years)", "Not currently a priority"], required: true, order: 4 },
          { text: "Is your company open to hosting VET students for work-based learning placements?", questionType: SurveyQuestionType.SINGLE_CHOICE, options: ["Yes, already doing this", "Yes, interested but no experience yet", "Possibly, need more information", "No"], required: true, order: 5 },
          { text: "Which Industry 4.0 technologies does your company use or plan to adopt in the next 3 years?", questionType: SurveyQuestionType.MULTI_CHOICE, options: ["Collaborative robots (cobots)", "Digital twin / simulation", "AI / machine learning in production", "IoT sensors / smart monitoring", "Additive manufacturing (3D printing)", "Augmented Reality for maintenance", "Advanced metrology systems", "ERP / MES integration", "None currently planned"], required: false, order: 6 },
          { text: "What type of collaboration with VET schools would be most valuable for your company?", questionType: SurveyQuestionType.MULTI_CHOICE, options: ["Apprenticeship contracts", "Short-term work placements (1-3 months)", "Co-design of training courses", "Guest lectures / company visits", "Project-based learning challenges", "Thesis / final project mentoring", "Joint certification pathways"], required: true, order: 7 },
          { text: "Please describe any specific skill or competency gap your company is experiencing that is not covered by the options above.", questionType: SurveyQuestionType.TEXTAREA, options: [], required: false, order: 8 },
        ],
      },
    },
  });
  console.log("✅ Survey seeded:", survey.title);

  // ── Career content ──────────────────────────────────────────────────────────
  await prisma.careerContent.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "A Day in the Life of a CNC Machinist",
        description: "Follow Marco through his workday at a precision manufacturing company — from reading engineering drawings in the morning to quality-checking finished parts in the afternoon.",
        category: "Day in the Life",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        targetAudience: ["Students", "Families"],
        tags: ["CNC", "machinist", "day in the life", "manufacturing"],
        isPublished: true,
      },
      {
        title: "Mechanical Engineering Careers: What Does the Industry Offer?",
        description: "An overview of career paths in the mechanical engineering sector — from technician roles to engineering positions — with salary ranges and growth prospects.",
        category: "Discovering Mechanical Engineering Careers",
        targetAudience: ["Students", "Families", "Career Guidance Counsellors"],
        tags: ["careers", "engineering", "opportunities", "salary"],
        isPublished: true,
      },
      {
        title: "Interview: Young Apprentice meets Master Craftsman at Meccanica Rossi",
        description: "A candid conversation between 19-year-old apprentice Sofia and 65-year-old master craftsman Giovanni on what it means to learn a trade the traditional way — with modern tools.",
        category: "Master Craftsman + Young Apprentice",
        videoUrl: "https://www.youtube.com/watch?v=example2",
        targetAudience: ["Students"],
        tags: ["apprenticeship", "craftsman", "interview", "tradition", "skills"],
        isPublished: true,
      },
    ],
  });
  console.log("✅ Career content seeded");

  // ── Educational resources ────────────────────────────────────────────────────
  await prisma.educationalResource.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "WBL Planning Template for Companies",
        description: "A ready-to-use template to help companies plan work-based learning placements, define learning outcomes, assign tutors, and structure weekly activities.",
        category: "Work-Based Learning",
        resourceType: "Template",
        tags: ["WBL", "template", "planning", "company tutor"],
        effort: "1-2 hours to complete",
        targetRole: UserRole.COMPANY,
        isPublished: true,
      },
      {
        title: "Co-Design Facilitation Guide for Teachers",
        description: "Step-by-step guidance for teachers on how to facilitate a curriculum co-design session with company representatives, including ice-breaker activities, mapping tools, and consensus-building techniques.",
        category: "Co-Design",
        resourceType: "Guide",
        tags: ["co-design", "curriculum", "teacher", "facilitation"],
        effort: "3-4 hours",
        targetRole: UserRole.SCHOOL,
        isPublished: true,
      },
      {
        title: "Challenge-Based Learning: A Complete Toolkit",
        description: "Everything needed to run a challenge-based learning project between a school class and a partner company — from challenge definition to final presentation and assessment rubric.",
        category: "Challenge-Based Learning",
        resourceType: "Toolkit",
        tags: ["challenge-based learning", "project", "toolkit", "assessment"],
        effort: "Full semester project (12-14 weeks)",
        isPublished: true,
      },
    ],
  });
  console.log("✅ Educational resources seeded");

  console.log("\n🎉 Database seeding complete!");
  console.log("\n📋 Login credentials:");
  console.log("   Admin:   admin@techbridgeacademy.eu / Admin@TBA2024");
  console.log("   School:  info@iis-volta.edu.it / School@123");
  console.log("   Company: hr@precisionfab.it / Company@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
