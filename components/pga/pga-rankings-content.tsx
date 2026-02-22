"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PGAPlayerHeadshot } from "@/components/pga/pga-player-headshot";
import type { PGALeaderCategory } from "@/lib/pga-api";

interface PGARankingsContentProps {
  leaderCategories: PGALeaderCategory[];
}

export function PGARankingsContent({ leaderCategories }: PGARankingsContentProps) {
  // Try to find FedEx Cup points or similar rankings category
  const rankingsCategory = leaderCategories.find(
    (cat) =>
      cat.name.toLowerCase().includes("cup") ||
      cat.name.toLowerCase().includes("points") ||
      cat.name.toLowerCase().includes("fedex") ||
      cat.displayName.toLowerCase().includes("cup") ||
      cat.displayName.toLowerCase().includes("points") ||
      cat.displayName.toLowerCase().includes("fedex")
  ) || leaderCategories.find(
    (cat) =>
      cat.name.toLowerCase().includes("earnings") ||
      cat.displayName.toLowerCase().includes("earnings") ||
      cat.name.toLowerCase().includes("money")
  ) || leaderCategories[0];

  const [selectedCategory, setSelectedCategory] = useState(
    rankingsCategory ? leaderCategories.indexOf(rankingsCategory) : 0
  );

  if (leaderCategories.length === 0) {
    return (
      <div className="container py-6">
        <h1 className="font-league mb-6">Rankings</h1>
        <p className="text-muted-foreground">No ranking data available.</p>
      </div>
    );
  }

  const activeCategory = leaderCategories[selectedCategory];

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Rankings</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {leaderCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(i)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap ${
              selectedCategory === i
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            {cat.displayName}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="mb-4">{activeCategory?.displayName}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-2 w-12">Rank</th>
                  <th className="text-left py-2 pr-4">Player</th>
                  <th className="text-right py-2 px-2">{activeCategory?.displayName}</th>
                </tr>
              </thead>
              <tbody>
                {activeCategory?.leaders.map((player, idx) => (
                  <tr key={player.id} className="border-b last:border-0">
                    <td className="py-2 pr-2 font-medium">{idx + 1}</td>
                    <td className="py-2 pr-4">
                      <Link
                        href={`/pga/players/${player.id}`}
                        className="hover:underline flex items-center gap-2"
                      >
                        <PGAPlayerHeadshot src={player.headshot} alt={player.name} size={32} />
                        <span className="font-medium">{player.name}</span>
                      </Link>
                    </td>
                    <td className="text-right py-2 px-2 font-bold">{player.displayValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
