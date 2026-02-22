import type { Metadata } from "next";
import { E6MembersContent } from "@/components/e6/e6-members-content";

export const metadata: Metadata = {
  title: "Artists",
  description: "Explore the Elephant 6 Recording Company artist roster.",
};

export default function E6MembersPage() {
  return <E6MembersContent />;
}
