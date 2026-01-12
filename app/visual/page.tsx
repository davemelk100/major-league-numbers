import { VisualizationsContent } from "@/components/visualizations-content";
import { getDefaultSeason } from "@/lib/mlb-api";

export const metadata = {
  title: "Data Visualizations | Major League Numbers",
  description: "Interactive baseball statistics visualizations and charts",
};

export const dynamic = "force-dynamic";

export default function VisualizationsPage() {
  const defaultSeason = getDefaultSeason();

  return <VisualizationsContent initialSeason={defaultSeason} />;
}
