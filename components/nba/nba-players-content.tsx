"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { NBALeaderCategory } from "@/lib/nba-api";
import { getPlayerHeadshotUrl } from "@/lib/nba-api";

interface NBAPlayersContentProps {
  leaderCategories: NBALeaderCategory[];
}

export function NBAPlayersContent({ leaderCategories }: NBAPlayersContentProps) {
  const [activeTab, setActiveTab] = useState(leaderCategories[0]?.name || "");

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Stat Leaders</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex-wrap h-auto gap-1">
          {leaderCategories.slice(0, 8).map((cat) => (
            <TabsTrigger key={cat.name} value={cat.name} className="text-xs sm:text-sm">
              {cat.displayName}
            </TabsTrigger>
          ))}
        </TabsList>

        {leaderCategories.map((cat) => (
          <TabsContent key={cat.name} value={cat.name}>
            <Card>
              <CardContent className="p-4">
                <div className="grid gap-3">
                  {cat.leaders.slice(0, 20).map((leader, idx) => (
                    <Link
                      key={leader.id}
                      href={`/nba/players/${leader.id}`}
                      className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm text-muted-foreground w-6">{idx + 1}</span>
                      <Image
                        src={leader.headshot || getPlayerHeadshotUrl(leader.id)}
                        alt={leader.name}
                        width={40}
                        height={40}
                        className="rounded-full bg-muted"
                        unoptimized
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{leader.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {leader.teamAbbrev} · {leader.position}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-primary">{leader.displayValue}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
