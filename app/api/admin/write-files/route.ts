import { NextResponse } from "next/server";
import { generatedSiteDataSchema } from "@/lib/admin/schemas";
import { generateSiteFiles, generateSiteFileContents } from "@/lib/admin/generate-site-files";
import { commitFilesToGitHub } from "@/lib/admin/github-commit";

export const maxDuration = 300;

const ADMIN_PASSCODE = "6231839";

const GITHUB_OWNER = "davemelk100";
const GITHUB_REPO = "major-league-numbers";
const GITHUB_BRANCH = "main";

function validatePasscode(request: Request): boolean {
  return request.headers.get("x-admin-passcode") === ADMIN_PASSCODE;
}

export async function POST(request: Request) {
  if (!validatePasscode(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { siteId, siteType, data, logoPaths, videoLinks } = body;

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

    const useGitHub = process.env.VERCEL === "1" || process.env.USE_GITHUB_COMMITS === "true";

    if (useGitHub) {
      const token = process.env.GITHUB_TOKEN;
      if (!token) {
        return NextResponse.json(
          { error: "GITHUB_TOKEN environment variable is required for production mode" },
          { status: 500 },
        );
      }

      const files = await generateSiteFileContents({
        siteId,
        siteType,
        data: validation.data,
        logoPaths: logoPaths || [],
        videoLinks: videoLinks || [],
        useGitHub: true,
        githubToken: token,
        githubOwner: GITHUB_OWNER,
        githubRepo: GITHUB_REPO,
        githubBranch: GITHUB_BRANCH,
        skipImageDownload: true,
      });

      const commitResult = await commitFilesToGitHub({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        branch: GITHUB_BRANCH,
        message: `Add generated site: ${siteId}`,
        files,
        token,
      });

      if (!commitResult.success) {
        return NextResponse.json(
          { error: "GitHub commit failed", details: commitResult.error },
          { status: 500 },
        );
      }

      return NextResponse.json({
        mode: "github",
        results: files.map((f) => ({ path: f.path, success: true })),
        summary: {
          total: files.length,
          success: files.length,
          failed: 0,
        },
        siteUrl: `/${siteId}`,
        commitSha: commitResult.commitSha,
        commitUrl: commitResult.commitUrl,
      });
    }

    // Local mode — write files to disk as before
    const results = await generateSiteFiles(
      siteId,
      siteType,
      validation.data,
      logoPaths || [],
      videoLinks || [],
    );

    const successes = results.filter((r) => r.success);
    const failures = results.filter((r) => !r.success);

    return NextResponse.json({
      mode: "local",
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
