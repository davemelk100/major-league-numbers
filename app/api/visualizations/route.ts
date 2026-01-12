import { type NextRequest, NextResponse } from "next/server";
import { getLeadersByLeague } from "@/lib/mlb-api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const season = Number.parseInt(searchParams.get("season") || "2024");

  try {
    const [
      hrLeadersAL,
      hrLeadersNL,
      kLeadersAL,
      kLeadersNL,
      rbiLeadersAL,
      rbiLeadersNL,
    ] = await Promise.all([
      getLeadersByLeague("hitting", "homeRuns", 103, season, 10),
      getLeadersByLeague("hitting", "homeRuns", 104, season, 10),
      getLeadersByLeague("pitching", "strikeouts", 103, season, 10),
      getLeadersByLeague("pitching", "strikeouts", 104, season, 10),
      getLeadersByLeague("hitting", "runsBattedIn", 103, season, 10),
      getLeadersByLeague("hitting", "runsBattedIn", 104, season, 10),
    ]);

    return NextResponse.json({
      hrLeadersAL,
      hrLeadersNL,
      kLeadersAL,
      kLeadersNL,
      rbiLeadersAL,
      rbiLeadersNL,
    });
  } catch (error) {
    console.error("Failed to fetch visualization data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
