"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { PGAPlayerHeadshot } from "@/components/pga/pga-player-headshot";
import type { PGATournament } from "@/lib/pga-api";

interface PGATournamentContentProps {
  tournament: PGATournament | null;
}

export function PGATournamentContent({ tournament }: PGATournamentContentProps) {
  if (!tournament) {
    return (
      <div className="container py-6">
        <Link
          href="/pga/tournaments"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Tournaments
        </Link>
        <p className="text-muted-foreground">Tournament data not available.</p>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Link
        href="/pga/tournaments"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Tournaments
      </Link>

      <div className="mb-6">
        <h1 className="font-league mb-2">{tournament.name}</h1>
        <p className="text-muted-foreground">
          {tournament.venue && `${tournament.venue} · `}
          {tournament.city}{tournament.state && `, ${tournament.state}`}
        </p>
        <div className="flex gap-4 mt-2 text-sm">
          <span className="text-muted-foreground">Status: {tournament.status}</span>
          {tournament.purse && <span className="text-muted-foreground">Purse: {tournament.purse}</span>}
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <h2 className="mb-4">Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-2 w-12">Pos</th>
                  <th className="text-left py-2 pr-4">Player</th>
                  <th className="text-center py-2 px-2">Score</th>
                  <th className="text-center py-2 px-2">Thru</th>
                </tr>
              </thead>
              <tbody>
                {tournament.competitors.map((player, idx) => (
                  <tr key={`${player.id}-${idx}`} className="border-b last:border-0">
                    <td className="py-2 pr-2 font-medium">{player.position}</td>
                    <td className="py-2 pr-4">
                      <Link
                        href={`/pga/players/${player.id}`}
                        className="hover:underline flex items-center gap-2"
                      >
                        <PGAPlayerHeadshot src={player.headshot} alt={player.name} />
                        {player.name}
                      </Link>
                    </td>
                    <td className="text-center py-2 px-2 font-bold">{player.score}</td>
                    <td className="text-center py-2 px-2 text-muted-foreground">{player.thru}</td>
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
