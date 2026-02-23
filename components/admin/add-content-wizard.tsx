"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Upload, X, CheckCircle2, AlertCircle } from "lucide-react";
import { MUSIC_SITES } from "@/lib/music-site";

type Step = "select" | "content" | "preview" | "done";

interface NewContent {
  artists: Array<{ name: string; description?: string }>;
  releases: Array<{
    catalogNo?: string;
    title: string;
    artist: string;
    year?: number | null;
    format?: string | null;
    highlight?: string;
  }>;
  trivia: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    category: string;
  }>;
  timeline: Array<{ year: number; title: string; description: string }>;
}

interface WriteResult {
  path: string;
  success: boolean;
  error?: string;
  added?: number;
}

export function AddContentWizard() {
  const [step, setStep] = useState<Step>("select");
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newContent, setNewContent] = useState<NewContent | null>(null);
  const [writeResults, setWriteResults] = useState<WriteResult[] | null>(null);

  const selectedSite = MUSIC_SITES.find((s) => s.id === selectedSiteId);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  async function handleGenerate() {
    if (!selectedSiteId) return;
    setIsLoading(true);
    setError("");

    try {
      const passcode = "6231839";
      let extractedText = "";

      // Upload files if any
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("siteId", selectedSiteId);
        for (const file of files) {
          formData.append("files", file);
        }

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "x-admin-passcode": passcode },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          extractedText = uploadData.extractedText || "";
        }
      }

      const res = await fetch("/api/admin/add-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          siteId: selectedSiteId,
          siteName: selectedSite?.name || selectedSiteId,
          content,
          extractedText,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      setNewContent(data);
      setStep("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleWrite() {
    if (!newContent || !selectedSiteId) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/append-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": "6231839",
        },
        body: JSON.stringify({
          siteId: selectedSiteId,
          newArtists: newContent.artists,
          newReleases: newContent.releases,
          newTrivia: newContent.trivia,
          newTimeline: newContent.timeline,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Write failed");
      }

      const result = await res.json();
      setWriteResults(result.results);
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Write failed");
    } finally {
      setIsLoading(false);
    }
  }

  // Step 1: Select site
  if (step === "select") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add Content to Existing Site</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Select Site</Label>
          <div className="grid grid-cols-2 gap-2">
            {MUSIC_SITES.map((site) => (
              <button
                key={site.id}
                type="button"
                onClick={() => setSelectedSiteId(site.id)}
                className={`p-3 rounded-lg border text-left text-sm transition-colors ${
                  selectedSiteId === site.id
                    ? "border-primary bg-primary/10 font-medium"
                    : "border-border hover:bg-muted"
                }`}
              >
                {site.name}
              </button>
            ))}
          </div>
          <Button
            onClick={() => setStep("content")}
            disabled={!selectedSiteId}
            className="w-full"
          >
            Next
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Step 2: Add content
  if (step === "content") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            Add Content to {selectedSite?.name || selectedSiteId}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Paste URLs, raw text, any info about new artists/releases to add..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
            />
          </div>

          <div className="space-y-2">
            <Label>File Uploads</Label>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.multiple = true;
                input.accept = ".pdf,.txt,.md,.png,.jpg,.jpeg,.webp,.svg";
                input.onchange = (e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.files) {
                    setFiles((prev) => [
                      ...prev,
                      ...Array.from(target.files!),
                    ]);
                  }
                };
                input.click();
              }}
            >
              <Upload className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Drop files here or click to browse</p>
            </div>
            {files.length > 0 && (
              <ul className="text-sm space-y-1 mt-2">
                {files.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="truncate flex-1">{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {error && (
            <pre className="text-sm text-destructive whitespace-pre-wrap bg-destructive/10 rounded-md p-3">
              {error}
            </pre>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setStep("select")}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={isLoading || (!content && files.length === 0)}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                "Generate New Items"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 3: Preview
  if (step === "preview" && newContent) {
    const totalNew =
      newContent.artists.length +
      newContent.releases.length +
      newContent.trivia.length +
      newContent.timeline.length;

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Preview New Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {totalNew === 0 ? (
            <p className="text-muted-foreground">
              No new items generated. The content may already exist in the
              site.
            </p>
          ) : (
            <>
              {newContent.artists.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">
                    New Artists ({newContent.artists.length})
                  </h3>
                  <ul className="text-sm space-y-1">
                    {newContent.artists.map((a, i) => (
                      <li key={i} className="border-b pb-1">
                        <span className="font-medium">{a.name}</span>
                        {a.description && (
                          <span className="text-muted-foreground ml-2">
                            — {a.description}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {newContent.releases.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">
                    New Releases ({newContent.releases.length})
                  </h3>
                  <ul className="text-sm space-y-1">
                    {newContent.releases.map((r, i) => (
                      <li key={i} className="border-b pb-1">
                        <span className="font-medium">
                          {r.artist} — {r.title}
                        </span>
                        {r.year && (
                          <span className="text-muted-foreground ml-2">
                            ({r.year})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {newContent.trivia.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">
                    New Trivia ({newContent.trivia.length})
                  </h3>
                  <ul className="text-sm space-y-1">
                    {newContent.trivia.map((t, i) => (
                      <li key={i} className="border-b pb-1">
                        {t.question}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {newContent.timeline.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">
                    New Timeline Events ({newContent.timeline.length})
                  </h3>
                  <ul className="text-sm space-y-1">
                    {newContent.timeline.map((t, i) => (
                      <li key={i} className="border-b pb-1">
                        <span className="font-medium">{t.year}</span> —{" "}
                        {t.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {error && (
            <pre className="text-sm text-destructive whitespace-pre-wrap bg-destructive/10 rounded-md p-3">
              {error}
            </pre>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setStep("content")}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              onClick={handleWrite}
              disabled={isLoading || totalNew === 0}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Writing files...
                </>
              ) : (
                `Write ${totalNew} items to site`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 4: Done
  if (step === "done" && writeResults) {
    const successes = writeResults.filter((r) => r.success);
    const failures = writeResults.filter((r) => !r.success);

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Content Added</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {successes.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-green-600"
              >
                <CheckCircle2 className="h-4 w-4" />
                {r.path}
                {r.added !== undefined && ` (+${r.added} items)`}
              </div>
            ))}
            {failures.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                {r.path}: {r.error}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setStep("select");
                setNewContent(null);
                setWriteResults(null);
                setContent("");
                setFiles([]);
                setError("");
              }}
            >
              Add More Content
            </Button>
            {selectedSiteId && (
              <Button asChild className="flex-1">
                <a href={`/${selectedSiteId}`}>
                  Visit {selectedSite?.name || selectedSiteId}
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
