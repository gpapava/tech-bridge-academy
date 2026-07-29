import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ValidationStatus, VisibilityStatus } from "@prisma/client";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  const { id } = params;

  const profile = await prisma.organisationProfile.findUnique({
    where: { id },
    include: {
      documents: { select: { id: true, name: true, url: true, fileType: true } },
      user: { select: { name: true, createdAt: true } },
    },
  });

  if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Check visibility
  const isOwner = session?.user?.id === profile.userId;
  const isAdmin = session?.user?.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    if (profile.validationStatus !== ValidationStatus.APPROVED) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (profile.visibilityStatus === VisibilityStatus.PRIVATE) {
      return NextResponse.json({ error: "Private profile" }, { status: 403 });
    }
    if (profile.visibilityStatus === VisibilityStatus.MEMBERS_ONLY && !session) {
      // Return public subset only
      const { opportunities, needs, contactEmail, telephone, website, socialLinks, ...publicData } = profile;
      return NextResponse.json({ data: publicData, restricted: true });
    }
  }

  return NextResponse.json({ data: profile, restricted: false });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { id } = params;
  const profile = await prisma.organisationProfile.findUnique({ where: { id } });

  if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isOwner = session.user.id === profile.userId;
  const isAdmin = session.user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  // Admins can change validation status
  if (isAdmin && body.validationStatus !== undefined) {
    const updated = await prisma.organisationProfile.update({
      where: { id },
      data: {
        validationStatus: body.validationStatus,
        visibilityStatus: body.visibilityStatus,
      },
    });
    return NextResponse.json({ data: updated });
  }

  // Owners can update their own profile (resets to pending)
  const updated = await prisma.organisationProfile.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      mission: body.mission,
      dialogueExperience: body.dialogueExperience,
      opportunities: body.opportunities,
      needs: body.needs,
      regions: body.regions,
      sectors: body.sectors,
      tags: body.tags,
      city: body.city || null,
      country: body.country || null,
      latitude: body.latitude ?? null,
      longitude: body.longitude ?? null,
      contactEmail: body.contactEmail || null,
      telephone: body.telephone || null,
      website: body.website || null,
      visibilityStatus: body.visibilityStatus,
      // Profile edits reset validation for re-review (unless admin)
      validationStatus: isAdmin ? undefined : ValidationStatus.PENDING,
    },
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { id } = params;
  const profile = await prisma.organisationProfile.findUnique({ where: { id } });
  if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isOwner = session.user.id === profile.userId;
  const isAdmin = session.user.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.organisationProfile.delete({ where: { id } });
  return NextResponse.json({ message: "Profile deleted" });
}
