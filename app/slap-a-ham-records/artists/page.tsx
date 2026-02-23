import type { Metadata } from "next";
import { SlapAHamRecordsMembersContent } from "@/components/slap-a-ham-records/slap-a-ham-records-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the Slap-A-Ham Numbers artist roster.",
};

export default function SlapAHamRecordsMembersPage() {
  return <SlapAHamRecordsMembersContent />;
}
