import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { openai } from "@ai-sdk/openai";
import { searchTouchGoRecordsSources, type TouchGoRecordsSourceDoc } from "@/lib/touch-go-records-knowledge";
import {
  MEDIA_GENERATION_BLOCK_RESPONSE,
  isDisallowedMediaRequest,
} from "@/lib/chat-guard";

export const maxDuration = 30;

const SYSTEM_PROMPT = "You are an expert on Touch & Go Records. Answer questions about artists, releases, history, and milestones. Be concise and grounded in facts. If unsure, say so. Never generate media content.";

function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  if (!parts || !Array.isArray(parts)) return "";
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

function formatSourceContext(sources: TouchGoRecordsSourceDoc[]): string {
  if (sources.length === 0) return "No sources available.";

  return sources
    .map((source) => {
      const label = source.sourceLabel || "Source";
      const url = source.sourceUrl ? ` (${source.sourceUrl})` : "";
      return `- ${label}${url}\n${source.text}`;
    })
    .join("\n\n");
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const coreMessages: Array<{ role: "user" | "assistant"; content: string }> =
      messages.map(
        (msg: {
          role: string;
          content?: string;
          parts?: Array<{ type: string; text?: string }>;
        }) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content || getTextFromParts(msg.parts || []),
        })
      );

    const lastUserMessage = [...coreMessages]
      .reverse()
      .find((message) => message.role === "user")?.content ?? "";

    if (isDisallowedMediaRequest(lastUserMessage)) {
      return new Response(
        JSON.stringify({ error: MEDIA_GENERATION_BLOCK_RESPONSE }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      );
    }

    const sources = searchTouchGoRecordsSources(lastUserMessage, 6);
    const sourceContext = formatSourceContext(sources);

    const model = process.env.OPENAI_API_KEY
      ? openai("gpt-4o-mini")
      : gateway("openai/gpt-4o-mini");

    const result = streamText({
      model,
      system: `${SYSTEM_PROMPT}\n\nSource context:\n${sourceContext}`,
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[TOUCH-GO-RECORDS] API ask error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
