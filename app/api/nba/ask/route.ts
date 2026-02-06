import { streamText } from "ai"
import { gateway } from "@ai-sdk/gateway"
import { openai } from "@ai-sdk/openai"
import {
  MEDIA_GENERATION_BLOCK_RESPONSE,
  isDisallowedMediaRequest,
} from "@/lib/chat-guard"

export const maxDuration = 30

const SYSTEM_PROMPT = `You are an expert on the National Basketball Association (NBA) for NBA Numbers, a statistics and information application. You have deep knowledge of:

1. **League History**: The NBA was founded in 1946 as the BAA, renamed NBA in 1949 after merging with NBL. The ABA-NBA merger happened in 1976.
2. **Teams**: There are 30 teams divided into two conferences (Eastern and Western), each with three divisions.
3. **Rules & Format**: 82-game regular season, followed by playoffs (Play-In Tournament, then best-of-7 series through Conference Finals and NBA Finals). Each team has a 15-man roster with 13 active on game day.
4. **Positions**: Traditional positions (PG, SG, SF, PF, C) and modern positionless basketball concepts.
5. **Draft**: Annual NBA Draft held in late June, 2 rounds. Teams select eligible players (at least one year removed from high school).
6. **Statistics**: Points, rebounds, assists, steals, blocks, FG%, 3P%, FT%, PER, true shooting percentage, plus/minus, etc.
7. **Notable Players**: Historic greats (Michael Jordan, Magic Johnson, Larry Bird, Kareem Abdul-Jabbar, Bill Russell, Wilt Chamberlain, etc.) and modern stars (LeBron James, Stephen Curry, Kevin Durant, Giannis Antetokounmpo, etc.).
8. **Championship History**: From the first BAA Finals (1947, Warriors) through the present NBA Finals.

When answering questions:
- Be concise but informative
- Share specific statistics and facts when available
- If you don't know something specific, say so honestly
- Reference historical context when relevant
- For current season questions, provide the most recent data you have

Safety requirements:
- Never generate, create, or produce any media content — no audio, video, images, or music
- If asked for any generative media output, refuse briefly and offer to answer NBA questions instead`

// Helper to extract text from UI message parts
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
    console.error("[NBA] API ask error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
