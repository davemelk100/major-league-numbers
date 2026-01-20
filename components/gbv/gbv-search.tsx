"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function GbvSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/gbv/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        type="search"
        placeholder="Search albums, songs, members..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-12 pr-10 text-white placeholder:text-white/70"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/80 hover:text-white !text-white"
      >
        <Search className="h-4 w-4 !text-white" />
      </button>
    </form>
  );
}
