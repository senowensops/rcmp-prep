'use client';

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-6 sm:px-8 sm:pb-28 sm:pt-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-16 flex items-center justify-between gap-4">
          <Link href="/" className="font-head text-2xl font-extrabold uppercase tracking-[0.08em] text-white">
            RCMP<span className="text-[var(--red)]">PREP</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="font-head text-sm font-bold uppercase tracking-[0.12em] text-white/70 transition hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/test/1"
              className="rounded-full border border-[var(--red)] bg-[var(--red)] px-5 py-2.5 font-head text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--red-dk)]"
            >
              Start Practicing
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl">
          <p className="mb-4 text-sm text-white/50">
            32 candidates have practiced this week
          </p>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--red)]/30 bg-[var(--red)]/10 px-4 py-2 font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">
            <span aria-hidden="true">&bull;</span>
            Unofficial Practice Resource
          </div>

          <h1 className="max-w-4xl font-head text-5xl font-extrabold uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-7xl lg:text-[5.75rem]">
            <span className="block">RCMP Online</span>
            <span className="block text-white">Assessment Prep</span>
          </h1>

          <p className="mt-3 text-base font-medium text-[var(--gold)]">
            Candidates who skip prep risk a 6-12 month deferral.
          </p>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
            Unofficial practice tests covering the same skill areas as the RCMP Online Assessment — spatial reasoning, memory, numerical, language, and more. 100% free, no account needed.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/test/1"
              className="inline-flex items-center justify-center rounded-2xl bg-[var(--red)] px-8 py-5 font-head text-2xl font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)]"
            >
              Start Practicing Free
            </Link>
          </div>

          <p className="mt-3 text-sm text-white/50">
            No account needed &middot; Takes 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
