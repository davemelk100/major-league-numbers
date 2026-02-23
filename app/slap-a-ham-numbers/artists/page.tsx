import type { Metadata } from "next";
import { SlapAHamNumbersMembersContent } from "@/components/slap-a-ham-numbers/slap-a-ham-numbers-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the Slap-A-Ham Numbers artist roster.",
};

export default function SlapAHamNumbersMembersPage() {
  return <SlapAHamNumbersMembersContent />;
}
