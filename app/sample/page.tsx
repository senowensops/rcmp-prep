import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Sample Test | RCMP Prep",
  description: "Try the first 3 questions from each RCMP Online Assessment section — free, no account required.",
  alternates: {
    canonical: "https://rcmpprep.ca/sample",
  },
};


export default function SamplePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-center">
      <div className="surface-card p-10">
        <h1 className="font-head text-4xl font-extrabold uppercase sm:text-5xl">Free Practice — No Account Needed</h1>
        <p className="mx-auto mt-2 font-head text-sm font-bold uppercase tracking-[0.15em] text-[var(--muted)]">Section 1 of 6 — Workstyle</p>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">Try the first three questions from each of the 6 assessment sections. No account or payment required.</p>
        <Link href="/test/sample" className="mt-8 inline-flex rounded-2xl bg-[var(--red)] px-8 py-5 font-head text-xl font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--red-dk)]">Start Free Sample →</Link>
      </div>
    </main>
  );
}
