"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { NBAConferenceStandings } from "@/lib/nba-api";

interface NBATeamsContentProps {
  standings: NBAConferenceStandings[];
}

export function NBATeamsContent({ standings }: NBATeamsContentProps) {
  const eastern = standings.find((c) => c.conference.toLowerCase().includes("east"));
  const western = standings.find((c) => c.conference.toLowerCase().includes("west"));

  const renderConference = (name: string, conf: NBAConferenceStandings | undefined) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{name}</h2>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        {conf?.entries.map((entry) => (
          <Link key={entry.team.id} href={`/nba/teams/${entry.team.id}`}>
            <Card className="hover:bg-muted/80 transition-colors cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                <Image
                  src={entry.team.logoUrl}
                  alt={entry.team.displayName}
                  width={48}
                  height={48}
                  className="flex-shrink-0"
                  unoptimized
                />
                <span className="text-sm font-medium">{entry.team.displayName}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Teams</h1>
      {renderConference("Eastern Conference", eastern)}
      {renderConference("Western Conference", western)}
    </div>
  );
}
