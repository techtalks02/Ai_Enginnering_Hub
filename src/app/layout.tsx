import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProviderWrapper } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { GlobalUI } from "@/components/layout/global-ui";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "AI Engineer Hub | AI & LLM Engineer Roadmap",
    template: "%s | AI Engineer Hub",
  },
  description:
    "Master Generative AI, Large Language Models, RAG, Agents, and AI Infrastructure with a structured, project-based roadmap from AI Engineer Hub — Learn. Build. Deploy.",
  keywords: ["AI Engineer", "LLM", "Machine Learning", "Roadmap", "GenAI", "RAG", "AI Agents", "AI Engineer Hub", "AI Hub"],
  icons: {
    icon: [
      { url: "/assets/logo-icon.png" },
      { url: "/assets/logo.png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/assets/logo-icon.png",
    apple: "/assets/logo-icon.png",
  },
  openGraph: {
    title: "AI Engineer Hub - AI & LLM Engineer Roadmap Platform",
    description: "Become a Professional AI & LLM Engineer with AI Engineer Hub — Learn. Build. Deploy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased overflow-x-clip safe-bottom" suppressHydrationWarning>
        <ThemeProviderWrapper>
          <QueryProvider>
            <AuthProvider>
              {children}
              <GlobalUI />
            </AuthProvider>
          </QueryProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
