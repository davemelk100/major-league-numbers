import { type NextRequest, NextResponse } from "next/server"
import { getTeamHistory, getDefaultSeason } from "@/lib/mlb-api"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const teamId = Number.parseInt(id, 10)
  const defaultSeason = getDefaultSeason()

  try {
    const history = await getTeamHistory(teamId, 1960, defaultSeason)

    return NextResponse.json(
      { history },
      {
        headers: {
          // Cache for 1 day since historical data rarely changes
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      },
    )
  } catch (error) {
    console.error("Error fetching team history:", error)
    return NextResponse.json({ error: "Failed to fetch team history" }, { status: 500 })
  }
}
