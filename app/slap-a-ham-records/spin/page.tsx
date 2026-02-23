import type { Metadata } from "next";
import { SpinContent } from "@/components/music-site/spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Spin a random item from the Slap-A-Ham Numbers catalog.",
};

export default function SlapAHamRecordsSpinPage() {
  return <SpinContent />;
}
