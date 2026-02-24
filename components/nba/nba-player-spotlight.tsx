"use client";

import { useState, useEffect, Suspense } from "react";
import { getDailyNBAPlayer } from "@/lib/nba-player-spotlight-data";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const STORAGE_KEY = "nbaDailyPlayer";
const CACHE_VERSION = 4; // bump to invalidate stale cached data

function getTodayKey(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function NBAPlayerSpotlightContent() {
  const [player] = useState(() => getDailyNBAPlayer());

  useEffect(() => {
    try {
      const todayKey = getTodayKey();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey, player, v: CACHE_VERSION }));
    } catch { /* ignore */ }
  }, [player]);

  return (
    <div className="w-full h-full bg-muted/30 rounded-lg border p-3 sm:p-4 space-y-2 sm:space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="mr-4 text-primary">Player of the Day</h2>
      </div>
      <div className="flex flex-col gap-3">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-2xl font-bold">
              {player.name}
            </span>
            <span className="text-sm text-muted-foreground">{player.position}</span>
          </div>
          <p className="text-sm text-muted-foreground">{player.fact}</p>
        </div>
        <Link
          href={`/nba/players/${player.id}`}
          className="group relative overflow-hidden rounded-xl flex justify-center"
        >
          <img
            src={player.imageUrl}
            alt={player.name}
            width={275}
            height={275}
            className="rounded-xl transition-transform group-hover:scale-105 w-[200px] sm:w-[250px] lg:w-[300px] h-auto"
            fetchPriority="high"
          />
        </Link>
      </div>
    </div>
  );
}

export function NBAPlayerSpotlight() {
  return (
    <Suspense fallback={<div className="w-full bg-muted/30 rounded-lg border p-4 min-h-[350px] animate-pulse" />}>

      <NBAPlayerSpotlightContent />
    </Suspense>
  );
}
