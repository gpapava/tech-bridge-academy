import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ValidationStatus } from "@prisma/client";

export async function GET() {
  const initiatives = await prisma.repositoryInitiative.findMany({
    where: { publishStatus: ValidationStatus.APPROVED },
    select: { tags: true },
  });

  const counts = new Map<string, number>();
  for (const { tags } of initiatives) {
    for (const tag of tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const topTags = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([tag, count]) => ({ tag, count }));

  return NextResponse.json({ tags: topTags });
}
