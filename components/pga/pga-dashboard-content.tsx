"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PGATriviaPanel } from "@/components/pga/pga-trivia-panel";
import { PGAPlayerSpotlight } from "@/components/pga/pga-player-spotlight";
import { PGAPlayerHeadshot } from "@/components/pga/pga-player-headshot";
import type { PGALeaderEntry, PGATournament } from "@/lib/pga-api";

interface LeaderItem {
  label: string;
  leader: PGALeaderEntry | null;
}

interface PGADashboardContentProps {
  leaders: LeaderItem[];
  currentTournament: PGATournament | null;
}

export function PGADashboardContent({ leaders, currentTournament }: PGADashboardContentProps) {
  return (
    <div className="container py-2">
      {/* Daily Trivia + Player of the Day */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <PGATriviaPanel />
        <PGAPlayerSpotlight />
      </div>

      {/* Leaders */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2>Stat Leaders</h2>
          <Link href="/pga/players" className="text-sm text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {leaders.map((item) => (
            <Card key={item.label}>
              <CardContent className="p-4 text-center">
                {item.leader ? (
                  <Link href={`/pga/players/${item.leader.id}`}>
                    <div className="mx-auto mb-3 w-fit">
                      <PGAPlayerHeadshot src={item.leader.headshot} alt={item.leader.name} size={64} />
                    </div>
                    <p className="font-medium text-sm">{item.leader.name}</p>
                    <p className="text-2xl font-bold mt-2">{item.leader.displayValue}</p>
                  </Link>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-3" />
                    <p className="font-medium text-sm">—</p>
                    <p className="text-2xl font-bold mt-2">0</p>
                  </>
                )}
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Current Tournament Preview */}
      {currentTournament && (
        <div className="mb-8">
          <div className="flex items-baseline justify-between mb-4">
            <h2>Current Tournament</h2>
            <Link href="/pga/tournaments" className="text-sm text-muted-foreground hover:underline">
              View all
            </Link>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-lg">{currentTournament.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {currentTournament.venue && `${currentTournament.venue} · `}
                  {currentTournament.city}{currentTournament.state && `, ${currentTournament.state}`}
                  {currentTournament.purse && ` · ${currentTournament.purse}`}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{currentTournament.status}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4">Pos</th>
                      <th className="text-left py-2 pr-4">Player</th>
                      <th className="text-center py-2 px-2">Score</th>
                      <th className="text-center py-2 px-2">Thru</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTournament.competitors.slice(0, 10).map((player) => (
                      <tr key={player.id} className="border-b last:border-0">
                        <td className="py-2 pr-4 font-medium">{player.position}</td>
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
      )}
    </div>
  );
}
