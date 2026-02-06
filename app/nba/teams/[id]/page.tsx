import type { Metadata } from "next";
import { NBATeamContent } from "@/components/nba/nba-team-content";
import { getNBATeam, getNBATeamRoster } from "@/lib/nba-api";

export const revalidate = 300;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const team = await getNBATeam(id);
  const name = team?.displayName || "Team";

  return {
    title: name,
    description: `Roster and info for the ${name}`,
  };
}

export default async function NBATeamPage({ params }: Props) {
  const { id } = await params;
  const [team, roster] = await Promise.all([
    getNBATeam(id),
    getNBATeamRoster(id),
  ]);

  return <NBATeamContent team={team} roster={roster} />;
}
