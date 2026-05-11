# Tech Bridge Academy — Platform Guide

## What is it?

A matchmaking platform connecting **VET schools** (vocational/technical education) with **manufacturing companies (SMEs)** to reduce skills gaps. Think of it as LinkedIn meets a project collaboration hub, built for the Erasmus+ programme.

---

## User Roles

| Role | Who | What they can do |
|------|-----|-----------------|
| **Public visitor** | Anyone | Browse home, news, events, about, partners |
| **School** | VET institutions | Full platform access + Schools area |
| **Company** | Manufacturing SMEs | Full platform access + SMEs area |
| **Admin** | Platform team | Everything + admin panel |

---

## Main Sections

### The Bridge (core feature)
The shared area for both schools and companies.

- **Organisation Directory** — Browse all registered schools and companies. Filter by sector, region, type. Click any profile to see full details.
- **Repository** — A library of good practices (partnership models, curriculum innovations). Anyone can submit; admins approve.
- **Career Guidance** — Content for students: career paths, salary info, job market data.
- **Educational Collaboration** — Resources for school-company joint projects.
- **Co-Design** — Request a custom training programme co-designed with a partner.

### SMEs Area (Company users only)
- **Networking** — Company directory + upcoming events
- **Skills Needs Survey** — Tell the platform what skills your company is missing
- **HR Coaching** — Training modules on hiring apprentices, designing internships

### Schools Area (School users only)
- **Networking** — School directory + upcoming events
- **Staff Development** — Resources for teacher training
- **Observatory** — Curriculum trends and international benchmarks (e.g. German dual system, Swiss VET)

### Admin Panel (Admin only)
- **Users** — Change roles, view all accounts
- **Profiles & Validation** — Approve or reject organisation profiles
- **Match Review** — See algorithm-generated match suggestions, approve them, send reports
- **Surveys** — Activate/deactivate surveys
- **Repository** — Publish or unpublish submitted initiatives
- **Analytics** — Platform-wide stats
- **Notifications** — Broadcast messages to all users or by role
- **Content & News** — Publish/unpublish news articles

---

## Key Workflows

### As a new School or Company user:
1. Register at `/auth/register` → choose your role
2. Go to **Dashboard** → click "Create Organisation Profile"
3. Fill in your profile (sectors, regions, needs, opportunities)
4. Wait for admin validation
5. Once approved → you appear in the directory and the matching engine can find you partners

### As an Admin:
1. Log in → go to `/admin`
2. **Validate profiles** — Profiles → click Approve/Reject
3. **Run matching** — Admin dashboard → "Run Matching Engine" button → algorithm scores all profile pairs
4. **Review matches** — Matches → approve good ones, reject bad ones, send match reports to organisations
5. **Manage content** — Add news, events, repository items

### Matching Engine:
- Runs automatically when a new profile is approved, or manually from the admin dashboard
- Scores pairs 0–100 based on: complementary type (school+company), shared sectors, shared regions, shared tags, and cross-match between a company's skill needs and a school's offerings
- Scores above 30 are saved as match suggestions
- Admins review and approve before organisations are notified

---

## Demo Accounts (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@techbridgeacademy.eu` | `Admin@TBA2024` |
| School | `info@iis-volta.edu.it` | `School@123` |
| Company | `hr@precisionfab.it` | `Company@123` |

---

## Page Reference

| URL | Description |
|-----|-------------|
| `/` | Home — hero, stats, platform overview, latest news |
| `/about` | Project objectives, work packages, architecture |
| `/partners` | Consortium partner organisations |
| `/news` | News listing |
| `/news/[id]` | News article detail |
| `/events` | Upcoming and past events |
| `/events/[id]` | Event detail + registration |
| `/auth/login` | Sign in |
| `/auth/register` | Create account |
| `/dashboard` | User dashboard — profile status, matches, surveys, notifications |
| `/profile` | Edit your organisation profile |
| `/bridge` | Bridge area overview |
| `/bridge/profiles` | Organisation directory with filters |
| `/bridge/profiles/[id]` | Organisation profile detail |
| `/bridge/repository` | Good practices repository |
| `/bridge/repository/[id]` | Initiative detail |
| `/bridge/repository/submit` | Submit a new initiative |
| `/bridge/career-guidance` | Career content for students |
| `/bridge/educational-collaboration` | Resources for joint projects |
| `/bridge/co-design` | Co-design programme request |
| `/smes` | SME area overview |
| `/smes/networking` | Company directory + events |
| `/smes/skills-needs` | Skills needs survey |
| `/smes/coaching` | HR coaching modules |
| `/schools` | Schools area overview |
| `/schools/networking` | School directory + events |
| `/schools/staff-development` | Staff development resources |
| `/schools/observatory` | Curriculum educational observatory |
| `/admin` | Admin dashboard |
| `/admin/users` | User management |
| `/admin/profiles` | Profile validation queue |
| `/admin/matches` | Match review |
| `/admin/surveys` | Survey management |
| `/admin/repository` | Repository moderation |
| `/admin/analytics` | Platform analytics |
| `/admin/notifications` | Send notifications |
| `/admin/content` | News content management |
| `/admin/reports` | Reports |
| `/privacy` | Privacy policy |
| `/gdpr` | GDPR compliance |
| `/terms` | Terms of service |
| `/cookies` | Cookie policy |
