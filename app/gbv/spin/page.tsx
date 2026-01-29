import type { Metadata } from "next";
import { SpinContent } from "@/components/music-site/spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Zoetrope animation on a spinning vinyl record.",
};

export default function GbvSpinPage() {
  return <SpinContent />;
}
