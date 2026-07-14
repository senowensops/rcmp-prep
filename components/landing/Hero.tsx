'use client';

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-x-hidden px-4 pb-0 pt-6 sm:px-8 sm:pt-8">
      <div className="mx-auto max-w-6xl overflow-x-hidden">
        <nav className="mb-10 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="font-head text-2xl font-extrabold uppercase tracking-[0.08em] text-white">
            RCMP<span className="text-[var(--red)]">PREP</span>
          </Link>
          <div className="flex w-full max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3 md:w-auto md:flex-nowrap md:justify-end md:gap-4">
            <Link
              href="/blog"
              className="font-head text-xs font-bold uppercase tracking-[0.12em] text-white/70 transition hover:text-white sm:text-sm"
            >
              Blog
            </Link>
            <a
              href="https://buymeacoffee.com/rcmpprep"
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-full rounded-full border border-white/15 bg-white/8 px-3 py-2.5 text-center font-head text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white/15 sm:px-4 sm:text-sm"
            >
              Support the App
            </a>
            <Link
              href="/test/1"
              className="max-w-full rounded-full border border-[var(--red)] bg-[var(--red)] px-3 py-2.5 text-center font-head text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--red-dk)] sm:px-5 sm:text-sm"
            >
              Start Practicing
            </Link>
          </div>
        </nav>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#151111]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(177,17,22,0.18),_transparent_38%)]" />

          <div className="relative grid min-h-[620px] items-end lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10 px-6 pb-16 pt-10 text-center sm:px-10 sm:pb-20 sm:pt-14 sm:text-left lg:px-12 lg:pb-24">
              <p className="mb-4 text-sm text-white/50">
                32 candidates have practiced this week
              </p>

              <div className="mb-6 inline-flex items-center gap-2 self-center rounded-full border border-[var(--red)]/30 bg-[var(--red)]/10 px-4 py-2 font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)] sm:self-auto">
                <span aria-hidden="true">&bull;</span>
                Unofficial Practice Resource
              </div>

              <h1 className="max-w-4xl font-head text-5xl font-extrabold uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-7xl lg:text-[5.25rem]">
                <span className="block">RCMP Online</span>
                <span className="block text-white">Assessment Prep</span>
              </h1>

              <p className="mt-3 text-base font-medium text-[var(--gold)]">
                Candidates who skip prep risk a 6-12 month deferral.
              </p>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
                Unofficial practice tests covering the same skill areas as the RCMP Online Assessment, spatial reasoning, memory, numerical, language, and more. 100% free, no account needed.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:items-start sm:flex-row">
                <Link
                  href="/test/1"
                  className="inline-flex w-full max-w-sm items-center justify-center rounded-2xl bg-[var(--red)] px-8 py-5 text-center font-head text-2xl font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)] sm:w-auto sm:max-w-none"
                >
                  Start Practicing Free
                </Link>
              </div>

              <p className="mt-3 text-center text-sm text-white/50 sm:text-left">
                No account needed
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
