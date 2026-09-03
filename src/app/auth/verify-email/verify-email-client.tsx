"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }
    api
      .get("/auth/verify-email", { params: { token } })
      .then((res) => {
        setStatus("success");
        setMessage(res.data.message);
      })
      .catch(() => {
        setStatus("error");
        setMessage("Verification link is invalid or expired");
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF8F5]">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border p-8 text-center">
        {status === "loading" && <p className="text-muted-foreground">Verifying your email...</p>}
        {status === "success" && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h1 className="font-serif text-2xl font-bold mb-2">Email Verified!</h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <Link
              href="/dashboard"
              className="inline-block rounded-xl bg-[#E85D75] text-white px-6 py-3 text-sm font-semibold"
            >
              Go to Dashboard
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="font-serif text-2xl font-bold mb-2">Verification Failed</h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <Link href="/auth/login" className="text-[#E85D75] hover:underline font-medium">
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
