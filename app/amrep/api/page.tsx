import type { Metadata } from "next";
import { AmrepApiDocsContent } from "@/components/amrep/amrep-api-docs-content";

export const metadata: Metadata = {
  title: "API",
  description: "Public API documentation for Amphetamine Reptile Records data.",
};

export default function AmrepApiPage() {
  return <AmrepApiDocsContent />;
}
