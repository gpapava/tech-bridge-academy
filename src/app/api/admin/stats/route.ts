import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ValidationStatus } from "@prisma/client";

export async function GET() {
  const [
    registeredCompanies,
    registeredSchools,
    matchesGenerated,
    approvedMatches,
    sentMatches,
    eventsTotal,
    repositoryEntries,
    surveysCompleted,
    activeUsers,
    newsPublished,
  ] = await Promise.all([
    prisma.organisationProfile.count({ where: { orgType: "COMPANY", validationStatus: ValidationStatus.APPROVED } }),
    prisma.organisationProfile.count({ where: { orgType: "SCHOOL", validationStatus: ValidationStatus.APPROVED } }),
    prisma.match.count(),
    prisma.match.count({ where: { status: "APPROVED" } }),
    prisma.match.count({ where: { status: "SENT" } }),
    prisma.event.count({ where: { isPublished: true } }),
    prisma.repositoryInitiative.count({ where: { publishStatus: ValidationStatus.APPROVED } }),
    prisma.surveyResponse.count(),
    prisma.user.count({ where: { isActive: true, role: { not: "VISITOR" } } }),
    prisma.newsPost.count({ where: { isPublished: true } }),
  ]);

  return NextResponse.json({
    data: {
      registeredCompanies,
      registeredSchools,
      matchesGenerated,
      approvedMatches,
      sentMatches,
      eventsTotal,
      repositoryEntries,
      surveysCompleted,
      activeUsers,
      newsPublished,
      partnerships: sentMatches,
    },
  });
}
