import type { Metadata } from "next";
import { TouchGoRecordsDashboardContent } from "@/components/touch-go-records/touch-go-records-dashboard-content";

export const metadata: Metadata = {
  title: "Touch & Go Records",
  description:
    "Explore Touch & Go Records: artist roster, releases, label history, and milestones.",
};

export const revalidate = 60;

export default function TouchGoRecordsPage() {
  return <TouchGoRecordsDashboardContent />;
}
