import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NetworkingPostType } from "@prisma/client";
import { z } from "zod";

const postSchema = z.object({
  type: z.nativeEnum(NetworkingPostType),
  title: z.string().min(3).max(200),
  message: z.string().min(10).max(3000),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = 12;
  const type = searchParams.get("type");

  const where: Record<string, unknown> = {};
  if (type && Object.values(NetworkingPostType).includes(type as NetworkingPostType)) {
    where.type = type;
  }

  const [posts, total] = await Promise.all([
    prisma.networkingPost.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            profile: { select: { name: true, orgType: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.networkingPost.count({ where }),
  ]);

  return NextResponse.json({
    data: posts,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const body = await req.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }

  const post = await prisma.networkingPost.create({
    data: {
      ...parsed.data,
      authorId: session.user.id,
    },
    include: {
      author: {
        select: {
          name: true,
          profile: { select: { name: true, orgType: true } },
        },
      },
    },
  });

  return NextResponse.json({ data: post }, { status: 201 });
}
