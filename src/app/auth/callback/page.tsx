"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/lib/firebase";
import { applyActionCode } from "firebase/auth";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  const { setTokens, setUser } = useAuthStore();

  useEffect(() => {
    const handleFirebaseAction = async () => {
      if (!mode || !oobCode) {
        router.replace("/auth/login");
        return;
      }

      try {
        if (mode === "resetPassword") {
          router.replace(`/auth/reset-password?oobCode=${oobCode}`);
        } else if (mode === "verifyEmail") {
          if (auth) {
            await applyActionCode(auth, oobCode);
            const user = auth.currentUser;
            if (user) {
              const token = await user.getIdToken(true);
              setTokens(token, "");
              const userRes = await api.get("/auth/me");
              setUser(userRes.data);
            }
          }
          router.replace("/dashboard?verified=true");
        } else {
          router.replace("/auth/login");
        }
      } catch (err) {
        console.error("Firebase auth action error:", err);
        router.replace(`/auth/login?error=action_failed&message=${encodeURIComponent((err as Error).message)}`);
      }
    };

    handleFirebaseAction();
  }, [router, searchParams, mode, oobCode, setTokens, setUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
      <h2 className="font-serif text-xl font-bold">Verifying Auth Request...</h2>
      <p className="text-sm text-muted-foreground mt-1">Please wait while we check your credentials.</p>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="font-serif text-xl font-bold">Loading...</h2>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
