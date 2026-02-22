"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { NBAConferenceStandings } from "@/lib/nba-api";

interface NBAStandingsContentProps {
  standings: NBAConferenceStandings[];
}

export function NBAStandingsContent({ standings }: NBAStandingsContentProps) {
  const [activeConference, setActiveConference] = useState("east");

  const eastern = standings.find((c) => c.conference.toLowerCase().includes("east"));
  const western = standings.find((c) => c.conference.toLowerCase().includes("west"));

  const renderStandingsTable = (conf: NBAConferenceStandings | undefined) => {
    if (!conf) return <p className="text-muted-foreground">No standings available.</p>;

    return (
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-4">#</th>
                  <th className="text-left py-3 px-4">Team</th>
                  <th className="text-center py-3 px-2">W</th>
                  <th className="text-center py-3 px-2">L</th>
                  <th className="text-center py-3 px-2">PCT</th>
                  <th className="text-center py-3 px-2">GB</th>
                  <th className="text-center py-3 px-2 hidden sm:table-cell">STRK</th>
                  <th className="text-center py-3 px-2 hidden md:table-cell">L10</th>
                  <th className="text-center py-3 px-2 hidden lg:table-cell">HOME</th>
                  <th className="text-center py-3 px-2 hidden lg:table-cell">AWAY</th>
                </tr>
              </thead>
              <tbody>
                {conf.entries.map((entry, idx) => (
                  <tr key={entry.team.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4 text-muted-foreground">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/nba/teams/${entry.team.id}`}
                        className="flex items-center gap-2 hover:underline"
                      >
                        <Image
                          src={entry.team.logoUrl}
                          alt={entry.team.displayName}
                          width={24}
                          height={24}
                          unoptimized
                        />
                        <span className="font-medium">{entry.team.displayName}</span>
                      </Link>
                    </td>
                    <td className="text-center py-3 px-2">{entry.wins}</td>
                    <td className="text-center py-3 px-2">{entry.losses}</td>
                    <td className="text-center py-3 px-2">{entry.pct}</td>
                    <td className="text-center py-3 px-2">{entry.gamesBehind}</td>
                    <td className="text-center py-3 px-2 hidden sm:table-cell">{entry.streak}</td>
                    <td className="text-center py-3 px-2 hidden md:table-cell">{entry.lastTen}</td>
                    <td className="text-center py-3 px-2 hidden lg:table-cell">{entry.homeRecord}</td>
                    <td className="text-center py-3 px-2 hidden lg:table-cell">{entry.awayRecord}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Standings</h1>

      <Tabs value={activeConference} onValueChange={setActiveConference}>
        <TabsList className="mb-4">
          <TabsTrigger value="east">Eastern Conference</TabsTrigger>
          <TabsTrigger value="west">Western Conference</TabsTrigger>
        </TabsList>

        <TabsContent value="east">{renderStandingsTable(eastern)}</TabsContent>
        <TabsContent value="west">{renderStandingsTable(western)}</TabsContent>
      </Tabs>
    </div>
  );
}
