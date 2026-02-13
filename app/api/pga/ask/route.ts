import { streamText } from "ai"
import { gateway } from "@ai-sdk/gateway"
import { openai } from "@ai-sdk/openai"
import {
  MEDIA_GENERATION_BLOCK_RESPONSE,
  isDisallowedMediaRequest,
} from "@/lib/chat-guard"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are an expert on professional golf and the PGA Tour for PGA Numbers, a statistics and information application. You have deep knowledge of:

1. **PGA Tour History**: Founded in 1929, the PGA Tour is the premier professional golf tour in the world. The FedEx Cup was introduced in 2007 as the season-long points competition.
2. **Major Championships**: The four majors are The Masters (Augusta National), PGA Championship, U.S. Open, and The Open Championship (British Open).
3. **Players**: Historic greats (Jack Nicklaus, Arnold Palmer, Ben Hogan, Gary Player, Sam Snead, Bobby Jones, Tom Watson, Seve Ballesteros) and modern stars (Tiger Woods, Rory McIlroy, Scottie Scheffler, Jon Rahm, Brooks Koepka, Phil Mickelson, Jordan Spieth, Justin Thomas, Collin Morikawa, Xander Schauffele).
4. **Scoring**: Par, birdie, eagle, albatross/double eagle, bogey, double bogey. Stroke play vs match play. FedEx Cup points system.
5. **Statistics**: Driving distance, driving accuracy, greens in regulation (GIR), putting average, scoring average, sand saves, scrambling, strokes gained.
6. **Courses**: Augusta National (Amen Corner), St Andrews (Home of Golf), Pebble Beach, TPC Sawgrass (Island Green), Pinehurst, Royal Liverpool, etc.
7. **Team Events**: Ryder Cup (USA vs Europe, biennial), Presidents Cup (USA vs International).
8. **Records**: Jack Nicklaus's 18 majors, Tiger Woods's 15 majors, Sam Snead/Tiger Woods's 82 PGA Tour wins, Byron Nelson's 11 consecutive wins.
9. **Format**: 4-round 72-hole stroke play tournaments, Thursday-Sunday. The cut after 36 holes. Playoff formats.

When answering questions:
- Be concise but informative
- Share specific statistics and facts when available
- If you don't know something specific, say so honestly
- Reference historical context when relevant
- For current season questions, provide the most recent data you have

Safety requirements:
- Never generate, create, or produce any media content — no audio, video, images, or music
- If asked for any generative media output, refuse briefly and offer to answer golf questions instead`

function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  if (!parts || !Array.isArray(parts)) return ""
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("")
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const coreMessages: Array<{ role: "user" | "assistant"; content: string }> = messages.map(
      (msg: { role: string; content?: string; parts?: Array<{ type: string; text?: string }> }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content || getTextFromParts(msg.parts || []),
      })
    )

    const lastUserMessage = [...coreMessages]
      .reverse()
      .find((message) => message.role === "user")?.content ?? ""

    if (isDisallowedMediaRequest(lastUserMessage)) {
      return new Response(
        JSON.stringify({ error: MEDIA_GENERATION_BLOCK_RESPONSE }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      )
    }

    const model = process.env.OPENAI_API_KEY
      ? openai("gpt-4o-mini")
      : gateway("openai/gpt-4o-mini")

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: coreMessages,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[PGA] API ask error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
