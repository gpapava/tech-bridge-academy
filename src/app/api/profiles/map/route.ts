import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ValidationStatus, VisibilityStatus } from "@prisma/client";

export async function GET(_req: NextRequest) {
  const session = await getSession();

  const profiles = await prisma.organisationProfile.findMany({
    where: {
      validationStatus: ValidationStatus.APPROVED,
      visibilityStatus: { in: [VisibilityStatus.PUBLIC, ...(session ? [VisibilityStatus.MEMBERS_ONLY] : [])] },
      latitude: { not: null },
      longitude: { not: null },
    },
    select: {
      id: true,
      orgType: true,
      schoolType: true,
      companyType: true,
      name: true,
      city: true,
      country: true,
      latitude: true,
      longitude: true,
      logoUrl: true,
      // Contact details only for authenticated users, matching the directory endpoint
      ...(session ? { contactEmail: true, telephone: true } : {}),
    },
  });

  return NextResponse.json({ data: profiles });
}
