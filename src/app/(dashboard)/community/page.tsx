"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle, Bookmark, Send, Sparkles, Plus, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

const DEFAULT_COMMUNITIES = [
  { id: "all", name: "All Channels", slug: "all" },
  { id: "rag", name: "RAG & Vector DBs", slug: "rag" },
  { id: "agents", name: "Agents & MCP", slug: "agents" },
  { id: "llmops", name: "LLMOps & Cloud", slug: "llmops" },
  { id: "careers", name: "Career & Interview Prep", slug: "careers" },
];

const SEED_POSTS = [
  {
    id: "p1",
    title: "How are you handling semantic cache invalidation with Redis + pgvector?",
    content: "We're currently using Redis cosine similarity for cache hits (threshold 0.94), but encountering cache staleness when our underlying knowledge base updates. Has anyone implemented automated key tagging or event-driven cache invalidation hooks in LangChain/LlamaIndex?",
    channel: "rag",
    like_count: 34,
    comment_count: 12,
    created_at: "2026-03-01T10:00:00Z",
    author: { first_name: "Rahul", last_name: "Sharma", role: "AI Systems Engineer" }
  },
  {
    id: "p2",
    title: "Building custom MCP server in Python for internal Postgres schemas",
    content: "Just migrated our function-calling scripts to the Model Context Protocol (MCP). The latency overhead is negligible (<8ms) and Claude 3.5 Sonnet handles the JSON-RPC tool schemas remarkably well. Highly recommend checking out Chapter 5 lessons!",
    channel: "agents",
    like_count: 48,
    comment_count: 19,
    created_at: "2026-03-02T14:30:00Z",
    author: { first_name: "Sarah", last_name: "Chen", role: "Fullstack AI Engineer" }
  },
  {
    id: "p3",
    title: "Cracked the Forward Deployed Engineer (FDE) interview loop — Key learnings",
    content: "Just accepted an FDE offer at an AI unicorn! The system design interview was 100% focused on latency budgets, multi-tenant VPC security, and handling tool-calling timeouts. The exercises in the FDE roadmap were literally identical to the take-home challenge.",
    channel: "careers",
    like_count: 89,
    comment_count: 27,
    created_at: "2026-03-02T18:00:00Z",
    author: { first_name: "Arjun", last_name: "Mehta", role: "Forward Deployed Engineer" }
  }
];

export default function CommunityPage() {
  const queryClient = useQueryClient();
  const [newPost, setNewPost] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [localPosts, setLocalPosts] = useState(SEED_POSTS);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});

  const { data: communities } = useQuery({
    queryKey: ["communities"],
    queryFn: () => api.get("/community/communities").then((r) => r.data).catch(() => DEFAULT_COMMUNITIES),
  });

  const { data: apiPosts, isLoading } = useQuery({
    queryKey: ["posts", selectedChannel],
    queryFn: () => api.get("/community/posts", { params: { community_id: selectedChannel !== "all" ? selectedChannel : undefined } }).then((r) => r.data).catch(() => null),
  });

  const channelsList = communities?.items ?? (Array.isArray(communities) && communities.length > 0 ? communities : DEFAULT_COMMUNITIES);

  const displayPosts = React.useMemo(() => {
    const raw = apiPosts?.items ?? (Array.isArray(apiPosts) && apiPosts.length > 0 ? apiPosts : localPosts);
    if (selectedChannel === "all") return raw;
    return raw.filter((p: any) => !p.channel || p.channel === selectedChannel);
  }, [apiPosts, localPosts, selectedChannel]);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const created = {
      id: `local-${Date.now()}`,
      title: newTitle.trim() || newPost.slice(0, 60),
      content: newPost.trim(),
      channel: selectedChannel === "all" ? "rag" : selectedChannel,
      like_count: 1,
      comment_count: 0,
      created_at: new Date().toISOString(),
      author: { first_name: "You", last_name: "(AI Engineer)", role: "Community Member" }
    };

    setLocalPosts([created, ...localPosts]);
    setNewPost("");
    setNewTitle("");

    // Also attempt remote save if backend is running
    api.post("/community/posts", {
      content: newPost,
      title: newTitle || newPost.slice(0, 80),
      community_id: selectedChannel !== "all" ? selectedChannel : undefined
    }).catch(() => {});
  };

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Heading */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider mb-2 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Engineer Community</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">Discussions & Peer Learning</h1>
        <p className="text-sm text-muted-foreground mt-1">Connect, debate architectures, and collaborate with practicing AI Engineers.</p>
      </div>

      {/* Channel Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {channelsList.map((c: { id: string; name: string; slug: string }) => {
          const isActive = selectedChannel === c.id || selectedChannel === c.slug;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedChannel(c.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border",
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                  : "bg-card text-muted-foreground border-border/70 hover:text-foreground hover:bg-muted/40"
              )}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Create New Post Form */}
      <Card className="border-border/80 shadow-xs">
        <CardContent className="p-4 sm:p-5">
          <form onSubmit={handleCreatePost} className="space-y-3">
            <Input
              placeholder="Topic or Question Title (optional)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-xs font-semibold bg-background"
            />
            <textarea
              placeholder="Share a technical question, architecture design, or interview insight with fellow AI Engineers..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-border/80 bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed resize-none"
            />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-muted-foreground">Markdown & code snippets supported</span>
              <Button
                type="submit"
                disabled={!newPost.trim()}
                className="gap-1.5 font-semibold text-xs h-8 px-4"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Discussion</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {displayPosts.map((post: any) => {
          const isLiked = !!likedPosts[post.id];
          const isBookmarked = !!bookmarkedPosts[post.id];
          const currentLikes = (post.like_count || 0) + (isLiked ? 1 : 0);

          return (
            <Card key={post.id} className="border-border/80 hover:border-primary/40 transition-colors shadow-2xs">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center text-xs">
                      {post.author?.first_name?.[0] || "A"}{post.author?.last_name?.[0] || "I"}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">
                        {post.author?.first_name} {post.author?.last_name}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono">
                        {post.author?.role || "AI Engineer"} · {new Date(post.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {post.channel && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-muted text-muted-foreground">
                      #{post.channel}
                    </span>
                  )}
                </div>

                {post.title && (
                  <h3 className="font-serif text-base font-bold text-foreground leading-snug">
                    {post.title}
                  </h3>
                )}

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center gap-5 pt-2 border-t border-border/60 text-xs text-muted-foreground">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={cn(
                      "flex items-center gap-1.5 transition-colors cursor-pointer",
                      isLiked ? "text-rose-600 font-bold" : "hover:text-primary"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                    <span>{currentLikes}</span>
                  </button>

                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comment_count || 0} replies</span>
                  </button>

                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className={cn(
                      "flex items-center gap-1.5 transition-colors cursor-pointer ml-auto",
                      isBookmarked ? "text-primary font-bold" : "hover:text-foreground"
                    )}
                  >
                    <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
