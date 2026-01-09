import { NextResponse } from "next/server"
import { getTeamSchedule, getGameUniforms } from "@/lib/mlb-api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const teamId = searchParams.get("teamId")
  const season = searchParams.get("season")

  if (!teamId) {
    return NextResponse.json({ error: "teamId is required" }, { status: 400 })
  }

  try {
    // Get recent completed games for this team
    const games = await getTeamSchedule(Number.parseInt(teamId), season ? Number.parseInt(season) : undefined, 10)

    if (games.length === 0) {
      return NextResponse.json({ uniforms: [], message: "No recent games found" })
    }

    // Get uniform data for these games
    const gamePks = games.map((g) => g.gamePk)
    const uniforms = await getGameUniforms(gamePks)

    // Merge game info with uniform data
    const result = games.map((game) => {
      const uniformData = uniforms.find((u) => u.gamePk === game.gamePk)
      return {
        ...game,
        uniforms: uniformData,
      }
    })

    return NextResponse.json({ uniforms: result })
  } catch (error) {
    console.error("Error fetching uniforms:", error)
    return NextResponse.json({ error: "Failed to fetch uniform data" }, { status: 500 })
  }
}
