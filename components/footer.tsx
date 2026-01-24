import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  const sources = [
    { label: "MLB Stats API", url: "https://statsapi.mlb.com/" },
    { label: "Baseball Savant", url: "https://baseballsavant.mlb.com/" },
    { label: "Baseball-Reference", url: "https://www.baseball-reference.com/" },
    { label: "FanGraphs", url: "https://www.fangraphs.com/" },
    { label: "Retrosheet", url: "https://www.retrosheet.org/" },
  ];
  const imageSources = [
    { label: "MLB", url: "https://www.mlb.com/" },
    { label: "Baseball-Reference", url: "https://www.baseball-reference.com/" },
    { label: "FanGraphs", url: "https://www.fangraphs.com/" },
  ];

  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container py-6">
        <div className="relative flex flex-col items-center gap-4 mb-4">
          <p className="text-xs text-muted-foreground max-w-2xl text-center">
            Major League Numbers is not affiliated with, endorsed by, or
            sponsored by Major League Baseball (MLB) or its teams. All MLB
            logos, trademarks, and data are the property of MLB and its
            respective teams. This site is an independent fan project for
            informational purposes only.
          </p>
        </div>
        <div className="text-center text-xs text-muted-foreground/80">
          <div className="flex flex-wrap items-center gap-1.5 justify-center md:gap-2">
            <span>Sources:</span>
            {sources.map((source) => (
              <a
                key={source.label}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-2 text-center text-xs text-muted-foreground/80">
          <div className="flex flex-wrap items-center gap-1.5 justify-center md:gap-2">
            <span>Image credits:</span>
            {imageSources.map((source) => (
              <a
                key={source.label}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground/60">
          Powered by{" "}
          <a
            href="https://github.com/jldbc/pybaseball"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            pybaseball
          </a>{" "}
          &middot; &copy; {new Date().getFullYear()} Major League Numbers
          &middot; Manufactured and Produced by{" "}
          <a
            href="https://davemelk.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Melkonian Industries
          </a>
        </p>
      </div>
    </footer>
  );
}
