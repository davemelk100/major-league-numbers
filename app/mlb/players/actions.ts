"use server";

import {
  getAllPlayers,
  getLeaders,
  getPlayer,
  type Player,
} from "@/lib/mlb-api";

const FEATURED_LEADERS_PER_CATEGORY = 8;
const FEATURED_MAX = 12;

export async function fetchFeaturedPlayersForSeason(
  season: number,
): Promise<Player[]> {
  const [hrLeaders, avgLeaders] = await Promise.all([
    getLeaders("hitting", "homeRuns", season, FEATURED_LEADERS_PER_CATEGORY),
    getLeaders(
      "hitting",
      "battingAverage",
      season,
      FEATURED_LEADERS_PER_CATEGORY,
    ),
  ]);

  const seen = new Set<number>();
  const featured: Player[] = [];

  for (const leader of [...hrLeaders, ...avgLeaders]) {
    if (featured.length >= FEATURED_MAX) break;
    if (seen.has(leader.person.id)) continue;
    seen.add(leader.person.id);
    const player = await getPlayer(leader.person.id);
    if (player) featured.push(player);
  }

  return featured;
}

export async function fetchAllPlayersForSeason(
  season: number,
): Promise<Player[]> {
  return getAllPlayers(season);
}
