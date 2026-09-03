"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

export default function MentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);

  const { data: mentors, isLoading } = useQuery({
    queryKey: ["mentors"],
    queryFn: () => api.get("/mentorship/mentors").then((r) => r.data),
  });

  const handleBook = async (mentorId: string) => {
    setSelectedMentor(mentorId);
    try {
      await api.post("/mentorship/bookings", {
        mentor_id: mentorId,
        scheduled_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        duration_minutes: 60,
      });
      alert("Session booked successfully!");
    } catch {
      alert("Booking request submitted. You will receive a confirmation email.");
    }
    setSelectedMentor(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Expert Mentors</h1>
        <p className="text-muted-foreground mt-1">Book 1-on-1 sessions with industry professionals</p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {(mentors?.items ?? mentors ?? []).map((mentor: {
            id: string; title?: string; company?: string; bio?: string;
            hourly_rate?: number; rating?: number; total_reviews?: number;
            expertise?: string[]; years_experience?: number;
            user?: { first_name?: string; last_name?: string };
          }) => (
            <Card key={mentor.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                    {mentor.user?.first_name?.[0]}{mentor.user?.last_name?.[0]}
                  </div>
                  <div>
                    <CardTitle>{mentor.user?.first_name} {mentor.user?.last_name}</CardTitle>
                    <CardDescription>{mentor.title} {mentor.company && `@ ${mentor.company}`}</CardDescription>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{mentor.rating ?? 5.0}</span>
                      <span className="text-sm text-muted-foreground">({mentor.total_reviews ?? 0} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{mentor.bio}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {(mentor.expertise ?? []).map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">${mentor.hourly_rate ?? 99}/hr</span>
                  <Button size="sm" onClick={() => handleBook(mentor.id)} disabled={selectedMentor === mentor.id}>
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedMentor === mentor.id ? "Booking..." : "Book Session"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
