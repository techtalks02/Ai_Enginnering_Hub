"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function formatAuthError(err: any): string {
  if (!err) return "An unexpected error occurred";
  if (typeof err === "string") return err;
  
  const code = err.code || "";
  const message = err.message || "";
  
  if (
    code === "auth/invalid-credential" || 
    code === "auth/wrong-password" || 
    code === "auth/user-not-found" ||
    message.includes("auth/invalid-credential") ||
    message.includes("auth/wrong-password") ||
    message.includes("auth/user-not-found")
  ) {
    return "Invalid email or password.";
  }
  if (code === "auth/invalid-email" || message.includes("auth/invalid-email")) {
    return "Please enter a valid email address.";
  }
  if (code === "auth/email-already-in-use" || message.includes("auth/email-already-in-use")) {
    return "This email address is already registered.";
  }
  if (code === "auth/weak-password" || message.includes("auth/weak-password")) {
    return "Password must be at least 6 characters long.";
  }
  if (message.includes("network-request-failed") || message.includes("fetch") || message.includes("Network")) {
    return "Network connection error. Please check your internet connection and try again.";
  }
  
  return message || code || String(err);
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { setTokens, setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!auth) {
        setUser({ id: "demo-user", email: email || "student@aiengineerhub.com", first_name: "AI Engineer", last_name: "Student" });
        router.push(redirectTo);
        return;
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      setTokens(token, "");
      const userRes = await api.get("/auth/me");
      setUser(userRes.data);
      router.push(redirectTo);
    } catch (err: any) {
      console.error("Login error details:", err);
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    setError("");
    try {
      if (!auth) {
        setUser({ id: "demo-user", email: "student@aiengineerhub.com", first_name: "AI Engineer", last_name: "Student" });
        router.push(redirectTo);
        return;
      }
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const token = await userCredential.user.getIdToken();
      setTokens(token, "");
      const userRes = await api.get("/auth/me");
      setUser(userRes.data);
      router.push(redirectTo);
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
        console.error("Google login error:", err);
        setError(formatAuthError(err));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src="/assets/logo-icon.png" alt="AI Engineer Hub" className="mx-auto mb-4 h-16 w-16 object-contain" />
          <CardTitle className="font-serif text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue your AI journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-500 text-center">{error}</div>}
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading || googleLoading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-4 flex py-1.5 items-center">
            <div className="flex-grow border-t border-border/60"></div>
            <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase">or</span>
            <div className="flex-grow border-t border-border/60"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-2 border-border/60 hover:bg-muted"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link 
              href={`/auth/register${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} 
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
