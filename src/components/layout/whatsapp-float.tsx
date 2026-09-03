"use client";

import { WhatsAppIcon, WHATSAPP_CHANNEL_URL } from "@/components/layout/whatsapp-icon";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join Techtalks02 on WhatsApp"
      className="hidden md:inline-flex fixed bottom-6 right-6 z-50 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#20BD5A] hover:scale-105 transition-all duration-200"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
