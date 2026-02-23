import type { Metadata } from "next";
import { SlapAHamRecordsDashboardContent } from "@/components/slap-a-ham-records/slap-a-ham-records-dashboard-content";

export const metadata: Metadata = {
  title: "Slap-A-Ham Numbers",
  description:
    "Explore Slap-A-Ham Numbers: artist roster, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function SlapAHamRecordsPage() {
  return <SlapAHamRecordsDashboardContent />;
}
