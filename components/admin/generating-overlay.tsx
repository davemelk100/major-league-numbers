"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import type { GeneratedSiteData } from "@/lib/admin/schemas";

interface GeneratingOverlayProps {
  data: GeneratedSiteData;
  visible: boolean;
}

function collectFacts(data: GeneratedSiteData): string[] {
  const facts: string[] = [];
  const name = data.config.name;

  for (const t of data.trivia) {
    facts.push(`${t.question} — ${t.options[t.correctAnswer]}`);
  }

  for (const e of data.timeline) {
    facts.push(`${e.year}: ${e.title} — ${e.description}`);
  }

  for (const k of data.knowledge) {
    const text = k.text.length > 160 ? k.text.slice(0, 157) + "..." : k.text;
    facts.push(text);
  }

  for (const [, value] of Object.entries(data.recordFacts)) {
    facts.push(value);
  }

  // Shuffle
  for (let i = facts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [facts[i], facts[j]] = [facts[j], facts[i]];
  }

  if (facts.length === 0) {
    facts.push(`Generating the ${name} site...`);
  }

  return facts;
}

export function GeneratingOverlay({ data, visible }: GeneratingOverlayProps) {
  const [facts] = useState(() => collectFacts(data));
  const [factIndex, setFactIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  // Fade in on mount
  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => setFadeIn(true));
    }
  }, [visible]);

  // Rotate facts every 4 seconds
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setFactIndex((i) => (i + 1) % facts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [visible, facts.length]);

  // Smooth progress bar — fast at first, asymptotic toward 92%
  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      // Approaches 92% over ~120s using inverse exponential
      const p = 92 * (1 - Math.exp(-elapsed / 40));
      setProgress(Math.min(p, 92));
    };
    const interval = setInterval(tick, 200);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Scrim */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-lg text-center">
        {/* Spinner */}
        <Loader2 className="h-12 w-12 text-white animate-spin" />

        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Building {data.config.name}
          </h2>
          <p className="text-sm text-white/60">
            Writing {data.artists.length} artists, {data.releases.length} releases, {data.trivia.length} trivia questions...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-sm">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-white/40 mt-2">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Rotating fact */}
        <div className="min-h-[4rem] flex items-center">
          <p
            key={factIndex}
            className="text-sm text-white/80 italic animate-in fade-in duration-700"
          >
            &ldquo;{facts[factIndex]}&rdquo;
          </p>
        </div>

        <p className="text-xs text-white/30">
          This may take a minute or two
        </p>
      </div>
    </div>
  );
}
