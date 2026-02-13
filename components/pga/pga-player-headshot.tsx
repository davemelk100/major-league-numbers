"use client";

import { useState } from "react";
import Image from "next/image";

interface PGAPlayerHeadshotProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function PGAPlayerHeadshot({ src, alt, size = 24, className = "rounded-full" }: PGAPlayerHeadshotProps) {
  const [error, setError] = useState(false);
  if (error || !src) {
    const initials = alt.split(" ").map(n => n[0]).join("").slice(0, 2);
    const fontSize = size <= 32 ? "text-[10px]" : size <= 64 ? "text-sm" : "text-lg";
    return (
      <div
        className={`bg-muted flex items-center justify-center font-medium text-muted-foreground shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <span className={fontSize}>{initials}</span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        unoptimized
        onError={() => setError(true)}
      />
    </div>
  );
}
