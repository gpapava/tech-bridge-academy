import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { locales } from "@/i18n/config";

const schema = z.object({
  locale: z.enum(locales),
  pageUrl: z.string().trim().min(1).max(500),
  originalText: z.string().trim().min(1).max(2000),
  suggestedText: z.string().trim().min(1).max(2000),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
  authorName: z.string().trim().max(100).optional().or(z.literal("")),
  authorEmail: z.string().trim().email().max(200).optional().or(z.literal("")),
  // Honeypot: real users never see this field, bots tend to fill it.
  website: z.string().max(0).optional(),
});

const HOURLY_CAP = 100;

// Open to everyone (native-speaker partners may not have an account).
export async function POST(req: NextRequest) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid suggestion" }, { status: 400 });
  }

  const recent = await prisma.translationSuggestion.count({
    where: { createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
  });
  if (recent >= HOURLY_CAP) {
    return NextResponse.json({ error: "Too many suggestions, please try again later" }, { status: 429 });
  }

  const session = await getSession();
  const { website: _honeypot, comment, authorName, authorEmail, ...data } = parsed.data;

  const suggestion = await prisma.translationSuggestion.create({
    data: {
      ...data,
      comment: comment || null,
      authorName: authorName || session?.user?.name || null,
      authorEmail: authorEmail || session?.user?.email || null,
      userId: session?.user?.id ?? null,
    },
  });

  const admins = await prisma.user.findMany({ where: { role: "ADMIN" }, select: { id: true } });
  if (admins.length > 0) {
    await prisma.notification.createMany({
      data: admins.map((a) => ({
        userId: a.id,
        title: "New Translation Suggestion",
        message: `A correction was suggested for the ${suggestion.locale.toUpperCase()} translation.`,
        type: "TRANSLATION",
        link: "/admin/translations",
      })),
    });
  }

  return NextResponse.json({ data: { id: suggestion.id } }, { status: 201 });
}
