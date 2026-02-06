import type { Metadata } from "next";
import { NBAPlayerContent } from "@/components/nba/nba-player-content";
import { getNBAPlayer } from "@/lib/nba-api";

export const revalidate = 300;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const playerData = await getNBAPlayer(id);
  const name = playerData?.athlete?.displayName || "Player";

  return {
    title: name,
    description: `Stats and info for ${name}`,
  };
}

export default async function NBAPlayerPage({ params }: Props) {
  const { id } = await params;
  const playerData = await getNBAPlayer(id);

  return <NBAPlayerContent playerData={playerData} playerId={id} />;
}
