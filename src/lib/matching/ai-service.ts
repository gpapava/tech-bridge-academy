import { MatchableProfile, MatchResult, generateRuleBasedReport } from "./rule-based";

export interface AIMatchReport {
  summary: string;
  collaborationAreas: string[];
  fullReport: string;
  generatedBy: "openai" | "anthropic" | "rule-based";
}

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

type RichProfile = MatchableProfile & { name: string; description: string; needs: string; opportunities: string };

function buildPrompt(profileA: RichProfile, profileB: RichProfile, matchResult: MatchResult): string {
  return `You are an expert in VET school–enterprise partnerships in the mechanical engineering sector within the Erasmus+ framework.

Write a professional match report for these two organisations (score: ${matchResult.score}/100):

Organisation A (${profileA.orgType}): ${profileA.name}
Description: ${profileA.description}
Needs: ${profileA.needs}
Offers: ${profileA.opportunities}

Organisation B (${profileB.orgType}): ${profileB.name}
Description: ${profileB.description}
Needs: ${profileB.needs}
Offers: ${profileB.opportunities}

Match reasons: ${matchResult.reasons.join("; ")}

Write 500-700 words with: executive summary, 3-5 specific collaboration opportunities, skill alignment, concrete next steps, and potential for curriculum co-design.`;
}

async function generateOpenAIReport(profileA: RichProfile, profileB: RichProfile, matchResult: MatchResult): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${OPENAI_KEY}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: buildPrompt(profileA, profileB, matchResult) }],
      max_tokens: 1200,
      temperature: 0.7,
    }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? generateRuleBasedReport(profileA, profileB, matchResult);
}

async function generateAnthropicReport(profileA: RichProfile, profileB: RichProfile, matchResult: MatchResult): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1200,
      messages: [{ role: "user", content: buildPrompt(profileA, profileB, matchResult) }],
    }),
  });
  const data = await res.json();
  const textBlock = data.content?.find((b: { type: string }) => b.type === "text");
  return textBlock?.text ?? generateRuleBasedReport(profileA, profileB, matchResult);
}

export async function generateMatchReport(
  profileA: MatchableProfile & { name: string; description: string },
  profileB: MatchableProfile & { name: string; description: string },
  matchResult: MatchResult
): Promise<AIMatchReport> {
  let fullReport: string;
  let generatedBy: AIMatchReport["generatedBy"] = "rule-based";

  if (OPENAI_KEY || ANTHROPIC_KEY) {
    try {
      if (OPENAI_KEY) {
        fullReport = await generateOpenAIReport(profileA as RichProfile, profileB as RichProfile, matchResult);
        generatedBy = "openai";
      } else {
        fullReport = await generateAnthropicReport(profileA as RichProfile, profileB as RichProfile, matchResult);
        generatedBy = "anthropic";
      }
    } catch (err) {
      console.error("AI report generation failed, falling back to rule-based:", err);
      fullReport = generateRuleBasedReport(profileA as RichProfile, profileB as RichProfile, matchResult);
      generatedBy = "rule-based";
    }
  } else {
    fullReport = generateRuleBasedReport(profileA as RichProfile, profileB as RichProfile, matchResult);
    generatedBy = "rule-based";
  }

  const summaryMatch =
    fullReport.match(/##\s*Summary\s*\n([^#]+)/i) ??
    fullReport.match(/^([^#\n]{50,300})/m);
  const summary = summaryMatch
    ? summaryMatch[1].trim().slice(0, 300) + "…"
    : `Match score ${matchResult.score}/100 – ${matchResult.reasons[0] ?? "Potential collaboration identified"}`;

  return {
    summary,
    collaborationAreas: matchResult.reasons.filter((r) => !r.startsWith("Complementary") && !r.includes("pts")),
    fullReport,
    generatedBy,
  };
}
