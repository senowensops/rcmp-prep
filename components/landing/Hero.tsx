'use client';

import Link from "next/link";
import { useState } from "react";
import { PaywallModal } from "@/components/ui/PaywallModal";

export function Hero() {
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-6 sm:px-8 sm:pb-28 sm:pt-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-16 flex items-center justify-between gap-4">
          <Link href="/" className="font-head text-2xl font-extrabold uppercase tracking-[0.08em] text-white">
            RCMP<span className="text-[var(--red)]">PREP</span>
          </Link>
          <Link
            href="/sample"
            className="rounded-full border border-[var(--red)] bg-[var(--red)] px-5 py-2.5 font-head text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--red-dk)]"
          >
            Try Free
          </Link>
        </nav>

        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--red)]/30 bg-[var(--red)]/10 px-4 py-2 font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">
            <span aria-hidden="true">•</span>
            Unofficial Practice Resource
          </div>

          <h1 className="max-w-4xl font-head text-5xl font-extrabold uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-7xl lg:text-[5.75rem]">
            <span className="block">RCMP Online</span>
            <span className="block text-white">Assessment Prep</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
            Practice tests built to mirror the structure, timing, and question types of the real RCMP Online Assessment. Candidates who don&apos;t prepare risk deferral — don&apos;t leave it to chance.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/sample"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--red)] px-7 py-4 font-head text-xl font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)]"
            >
              Try Free Sample →
            </Link>
            <button
              onClick={() => setShowPaywall(true)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-transparent px-7 py-4 font-head text-xl font-bold uppercase tracking-[0.08em] text-white transition hover:border-white/35 hover:bg-white/5"
            >
              Unlock Full Access →
            </button>
          </div>

          <p className="mt-5 text-sm text-white/55 sm:text-base">
            No account needed to try · Lifetime access
          </p>
        </div>
      </div>

      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          onUnlock={() => {
            setShowPaywall(false);
            window.location.href = '/test/1';
          }}
        />
      )}
    </section>
  );
}
