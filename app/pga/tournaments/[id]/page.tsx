import type { Metadata } from "next";
import { PGATournamentContent } from "@/components/pga/pga-tournament-content";
import { getPGAScoreboard, parseScoreboardTournament } from "@/lib/pga-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await getPGAScoreboard();
    const tournament = parseScoreboardTournament(data);
    const name = tournament?.name || `Tournament ${id}`;
    return {
      title: name,
      description: `${name} leaderboard and results.`,
    };
  } catch {
    return {
      title: `Tournament ${id}`,
      description: "PGA Tour tournament leaderboard.",
    };
  }
}

export default async function PGATournamentPage({ params }: PageProps) {
  await params;
  const data = await getPGAScoreboard().catch(() => null);
  const tournament = data ? parseScoreboardTournament(data) : null;
  return <PGATournamentContent tournament={tournament} />;
}
