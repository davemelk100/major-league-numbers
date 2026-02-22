"use client";

import { useState, useEffect, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getDailyTeam, type TeamSpotlight } from "@/lib/mlb-team-spotlight-data";
import Image from "next/image";
import Link from "next/link";

const STORAGE_KEY = "mlbDailyTeam";
const CACHE_VERSION = 1;

function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function MLBTeamSpotlightContent() {
  const [team, setTeam] = useState<TeamSpotlight | null>(null);

  useEffect(() => {
    const todayKey = getTodayKey();
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const { date, team: cachedTeam, v } = JSON.parse(cached);
        if (date === todayKey && v === CACHE_VERSION && cachedTeam) {
          setTeam(cachedTeam);
          return;
        }
      }
    } catch { /* ignore */ }

    const daily = getDailyTeam();
    setTeam(daily);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey, team: daily, v: CACHE_VERSION }));
    } catch { /* ignore */ }
  }, []);

  if (!team) {
    return (
      <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="mr-4 text-primary">Team of the Day</h2>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="mr-4 text-primary">Team of the Day</h2>
      </div>
      <div className="flex flex-col gap-3">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-2xl font-bold">{team.name}</span>
            <span className="text-sm text-muted-foreground">{team.abbreviation}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {team.division} &middot; Founded {team.founded} &middot; {team.championships} championship{team.championships !== 1 ? "s" : ""}
          </p>
          <p className="text-sm text-muted-foreground">{team.fact}</p>
        </div>
        <Link
          href={`/mlb/teams`}
          className="group relative overflow-hidden rounded-xl flex justify-center"
        >
          <Image
            src={team.logoUrl}
            alt={team.name}
            width={200}
            height={200}
            className="rounded-xl transition-transform group-hover:scale-105 w-[150px] sm:w-[180px] lg:w-[200px] h-auto"
            unoptimized
            priority
          />
        </Link>
      </div>
    </div>
  );
}

export function MLBTeamSpotlight() {
  return (
    <Suspense fallback={<div className="w-full bg-muted/30 rounded-lg border p-4 h-[200px] animate-pulse" />}>
      <MLBTeamSpotlightContent />
    </Suspense>
  );
}
