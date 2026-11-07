import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: "Slug is required." }, { status: 400 });
    }

    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post || !post.published) {
      return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    }

    // Fetch up to 3 related posts
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        published: true,
        id: { not: post.id },
        category: post.category,
      },
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    // If fewer than 3 in the same category, fill with latest posts
    let finalRelated = relatedPosts;
    if (finalRelated.length < 3) {
      const remainingCount = 3 - finalRelated.length;
      const otherPosts = await prisma.blogPost.findMany({
        where: {
          published: true,
          id: { notIn: [post.id, ...finalRelated.map((r) => r.id)] },
        },
        take: remainingCount,
        orderBy: { createdAt: "desc" },
      });
      finalRelated = [...finalRelated, ...otherPosts];
    }

    return NextResponse.json({ success: true, post, relatedPosts: finalRelated });
  } catch (error) {
    console.error("Error fetching blog post by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post." },
      { status: 500 }
    );
  }
}

