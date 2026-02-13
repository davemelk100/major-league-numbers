"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PGAPlayerHeadshot } from "@/components/pga/pga-player-headshot";
import type { PGALeaderCategory } from "@/lib/pga-api";

interface PGAPlayersContentProps {
  leaderCategories: PGALeaderCategory[];
}

export function PGAPlayersContent({ leaderCategories }: PGAPlayersContentProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (leaderCategories.length === 0) {
    return (
      <div className="container py-6">
        <h1 className="font-league mb-6">Players</h1>
        <p className="text-muted-foreground">No leader data available.</p>
      </div>
    );
  }

  const activeCategory = leaderCategories[activeTab];

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Players</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {leaderCategories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors whitespace-nowrap ${
              activeTab === i
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted/50 text-muted-foreground"
            }`}
          >
            {cat.displayName}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {activeCategory?.leaders.map((player) => (
          <Link key={player.id} href={`/pga/players/${player.id}`}>
            <Card className="hover:bg-secondary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-1.5 pl-3">
                <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    <PGAPlayerHeadshot src={player.headshot} alt={player.name} size={96} className="rounded-lg h-24" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{player.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary">Golf</Badge>
                    </div>
                    <p className="text-sm font-bold mt-1">{player.displayValue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
