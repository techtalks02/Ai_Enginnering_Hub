"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (access: string, refresh: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setTokens: (access, refresh) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", access);
          localStorage.setItem("refresh_token", refresh);
          document.cookie = `access_token=${access}; path=/; max-age=3600; SameSite=Lax; Secure`;
        }
        set({ isAuthenticated: true });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          if (auth) {
            signOut(auth).catch((err) => console.error("Firebase signOut error:", err));
          }
        }
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: "auth-storage", partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }) }
  )
);
