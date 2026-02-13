"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { PGAPlayerHeadshot } from "@/components/pga/pga-player-headshot";
import { getPlayerHeadshotUrl } from "@/lib/pga-api";

interface PGAPlayerContentProps {
  playerData: any;
  playerId: string;
}

export function PGAPlayerContent({ playerData, playerId }: PGAPlayerContentProps) {
  const athlete = playerData?.athlete;
  if (!athlete) {
    return (
      <div className="container py-6">
        <Link
          href="/pga/players"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Players
        </Link>
        <p className="text-muted-foreground">Player data not available.</p>
      </div>
    );
  }

  const fullName = athlete.displayName || "Unknown";
  const headshot = athlete.headshot?.href || getPlayerHeadshotUrl(playerId);
  const height = athlete.displayHeight || "—";
  const weight = athlete.displayWeight || "—";
  const birthDate = athlete.dateOfBirth ? new Date(athlete.dateOfBirth).toLocaleDateString() : "—";
  const birthPlace = athlete.birthPlace
    ? `${athlete.birthPlace.city || ""}${athlete.birthPlace.state ? `, ${athlete.birthPlace.state}` : ""}${athlete.birthPlace.country ? `, ${athlete.birthPlace.country}` : ""}`.trim()
    : "—";
  const turnedPro = athlete.experience?.years != null ? `${athlete.experience.years} years` : "—";
  const hand = athlete.hand?.displayValue || athlete.hand?.type || "—";

  const stats = playerData?.stats || [];

  return (
    <div className="container py-6">
      <Link
        href="/pga/players"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Players
      </Link>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Left: player photo + bio */}
        <div>
          <div className="mb-4">
            <PGAPlayerHeadshot src={headshot} alt={fullName} size={300} className="rounded-lg" />
          </div>
          <h1 className="font-league mb-2">{fullName}</h1>
          <div className="flex gap-2 mb-3">
            <Badge variant="outline">Golf</Badge>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Born: {birthDate}</p>
            <p>Birthplace: {birthPlace}</p>
            <p>Handedness: {hand}</p>
            <p>Experience: {turnedPro}</p>
          </div>
        </div>

        {/* Right: stats */}
        <div>
          <h2 className="mb-4">Statistics</h2>
          {stats.length > 0 ? (
            <div className="space-y-6">
              {stats.map((statGroup: any, idx: number) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3 text-sm">
                      {statGroup.displayName || statGroup.name || "Stats"}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 pr-4">Split</th>
                            {statGroup.labels?.map((label: string, i: number) => (
                              <th key={i} className="text-center py-2 px-2 whitespace-nowrap">{label}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {statGroup.splits?.map((split: any, ri: number) => (
                            <tr key={ri} className="border-b last:border-0">
                              <td className="py-2 pr-4 font-medium whitespace-nowrap">
                                {split.displayName || "—"}
                              </td>
                              {split.stats?.map((val: string, vi: number) => (
                                <td key={vi} className="text-center py-2 px-2">{val}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">No statistics available.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
