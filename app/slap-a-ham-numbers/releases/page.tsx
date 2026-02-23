import type { Metadata } from "next";
import { SlapAHamNumbersAlbumsContent } from "@/components/slap-a-ham-numbers/slap-a-ham-numbers-albums-content";

export const metadata: Metadata = {
  title: "Releases",
  description: "Browse releases from the Slap-A-Ham Numbers catalog.",
};

export default function SlapAHamNumbersAlbumsPage() {
  return <SlapAHamNumbersAlbumsContent />;
}
