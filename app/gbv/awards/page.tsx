import type { Metadata } from "next";
import { GbvAwardsContent } from "@/components/gbv/gbv-awards-content";

export const metadata: Metadata = {
  title: "Awards",
  description: "Guided By Voices awards and recognition.",
};

export default function GbvAwardsPage() {
  return <GbvAwardsContent />;
}
