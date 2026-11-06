import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  ensureDefaultAdmin,
  verifyPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    // Ensure default admin exists if DB is newly provisioned
    await ensureDefaultAdmin();

    const normalizedUser = String(username).trim();
    const admin = await prisma.adminUser.findUnique({
      where: { username: normalizedUser },
    });

    if (!admin) {
      // Return generic error to prevent username enumeration
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    // Verify salted bcrypt hash
    const isValid = await verifyPassword(String(password), admin.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    // Update last login timestamp
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    // Create secure signed session token
    const token = await createSessionToken({
      userId: admin.id,
      username: admin.username,
      role: admin.role,
    });

    // Build response and set httpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });

    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}

