import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = 10;
  const status = searchParams.get("status");

  const isAdmin = session.user.role === "ADMIN";

  let where: Record<string, unknown> = {};

  if (!isAdmin) {
    // Users can only see their own profile's matches (approved ones)
    const profile = await prisma.organisationProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!profile) return NextResponse.json({ data: [], total: 0, totalPages: 0 });

    where = {
      OR: [{ profileAId: profile.id }, { profileBId: profile.id }],
      status: "APPROVED",
    };
  } else {
    if (status) where.status = status;
  }

  const [matches, total] = await Promise.all([
    prisma.match.findMany({
      where,
      include: {
        profileA: { select: { id: true, name: true, orgType: true, sectors: true, regions: true, logoUrl: true } },
        profileB: { select: { id: true, name: true, orgType: true, sectors: true, regions: true, logoUrl: true } },
        report: { select: { id: true, content: true, generatedBy: true } },
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: [{ score: "desc" }, { createdAt: "desc" }],
    }),
    prisma.match.count({ where }),
  ]);

  return NextResponse.json({
    data: matches,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  });
}
