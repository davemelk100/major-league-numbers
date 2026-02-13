import type { Metadata } from "next";
import { PGADashboardContent } from "@/components/pga/pga-dashboard-content";
import { getPGALeaders, getPGAScoreboard, parseScoreboardTournament } from "@/lib/pga-api";

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: "PGA Numbers",
  description: "PGA Tour player stats, tournament results, and rankings.",
};

export default async function PGAPage() {
  const [leaderCategories, scoreboardData] = await Promise.all([
    getPGALeaders().catch(() => []),
    getPGAScoreboard().catch(() => null),
  ]);

  // Take top 4 leader categories for the dashboard
  const leaders = leaderCategories.slice(0, 4).map((cat) => ({
    label: cat.displayName,
    leader: cat.leaders[0] || null,
  }));

  // Parse current tournament from scoreboard
  const currentTournament = scoreboardData ? parseScoreboardTournament(scoreboardData) : null;

  return (
    <PGADashboardContent
      leaders={leaders}
      currentTournament={currentTournament}
    />
  );
}
