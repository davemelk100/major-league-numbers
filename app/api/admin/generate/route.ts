import { NextResponse } from "next/server";
import { generateText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { openai } from "@ai-sdk/openai";
import { generatedSiteDataSchema } from "@/lib/admin/schemas";
import { getMusicSystemPrompt, getSportsSystemPrompt } from "@/lib/admin/prompts";

const ADMIN_PASSCODE = "6231839";

function validatePasscode(request: Request): boolean {
  return request.headers.get("x-admin-passcode") === ADMIN_PASSCODE;
}

export const maxDuration = 120;

export async function POST(request: Request) {
  if (!validatePasscode(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { siteType, siteId, siteName, content, extractedText, logoPaths } = body;

    if (!siteType || !siteId || !siteName) {
      return NextResponse.json(
        { error: "siteType, siteId, and siteName are required" },
        { status: 400 },
      );
    }

    const systemPrompt =
      siteType === "music" ? getMusicSystemPrompt() : getSportsSystemPrompt();

    const userContent = [
      `Site Type: ${siteType}`,
      `Site ID: ${siteId}`,
      `Site Name: ${siteName}`,
      "",
      "--- User-Provided Content ---",
      content || "(no content provided)",
      "",
      extractedText ? `--- Extracted File Content ---\n${extractedText}` : "",
      "",
      logoPaths?.length ? `Logo paths: ${logoPaths.join(", ")}` : "",
      "",
      "Generate the complete site data JSON now.",
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

    // Parse and validate the response
    let parsed: unknown;
    try {
      // Strip markdown fences if present
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

    const validation = generatedSiteDataSchema.safeParse(parsed);
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

    return NextResponse.json(validation.data);
  } catch (error) {
    console.error("[ADMIN] Generate error:", error);
    return NextResponse.json(
      { error: "Generation failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
