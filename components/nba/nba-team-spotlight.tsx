"use client";

import { useState, useEffect, Suspense } from "react";
import { getDailyTeam } from "@/lib/nba-team-spotlight-data";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const STORAGE_KEY = "nbaDailyTeam";
const CACHE_VERSION = 1;

function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function NBATeamSpotlightContent() {
  const [team] = useState(() => getDailyTeam());

  useEffect(() => {
    try {
      const todayKey = getTodayKey();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey, team, v: CACHE_VERSION }));
    } catch { /* ignore */ }
  }, [team]);

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
          href={`/nba/teams/${team.abbreviation.toLowerCase()}`}
          className="group relative overflow-hidden rounded-xl flex justify-center"
        >
          <img
            src={team.logoUrl}
            alt={team.name}
            width={200}
            height={200}
            className="rounded-xl transition-transform group-hover:scale-105 w-[150px] sm:w-[180px] lg:w-[200px] h-auto"
            fetchPriority="high"
          />
        </Link>
      </div>
    </div>
  );
}

export function NBATeamSpotlight() {
  return (
    <Suspense fallback={<div className="w-full bg-muted/30 rounded-lg border p-4 min-h-[330px] animate-pulse" />}>
      <NBATeamSpotlightContent />
    </Suspense>
  );
}
