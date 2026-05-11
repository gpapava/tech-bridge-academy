import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const event = await prisma.event.findUnique({
    where: { id: params.id, isPublished: true },
    include: { _count: { select: { registrations: true } } },
  });
  if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

  if (new Date(event.startDate) < new Date()) {
    return NextResponse.json({ error: "Cannot register for a past event" }, { status: 400 });
  }

  if (event.capacity && event._count.registrations >= event.capacity) {
    return NextResponse.json({ error: "Event is at full capacity" }, { status: 409 });
  }

  const existing = await prisma.eventRegistration.findUnique({
    where: { eventId_userId: { eventId: params.id, userId: session.user.id } },
  });
  if (existing) return NextResponse.json({ error: "Already registered" }, { status: 409 });

  const registration = await prisma.eventRegistration.create({
    data: { eventId: params.id, userId: session.user.id },
  });

  return NextResponse.json(registration, { status: 201 });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.eventRegistration.findUnique({
    where: { eventId_userId: { eventId: params.id, userId: session.user.id } },
  });
  if (!existing) return NextResponse.json({ error: "Not registered" }, { status: 404 });

  await prisma.eventRegistration.delete({
    where: { eventId_userId: { eventId: params.id, userId: session.user.id } },
  });

  return NextResponse.json({ ok: true });
}
