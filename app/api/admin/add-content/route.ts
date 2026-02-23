import { NextResponse } from "next/server";
import { generateText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const ADMIN_PASSCODE = "6231839";

function validatePasscode(request: Request): boolean {
  return request.headers.get("x-admin-passcode") === ADMIN_PASSCODE;
}

export const maxDuration = 120;

const addContentResultSchema = z.object({
  artists: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
    }),
  ),
  releases: z.array(
    z.object({
      catalogNo: z.string().optional(),
      title: z.string(),
      artist: z.string(),
      year: z.number().nullable().optional(),
      format: z.string().nullable().optional(),
      highlight: z.string().optional(),
    }),
  ),
  trivia: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()).length(4),
      correctAnswer: z.number().min(0).max(3),
      explanation: z.string(),
      category: z.enum(["history", "artists", "releases", "facts"]),
    }),
  ),
  timeline: z.array(
    z.object({
      year: z.number(),
      title: z.string(),
      description: z.string(),
    }),
  ),
});

async function readExistingSummary(siteId: string): Promise<string> {
  const root = process.cwd();
  const summaryParts: string[] = [];

  try {
    const artistsFile = await fs.readFile(
      path.join(root, `lib/${siteId}-artists-data.ts`),
      "utf-8",
    );
    const artistNames = [...artistsFile.matchAll(/name:\s*"([^"]+)"/g)].map(
      (m) => m[1],
    );
    summaryParts.push(`Existing artists (${artistNames.length}): ${artistNames.join(", ")}`);
  } catch {
    summaryParts.push("No existing artists file found.");
  }

  try {
    const releasesFile = await fs.readFile(
      path.join(root, `lib/${siteId}-releases-data.ts`),
      "utf-8",
    );
    const releaseTitles = [
      ...releasesFile.matchAll(/title:\s*"([^"]+)"/g),
    ].map((m) => m[1]);
    summaryParts.push(
      `Existing releases (${releaseTitles.length}): ${releaseTitles.slice(0, 50).join(", ")}${releaseTitles.length > 50 ? "..." : ""}`,
    );
  } catch {
    summaryParts.push("No existing releases file found.");
  }

  return summaryParts.join("\n");
}

export async function POST(request: Request) {
  if (!validatePasscode(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { siteId, siteName, content, extractedText } = body;

    if (!siteId || !siteName) {
      return NextResponse.json(
        { error: "siteId and siteName are required" },
        { status: 400 },
      );
    }

    const existingSummary = await readExistingSummary(siteId);

    const systemPrompt = `You are a content generator for an existing music label fan site called "${siteName}".

The site already has data. Your job is to generate ONLY NEW items from the provided content.
DO NOT duplicate any existing artists or releases.

## Existing Data Summary
${existingSummary}

## Output Schema
Return a JSON object with these arrays (any can be empty if no new items):
- artists: Array of { name: string, description?: string }
- releases: Array of { catalogNo?: string, title: string, artist: string, year?: number, format?: string, highlight?: string }
- trivia: Array of { question: string, options: string[4], correctAnswer: number (0-3), explanation: string, category: "history"|"artists"|"releases"|"facts" }
- timeline: Array of { year: number, title: string, description: string }

Return ONLY valid JSON, no markdown fences.`;

    const userContent = [
      `Site: ${siteName} (${siteId})`,
      "",
      "--- New Content to Process ---",
      content || "(no content provided)",
      "",
      extractedText ? `--- Extracted File Content ---\n${extractedText}` : "",
      "",
      "Generate ONLY new items that don't already exist in the site data.",
    ]
      .filter(Boolean)
      .join("\n");

    const model = process.env.OPENAI_API_KEY
      ? openai("gpt-4o-mini")
      : gateway("openai/gpt-4o-mini");

    const result = await generateText({
      model,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }],
      maxTokens: 16000,
    });

    let parsed: unknown;
    try {
      let text = result.text.trim();
      if (text.startsWith("```")) {
        text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
      }
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "AI returned invalid JSON", raw: result.text },
        { status: 422 },
      );
    }

    const validation = addContentResultSchema.safeParse(parsed);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "AI output failed validation",
          issues: validation.error.issues,
          raw: parsed,
        },
        { status: 422 },
      );
    }

    // Log token usage
    if (result.usage) {
      console.log(
        `[ADMIN] Add-content token usage — prompt: ${result.usage.promptTokens}, completion: ${result.usage.completionTokens}, total: ${result.usage.totalTokens}`,
      );
    }

    return NextResponse.json(validation.data);
  } catch (error) {
    console.error("[ADMIN] Add content error:", error);
    return NextResponse.json(
      {
        error: "Content generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
