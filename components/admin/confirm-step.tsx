"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

interface FileResult {
  path: string;
  success: boolean;
  error?: string;
}

interface ConfirmStepProps {
  results: FileResult[];
  siteUrl: string;
  summary: { total: number; success: number; failed: number };
}

export function ConfirmStep({ results, siteUrl, summary }: ConfirmStepProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Files Written ({summary.success}/{summary.total})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {summary.failed > 0 && (
            <p className="text-destructive text-sm mb-4">
              {summary.failed} file(s) failed to write.
            </p>
          )}
          <ul className="space-y-1 text-sm max-h-96 overflow-y-auto">
            {results.map((r) => (
              <li key={r.path} className="flex items-start gap-2">
                {r.success ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                )}
                <span className="font-mono text-xs break-all">{r.path}</span>
                {r.error && (
                  <span className="text-destructive text-xs">{r.error}</span>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-center">
        <Link href={siteUrl}>
          <Button>Visit New Site</Button>
        </Link>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Create Another
        </Button>
      </div>
    </div>
  );
}
