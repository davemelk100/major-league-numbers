import type { Metadata } from "next";
import { NBAStandingsContent } from "@/components/nba/nba-standings-content";
import { getNBAStandings } from "@/lib/nba-api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Standings",
  description: "Current NBA standings by conference.",
};

export default async function NBAStandingsPage() {
  const standings = await getNBAStandings();
  return <NBAStandingsContent standings={standings} />;
}
