import type { Metadata } from "next";
import { SlapAHamNumbersDashboardContent } from "@/components/slap-a-ham-numbers/slap-a-ham-numbers-dashboard-content";

export const metadata: Metadata = {
  title: "Slap-A-Ham Numbers",
  description:
    "Explore Slap-A-Ham Numbers: artist roster, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function SlapAHamNumbersPage() {
  return <SlapAHamNumbersDashboardContent />;
}
