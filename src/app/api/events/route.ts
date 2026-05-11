import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const upcoming = searchParams.get("upcoming") === "true";
  const limit = parseInt(searchParams.get("limit") ?? "20");

  const where: Record<string, unknown> = { isPublished: true };
  if (upcoming) where.startDate = { gte: new Date() };

  const events = await prisma.event.findMany({
    where,
    include: { _count: { select: { registrations: true } } },
    orderBy: { startDate: "asc" },
    take: limit,
  });

  return NextResponse.json({ data: events });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const event = await prisma.event.create({
    data: {
      title: body.title,
      description: body.description,
      eventType: body.eventType,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
      location: body.location,
      isVirtual: body.isVirtual ?? false,
      meetingUrl: body.meetingUrl,
      imageUrl: body.imageUrl,
      capacity: body.capacity,
      targetRole: body.targetRole,
      isPublished: body.isPublished ?? false,
    },
  });

  return NextResponse.json({ data: event }, { status: 201 });
}
