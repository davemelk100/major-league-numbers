import type { Metadata } from "next";
import { PGAPlayerContent } from "@/components/pga/pga-player-content";
import { getPGAPlayer } from "@/lib/pga-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await getPGAPlayer(id);
    const name = data.athlete?.displayName || `Player ${id}`;
    return {
      title: name,
      description: `${name} stats and details.`,
    };
  } catch {
    return {
      title: `Player ${id}`,
      description: "PGA Tour player stats and details.",
    };
  }
}

export default async function PGAPlayerPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getPGAPlayer(id);
  return <PGAPlayerContent playerData={data} playerId={id} />;
}
