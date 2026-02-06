import type { Metadata } from "next";
import { NBAPlayersContent } from "@/components/nba/nba-players-content";
import { getNBALeaders } from "@/lib/nba-api";

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: "Players",
  description: "Browse NBA stat leaders and players.",
};

export default async function NBAPlayersPage() {
  const leaderCategories = await getNBALeaders();
  return <NBAPlayersContent leaderCategories={leaderCategories} />;
}
