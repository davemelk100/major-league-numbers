import { type NextRequest, NextResponse } from "next/server"
import { searchPlayers, getTeams, getDefaultSeason } from "@/lib/mlb-api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query || query.length < 2) {
    return NextResponse.json({ players: [], teams: [] })
  }

  try {
    const queryLower = query.toLowerCase()

    // Search players and teams in parallel
    const [players, allTeams] = await Promise.all([
      searchPlayers(query),
      getTeams(getDefaultSeason()),
    ])

    // Filter teams by name, teamName, or abbreviation
    const teams = allTeams.filter((team) =>
      team.name?.toLowerCase().includes(queryLower) ||
      team.teamName?.toLowerCase().includes(queryLower) ||
      team.abbreviation?.toLowerCase().includes(queryLower) ||
      team.locationName?.toLowerCase().includes(queryLower)
    ).slice(0, 5) // Limit to 5 teams

    return NextResponse.json({ players, teams })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ players: [], teams: [] })
  }
}
