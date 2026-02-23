import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ADMIN_PASSCODE = "6231839";

function validatePasscode(request: Request): boolean {
  return request.headers.get("x-admin-passcode") === ADMIN_PASSCODE;
}

export async function POST(request: Request) {
  if (!validatePasscode(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const siteId = formData.get("siteId") as string;

    if (!siteId) {
      return NextResponse.json({ error: "siteId is required" }, { status: 400 });
    }

    const logoPaths: string[] = [];
    let extractedText = "";

    // Process logo files
    const logoFiles = formData.getAll("logos") as File[];
    const logoDir = path.join(process.cwd(), "public", "images", siteId);
    await fs.mkdir(logoDir, { recursive: true });

    for (let i = 0; i < logoFiles.length; i++) {
      const file = logoFiles[i];
      if (!file || file.size === 0) continue;

      const ext = path.extname(file.name) || ".png";
      const filename = i === 0 ? `logo${ext}` : `logo-alt${ext}`;
      const filePath = path.join(logoDir, filename);

      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      logoPaths.push(`/images/${siteId}/${filename}`);
    }

    // Process logo URLs
    const logoUrls = formData.getAll("logoUrls") as string[];
    for (let i = 0; i < logoUrls.length; i++) {
      const url = logoUrls[i];
      if (!url) continue;

      try {
        const response = await fetch(url, {
          headers: { "User-Agent": "MajorLeagueNumbers/1.0" },
        });
        if (!response.ok) continue;

        const contentType = response.headers.get("content-type") || "";
        let ext = ".png";
        if (contentType.includes("svg")) ext = ".svg";
        else if (contentType.includes("jpeg") || contentType.includes("jpg")) ext = ".jpg";
        else if (contentType.includes("webp")) ext = ".webp";

        const existingCount = logoPaths.length;
        const filename = existingCount === 0 ? `logo${ext}` : `logo-alt${ext}`;
        const filePath = path.join(logoDir, filename);

        const buffer = Buffer.from(await response.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        logoPaths.push(`/images/${siteId}/${filename}`);
      } catch {
        // Skip failed URL downloads
      }
    }

    // Process content files (PDFs, text, images) — extract text
    const contentFiles = formData.getAll("files") as File[];
    for (const file of contentFiles) {
      if (!file || file.size === 0) continue;

      if (file.type.startsWith("text/") || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
        const text = await file.text();
        extractedText += `\n\n--- ${file.name} ---\n${text}`;
      }
      // For PDFs and images, we note they were uploaded but can't easily extract text server-side without extra deps
      else if (file.type === "application/pdf") {
        extractedText += `\n\n--- ${file.name} (PDF uploaded, content not extracted) ---`;
      }
    }

    return NextResponse.json({
      logoPaths,
      extractedText: extractedText.trim(),
    });
  } catch (error) {
    console.error("[ADMIN] Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
