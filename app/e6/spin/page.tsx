import type { Metadata } from "next";
import { SpinContent } from "@/components/music-site/spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Spin a random item from the Elephant 6 Recording Company catalog.",
};

export default function E6SpinPage() {
  return <SpinContent />;
}
