import { DashboardContent } from "@/components/dashboard-content";
import { getDefaultSeason } from "@/lib/mlb-api";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const defaultSeason = getDefaultSeason();

  return <DashboardContent initialSeason={defaultSeason} />;
}
