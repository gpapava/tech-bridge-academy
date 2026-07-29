import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const post = await prisma.networkingPost.findUnique({ where: { id: params.id }, select: { authorId: true } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isOwner = post.authorId === session.user.id;
  const isAdmin = session.user.role === "ADMIN";
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.networkingPost.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
