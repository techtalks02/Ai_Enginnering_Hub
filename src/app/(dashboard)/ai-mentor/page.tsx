"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIMentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your AI Mentor. I can help with roadmap guidance, career advice, course recommendations, interview prep, skill gap analysis, and resume review. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: conversations } = useQuery({
    queryKey: ["ai-conversations"],
    queryFn: () => api.get("/ai/conversations").then((r) => r.data),
  });

  const chat = useMutation({
    mutationFn: async (message: string) => {
      const { data } = await api.post("/ai/chat", {
        message,
        conversation_id: conversationId,
      });
      return data;
    },
    onSuccess: (data) => {
      if (data.conversation_id) setConversationId(data.conversation_id);
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    chat.mutate(userMessage);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="font-serif text-3xl font-bold">AI Mentor</h1>
        <p className="text-muted-foreground mt-1">Your personal AI guide for career and learning</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === "user" ? "bg-primary text-white" : "bg-muted"
              }`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {chat.isPending && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-muted rounded-2xl px-4 py-3 text-sm">Thinking...</div>
            </div>
          )}
          <div ref={bottomRef} />
        </CardContent>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Ask about roadmap, career, courses, interviews..."
              className="flex-1 rounded-xl border border-border bg-card px-4 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button onClick={handleSend} disabled={chat.isPending || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["Analyze my skill gaps", "Recommend next course", "Interview prep tips", "Review my resume"].map((prompt) => (
              <button
                key={prompt}
                onClick={() => { setInput(prompt); }}
                className="text-xs px-3 py-1 rounded-full bg-muted hover:bg-primary/10 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
