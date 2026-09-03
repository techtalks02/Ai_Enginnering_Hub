"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

export default function RoadmapPage() {
  const { data: modules, isLoading } = useQuery({
    queryKey: ["roadmap-modules"],
    queryFn: () => api.get("/roadmap/modules").then((r) => r.data),
  });

  const { data: progressList } = useQuery({
    queryKey: ["roadmap-progress"],
    queryFn: () => api.get("/roadmap/progress/me").then((r) => r.data),
  });

  const progressItems = Array.isArray(progressList) ? progressList : [];
  const progressMap = new Map(
    progressItems.map((p: { module_id: string; progress_percent: number; completed: boolean }) => [p.module_id, p])
  );
  const overallPercent = progressItems.length
    ? Math.round(progressItems.reduce((s: number, p: { progress_percent: number }) => s + Number(p.progress_percent), 0) / progressItems.length)
    : 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">AI Engineering Roadmap</h1>
        <p className="text-muted-foreground mt-1">Your structured path from beginner to AI architect</p>
        {progressItems.length > 0 && (
          <div className="mt-4 max-w-md">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span>{overallPercent}%</span>
            </div>
            <Progress value={overallPercent} />
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {(modules?.items ?? modules ?? []).map((mod: {
            id: string; slug: string; title: string; description?: string;
            color?: string; estimated_hours?: number; difficulty?: string; order_index: number;
          }) => {
            const prog = progressMap.get(mod.id) as { progress_percent?: number; completed?: boolean } | undefined;
            return (
              <Card key={mod.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white font-bold"
                      style={{ backgroundColor: mod.color || "var(--primary)" }}
                    >
                      {String(mod.order_index).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{mod.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{mod.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {mod.estimated_hours && <span className="text-xs text-muted-foreground">{mod.estimated_hours}h</span>}
                        {mod.difficulty && <span className="text-xs px-2 py-0.5 rounded-full bg-muted">{mod.difficulty}</span>}
                        {prog && <Progress value={prog.progress_percent ?? 0} className="w-24 h-1.5" />}
                      </div>
                    </div>
                    <div className="shrink-0">
                      {prog?.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-[#2ECC71]" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <Button size="sm" variant={prog?.completed ? "outline" : "default"}>
                      {prog?.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
