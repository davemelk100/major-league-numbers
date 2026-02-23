"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, X, CheckCircle2, AlertCircle, Paperclip } from "lucide-react";

type UrlStatus = "idle" | "checking" | "valid" | "invalid";

function useUrlValidation(url: string): UrlStatus {
  const [status, setStatus] = useState<UrlStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (!url || !url.match(/^https?:\/\/.+\..+/)) {
      setStatus(url ? "invalid" : "idle");
      return;
    }
    setStatus("checking");
    timerRef.current = setTimeout(() => {
      const img = new Image();
      img.onload = () => setStatus("valid");
      img.onerror = () => setStatus("invalid");
      img.src = url;
    }, 500);
    return () => clearTimeout(timerRef.current);
  }, [url]);

  return status;
}

interface InputStepProps {
  onGenerated: (data: unknown, logoPaths: string[], videoLinks: string[]) => void;
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function InputStep({ onGenerated }: InputStepProps) {
  const [siteType, setSiteType] = useState<"music" | "sports">("music");
  const [musicSubtype, setMusicSubtype] = useState<"label" | "artist">("label");
  const [siteName, setSiteName] = useState("");
  const [siteId, setSiteId] = useState("");
  const [siteIdEdited, setSiteIdEdited] = useState(false);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [logoUrl1, setLogoUrl1] = useState("");
  const [logoUrl2, setLogoUrl2] = useState("");
  const [logoFile1, setLogoFile1] = useState<File | null>(null);
  const [logoFile2, setLogoFile2] = useState<File | null>(null);
  const [videoLinksText, setVideoLinksText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const logoUrl1Status = useUrlValidation(logoUrl1);
  const logoUrl2Status = useUrlValidation(logoUrl2);

  const handleNameChange = useCallback(
    (value: string) => {
      setSiteName(value);
      if (!siteIdEdited) {
        setSiteId(toSlug(value));
      }
    },
    [siteIdEdited],
  );

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const dropped = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...dropped]);
    },
    [],
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!siteName || !siteId) {
      setError("Site name and ID are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const passcode = "6231839";
      let logoPaths: string[] = [];
      let extractedText = "";

      // Upload files if any
      const hasUploads =
        logoFile1 || logoFile2 || logoUrl1 || logoUrl2 || files.length > 0;
      if (hasUploads) {
        const formData = new FormData();
        formData.append("siteId", siteId);
        if (logoFile1) formData.append("logos", logoFile1);
        if (logoFile2) formData.append("logos", logoFile2);
        if (logoUrl1) formData.append("logoUrls", logoUrl1);
        if (logoUrl2) formData.append("logoUrls", logoUrl2);
        for (const file of files) {
          formData.append("files", file);
        }

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "x-admin-passcode": passcode },
          body: formData,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          throw new Error(err.error || "Upload failed");
        }

        const uploadData = await uploadRes.json();
        logoPaths = uploadData.logoPaths;
        extractedText = uploadData.extractedText;
      }

      // Generate site data
      const generateRes = await fetch("/api/admin/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          siteType,
          musicSubtype: siteType === "music" ? musicSubtype : undefined,
          siteId,
          siteName,
          content,
          extractedText,
          logoPaths,
        }),
      });

      if (!generateRes.ok) {
        const err = await generateRes.json();
        const issues = err.issues as Array<{ path: (string | number)[]; message: string }> | undefined;
        if (issues?.length) {
          const detail = issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("\n");
          throw new Error(`${err.error}\n${detail}`);
        }
        throw new Error(err.error || "Generation failed");
      }

      const data = await generateRes.json();
      const videoLinks = videoLinksText
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      onGenerated(data, logoPaths, videoLinks);
    } catch (err) {
      console.error("[Admin] Generation error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>New Site</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Site Type */}
          <div className="space-y-2">
            <Label>Site Type</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="siteType"
                  value="music"
                  checked={siteType === "music"}
                  onChange={() => setSiteType("music")}
                />
                Music
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="siteType"
                  value="sports"
                  checked={siteType === "sports"}
                  onChange={() => setSiteType("sports")}
                />
                Sports
              </label>
            </div>
          </div>

          {/* Music Subtype (Label vs Artist) */}
          {siteType === "music" && (
            <div className="space-y-2">
              <Label>Music Site Type</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="musicSubtype"
                    value="label"
                    checked={musicSubtype === "label"}
                    onChange={() => setMusicSubtype("label")}
                  />
                  Label
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="musicSubtype"
                    value="artist"
                    checked={musicSubtype === "artist"}
                    onChange={() => setMusicSubtype("artist")}
                  />
                  Artist / Band
                </label>
              </div>
            </div>
          )}

          {/* Site Name */}
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              placeholder="e.g. Dischord Records"
              value={siteName}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>

          {/* Site ID */}
          <div className="space-y-2">
            <Label htmlFor="siteId">Site ID (slug)</Label>
            <Input
              id="siteId"
              placeholder="e.g. dischord"
              value={siteId}
              onChange={(e) => {
                setSiteId(e.target.value);
                setSiteIdEdited(true);
              }}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Paste URLs, raw text, any info about the site..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
            />
          </div>

          {/* File Uploads */}
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
                    setFiles((prev) => [...prev, ...Array.from(target.files!)]);
                  }
                };
                input.click();
              }}
            >
              <Upload className="h-6 w-6 mx-auto mb-2" />
              <p className="text-sm">Drop files here or click to browse</p>
              <p className="text-xs mt-1">PDFs, images, text files</p>
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

          {/* Logo Inputs */}
          <div className="space-y-4">
            <Label>Logo (primary)</Label>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Input
                  placeholder="Logo URL"
                  value={logoUrl1}
                  onChange={(e) => setLogoUrl1(e.target.value)}
                  className="pr-8"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {logoUrl1Status === "checking" && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  {logoUrl1Status === "valid" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {logoUrl1Status === "invalid" && <AlertCircle className="h-4 w-4 text-red-500" />}
                </div>
              </div>
              <button
                type="button"
                title="Upload file"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.files?.[0]) setLogoFile1(target.files[0]);
                  };
                  input.click();
                }}
              >
                <Paperclip className="h-4 w-4" />
              </button>
            </div>
            {logoFile1 && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                {logoFile1.name}
              </p>
            )}

            <Label>Logo (alt)</Label>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Input
                  placeholder="Alt logo URL (optional)"
                  value={logoUrl2}
                  onChange={(e) => setLogoUrl2(e.target.value)}
                  className="pr-8"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {logoUrl2Status === "checking" && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  {logoUrl2Status === "valid" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {logoUrl2Status === "invalid" && <AlertCircle className="h-4 w-4 text-red-500" />}
                </div>
              </div>
              <button
                type="button"
                title="Upload file"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = (e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.files?.[0]) setLogoFile2(target.files[0]);
                  };
                  input.click();
                }}
              >
                <Paperclip className="h-4 w-4" />
              </button>
            </div>
            {logoFile2 && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                {logoFile2.name}
              </p>
            )}
          </div>

          {/* Video Links */}
          {siteType === "music" && (
            <div className="space-y-2">
              <Label htmlFor="videoLinks">Video Links (optional)</Label>
              <Textarea
                id="videoLinks"
                placeholder={"One YouTube link per line, optionally with a title:\nI Am A Scientist - https://youtube.com/watch?v=jUjLDvrLDhg\nhttps://youtu.be/abc123"}
                value={videoLinksText}
                onChange={(e) => setVideoLinksText(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Accepts youtube.com/watch?v=, youtu.be/, or just video IDs
              </p>
            </div>
          )}

          {error && <pre className="text-sm text-destructive whitespace-pre-wrap bg-destructive/10 rounded-md p-3">{error}</pre>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              "Generate Site Data"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
