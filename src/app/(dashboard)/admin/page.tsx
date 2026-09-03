"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";

export default function AdminPage() {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => api.get("/analytics/dashboard").then((r) => r.data).catch(() => ({})),
  });

  const adminStats = [
    { label: "Total Users", value: stats?.total_users ?? 0, icon: Users, color: "text-primary" },
    { label: "Active Courses", value: stats?.total_courses ?? 0, icon: BookOpen, color: "text-accent" },
    { label: "Revenue (MTD)", value: `$${stats?.revenue_mtd ?? 0}`, icon: DollarSign, color: "text-[#2ECC71]" },
    { label: "Conversion Rate", value: `${stats?.conversion_rate ?? 0}%`, icon: TrendingUp, color: "text-[#FD79A8]" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform management and analytics</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {adminStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Manage users, roles, and permissions from the admin API.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Content Moderation</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Review reported content and manage community guidelines.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Feature Flags</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Toggle platform features and control rollouts.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Audit Logs</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">View system audit trail and security events.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
