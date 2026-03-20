"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function AccessPageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email");
  const [status, setStatus] = useState<"checking" | "granted" | "not_found" | "error">("checking");

  useEffect(() => {
    if (!email) { setStatus("not_found"); return; }

    fetch(`/api/access?email=${encodeURIComponent(email)}`)
      .then(r => r.json())
      .then(d => {
        if (d.found) {
          localStorage.setItem("rcmp-access-unlocked", "1");
          setStatus("granted");
          setTimeout(() => router.push("/test/1"), 1500);
        } else {
          setStatus("not_found");
        }
      })
      .catch(() => setStatus("error"));
  }, [email, router]);

  return (
    <main className="min-h-screen bg-[var(--dark)] flex items-center justify-center px-6">
      <head><meta name="robots" content="noindex, nofollow" /></head>
      <div className="text-center max-w-md">
        {status === "checking" && (
          <>
            <div className="font-mono text-4xl text-[var(--gold)] mb-4">...</div>
            <p className="text-white/60">Verifying your access</p>
          </>
        )}
        {status === "granted" && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h1 className="font-head text-3xl font-extrabold uppercase text-white mb-2">Access Restored</h1>
            <p className="text-white/60">Taking you to your test now...</p>
          </>
        )}
        {status === "not_found" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="font-head text-3xl font-extrabold uppercase text-white mb-2">Not Found</h1>
            <p className="text-white/60 mb-6">No purchase found for this email. If you think this is wrong, contact support@rcmpprep.ca</p>
            <Link href="/" className="inline-flex rounded-2xl bg-[var(--red)] px-6 py-3 font-head font-bold uppercase tracking-[0.08em] text-white">Back to Home</Link>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="font-head text-3xl font-extrabold uppercase text-white mb-2">Something went wrong</h1>
            <p className="text-white/60 mb-6">Please try again or contact support@rcmpprep.ca</p>
            <Link href="/" className="inline-flex rounded-2xl bg-[var(--red)] px-6 py-3 font-head font-bold uppercase tracking-[0.08em] text-white">Back to Home</Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function AccessPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[var(--dark)] flex items-center justify-center"><p className="text-white/40">Loading...</p></main>}>
      <AccessPageInner />
    </Suspense>
  );
}
