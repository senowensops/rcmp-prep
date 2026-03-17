import Link from "next/link";
import { FoundingMemberCounter } from "@/components/landing/FoundingMemberCounter";

const features = [
  "All 3 full-length practice tests",
  "6 sections per test",
  "Timed sections matching real assessment",
  "Answer explanations on every question",
  "Progress tracking across all 3 tests",
  "Lifetime access",
];

export function Pricing() {
  return (
    <section className="px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <div className="max-w-2xl text-center">
          <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">Pricing</p>
          <h2 className="mt-3 font-head text-4xl font-extrabold uppercase tracking-[0.04em] text-white sm:text-5xl">
            One Price. Lifetime Access.
          </h2>
        </div>

        <div className="mt-10 w-full max-w-[400px] rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <div className="inline-flex rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-head text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            Founding Member
          </div>

          <div className="mt-5 flex items-end gap-3">
            <div className="font-head text-5xl font-extrabold uppercase tracking-[0.04em] text-white">$29 CAD</div>
            <div className="pb-1 text-lg text-white/35 line-through">$39</div>
          </div>

          <div className="my-6 h-px bg-white/10" />

          <ul className="space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-white/80">
                <span className="font-head text-xl font-bold text-[var(--red)]">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="my-6 h-px bg-white/10" />

          <Link
            href="/test/1"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--red)] px-6 py-4 font-head text-xl font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)]"
          >
            Unlock Full Access →
          </Link>

          <FoundingMemberCounter />
        </div>

        <div className="mt-6 text-center text-sm leading-7 text-white/58">
          <p>Try the first 3 questions of each section free — no account needed.</p>
          <Link href="/sample" className="font-semibold text-[var(--gold)] transition hover:text-white">
            Start Free Sample →
          </Link>
        </div>
      </div>
    </section>
  );
}
