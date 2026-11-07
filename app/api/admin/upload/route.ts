import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Prepare base64 Data URI (100% serverless safe, never throws EROFS)
    const mimeType = file.type || "image/jpeg";
    const base64DataUri = `data:${mimeType};base64,${buffer.toString("base64")}`;

    // 2. Try writing to filesystem if the environment allows it (e.g. local development)
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const ext = path.extname(file.name) || ".jpg";
      const filename = `blog_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    } catch (fsError) {
      // In serverless environments (Vercel, AWS Lambda), the filesystem is read-only (EROFS).
      // Fallback seamlessly to the base64 Data URI so uploading always succeeds in production.
      console.warn("Serverless read-only filesystem detected. Falling back to Data URI:", fsError);
      return NextResponse.json({ success: true, url: base64DataUri });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to process image." }, { status: 500 });
  }
}
