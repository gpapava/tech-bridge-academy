import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ValidationStatus, VisibilityStatus, OrgType } from "@prisma/client";
import { runProfileMatching } from "@/lib/matching";
import { z } from "zod";

const profileSchema = z.object({
  orgType: z.enum(["SCHOOL", "COMPANY"]),
  schoolType: z.string().optional(),
  companyType: z.string().optional(),
  name: z.string().min(2).max(200),
  description: z.string().min(10).max(5000),
  mission: z.string().min(10).max(2000),
  dialogueExperience: z.string().optional(),
  opportunities: z.string().min(10).max(3000),
  needs: z.string().min(10).max(3000),
  regions: z.array(z.string()).min(1),
  sectors: z.array(z.string()).min(1),
  tags: z.array(z.string()).default([]),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  telephone: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session = await getSession();

  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = Math.min(parseInt(searchParams.get("perPage") ?? "12"), 50);
  const orgType = searchParams.get("orgType") as OrgType | null;
  const sector = searchParams.get("sector");
  const region = searchParams.get("region");
  const search = searchParams.get("search");
  const tag = searchParams.get("tag");
  const schoolType = searchParams.get("schoolType");
  const companyType = searchParams.get("companyType");
  const sort = searchParams.get("sort") ?? "newest";

  const orderBy: Record<string, "asc" | "desc"> =
    sort === "oldest" ? { createdAt: "asc" } :
    sort === "name_asc" ? { name: "asc" } :
    sort === "name_desc" ? { name: "desc" } :
    { createdAt: "desc" };

  const where: Record<string, unknown> = {
    validationStatus: ValidationStatus.APPROVED,
    visibilityStatus: { in: [VisibilityStatus.PUBLIC, ...(session ? [VisibilityStatus.MEMBERS_ONLY] : [])] },
  };

  if (orgType) where.orgType = orgType;
  if (schoolType) where.schoolType = schoolType;
  if (companyType) where.companyType = companyType;
  if (sector) where.sectors = { has: sector };
  if (region) where.regions = { has: region };
  if (tag) where.tags = { has: tag };
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { tags: { has: search } },
    ];
  }

  const [profiles, total] = await Promise.all([
    prisma.organisationProfile.findMany({
      where,
      select: {
        id: true,
        orgType: true,
        schoolType: true,
        companyType: true,
        name: true,
        description: true,
        mission: true,
        dialogueExperience: true,
        regions: true,
        sectors: true,
        tags: true,
        city: true,
        country: true,
        logoUrl: true,
        validationStatus: true,
        visibilityStatus: true,
        createdAt: true,
        // Full fields only for authenticated users
        ...(session ? {
          opportunities: true,
          needs: true,
          contactEmail: true,
          telephone: true,
          website: true,
        } : {}),
      },
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy,
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

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const existing = await prisma.organisationProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (existing) {
    return NextResponse.json({ error: "Profile already exists. Use PATCH to update." }, { status: 409 });
  }

  const body = await req.json();
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  let profile;
  try {
    profile = await prisma.organisationProfile.create({
    data: {
      userId: session.user.id,
      orgType: data.orgType as OrgType,
      schoolType: (data.schoolType || null) as never,
      companyType: (data.companyType || null) as never,
      name: data.name,
      description: data.description,
      mission: data.mission,
      dialogueExperience: data.dialogueExperience,
      opportunities: data.opportunities,
      needs: data.needs,
      regions: data.regions,
      sectors: data.sectors,
      tags: data.tags,
      city: data.city || null,
      country: data.country || null,
      latitude: data.latitude ?? null,
      longitude: data.longitude ?? null,
      contactEmail: data.contactEmail || null,
      telephone: data.telephone || null,
      website: data.website || null,
    },
  });
  } catch (err: any) {
    console.error("Profile create error:", err);
    return NextResponse.json({ error: err?.message ?? "Database error" }, { status: 500 });
  }

  // Notify admin of new profile
  const admins = await prisma.user.findMany({ where: { role: "ADMIN" }, select: { id: true } });
  await prisma.notification.createMany({
    data: admins.map((a) => ({
      userId: a.id,
      title: "New Profile Awaiting Validation",
      message: `${profile.name} has submitted a new organisation profile for review.`,
      type: "PROFILE_VALIDATED",
      link: `/admin/profiles`,
    })),
  });

  // Trigger matching in background (non-blocking)
  runProfileMatching(profile.id).catch(console.error);

  return NextResponse.json({ data: profile }, { status: 201 });
}
