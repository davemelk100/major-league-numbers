"use server";

import { getTeams, type Team } from "@/lib/mlb-api";

export async function fetchTeamsForSeason(season: number): Promise<Team[]> {
  return getTeams(season);
}
