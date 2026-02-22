"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PasscodeStepProps {
  onSuccess: () => void;
}

export function PasscodeStep({ onSuccess }: PasscodeStepProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === "6231839") {
      sessionStorage.setItem("admin_auth", "true");
      onSuccess();
    } else {
      setError("Invalid passcode");
      setPasscode("");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin Access</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError("");
                }}
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Enter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
