/**
 * Rule-based matching engine for school–company profiles.
 * Used as primary engine or fallback when no AI API key is configured.
 *
 * Scoring dimensions (total max 100):
 *   - Complementary type bonus (school ↔ company)   20 pts
 *   - Sector overlap (Jaccard)                       25 pts
 *   - Region overlap (Jaccard)                       20 pts
 *   - Tag overlap (Jaccard)                          15 pts
 *   - Needs ↔ Opportunities text cross-match         20 pts
 */

export interface MatchableProfile {
  id: string;
  orgType: "SCHOOL" | "COMPANY";
  sectors: string[];
  regions: string[];
  tags: string[];
  needs: string;
  opportunities: string;
}

function normalizeTerms(arr: string[]): Set<string> {
  return new Set(arr.map((s) => s.toLowerCase().trim()));
}

function jaccardSimilarity(a: string[], b: string[]): number {
  const setA = normalizeTerms(a);
  const setB = normalizeTerms(b);
  if (setA.size === 0 && setB.size === 0) return 0;
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,;:.!?()\[\]]+/)
    .filter((t) => t.length > 3)
    .filter((t) => !STOP_WORDS.has(t));
}

const STOP_WORDS = new Set([
  "with", "this", "that", "from", "have", "been", "will", "would", "could",
  "their", "they", "them", "more", "also", "such", "which", "when", "into",
  "your", "ours", "each", "over", "both", "very", "just", "than", "then",
]);

function textCrossMatch(textA: string, textB: string): number {
  const tokA = tokenize(textA);
  const tokB = tokenize(textB);
  return jaccardSimilarity(tokA, tokB);
}

export interface MatchResult {
  score: number;
  reasons: string[];
}

export function calculateMatchScore(
  profileA: MatchableProfile,
  profileB: MatchableProfile
): MatchResult {
  const reasons: string[] = [];
  let score = 0;

  // ── 1. Complementary type bonus (20 pts) ───────────────────────────────────
  const isComplementary =
    (profileA.orgType === "SCHOOL" && profileB.orgType === "COMPANY") ||
    (profileA.orgType === "COMPANY" && profileB.orgType === "SCHOOL");

  if (isComplementary) {
    score += 20;
    reasons.push("Complementary organisation types (School ↔ Company/SME)");
  }

  // ── 2. Sector overlap (25 pts) ─────────────────────────────────────────────
  const sectorSim = jaccardSimilarity(profileA.sectors, profileB.sectors);
  const sectorScore = Math.round(sectorSim * 25);
  score += sectorScore;
  if (sectorScore > 0) {
    const pct = Math.round(sectorSim * 100);
    reasons.push(`Sector alignment: ${pct}% (${sectorScore} pts)`);
  }

  // ── 3. Region overlap (20 pts) ─────────────────────────────────────────────
  const regionSim = jaccardSimilarity(profileA.regions, profileB.regions);
  const regionScore = Math.round(regionSim * 20);
  score += regionScore;
  if (regionScore > 0) {
    const pct = Math.round(regionSim * 100);
    reasons.push(`Regional proximity: ${pct}% (${regionScore} pts)`);
  }

  // ── 4. Tag overlap (15 pts) ────────────────────────────────────────────────
  const tagSim = jaccardSimilarity(profileA.tags, profileB.tags);
  const tagScore = Math.round(tagSim * 15);
  score += tagScore;
  if (tagScore > 0) {
    const pct = Math.round(tagSim * 100);
    reasons.push(`Shared interests (tags): ${pct}% (${tagScore} pts)`);
  }

  // ── 5. Needs ↔ Opportunities cross-match (20 pts) ─────────────────────────
  // A's needs vs B's opportunities
  const crossAB = textCrossMatch(profileA.needs, profileB.opportunities);
  // B's needs vs A's opportunities
  const crossBA = textCrossMatch(profileB.needs, profileA.opportunities);
  const crossSim = Math.max(crossAB, crossBA);
  const crossScore = Math.round(crossSim * 20);
  score += crossScore;
  if (crossScore >= 4) {
    reasons.push(`Needs/Opportunities text alignment detected (${crossScore} pts)`);
    if (crossAB > crossBA) {
      reasons.push("School needs appear to match Company opportunities");
    } else if (crossBA > crossAB) {
      reasons.push("Company needs appear to match School offerings");
    }
  }

  const finalScore = Math.min(score, 100);

  // ── Co-design suggestion ───────────────────────────────────────────────────
  if (finalScore >= 60 && isComplementary && sectorScore >= 10) {
    reasons.push("⚡ High potential for curriculum co-design collaboration");
  }

  return { score: finalScore, reasons };
}

/**
 * Run matching across all approved profiles and return pairs with score ≥ threshold.
 */
export function runBatchMatching(
  profiles: MatchableProfile[],
  threshold = 30
): Array<{ profileAId: string; profileBId: string; score: number; reasons: string[] }> {
  const results: Array<{ profileAId: string; profileBId: string; score: number; reasons: string[] }> = [];

  for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      const a = profiles[i];
      const b = profiles[j];
      const { score, reasons } = calculateMatchScore(a, b);
      if (score >= threshold) {
        results.push({ profileAId: a.id, profileBId: b.id, score, reasons });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

/**
 * Generate a human-readable match report from rule-based scoring.
 */
export function generateRuleBasedReport(
  profileA: MatchableProfile & { name: string },
  profileB: MatchableProfile & { name: string },
  matchResult: MatchResult
): string {
  const school = profileA.orgType === "SCHOOL" ? profileA : profileB;
  const company = profileA.orgType === "COMPANY" ? profileA : profileB;
  const schoolName = (school as { name: string }).name;
  const companyName = (company as { name: string }).name;

  const sharedSectors = [...normalizeTerms(profileA.sectors)].filter((s) =>
    normalizeTerms(profileB.sectors).has(s)
  );
  const sharedRegions = [...normalizeTerms(profileA.regions)].filter((r) =>
    normalizeTerms(profileB.regions).has(r)
  );

  return `# Tech Bridge Academy – Match Report

## Summary
**Match Score:** ${matchResult.score}/100
**School/VET Institution:** ${schoolName}
**Company/SME:** ${companyName}
**Generated:** ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

---

## Why This Match Was Identified

${matchResult.reasons.map((r) => `- ${r}`).join("\n")}

---

## Common Ground

${sharedSectors.length > 0 ? `**Shared Sectors:** ${sharedSectors.join(", ")}` : ""}
${sharedRegions.length > 0 ? `**Shared Regions:** ${sharedRegions.join(", ")}` : ""}

---

## Potential Collaboration Areas

Based on the profile analysis, the following types of collaboration are suggested:

1. **Work-Based Learning (WBL) / Internships** – A structured WBL placement for students from ${schoolName} at the facilities of ${companyName}.
2. **Co-Design of Training Modules** – Joint development of a curriculum unit addressing specific skill needs identified in the company profile.
3. **Guest Lectures / Company Visits** – Expert practitioners from ${companyName} delivering content to students at ${schoolName}.
4. **Challenge-Based Learning Projects** – Real production or design challenges from ${companyName} as the basis for final-year student projects.
${matchResult.score >= 60 ? "5. **Curriculum Co-Design** – Full co-design of a training pathway aligned to the company's skills needs and the school's educational standards." : ""}

---

## Recommended Next Steps

1. Review both organisation profiles on the Tech Bridge Academy platform.
2. Contact the platform administrator to express interest in establishing contact.
3. Schedule an initial exploratory meeting to discuss specific opportunities.
4. If interested, submit a Co-Design Request through the platform.

---

*This report was generated automatically by the Tech Bridge Academy matching engine as part of the Erasmus+ KA220-VET project "TECH BRIDGE VET". It is intended as a starting point for dialogue, not a formal agreement.*
`;
}
