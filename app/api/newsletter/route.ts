import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || !String(email).includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const cleanedEmail = String(email).trim().toLowerCase().slice(0, 150);
    const cleanedSource = source ? String(source).trim().slice(0, 50) : "footer";

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: cleanedEmail },
      update: { active: true, source: cleanedSource },
      create: {
        email: cleanedEmail,
        source: cleanedSource,
        active: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Subscribed to newsletter successfully.",
      id: subscriber.id,
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

