import type { Metadata } from "next";
import { NBATeamsContent } from "@/components/nba/nba-teams-content";
import { getNBAStandings } from "@/lib/nba-api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Teams",
  description: "Browse all 30 NBA teams.",
};

export default async function NBATeamsPage() {
  const standings = await getNBAStandings();
  return <NBATeamsContent standings={standings} />;
}
