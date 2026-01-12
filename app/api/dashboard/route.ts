import { type NextRequest, NextResponse } from "next/server";
import { getLeaders, getLeadersByLeague, getStandings } from "@/lib/mlb-api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const season = Number.parseInt(searchParams.get("season") || "2024");

  try {
    const [
      hrLeaders,
      avgLeaders,
      eraLeaders,
      kLeaders,
      standings,
      hrLeadersALTop,
      hrLeadersNLTop,
      avgLeadersALTop,
      avgLeadersNLTop,
      eraLeadersALTop,
      eraLeadersNLTop,
      avgLeadersALTable,
      avgLeadersNLTable,
      eraLeadersALTable,
      eraLeadersNLTable,
      
      kLeadersALTable,
      kLeadersNLTable,
      hrLeadersALTable,
      hrLeadersNLTable,
    ] = await Promise.all([
      getLeaders("hitting", "homeRuns", season, 10),
      getLeaders("hitting", "battingAverage", season, 10),
      getLeaders("pitching", "earnedRunAverage", season, 10),
      getLeaders("pitching", "strikeouts", season, 10),
      getStandings(season),
      getLeadersByLeague("hitting", "homeRuns", 103, season, 1),
      getLeadersByLeague("hitting", "homeRuns", 104, season, 1),
      getLeadersByLeague("hitting", "battingAverage", 103, season, 1),
      getLeadersByLeague("hitting", "battingAverage", 104, season, 1),
      getLeadersByLeague("pitching", "earnedRunAverage", 103, season, 1),
      getLeadersByLeague("pitching", "earnedRunAverage", 104, season, 1),
      getLeadersByLeague("hitting", "battingAverage", 103, season, 5),
      getLeadersByLeague("hitting", "battingAverage", 104, season, 5),
      getLeadersByLeague("pitching", "earnedRunAverage", 103, season, 5),
      getLeadersByLeague("pitching", "earnedRunAverage", 104, season, 5),
      getLeadersByLeague("pitching", "strikeouts", 103, season, 5),
      getLeadersByLeague("pitching", "strikeouts", 104, season, 5),
      getLeadersByLeague("hitting", "homeRuns", 103, season, 5),
      getLeadersByLeague("hitting", "homeRuns", 104, season, 5),
    ]);

    return NextResponse.json({
      hrLeaders,
      avgLeaders,
      eraLeaders,
      kLeaders,
      standings,
      leagueLeaders: {
        hr: { al: hrLeadersALTop[0], nl: hrLeadersNLTop[0] },
        avg: { al: avgLeadersALTop[0], nl: avgLeadersNLTop[0] },
        era: { al: eraLeadersALTop[0], nl: eraLeadersNLTop[0] },
      },
      tableLeaders: {
        hr: { al: hrLeadersALTable, nl: hrLeadersNLTable },
        avg: { al: avgLeadersALTable, nl: avgLeadersNLTable },
        era: { al: eraLeadersALTable, nl: eraLeadersNLTable },
        k: { al: kLeadersALTable, nl: kLeadersNLTable },
      },
    });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
