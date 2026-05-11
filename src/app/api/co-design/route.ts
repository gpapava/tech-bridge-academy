import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const isAdmin = session.user.role === "ADMIN";

  const where = isAdmin ? {} : { requesterId: session.user.id };

  const requests = await prisma.coDesignRequest.findMany({
    where,
    include: {
      requester: { select: { name: true, email: true } },
      profile: { select: { id: true, name: true, orgType: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: requests });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const profile = await prisma.organisationProfile.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!profile) {
    return NextResponse.json({ error: "Please create your organisation profile first" }, { status: 400 });
  }

  const body = await req.json();

  const request = await prisma.coDesignRequest.create({
    data: {
      requesterId: session.user.id,
      profileId: profile.id,
      title: body.title,
      description: body.description,
      partnerNotes: body.partnerNotes,
    },
  });

  // Notify admins
  const admins = await prisma.user.findMany({ where: { role: "ADMIN" }, select: { id: true } });
  await prisma.notification.createMany({
    data: admins.map((a) => ({
      userId: a.id,
      title: "New Co-Design Request",
      message: `A new co-design collaboration request has been submitted: "${request.title}"`,
      type: "CO_DESIGN",
      link: "/admin",
    })),
  });

  return NextResponse.json({ data: request }, { status: 201 });
}
