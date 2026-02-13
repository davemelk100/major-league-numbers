import type { Metadata } from "next";
import { PGAAskContent } from "@/components/pga/pga-ask-content";

export const metadata: Metadata = {
  title: "ChatPGA",
  description: "Ask questions about PGA Tour golf.",
};

export default function PGAAskPage() {
  return <PGAAskContent />;
}
