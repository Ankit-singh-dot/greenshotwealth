import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET_STRING =
  process.env.JWT_SECRET || "greenshoots-secure-jwt-key-2026-financial-wealth";
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);

export const ADMIN_COOKIE_NAME = "gsw_admin_session";

export interface AdminSessionPayload {
  userId: string;
  username: string;
  role: string;
}

/**
 * Hash password with bcrypt using 12 salt rounds
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Verify plain password against salted hash
 */
export async function verifyPassword(
  plainPassword: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, passwordHash);
}

/**
 * Create a cryptographically signed JWT token for the admin session
 */
export async function createSessionToken(
  payload: AdminSessionPayload
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

/**
 * Verify and decode the JWT session token
 */
export async function verifySessionToken(
  token: string
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      userId: payload.userId as string,
      username: payload.username as string,
      role: (payload.role as string) || "ADMIN",
    };
  } catch {
    return null;
  }
}

/**
 * Get current admin session from server cookies
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Ensure at least one default admin user exists in the database
 */
export async function ensureDefaultAdmin() {
  const adminCount = await prisma.adminUser.count();
  if (adminCount === 0) {
    const defaultUser = process.env.ADMIN_DEFAULT_USER || "admin";
    const defaultPass =
      process.env.ADMIN_DEFAULT_PASSWORD || "GreenShoots@Admin2026!";

    const passwordHash = await hashPassword(defaultPass);
    await prisma.adminUser.create({
      data: {
        username: defaultUser,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`[Admin Setup] Initialized default admin account: ${defaultUser}`);
  }
}

