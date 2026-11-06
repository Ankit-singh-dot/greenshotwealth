import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      contacts,
      quizzes,
      newsletters,
      totalContacts,
      newContacts,
      totalQuizzes,
      totalNewsletters,
    ] = await Promise.all([
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
      prisma.quizSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
      prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
      }),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.quizSubmission.count(),
      prisma.newsletterSubscriber.count(),
    ]);

    return NextResponse.json({
      stats: {
        totalContacts,
        newContacts,
        totalQuizzes,
        totalNewsletters,
      },
      contacts,
      quizzes,
      newsletters,
    });
  } catch (error) {
    console.error("Admin data fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data." },
      { status: 500 }
    );
  }
}

