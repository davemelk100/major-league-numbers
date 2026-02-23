"use client";

import { useState } from "react";
import { AdminWizard } from "@/components/admin/admin-wizard";
import { AddContentWizard } from "@/components/admin/add-content-wizard";
import { Button } from "@/components/ui/button";

type Mode = "create" | "add";

export default function AdminPage() {
  const [mode, setMode] = useState<Mode>("create");

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={mode === "create" ? "default" : "outline"}
            onClick={() => setMode("create")}
          >
            Create New Site
          </Button>
          <Button
            variant={mode === "add" ? "default" : "outline"}
            onClick={() => setMode("add")}
          >
            Add Content to Existing Site
          </Button>
        </div>

        {mode === "create" && <AdminWizard />}
        {mode === "add" && <AddContentWizard />}
      </div>
    </div>
  );
}
