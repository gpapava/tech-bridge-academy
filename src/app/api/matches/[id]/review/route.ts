import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("ADMIN");
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = params;
  const body = await req.json();
  const { action, adminNotes } = body as { action: "approve" | "reject" | "send_report"; adminNotes?: string };

  const match = await prisma.match.findUnique({
    where: { id },
    include: {
      profileA: { select: { id: true, name: true, userId: true } },
      profileB: { select: { id: true, name: true, userId: true } },
      report: true,
    },
  });

  if (!match) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (action === "approve") {
    await prisma.match.update({
      where: { id },
      data: { status: "APPROVED", adminNotes },
    });
    return NextResponse.json({ message: "Match approved" });
  }

  if (action === "reject") {
    await prisma.match.update({
      where: { id },
      data: { status: "REJECTED", adminNotes },
    });
    return NextResponse.json({ message: "Match rejected" });
  }

  if (action === "send_report") {
    if (match.status !== "APPROVED") {
      return NextResponse.json({ error: "Match must be approved before sending report" }, { status: 400 });
    }

    await prisma.match.update({
      where: { id },
      data: { status: "SENT", reportSent: true },
    });

    // Update report sentAt
    if (match.report) {
      await prisma.matchReport.update({
        where: { matchId: id },
        data: { sentAt: new Date() },
      });
    }

    // Notify both organisations
    await prisma.notification.createMany({
      data: [
        {
          userId: match.profileA.userId,
          title: "Match Report Available",
          message: `A potential collaboration match has been identified and validated. View your match with ${match.profileB.name}.`,
          type: "MATCH",
          link: "/dashboard",
        },
        {
          userId: match.profileB.userId,
          title: "Match Report Available",
          message: `A potential collaboration match has been identified and validated. View your match with ${match.profileA.name}.`,
          type: "MATCH",
          link: "/dashboard",
        },
      ],
    });

    return NextResponse.json({ message: "Report sent to organisations" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
