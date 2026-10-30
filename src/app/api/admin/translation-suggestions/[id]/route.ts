import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

const schema = z.object({
  status: z.enum(["PENDING", "APPLIED", "REJECTED"]),
  adminNotes: z.string().max(1000).optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireRole("ADMIN");
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  try {
    const updated = await prisma.translationSuggestion.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
