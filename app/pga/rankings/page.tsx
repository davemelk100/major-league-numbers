import type { Metadata } from "next";
import { PGARankingsContent } from "@/components/pga/pga-rankings-content";
import { getPGALeaders } from "@/lib/pga-api";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Rankings",
  description: "PGA Tour FedEx Cup rankings.",
};

export default async function PGARankingsPage() {
  const leaderCategories = await getPGALeaders().catch(() => []);
  return <PGARankingsContent leaderCategories={leaderCategories} />;
}
