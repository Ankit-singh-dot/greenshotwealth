import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to PostgreSQL database...");

  const defaultUser = process.env.ADMIN_DEFAULT_USER || "admin";
  const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || "GreenShoots@Admin2026!";

  // 1. Ensure Admin User
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { username: defaultUser },
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(defaultPass, salt);
    await prisma.adminUser.create({
      data: {
        username: defaultUser,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log(`[Seed] Created initial admin user "${defaultUser}" with salted bcrypt hash.`);
  } else {
    console.log(`[Seed] Admin user "${defaultUser}" already exists.`);
  }

  // 2. Ensure at least one sample contact inquiry if table is empty
  const contactCount = await prisma.contactSubmission.count();
  if (contactCount === 0) {
    await prisma.contactSubmission.create({
      data: {
        fullName: "Rohan Gupta",
        email: "rohan.gupta@example.com",
        phone: "+91 98200 12345",
        service: "Global & GIFT City Investing",
        message: "Looking to establish an offshore family trust structure and dollar-denominated index portfolio via GIFT City IFSC.",
        status: "NEW",
        notes: "High priority lead from Mumbai. Prefers callback after 4 PM.",
      },
    });
    console.log("[Seed] Created initial sample contact submission.");
  }

  // 3. Ensure at least one sample quiz lead if table is empty
  const quizCount = await prisma.quizSubmission.count();
  if (quizCount === 0) {
    await prisma.quizSubmission.create({
      data: {
        fullName: "Ananya Sharma",
        email: "ananya.sharma@example.com",
        phone: "+91 99300 54321",
        totalScore: 85,
        level: "Exemplary Financial Resilience",
        status: "NEW",
        answersJson: JSON.stringify([
          { question: "Emergency fund 6+ months", score: 20 },
          { question: "Monthly investment ratio", score: 20 },
          { question: "Term and health insurance coverage", score: 20 },
          { question: "Goal-mapped asset allocation", score: 14 },
          { question: "Reaction to market volatility", score: 11 },
        ]),
        notes: "Requested personalized review with a senior wealth planner.",
      },
    });
    console.log("[Seed] Created initial sample quiz assessment.");
  }

  // 4. Ensure sample newsletter subscriber
  const subCount = await prisma.newsletterSubscriber.count();
  if (subCount === 0) {
    await prisma.newsletterSubscriber.create({
      data: {
        email: "saloni.insights@greenshootswealth.com",
        source: "footer",
        active: true,
      },
    });
    console.log("[Seed] Created initial sample newsletter subscriber.");
  }

  console.log("Database verification and seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

