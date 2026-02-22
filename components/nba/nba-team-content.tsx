"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import type { NBARosterGroup } from "@/lib/nba-api";
import { getPlayerHeadshotUrl } from "@/lib/nba-api";

interface NBATeamContentProps {
  team: any;
  roster: NBARosterGroup[];
}

export function NBATeamContent({ team, roster }: NBATeamContentProps) {
  if (!team) {
    return (
      <div className="container py-6">
        <Link
          href="/nba/teams"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Teams
        </Link>
        <p className="text-muted-foreground">Team data not available.</p>
      </div>
    );
  }

  const logoUrl = team.logos?.[0]?.href || "";
  const record = team.record?.items?.[0]?.summary || "—";

  return (
    <div className="container py-6">
      <Link
        href="/nba/teams"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Teams
      </Link>

      <div className="flex items-center gap-4 mb-8">
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={team.displayName}
            width={80}
            height={80}
            unoptimized
          />
        )}
        <div>
          <h1 className="font-league">{team.displayName}</h1>
          <p className="text-muted-foreground">{record}</p>
        </div>
      </div>

      {roster.map((group) => (
        <div key={group.name} className="mb-8">
          <h2 className="font-semibold mb-3">{group.name}</h2>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {group.players.map((p) => (
              <Link key={p.id} href={`/nba/players/${p.id}`}>
                <Card className="hover:bg-muted/80 transition-colors cursor-pointer h-full">
                  <CardContent className="p-3 flex items-center gap-3">
                    <Image
                      src={p.headshot || getPlayerHeadshotUrl(p.id)}
                      alt={p.fullName}
                      width={40}
                      height={40}
                      className="rounded-full bg-muted"
                      unoptimized
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{p.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        #{p.jersey} · {p.position}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
