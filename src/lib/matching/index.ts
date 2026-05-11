/**
 * Main matching orchestrator.
 * Runs rule-based scoring, persists new matches to DB, and optionally generates AI reports.
 */

import { prisma } from "@/lib/prisma";
import { runBatchMatching, calculateMatchScore, type MatchableProfile } from "./rule-based";
import { generateMatchReport } from "./ai-service";
import { ValidationStatus } from "@prisma/client";

/**
 * Fetch all approved profiles and run batch matching.
 * Creates new Match records and generates reports for high-score matches.
 */
export async function runFullMatching(threshold = 30): Promise<{
  newMatches: number;
  updatedMatches: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let newMatches = 0;
  let updatedMatches = 0;

  try {
    const profiles = await prisma.organisationProfile.findMany({
      where: { validationStatus: ValidationStatus.APPROVED },
      select: {
        id: true,
        orgType: true,
        sectors: true,
        regions: true,
        tags: true,
        needs: true,
        opportunities: true,
        name: true,
        description: true,
      },
    });

    const matchableProfiles: MatchableProfile[] = profiles.map((p) => ({
      id: p.id,
      orgType: p.orgType,
      sectors: p.sectors,
      regions: p.regions,
      tags: p.tags,
      needs: p.needs,
      opportunities: p.opportunities,
    }));

    const results = runBatchMatching(matchableProfiles, threshold);

    for (const result of results) {
      try {
        const existing = await prisma.match.findUnique({
          where: {
            profileAId_profileBId: {
              profileAId: result.profileAId,
              profileBId: result.profileBId,
            },
          },
        });

        if (!existing) {
          const match = await prisma.match.create({
            data: {
              profileAId: result.profileAId,
              profileBId: result.profileBId,
              score: result.score,
              reasons: result.reasons,
            },
          });

          if (result.score >= 50) {
            const profA = profiles.find((p) => p.id === result.profileAId)!;
            const profB = profiles.find((p) => p.id === result.profileBId)!;
            const reportData = await generateMatchReport(
              { ...profA, orgType: profA.orgType },
              { ...profB, orgType: profB.orgType },
              { score: result.score, reasons: result.reasons }
            );
            await prisma.matchReport.create({
              data: {
                matchId: match.id,
                content: reportData.fullReport,
                generatedBy: reportData.generatedBy,
              },
            });
          }

          newMatches++;
        } else if (existing.score !== result.score) {
          await prisma.match.update({
            where: { id: existing.id },
            data: { score: result.score, reasons: result.reasons },
          });
          updatedMatches++;
        }
      } catch (err) {
        errors.push(`Error processing pair ${result.profileAId}/${result.profileBId}: ${err}`);
      }
    }

    // Notify admins if there are new matches
    if (newMatches > 0) {
      const admins = await prisma.user.findMany({
        where: { role: "ADMIN" },
        select: { id: true },
      });
      await prisma.notification.createMany({
        data: admins.map((a) => ({
          userId: a.id,
          title: "New Match Suggestions",
          message: `${newMatches} new match${newMatches > 1 ? "es" : ""} have been generated and are awaiting your review.`,
          type: "MATCH",
          link: "/admin/matches",
        })),
      });
    }
  } catch (err) {
    errors.push(`Fatal matching error: ${err}`);
  }

  return { newMatches, updatedMatches, errors };
}

/**
 * Run matching for a single newly added/updated profile against all others.
 */
export async function runProfileMatching(profileId: string): Promise<void> {
  const profile = await prisma.organisationProfile.findUnique({
    where: { id: profileId },
    select: {
      id: true, orgType: true, sectors: true, regions: true,
      tags: true, needs: true, opportunities: true, name: true, description: true,
    },
  });
  if (!profile) return;

  const others = await prisma.organisationProfile.findMany({
    where: {
      validationStatus: ValidationStatus.APPROVED,
      id: { not: profileId },
    },
    select: {
      id: true, orgType: true, sectors: true, regions: true,
      tags: true, needs: true, opportunities: true, name: true, description: true,
    },
  });

  for (const other of others) {
    const { score, reasons } = calculateMatchScore(
      { id: profile.id, orgType: profile.orgType, sectors: profile.sectors, regions: profile.regions, tags: profile.tags, needs: profile.needs, opportunities: profile.opportunities },
      { id: other.id, orgType: other.orgType, sectors: other.sectors, regions: other.regions, tags: other.tags, needs: other.needs, opportunities: other.opportunities }
    );

    if (score < 30) continue;

    // Ensure consistent ordering (lower id first)
    const [aId, bId] = [profile.id, other.id].sort();

    try {
      const existing = await prisma.match.findUnique({
        where: { profileAId_profileBId: { profileAId: aId, profileBId: bId } },
      });

      if (!existing) {
        const match = await prisma.match.create({
          data: { profileAId: aId, profileBId: bId, score, reasons },
        });

        if (score >= 50) {
          const [profA, profB] = aId === profile.id ? [profile, other] : [other, profile];
          const reportData = await generateMatchReport(
            { ...profA, orgType: profA.orgType },
            { ...profB, orgType: profB.orgType },
            { score, reasons }
          );
          await prisma.matchReport.create({
            data: { matchId: match.id, content: reportData.fullReport, generatedBy: reportData.generatedBy },
          });
        }
      }
    } catch {
      // Unique constraint violation means match already exists — skip
    }
  }
}

export { calculateMatchScore, runBatchMatching } from "./rule-based";
export { generateMatchReport } from "./ai-service";
