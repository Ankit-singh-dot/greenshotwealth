import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, service, message } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full Name, Email, and Phone Number are required." },
        { status: 400 }
      );
    }

    // Clean and validate strings
    const cleanedName = String(fullName).trim().slice(0, 150);
    const cleanedEmail = String(email).trim().toLowerCase().slice(0, 150);
    const cleanedPhone = String(phone).trim().slice(0, 50);
    const cleanedService = service ? String(service).trim().slice(0, 200) : null;
    const cleanedMessage = message ? String(message).trim().slice(0, 2000) : null;

    const submission = await prisma.contactSubmission.create({
      data: {
        fullName: cleanedName,
        email: cleanedEmail,
        phone: cleanedPhone,
        service: cleanedService,
        message: cleanedMessage,
        status: "NEW",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Consultation inquiry received successfully.",
      id: submission.id,
    });
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

