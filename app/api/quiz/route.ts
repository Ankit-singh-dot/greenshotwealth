import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { totalScore, level, answers, fullName, email, phone } = body;

    if (typeof totalScore !== "number" || !level) {
      return NextResponse.json(
        { error: "Total score and health level are required." },
        { status: 400 }
      );
    }

    const answersJson = answers ? JSON.stringify(answers) : null;
    const cleanedName = fullName ? String(fullName).trim().slice(0, 150) : null;
    const cleanedEmail = email ? String(email).trim().toLowerCase().slice(0, 150) : null;
    const cleanedPhone = phone ? String(phone).trim().slice(0, 50) : null;

    const submission = await prisma.quizSubmission.create({
      data: {
        totalScore,
        level: String(level).trim(),
        answersJson,
        fullName: cleanedName,
        email: cleanedEmail,
        phone: cleanedPhone,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Quiz assessment saved successfully.",
      id: submission.id,
    });
  } catch (error) {
    console.error("Error creating quiz submission:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

