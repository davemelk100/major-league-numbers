"use client";

import { useState, useEffect } from "react";
import { PasscodeStep } from "./passcode-step";
import { InputStep } from "./input-step";
import { PreviewStep } from "./preview-step";
import { ConfirmStep } from "./confirm-step";
import type { GeneratedSiteData } from "@/lib/admin/schemas";

type Step = "passcode" | "input" | "preview" | "confirm";

interface WriteResults {
  results: Array<{ path: string; success: boolean; error?: string }>;
  siteUrl: string;
  summary: { total: number; success: number; failed: number };
}

export function AdminWizard() {
  const [step, setStep] = useState<Step>("passcode");
  const [generatedData, setGeneratedData] = useState<GeneratedSiteData | null>(null);
  const [logoPaths, setLogoPaths] = useState<string[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>([]);
  const [writeResults, setWriteResults] = useState<WriteResults | null>(null);
  const [siteType, setSiteType] = useState<"music" | "sports">("music");

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      setStep("input");
    }
  }, []);

  function handlePasscodeSuccess() {
    setStep("input");
  }

  function handleGenerated(data: unknown, paths: string[], videos: string[]) {
    const d = data as GeneratedSiteData;
    setGeneratedData(d);
    setLogoPaths(paths);
    setVideoLinks(videos);
    setStep("preview");
  }

  async function handleConfirm(data: GeneratedSiteData) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000);
      const res = await fetch("/api/admin/write-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": "6231839",
        },
        body: JSON.stringify({
          siteId: data.config.id,
          siteType,
          data,
          logoPaths,
          videoLinks,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Write failed");
      }

      const result = await res.json();
      setWriteResults(result);
      setStep("confirm");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Write failed");
    }
  }

  function handleRegenerate() {
    setGeneratedData(null);
    setStep("input");
  }

  const steps: { key: Step; label: string }[] = [
    { key: "passcode", label: "Auth" },
    { key: "input", label: "Input" },
    { key: "preview", label: "Preview" },
    { key: "confirm", label: "Done" },
  ];

  const currentIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Site Generator
        </h1>

        {/* Step indicator */}
        {step !== "passcode" && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.slice(1).map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm ${
                    i + 1 <= currentIndex
                      ? "font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 2 && (
                  <div className="w-8 h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        )}

        {step === "passcode" && (
          <PasscodeStep onSuccess={handlePasscodeSuccess} />
        )}
        {step === "input" && <InputStep onGenerated={handleGenerated} />}
        {step === "preview" && generatedData && (
          <PreviewStep
            data={generatedData}
            logoPaths={logoPaths}
            onConfirm={handleConfirm}
            onRegenerate={handleRegenerate}
          />
        )}
        {step === "confirm" && writeResults && (
          <ConfirmStep
            results={writeResults.results}
            siteUrl={writeResults.siteUrl}
            summary={writeResults.summary}
          />
        )}
      </div>
    </div>
  );
}
