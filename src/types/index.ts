import type { UserRole, OrgType, SchoolType, CompanyType, ValidationStatus, VisibilityStatus, MatchStatus } from "@prisma/client";
import type { DefaultSession } from "next-auth";

// ── NextAuth session extension ─────────────────────────────────────────────────
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

// ── API Response Types ─────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ── Profile Types ──────────────────────────────────────────────────────────────

export interface ProfileCreateInput {
  orgType: OrgType;
  schoolType?: SchoolType;
  companyType?: CompanyType;
  name: string;
  description: string;
  mission: string;
  dialogueExperience?: string;
  opportunities: string;
  needs: string;
  regions: string[];
  sectors: string[];
  tags: string[];
  contactEmail?: string;
  telephone?: string;
  website?: string;
  socialLinks?: Record<string, string>;
}

export interface ProfileUpdateInput extends Partial<ProfileCreateInput> {
  visibilityStatus?: VisibilityStatus;
}

export interface PublicProfileView {
  id: string;
  orgType: OrgType;
  schoolType?: SchoolType | null;
  companyType?: CompanyType | null;
  name: string;
  description: string;
  mission: string;
  dialogueExperience?: string | null;
  regions: string[];
  sectors: string[];
  tags: string[];
  logoUrl?: string | null;
  validationStatus: ValidationStatus;
  createdAt: Date;
}

export interface FullProfileView extends PublicProfileView {
  opportunities: string;
  needs: string;
  contactEmail?: string | null;
  telephone?: string | null;
  website?: string | null;
  socialLinks?: Record<string, string> | null;
  visibilityStatus: VisibilityStatus;
  documents: Array<{ id: string; name: string; url: string; fileType: string }>;
}

// ── Search/Filter Types ────────────────────────────────────────────────────────

export interface ProfileFilters {
  orgType?: OrgType;
  schoolType?: SchoolType;
  companyType?: CompanyType;
  sector?: string;
  region?: string;
  tag?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

// ── Match Types ────────────────────────────────────────────────────────────────

export interface MatchWithProfiles {
  id: string;
  score: number;
  reasons: string[];
  status: MatchStatus;
  adminNotes?: string | null;
  reportSent: boolean;
  createdAt: Date;
  updatedAt: Date;
  profileA: PublicProfileView;
  profileB: PublicProfileView;
  report?: { id: string; content: string; generatedBy: string } | null;
}

// ── Dashboard KPI Types ────────────────────────────────────────────────────────

export interface EcosystemStats {
  registeredCompanies: number;
  registeredSchools: number;
  matchesGenerated: number;
  approvedMatches: number;
  eventsHeld: number;
  repositoryEntries: number;
  surveysCompleted: number;
  activeUsers: number;
}

// ── Survey Types ───────────────────────────────────────────────────────────────

export interface SurveyWithQuestions {
  id: string;
  title: string;
  description?: string | null;
  isActive: boolean;
  startsAt?: Date | null;
  endsAt?: Date | null;
  questions: Array<{
    id: string;
    text: string;
    questionType: string;
    options: string[];
    required: boolean;
    order: number;
  }>;
  _count?: { responses: number };
}

export interface SurveyAnswerInput {
  questionId: string;
  value: string;
}

// ── Notification Types ─────────────────────────────────────────────────────────

export type NotificationType = "MATCH" | "PROFILE_VALIDATED" | "EVENT" | "SURVEY" | "SYSTEM" | "CO_DESIGN";
