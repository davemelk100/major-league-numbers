import { type NextRequest, NextResponse } from "next/server"
import { getTeams, getDefaultSeason } from "@/lib/mlb-api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const season = Number(searchParams.get("season")) || getDefaultSeason()

  try {
    const teams = await getTeams(season)
    return NextResponse.json({ teams, season })
  } catch (error) {
    console.error("Error fetching teams:", error)
    return NextResponse.json({ teams: [], season }, { status: 500 })
  }
}
