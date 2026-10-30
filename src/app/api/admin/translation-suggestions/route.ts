import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { SuggestionStatus } from "@prisma/client";

function csvCell(v: string | null | undefined) {
  return `"${(v ?? "").replace(/"/g, '""')}"`;
}

// Admin export of suggestions: ?status=PENDING&locale=el&format=csv
export async function GET(req: NextRequest) {
  try {
    await requireRole("ADMIN");
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const locale = searchParams.get("locale");

  const rows = await prisma.translationSuggestion.findMany({
    where: {
      ...(status && status in SuggestionStatus ? { status: status as SuggestionStatus } : {}),
      ...(locale ? { locale } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  if (searchParams.get("format") === "csv") {
    const header = ["id", "language", "page", "original", "suggestion", "comment", "author", "email", "status", "created"];
    const lines = rows.map((r) =>
      [r.id, r.locale, r.pageUrl, r.originalText, r.suggestedText, r.comment, r.authorName, r.authorEmail, r.status, r.createdAt.toISOString()]
        .map(csvCell)
        .join(",")
    );
    return new NextResponse("﻿" + [header.join(","), ...lines].join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="translation-suggestions.csv"',
      },
    });
  }

  return NextResponse.json({ data: rows });
}
