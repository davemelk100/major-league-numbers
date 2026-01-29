import type { Metadata } from "next";
import { SpinContent } from "@/components/music-site/spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Spin a random item from the AmRep catalog.",
};

export default function AmrepSpinPage() {
  return <SpinContent />;
}
