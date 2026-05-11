# Tech Bridge Academy

**Erasmus+ KA220-VET · TECH BRIDGE VET Project**

A production-ready digital platform connecting VET schools, technical colleges, and manufacturing SMEs in the mechanical engineering sector to reduce skills mismatch across Europe.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | NextAuth v4 (Credentials + JWT) |
| AI Matching | Rule-based engine + optional OpenAI/Anthropic |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Toasts | React Hot Toast |

---

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone and install

```bash
git clone <repo-url>
cd tech-bridge-academy
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set:
- `DATABASE_URL` — your PostgreSQL connection string
- `NEXTAUTH_SECRET` — a random secret (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` — your app URL (default: `http://localhost:3000`)
- `OPENAI_API_KEY` (optional) — enables AI-generated match reports
- `ANTHROPIC_API_KEY` (optional) — alternative AI provider

### 3. Set up the database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (development)
npm run db:push

# OR run migrations (recommended for production)
npm run db:migrate

# Seed with demo data
npm run db:seed
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@techbridgeacademy.eu` | `Admin@TBA2024` |
| School | `info@iis-volta.edu.it` | `School@123` |
| Company | `hr@precisionfab.it` | `Company@123` |

---

## Project Structure

```
tech-bridge-academy/
├── prisma/
│   ├── schema.prisma          # Full database schema
│   └── seed.ts                # Demo data seeder
├── public/
├── src/
│   ├── app/
│   │   ├── api/               # API route handlers
│   │   │   ├── auth/          # NextAuth + registration
│   │   │   ├── profiles/      # Organisation profiles CRUD
│   │   │   ├── matches/       # Match system API
│   │   │   ├── matching/run/  # Trigger matching engine
│   │   │   ├── repository/    # Repository of initiatives
│   │   │   ├── surveys/       # Survey management + responses
│   │   │   ├── events/        # Events API
│   │   │   ├── news/          # News API
│   │   │   ├── co-design/     # Co-design requests
│   │   │   └── admin/         # Admin-only APIs
│   │   ├── page.tsx           # Public home page
│   │   ├── about/             # About TECH BRIDGE VET
│   │   ├── partners/          # Partner organisations
│   │   ├── news/              # News listing
│   │   ├── events/            # Events calendar
│   │   ├── auth/              # Login & registration
│   │   ├── dashboard/         # User dashboard
│   │   ├── profile/           # Organisation profile editor
│   │   ├── bridge/            # Bridge Area pages
│   │   │   ├── profiles/      # Directory + profile detail
│   │   │   ├── repository/    # Good practices repository
│   │   │   ├── career-guidance/
│   │   │   ├── co-design/
│   │   │   └── educational-collaboration/
│   │   ├── smes/              # SME Services Area
│   │   │   ├── networking/
│   │   │   ├── coaching/
│   │   │   └── skills-needs/  # Skills survey
│   │   ├── schools/           # Schools Area
│   │   │   ├── networking/
│   │   │   ├── staff-development/
│   │   │   └── observatory/
│   │   └── admin/             # Admin dashboard
│   │       ├── users/
│   │       ├── profiles/      # Profile validation
│   │       ├── matches/       # Match review
│   │       ├── surveys/
│   │       └── repository/
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, AdminSidebar
│   │   ├── ui/                # Badge, LoadingSpinner
│   │   ├── profiles/          # ProfileCard, ProfileFilter, ProfileForm
│   │   ├── matching/          # MatchCard
│   │   ├── repository/        # InitiativeCard
│   │   ├── dashboard/         # KPICard
│   │   └── auth/              # AuthProvider (SessionProvider)
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── auth.ts            # NextAuth config
│   │   ├── utils.ts           # Helpers, constants
│   │   └── matching/
│   │       ├── rule-based.ts  # Jaccard similarity scoring
│   │       ├── ai-service.ts  # OpenAI/Anthropic wrapper
│   │       └── index.ts       # Orchestrator (batch + profile matching)
│   ├── middleware.ts           # Route protection
│   └── types/
│       └── index.ts           # TypeScript types + NextAuth extensions
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## User Roles

| Role | Access |
|------|--------|
| `VISITOR` | Public pages, partial profiles, news, events |
| `SCHOOL` | + Full profiles, repository, School Area, co-design |
| `COMPANY` | + Full profiles, repository, SME Area, skills surveys |
| `ADMIN` | + Admin dashboard, profile validation, match review |

---

## Matching System

The platform uses a **rule-based scoring algorithm** with optional AI report generation:

### Scoring Dimensions (total: 100 pts)

| Dimension | Points | Method |
|-----------|--------|--------|
| Complementary type (School ↔ Company) | 20 | Type check |
| Sector overlap | 25 | Jaccard similarity |
| Region overlap | 20 | Jaccard similarity |
| Tag overlap | 15 | Jaccard similarity |
| Needs ↔ Opportunities text match | 20 | Tokenized Jaccard |

### Score Interpretation

| Score | Label | Meaning |
|-------|-------|---------|
| 80–100 | Excellent | Highly recommended collaboration |
| 60–79 | Strong | Clear alignment, prioritise |
| 40–59 | Good | Worthwhile exploring |
| 30–39 | Potential | Needs further assessment |

### Matching Triggers

1. **New profile created** — triggered automatically, matches against all approved profiles
2. **Profile updated** — re-runs matching for the updated profile
3. **Manual run** — Admin can trigger full batch matching from the admin dashboard (`/admin`)
4. **Batch via API** — `POST /api/matching/run` with `{ threshold: 30 }`

### AI Reports (optional)

If `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` is set, match reports are generated using GPT-4o-mini or Claude Haiku. Otherwise, a structured rule-based report is generated automatically.

---

## Admin Workflow

1. **Profile Validation** (`/admin/profiles`): Review and approve/reject submitted organisation profiles
2. **Match Review** (`/admin/matches`): Review AI-generated match suggestions, approve or reject, send match reports to organisations
3. **Repository Moderation** (`/admin/repository`): Review and publish submitted good practices
4. **Survey Management** (`/admin/surveys`): Create surveys, view responses, generate reports
5. **User Management** (`/admin/users`): View all users, toggle active status, change roles

---

## API Reference

### Profiles
- `GET /api/profiles` — List profiles (public: partial data; authenticated: full data)
- `POST /api/profiles` — Create profile (authenticated)
- `GET /api/profiles/[id]` — Get profile (access-controlled)
- `PATCH /api/profiles/[id]` — Update profile (owner or admin)
- `DELETE /api/profiles/[id]` — Delete profile (owner or admin)

### Matching
- `GET /api/matches` — List matches (own matches or all for admin)
- `POST /api/matching/run` — Run batch matching (admin only)
- `POST /api/matches/[id]/review` — Approve/reject/send report (admin only)

### Surveys
- `GET /api/surveys` — List active surveys
- `POST /api/surveys` — Create survey (admin only)
- `POST /api/surveys/[id]/respond` — Submit survey response

### Repository
- `GET /api/repository` — List approved initiatives
- `POST /api/repository` — Submit initiative

### Auth
- `POST /api/auth/register` — Register new user
- `POST/GET /api/auth/[...nextauth]` — NextAuth handler

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import in Vercel dashboard
3. Set environment variables from `.env.example`
4. Deploy

### Docker

```bash
# Build image
docker build -t tech-bridge-academy .

# Run with environment
docker run -p 3000:3000 --env-file .env tech-bridge-academy
```

### Database (Production)

For production, use `prisma migrate deploy` instead of `db push`:

```bash
npx prisma migrate deploy
npx tsx prisma/seed.ts
```

---

## Multilingual Support

The platform is structured for multilingual content:
- All labels and copy are in English by default
- URL structure supports locale prefixes: `/it/`, `/el/`, `/sk/`, `/de/`, `/es/`
- Recommended: integrate `next-intl` or `next-i18next` for full i18n support

---

## GDPR Compliance

- GDPR consent checkbox on registration (required)
- Contact details restricted to authenticated users
- Admin moderation before public profile publication
- User can edit/delete own profile
- Profile visibility controls (Public / Members Only / Private)
- Audit trail via `AnalyticsEvent` model

---

## Contributing

1. Create a feature branch
2. Make changes with appropriate tests
3. Submit a PR to the `develop` branch
4. Await review from a consortium member

---

## License

This project is developed under the Erasmus+ programme. Code is available for educational and research use by consortium partners. Contact the lead beneficiary for licensing enquiries.

---

*Tech Bridge Academy · Erasmus+ KA220-VET · TECH BRIDGE VET Consortium · 2024–2026*
