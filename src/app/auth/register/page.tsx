"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", label: "IN +91" },
  { code: "+1", flag: "🇺🇸", label: "US +1" },
  { code: "+44", flag: "🇬🇧", label: "UK +44" },
];

type UserType = "student" | "working_professional";

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

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const { setTokens, setUser } = useAuthStore();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    phone_country_code: "+91",
    user_type: "" as UserType | "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.user_type) {
      setError("Please select what describes you best");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (!auth) {
        setUser({ id: "demo-user", email: form.email || "student@aiengineerhub.com", first_name: form.full_name || "AI Engineer", last_name: "Student" });
        setSuccess("Account created successfully!");
        setTimeout(() => router.push(redirectTo), 800);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.full_name });
      await sendEmailVerification(userCredential.user);
      
      const token = await userCredential.user.getIdToken();
      setTokens(token, "");
      
      const userRes = await api.get("/auth/me");
      setUser(userRes.data);
      
      setSuccess("Account created! Check your email to confirm your registration.");
    } catch (err: any) {
      console.error("Signup error details:", err);
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
        console.error("Google signup error:", err);
        setError(formatAuthError(err));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF8F5]">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl border border-border/40">
        <Link
          href="/"
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </Link>

        <div className="p-8">
          <img src="/assets/logo-icon.png" alt="AI Engineer Hub" className="mx-auto sm:mx-0 mb-4 h-16 w-16 object-contain" />
          <h1 className="font-serif text-2xl font-bold mb-1">Create an account</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Sign up to get access to upcoming cohorts and start learning for free
          </p>

          {success ? (
            <div className="text-center space-y-6 py-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shadow-inner">
                <svg className="h-10 w-10 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 8.36V19a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 11l9 6 9-6" />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-bold text-foreground">Verify your email</h2>
                <p className="text-sm text-muted-foreground">
                  We've sent a secure verification link to:
                </p>
                <div className="inline-block bg-muted px-3 py-1.5 rounded-lg text-sm font-semibold text-primary font-mono select-all">
                  {form.email}
                </div>
              </div>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Please click the link in your email to activate your account.
              </p>
              <div className="pt-2">
                <Link href="/auth/login">
                  <button className="w-full bg-primary hover:bg-primary/95 text-white rounded-xl py-3.5 text-sm font-semibold shadow-md transition-all cursor-pointer">
                    Back to Sign In
                  </button>
                </Link>
                <p className="text-[10px] text-muted-foreground/80 mt-2">
                  Didn't receive the email? Check your spam or promotions folder.
                </p>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-white hover:bg-muted py-3.5 text-sm font-semibold cursor-pointer mb-2 disabled:opacity-60"
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
              </button>

              <div className="relative my-4 flex py-1 items-center">
                <div className="flex-grow border-t border-border/60"></div>
                <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase">or</span>
                <div className="flex-grow border-t border-border/60"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</div>
                )}

                <Field label="Full name *">
                  <input
                    placeholder="Enter your full name"
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    required
                    className={inputClass}
                  />
                </Field>

                <Field label="Email address *">
                  <input
                    type="email"
                    placeholder="Enter your full email address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className={inputClass}
                  />
                </Field>

                <Field label="Password *">
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={8}
                    className={inputClass}
                  />
                </Field>

                <Field label="Phone number *">
                  <div className="flex gap-2">
                    <select
                      value={form.phone_country_code}
                      onChange={(e) => setForm({ ...form, phone_country_code: e.target.value })}
                      className={cn(inputClass, "w-28 shrink-0")}
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      className={cn(inputClass, "flex-1")}
                    />
                  </div>
                </Field>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#E85D75] mb-3">
                    What describes you best *
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "student" as const, label: "Student" },
                      { value: "working_professional" as const, label: "Working Professional" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors",
                          form.user_type === opt.value
                            ? "border-[#E85D75] bg-[#FFF0F3]"
                            : "border-border/60 hover:border-[#E85D75]/40"
                        )}
                      >
                        <input
                          type="radio"
                          name="user_type"
                          value={opt.value}
                          checked={form.user_type === opt.value}
                          onChange={() => setForm({ ...form, user_type: opt.value })}
                          className="h-4 w-4 accent-[#E85D75]"
                        />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#E85D75] hover:bg-[#D64D65] text-white py-3.5 text-sm font-bold uppercase tracking-wide transition-colors disabled:opacity-60 cursor-pointer text-center"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              href={`/auth/login${redirectTo !== "/" ? `?redirect=${encodeURIComponent(redirectTo)}` : ""}`} 
              className="text-[#E85D75] hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}

const inputClass =
  "w-full rounded-xl border border-border/60 bg-[#FAF8F5] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D75]/30 placeholder:text-muted-foreground/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#E85D75] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
