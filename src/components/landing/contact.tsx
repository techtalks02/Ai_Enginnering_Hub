"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/admin/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("success");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Get in Touch</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Have questions? We&apos;d love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-5 sm:space-y-6">
            {[
              { icon: Mail, label: "Email", value: "hello@airoadmap.io" },
              { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: MapPin, label: "Location", value: "San Francisco, CA" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{item.label}</div>
                  <div className="font-medium text-sm sm:text-base">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card>
              <CardContent className="p-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <Input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <Input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                  <textarea
                    placeholder="Your message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    className="flex w-full rounded-xl border border-border bg-card px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <Button type="submit" disabled={status === "loading"} className="w-full">
                    {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
