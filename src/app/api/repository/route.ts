import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, requireRole } from "@/lib/auth";
import { InitiativeType, ValidationStatus } from "@prisma/client";
import { z } from "zod";

const initiativeSchema = z.object({
  title: z.string().min(3).max(300),
  initiativeType: z.nativeEnum(InitiativeType).optional(),
  actors: z.string().min(5),
  description: z.string().min(20),
  results: z.string().min(10),
  challenges: z.string().optional(),
  lessons: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  externalLinks: z.array(z.string().url()).optional().default([]),
  videoUrl: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  country: z.string().optional(),
  region: z.string().optional(),
  sector: z.string().optional(),
  documents: z.array(z.object({
    name: z.string().min(1),
    url: z.string().url(),
  })).optional().default([]),
});

function inferFileType(url: string): string {
  const match = url.split("?")[0].match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toUpperCase() : "LINK";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = 9;
  const sector = searchParams.get("sector");
  const region = searchParams.get("region");
  const search = searchParams.get("search");
  const tag = searchParams.get("tag");

  const where: Record<string, unknown> = {
    publishStatus: ValidationStatus.APPROVED,
  };
  if (sector) where.sector = { contains: sector, mode: "insensitive" };
  if (region) where.region = { contains: region, mode: "insensitive" };
  if (tag) where.tags = { has: tag };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { actors: { contains: search, mode: "insensitive" } },
    ];
  }

  const [initiatives, total] = await Promise.all([
    prisma.repositoryInitiative.findMany({
      where,
      include: { documents: { select: { id: true, name: true, url: true } } },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { viewCount: "desc" },
    }),
    prisma.repositoryInitiative.count({ where }),
  ]);

  return NextResponse.json({
    data: initiatives,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const body = await req.json();
  const parsed = initiativeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }

  const isAdmin = session.user.role === "ADMIN";
  const { documents, ...initiativeData } = parsed.data;

  const initiative = await prisma.repositoryInitiative.create({
    data: {
      ...initiativeData,
      contactEmail: initiativeData.contactEmail || null,
      videoUrl: initiativeData.videoUrl || null,
      publishStatus: isAdmin ? ValidationStatus.APPROVED : ValidationStatus.PENDING,
      documents: {
        create: documents.map((doc) => ({
          name: doc.name,
          url: doc.url,
          fileType: inferFileType(doc.url),
        })),
      },
    },
  });

  if (!isAdmin) {
    const admins = await prisma.user.findMany({ where: { role: "ADMIN" }, select: { id: true } });
    await prisma.notification.createMany({
      data: admins.map((a) => ({
        userId: a.id,
        title: "New Repository Submission",
        message: `"${initiative.title}" has been submitted to the Repository of Initiatives for review.`,
        type: "SYSTEM",
        link: "/admin/repository",
      })),
    });
  }

  return NextResponse.json({ data: initiative }, { status: 201 });
}
