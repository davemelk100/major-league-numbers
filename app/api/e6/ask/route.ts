import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { openai } from "@ai-sdk/openai";
import { searchE6Sources, type E6SourceDoc } from "@/lib/e6-knowledge";
import {
  MEDIA_GENERATION_BLOCK_RESPONSE,
  isDisallowedMediaRequest,
} from "@/lib/chat-guard";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an expert on the Elephant 6 Recording Company, the American musical collective founded in 1991. You have deep knowledge of:

1. **Collective History**: founded by Robert Schneider, Bill Doss, and Will Cullen Hart in Ruston, Louisiana; centered in Athens, Georgia
2. **Key Bands**: Neutral Milk Hotel, The Olivia Tremor Control, The Apples in Stereo, of Montreal, Elf Power, Circulatory System, Beulah, and others
3. **Notable Albums**: In the Aeroplane Over the Sea, Dusk at Cubist Castle, Fun Trick Noisemaker, and the broader E6 catalog
4. **Musical Style**: psychedelic pop, lo-fi recording, experimental approaches, communal recording ethos
5. **Related Projects**: Pet Sounds Studio, Orange Twin Records, Cloud Recordings, and the broader E6 network

When answering questions:
- Be concise and grounded in known facts
- Use the provided sources when possible
- If unsure, say so rather than guessing
- Avoid using emojis in your replies
- Never generate, create, or produce any media content — no audio, video, images, or music
- If asked for any generative media output, refuse briefly and offer to answer E6 questions instead`;

function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  if (!parts || !Array.isArray(parts)) return "";
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

function formatSourceContext(sources: E6SourceDoc[]): string {
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

    const sources = searchE6Sources(lastUserMessage, 6);
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
    console.error("[E6] API ask error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
