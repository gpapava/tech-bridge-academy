import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { runFullMatching } from "@/lib/matching";

export async function POST(req: NextRequest) {
  try {
    await requireRole("ADMIN");
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const threshold = body.threshold ?? 30;

  const result = await runFullMatching(threshold);
  return NextResponse.json({ data: result });
}
