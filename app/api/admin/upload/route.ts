import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import { auth } from "@clerk/nextjs/server";
import sharp from "sharp";

export const runtime = "nodejs";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

// Magic bytes for image formats
const IMAGE_SIGNATURES: [number[], string][] = [
  [[0xff, 0xd8, 0xff], "jpeg"],
  [[0x89, 0x50, 0x4e, 0x47], "png"],
  [[0x52, 0x49, 0x46, 0x46], "webp"], // RIFF header (WebP starts with RIFF)
  [[0x47, 0x49, 0x46, 0x38], "gif"],
];

function isImageByMagicBytes(buffer: Buffer): boolean {
  return IMAGE_SIGNATURES.some(([sig]) =>
    sig.every((byte, i) => buffer[i] === byte)
  );
}

export async function POST(request: Request) {
  try {
    // Auth check
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Check MIME type
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Only image files are allowed (JPEG, PNG, WebP, GIF)" },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 4MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate magic bytes to prevent disguised files
    if (!isImageByMagicBytes(buffer)) {
      return NextResponse.json(
        { error: "File is not a valid image" },
        { status: 400 }
      );
    }

    // Re-encode through sharp to strip EXIF/metadata and verify it's a real image
    let processedBuffer: Buffer;
    try {
      const image = sharp(buffer);
      const metadata = await image.metadata();

      if (metadata.format === "gif") {
        // sharp can't re-encode animated GIFs well, just validate and pass through
        processedBuffer = buffer;
      } else {
        // Re-encode as WebP for consistent format + smaller size
        processedBuffer = await image
          .webp({ quality: 85 })
          .toBuffer();
      }
    } catch {
      return NextResponse.json(
        { error: "File could not be processed as an image" },
        { status: 400 }
      );
    }

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = processedBuffer === buffer ? "gif" : "webp";
    const filename = `event-${uniqueSuffix}.${ext}`;

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Save file
    const filePath = join(uploadsDir, filename);
    await writeFile(filePath, processedBuffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
