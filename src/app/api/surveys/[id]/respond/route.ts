import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { id } = params;

  const survey = await prisma.survey.findUnique({
    where: { id },
    include: { questions: true },
  });

  if (!survey || !survey.isActive) {
    return NextResponse.json({ error: "Survey not found or inactive" }, { status: 404 });
  }

  // Prevent duplicate responses
  const existing = await prisma.surveyResponse.findFirst({
    where: { surveyId: id, userId: session.user.id },
  });
  if (existing) {
    return NextResponse.json({ error: "You have already submitted a response to this survey" }, { status: 409 });
  }

  const body = await req.json();
  const answers: Array<{ questionId: string; value: string }> = body.answers ?? [];

  // Validate required questions
  const requiredIds = survey.questions.filter((q) => q.required).map((q) => q.id);
  const answeredIds = answers.filter((a) => a.value?.trim()).map((a) => a.questionId);
  const missing = requiredIds.filter((rid) => !answeredIds.includes(rid));
  if (missing.length > 0) {
    return NextResponse.json({ error: "Please answer all required questions", missing }, { status: 400 });
  }

  const profile = await prisma.organisationProfile.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  const response = await prisma.surveyResponse.create({
    data: {
      surveyId: id,
      userId: session.user.id,
      profileId: profile?.id ?? null,
      answers: {
        create: answers.map((a) => ({
          questionId: a.questionId,
          value: String(a.value),
        })),
      },
    },
  });

  return NextResponse.json({ data: { id: response.id }, message: "Response submitted. Thank you!" }, { status: 201 });
}
