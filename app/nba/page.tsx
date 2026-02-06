import type { Metadata } from "next";
import { NBADashboardContent } from "@/components/nba/nba-dashboard-content";
import { getNBALeaders, getNBAStandings } from "@/lib/nba-api";

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: "NBA Numbers",
  description: "NBA player stats, team rosters, and league standings.",
};

export default async function NBAPage() {
  const [leaderCategories, standings] = await Promise.all([
    getNBALeaders(),
    getNBAStandings(),
  ]);

  // Take top 4 leader categories for the dashboard
  const leaders = leaderCategories.slice(0, 4).map((cat) => ({
    label: cat.displayName,
    leader: cat.leaders[0] || null,
  }));

  // Top 8 teams per conference for standings preview
  const standingsPreview = standings.flatMap((conf) =>
    conf.entries.slice(0, 8).map((entry) => ({
      team: entry.team.displayName,
      abbrev: entry.team.abbreviation,
      logo: entry.team.logoUrl,
      w: entry.wins,
      l: entry.losses,
      conference: conf.conference,
    }))
  );

  return (
    <NBADashboardContent
      leaders={leaders}
      standings={standingsPreview}
    />
  );
}
