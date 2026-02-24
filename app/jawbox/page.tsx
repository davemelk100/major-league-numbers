import type { Metadata } from "next";
import { JawboxDashboardContent } from "@/components/jawbox/jawbox-dashboard-content";

export const metadata: Metadata = {
  title: "Jawbox",
  description:
    "Explore Jawbox: artist roster, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function JawboxPage() {
  return <JawboxDashboardContent />;
}
