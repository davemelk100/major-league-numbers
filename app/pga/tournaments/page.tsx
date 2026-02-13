import type { Metadata } from "next";
import { PGATournamentsContent } from "@/components/pga/pga-tournaments-content";
import { getPGAScoreboard } from "@/lib/pga-api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Tournaments",
  description: "PGA Tour tournament schedule and results.",
};

export default async function PGATournamentsPage() {
  const scoreboardData = await getPGAScoreboard().catch(() => null);
  return <PGATournamentsContent scoreboardData={scoreboardData} />;
}
