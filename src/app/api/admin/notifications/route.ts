import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  targetRole: z.enum(["SCHOOL", "COMPANY", "ADMIN"]).optional(),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { title, message, targetRole } = parsed.data;

  const users = await prisma.user.findMany({
    where: targetRole ? { role: targetRole } : {},
    select: { id: true },
  });

  await prisma.notification.createMany({
    data: users.map((u) => ({ userId: u.id, title, message, type: "ADMIN" })),
  });

  return NextResponse.json({ sent: users.length });
}
