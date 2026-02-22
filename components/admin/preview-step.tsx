"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ChevronDown, ChevronRight } from "lucide-react";
import type { GeneratedSiteData } from "@/lib/admin/schemas";

interface PreviewStepProps {
  data: GeneratedSiteData;
  logoPaths: string[];
  onConfirm: (data: GeneratedSiteData) => void;
  onRegenerate: () => void;
}

function CollapsibleSection({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg">
      <button
        type="button"
        className="flex items-center gap-2 w-full p-3 text-left text-sm font-medium hover:bg-muted/50"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        {title}
        {count !== undefined && (
          <span className="text-muted-foreground ml-1">({count})</span>
        )}
      </button>
      {open && <div className="p-3 pt-0 border-t">{children}</div>}
    </div>
  );
}

export function PreviewStep({
  data,
  logoPaths,
  onConfirm,
  onRegenerate,
}: PreviewStepProps) {
  const [jsonText, setJsonText] = useState(JSON.stringify(data, null, 2));
  const [parseError, setParseError] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [showJson, setShowJson] = useState(false);

  function handleConfirm() {
    try {
      const parsed = JSON.parse(jsonText);
      setParseError("");
      setIsWriting(true);
      onConfirm(parsed);
    } catch {
      setParseError("Invalid JSON");
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Preview: {data.config.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Config */}
          <CollapsibleSection title="Config">
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-medium">ID</dt>
              <dd>{data.config.id}</dd>
              <dt className="font-medium">Name</dt>
              <dd>{data.config.name}</dd>
              <dt className="font-medium">Short Name</dt>
              <dd>{data.config.shortName}</dd>
              <dt className="font-medium">Shell Class</dt>
              <dd>{data.config.shellClass}</dd>
            </dl>
            {data.config.description && (
              <p className="text-sm text-muted-foreground mt-2">
                {data.config.description}
              </p>
            )}
            {logoPaths.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium">Logos:</p>
                <ul className="text-xs text-muted-foreground">
                  {logoPaths.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </CollapsibleSection>

          {/* Artists */}
          <CollapsibleSection
            title="Artists"
            count={data.artists.length}
          >
            <ul className="text-sm space-y-1 max-h-60 overflow-y-auto">
              {data.artists.map((a) => (
                <li key={a.id}>
                  <span className="font-medium">{a.name}</span>
                  {a.description && (
                    <span className="text-muted-foreground">
                      {" "}
                      — {a.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Releases */}
          <CollapsibleSection
            title="Releases"
            count={data.releases.length}
          >
            <ul className="text-sm space-y-1 max-h-60 overflow-y-auto">
              {data.releases.map((r) => (
                <li key={r.id}>
                  <span className="font-medium">{r.artist}</span> —{" "}
                  {r.title}
                  {r.year && (
                    <span className="text-muted-foreground"> ({r.year})</span>
                  )}
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Trivia */}
          <CollapsibleSection
            title="Trivia"
            count={data.trivia.length}
          >
            <ul className="text-sm space-y-2 max-h-60 overflow-y-auto">
              {data.trivia.slice(0, 10).map((q) => (
                <li key={q.id}>
                  <p className="font-medium">{q.question}</p>
                  <p className="text-muted-foreground text-xs">
                    Answer: {q.options[q.correctAnswer]}
                  </p>
                </li>
              ))}
              {data.trivia.length > 10 && (
                <li className="text-muted-foreground text-xs">
                  ...and {data.trivia.length - 10} more
                </li>
              )}
            </ul>
          </CollapsibleSection>

          {/* Timeline */}
          <CollapsibleSection
            title="Timeline"
            count={data.timeline.length}
          >
            <ul className="text-sm space-y-1 max-h-60 overflow-y-auto">
              {data.timeline.map((t, i) => (
                <li key={i}>
                  <span className="font-medium">{t.year}</span> — {t.title}
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Knowledge */}
          <CollapsibleSection
            title="Knowledge Docs"
            count={data.knowledge.length}
          >
            <ul className="text-sm space-y-1 max-h-60 overflow-y-auto">
              {data.knowledge.map((d) => (
                <li key={d.id}>
                  <span className="font-medium">{d.title}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    — {d.text.slice(0, 100)}...
                  </span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>

          {/* Record Facts */}
          <CollapsibleSection
            title="Record Facts"
            count={Object.keys(data.recordFacts).length}
          >
            <ul className="text-sm space-y-1 max-h-60 overflow-y-auto">
              {Object.entries(data.recordFacts).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{key}</span>:{" "}
                  <span className="text-muted-foreground">{value}</span>
                </li>
              ))}
            </ul>
          </CollapsibleSection>
        </CardContent>
      </Card>

      {/* JSON Editor */}
      <Card>
        <CardHeader>
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-medium"
            onClick={() => setShowJson(!showJson)}
          >
            {showJson ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            Raw JSON Editor
          </button>
        </CardHeader>
        {showJson && (
          <CardContent>
            <textarea
              className="w-full font-mono text-xs border rounded p-2 bg-muted/30"
              rows={20}
              value={jsonText}
              onChange={(e) => {
                setJsonText(e.target.value);
                setParseError("");
              }}
            />
            {parseError && (
              <p className="text-sm text-destructive mt-1">{parseError}</p>
            )}
          </CardContent>
        )}
      </Card>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={onRegenerate} disabled={isWriting}>
          Regenerate
        </Button>
        <Button onClick={handleConfirm} disabled={isWriting}>
          {isWriting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Writing Files...
            </>
          ) : (
            "Confirm & Write Files"
          )}
        </Button>
      </div>
    </div>
  );
}
