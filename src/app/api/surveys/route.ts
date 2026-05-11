import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const isAdmin = session.user.role === "ADMIN";

  const where = isAdmin ? {} : {
    isActive: true,
    OR: [
      { targetRole: null },
      { targetRole: session.user.role },
    ],
  };

  const surveys = await prisma.survey.findMany({
    where,
    include: {
      questions: {
        orderBy: { order: "asc" },
      },
      _count: { select: { responses: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: surveys });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const survey = await prisma.survey.create({
    data: {
      title: body.title,
      description: body.description,
      targetRole: body.targetRole,
      isActive: body.isActive ?? false,
      startsAt: body.startsAt ? new Date(body.startsAt) : null,
      endsAt: body.endsAt ? new Date(body.endsAt) : null,
      questions: {
        create: body.questions?.map((q: Record<string, unknown>, i: number) => ({
          text: q.text,
          questionType: q.questionType,
          options: q.options ?? [],
          required: q.required ?? false,
          order: q.order ?? i + 1,
        })),
      },
    },
    include: { questions: true },
  });

  return NextResponse.json({ data: survey }, { status: 201 });
}
