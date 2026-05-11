import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { ValidationStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    await requireRole("ADMIN");
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = parseInt(searchParams.get("perPage") ?? "20");
  const validationStatus = searchParams.get("validationStatus") as ValidationStatus | null;
  const orgType = searchParams.get("orgType");

  const where: Record<string, unknown> = {};
  if (validationStatus) where.validationStatus = validationStatus;
  if (orgType) where.orgType = orgType;

  const [profiles, total] = await Promise.all([
    prisma.organisationProfile.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, name: true } },
        documents: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.organisationProfile.count({ where }),
  ]);

  return NextResponse.json({
    data: profiles,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  });
}
