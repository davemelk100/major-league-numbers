"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PGAPlayerHeadshot } from "@/components/pga/pga-player-headshot";
import { parseScoreboardTournament, type PGATournament } from "@/lib/pga-api";

interface PGATournamentsContentProps {
  scoreboardData: any;
}

export function PGATournamentsContent({ scoreboardData }: PGATournamentsContentProps) {
  const tournament = scoreboardData ? parseScoreboardTournament(scoreboardData) : null;

  // Also check for multiple events in the calendar
  const events = scoreboardData?.events || [];
  const leagues = scoreboardData?.leagues || [];
  const calendarEvents = leagues?.[0]?.calendar || [];

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Tournaments</h1>

      {/* Current/Recent Tournament */}
      {tournament && (
        <div className="mb-8">
          <h2 className="mb-4">Current Tournament</h2>
          <Card>
            <CardContent className="p-4">
              <div className="mb-4">
                <h3 className="font-semibold text-xl">{tournament.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {tournament.venue && `${tournament.venue} · `}
                  {tournament.city}{tournament.state && `, ${tournament.state}`}
                </p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="text-muted-foreground">Status: {tournament.status}</span>
                  {tournament.purse && <span className="text-muted-foreground">Purse: {tournament.purse}</span>}
                </div>
              </div>

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
                    {tournament.competitors.slice(0, 30).map((player, idx) => (
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
      )}

      {/* Schedule from calendar */}
      {calendarEvents.length > 0 && (
        <div>
          <h2 className="mb-4">Schedule</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {calendarEvents.map((event: any, idx: number) => {
              const startDate = event.startDate ? new Date(event.startDate).toLocaleDateString() : "";
              const endDate = event.endDate ? new Date(event.endDate).toLocaleDateString() : "";
              return (
                <Card key={idx} className="hover:bg-muted/80 transition-colors">
                  <CardContent className="p-4">
                    <p className="font-medium text-sm">{event.label || event.value || `Event ${idx + 1}`}</p>
                    {(startDate || endDate) && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {startDate}{endDate && startDate !== endDate ? ` - ${endDate}` : ""}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {!tournament && calendarEvents.length === 0 && (
        <p className="text-muted-foreground">No tournament data available at this time.</p>
      )}
    </div>
  );
}
