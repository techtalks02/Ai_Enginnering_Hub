"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LearningPathDetailPage from "./[slug]/page";

function LearnRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const path = searchParams.get("path");
  const module = searchParams.get("module");
  const lesson = searchParams.get("lesson");

  useEffect(() => {
    if (path || module || lesson) {
      const query = new URLSearchParams();
      if (path) query.set("path", path);
      if (module) query.set("module", module);
      if (lesson) query.set("lesson", lesson);
      router.replace(`/lesson?${query.toString()}`);
    }
  }, [path, module, lesson, router]);

  // Default to AI Engineer Path
  const defaultParams = Promise.resolve({ slug: "ai-engineering" });
  return <LearningPathDetailPage params={defaultParams} />;
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-mono text-xs text-muted-foreground">Loading learning path...</div>}>
      <LearnRouter />
    </Suspense>
  );
}
