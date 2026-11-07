import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Admin get blog error:", error);
    return NextResponse.json({ error: "Failed to fetch blog." }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title,
      slug,
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

    // Auto calculate readTime if content changed
    let calculatedReadTime = readTime;
    if (content && !calculatedReadTime) {
      const words = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.ceil(words / 200));
      calculatedReadTime = `${minutes} min read`;
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(title ? { title: String(title).trim() } : {}),
        ...(slug ? { slug: String(slug).trim() } : {}),
        ...(excerpt !== undefined ? { excerpt: excerpt ? String(excerpt).trim() : null } : {}),
        ...(content ? { content: String(content) } : {}),
        ...(coverImage !== undefined ? { coverImage: coverImage ? String(coverImage).trim() : null } : {}),
        ...(category ? { category: String(category).trim() } : {}),
        ...(type ? { type: String(type).toUpperCase() } : {}),
        ...(author ? { author: String(author).trim() } : {}),
        ...(authorRole !== undefined ? { authorRole: authorRole ? String(authorRole).trim() : null } : {}),
        ...(calculatedReadTime ? { readTime: calculatedReadTime } : {}),
        ...(published !== undefined ? { published: Boolean(published) } : {}),
        ...(featured !== undefined ? { featured: Boolean(featured) } : {}),
      },
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error("Admin update blog error:", error);
    return NextResponse.json({ error: "Failed to update blog." }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Deleted successfully." });
  } catch (error) {
    console.error("Admin delete blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog." }, { status: 500 });
  }
}

