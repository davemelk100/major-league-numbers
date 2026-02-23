import type { Metadata } from "next";
import { DischordDashboardContent } from "@/components/dischord/dischord-dashboard-content";

export const metadata: Metadata = {
  title: "Dischord Records",
  description:
    "Explore Dischord Records: artist roster, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function DischordPage() {
  return <DischordDashboardContent />;
}
