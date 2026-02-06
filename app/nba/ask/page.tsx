import type { Metadata } from "next";
import { NBAAskContent } from "@/components/nba/nba-ask-content";

export const metadata: Metadata = {
  title: "ChatNBA",
  description: "Ask questions about NBA basketball.",
};

export default function NBAAskPage() {
  return <NBAAskContent />;
}
