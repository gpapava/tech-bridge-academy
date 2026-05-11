import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const page = parseInt(searchParams.get("page") ?? "1");

  const [news, total] = await Promise.all([
    prisma.newsPost.findMany({
      where: { isPublished: true },
      select: { id: true, title: true, excerpt: true, imageUrl: true, tags: true, publishedAt: true, createdAt: true },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.newsPost.count({ where: { isPublished: true } }),
  ]);

  return NextResponse.json({ data: news, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const post = await prisma.newsPost.create({
    data: {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      imageUrl: body.imageUrl,
      tags: body.tags ?? [],
      isPublished: body.isPublished ?? false,
      publishedAt: body.isPublished ? new Date() : null,
    },
  });

  return NextResponse.json({ data: post }, { status: 201 });
}
