import type { Metadata } from "next";
import { SpinContent } from "@/components/music-site/spin-content";

export const metadata: Metadata = {
  title: "Spin",
  description: "Spin a random item from the Jawbox catalog.",
};

export default function JawboxSpinPage() {
  return <SpinContent />;
}
