import type { Metadata } from "next";
import { E6DashboardContent } from "@/components/e6/e6-dashboard-content";

export const metadata: Metadata = {
  title: "Elephant 6 Recording Company",
  description:
    "Explore the Elephant 6 Recording Company: artists, releases, collective history, and milestones.",
};

export const revalidate = 60;

export default function E6Page() {
  return <E6DashboardContent />;
}
