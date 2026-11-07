import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // BLOG, ARTICLE, or undefined
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");

    const whereClause: Record<string, unknown> = {
      published: true,
    };

    if (type && type !== "ALL") {
      whereClause.type = type.toUpperCase();
    }

    if (category && category !== "All") {
      whereClause.category = { equals: category, mode: "insensitive" };
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: limit ? parseInt(limit, 10) : undefined,
    });

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching public blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts." },
      { status: 500 }
    );
  }
}

