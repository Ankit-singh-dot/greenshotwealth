import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("Admin fetch blogs error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug: customSlug,
      excerpt,
      content,
      coverImage,
      category,
      type,
      author,
      authorRole,
      readTime,
      published,
      featured,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required." },
        { status: 400 }
      );
    }

    let finalSlug = slugify(customSlug || title);
    if (!finalSlug) finalSlug = `post-${Date.now()}`;

    // Ensure unique slug
    let uniqueSlug = finalSlug;
    let counter = 1;
    while (await prisma.blogPost.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${finalSlug}-${counter}`;
      counter++;
    }

    // Auto calculate readTime if not provided
    let calculatedReadTime = readTime;
    if (!calculatedReadTime) {
      const words = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(words / 200));
      calculatedReadTime = `${minutes} min read`;
    }

    const post = await prisma.blogPost.create({
      data: {
        title: String(title).trim(),
        slug: uniqueSlug,
        excerpt: excerpt ? String(excerpt).trim() : null,
        content: String(content),
        coverImage: coverImage ? String(coverImage).trim() : null,
        category: category ? String(category).trim() : "Investing",
        type: type ? String(type).toUpperCase() : "BLOG",
        author: author ? String(author).trim() : "Saloni Mehta",
        authorRole: authorRole ? String(authorRole).trim() : "Founder & Wealth Architect",
        readTime: calculatedReadTime,
        published: published !== undefined ? Boolean(published) : true,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Admin create blog error:", error);
    return NextResponse.json({ error: "Failed to create blog post." }, { status: 500 });
  }
}

