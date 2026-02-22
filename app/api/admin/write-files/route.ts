import { NextResponse } from "next/server";
import { generatedSiteDataSchema } from "@/lib/admin/schemas";
import { generateSiteFiles } from "@/lib/admin/generate-site-files";

const ADMIN_PASSCODE = "6231839";

function validatePasscode(request: Request): boolean {
  return request.headers.get("x-admin-passcode") === ADMIN_PASSCODE;
}

export async function POST(request: Request) {
  if (!validatePasscode(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { siteId, siteType, data, logoPaths } = body;

    if (!siteId || !siteType || !data) {
      return NextResponse.json(
        { error: "siteId, siteType, and data are required" },
        { status: 400 },
      );
    }

    const validation = generatedSiteDataSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid site data", issues: validation.error.issues },
        { status: 422 },
      );
    }

    const results = await generateSiteFiles(
      siteId,
      siteType,
      validation.data,
      logoPaths || [],
    );

    const successes = results.filter((r) => r.success);
    const failures = results.filter((r) => !r.success);

    return NextResponse.json({
      results,
      summary: {
        total: results.length,
        success: successes.length,
        failed: failures.length,
      },
      siteUrl: `/${siteId}`,
    });
  } catch (error) {
    console.error("[ADMIN] Write files error:", error);
    return NextResponse.json(
      { error: "File writing failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
