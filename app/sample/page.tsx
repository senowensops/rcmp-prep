import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Sample Test | RCMP Prep",
  description: "Try the first 3 questions from each RCMP Online Assessment section — free, no account required.",
};


export default function SamplePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-center">
      <div className="surface-card p-10">
        <div className="font-head text-sm font-bold uppercase tracking-[0.2em] text-[var(--red)]">Free Sample</div>
        <h1 className="mt-3 font-head text-5xl font-extrabold uppercase">Sample drill</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">Try the first three questions from each section — no account or payment required.</p>
        <Link href="/test/sample" className="mt-8 inline-flex rounded-2xl bg-[var(--red)] px-6 py-4 font-head text-lg font-bold uppercase tracking-[0.08em] text-white">Start sample</Link>
      </div>
    </main>
  );
}
