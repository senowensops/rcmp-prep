'use client';

import Link from "next/link";
import { useState } from "react";

const SECTIONS = [
  { value: 'spatial', label: 'Spatial Reasoning' },
  { value: 'numerical', label: 'Numerical' },
  { value: 'language', label: 'Language' },
  { value: 'workstyle', label: 'Workstyle' },
  { value: 'business', label: 'Verbal Reasoning' },
  { value: 'memory', label: 'Memory' },
];

const fullFeatures = [
  "All 3 practice tests",
  "6 sections per test",
  "Timed sections for each skill area",
  "Answer explanations on every question",
  "Progress tracking across all 3 tests",
  "Lifetime access",
];

const sectionFeatures = [
  "1 section of your choice",
  "All 3 tests for that section",
  "Timed practice",
  "Answer explanations",
  "Lifetime access",
];

export function Pricing() {
  const [fullLoading, setFullLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSection, setSelectedSection] = useState('spatial');

  const handleFullUnlock = async () => {
    setError('');
    setFullLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'full' }),
      });
      if (!res.ok) throw new Error('Checkout failed');
      const { url } = await res.json();
      if (!url) throw new Error('No URL');
      window.location.href = url;
    } catch {
      setError('Something went wrong. Please try again.');
      setFullLoading(false);
    }
  };

  const handleSectionUnlock = async () => {
    setError('');
    setSectionLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'section', section: selectedSection }),
      });
      if (!res.ok) throw new Error('Checkout failed');
      const { url } = await res.json();
      if (!url) throw new Error('No URL');
      window.location.href = url;
    } catch {
      setError('Something went wrong. Please try again.');
      setSectionLoading(false);
    }
  };

  return (
    <section className="px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <div className="max-w-2xl text-center">
          <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">Pricing</p>
          <h2 className="mt-3 font-head text-4xl font-extrabold uppercase tracking-[0.04em] text-white sm:text-5xl">
            Choose Your Plan
          </h2>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400">{error}</p>
        )}

        <div className="mt-10 grid w-full max-w-[840px] gap-6 md:grid-cols-2">

          {/* $9 — Single Section */}
          <div className="rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-head text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Single Section
            </div>

            <div className="mt-5 flex items-end gap-3">
              <div className="font-head text-5xl font-extrabold uppercase tracking-[0.04em] text-white">$9 <span className="text-2xl text-white/40">CAD</span></div>
            </div>

            <p className="mt-2 text-sm text-white/50">Full access to one section of your choice across all 3 tests. Perfect if you only need to sharpen one skill.</p>

            <div className="my-6 h-px bg-white/10" />

            <ul className="space-y-4">
              {sectionFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-white/80">
                  <span className="font-head text-xl font-bold text-[var(--red)]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="my-6 h-px bg-white/10" />

            <label className="mb-3 block text-sm font-semibold text-white/60">Choose your section:</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="mb-4 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none focus:border-[var(--red)]"
            >
              {SECTIONS.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#111]">
                  {s.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleSectionUnlock}
              disabled={sectionLoading}
              className="unlock-cta inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[var(--red)] bg-transparent px-6 py-5 font-head text-xl font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {sectionLoading ? (
                <>
                  <span style={{
                    display: 'inline-block', width: '1em', height: '1em',
                    borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', animation: 'spin 0.7s linear infinite',
                  }} />
                  Redirecting...
                </>
              ) : (
                'Get Section Access — $9'
              )}
            </button>
          </div>

          {/* $29 — Full Access */}
          <div className="relative rounded-[2rem] border border-[var(--gold)]/30 bg-white/[0.04] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] ring-2 ring-[var(--gold)]/20">
            <div className="absolute -top-3 right-6 rounded-full bg-[var(--gold)] px-4 py-1 font-head text-xs font-bold uppercase tracking-[0.14em] text-black">
              Recommended
            </div>

            <div className="inline-flex rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 font-head text-xs font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
              Limited Time
            </div>

            <div className="mt-5 flex items-end gap-3">
              <div className="font-head text-5xl font-extrabold uppercase tracking-[0.04em] text-white">$29 <span className="text-2xl text-white/40">CAD</span></div>
              <div className="pb-1 text-lg text-white/35 line-through">$97</div>
            </div>

            <p className="mt-2 text-sm text-white/50">Regular price returns after launch week.</p>

            <div className="my-6 h-px bg-white/10" />

            <ul className="space-y-4">
              {fullFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-white/80">
                  <span className="font-head text-xl font-bold text-[var(--red)]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="my-6 h-px bg-white/10" />

            <button
              onClick={handleFullUnlock}
              disabled={fullLoading}
              className="unlock-cta inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--red)] px-6 py-5 font-head text-xl font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {fullLoading ? (
                <>
                  <span style={{
                    display: 'inline-block', width: '1em', height: '1em',
                    borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', animation: 'spin 0.7s linear infinite',
                  }} />
                  Redirecting...
                </>
              ) : (
                'Unlock Full Access — $29 CAD'
              )}
            </button>
            <p className="mt-3 text-center text-sm font-semibold text-[var(--gold)]">
              Instant access · 2 spots left at founding price
            </p>
          </div>

        </div>

        <div className="mt-6 text-center text-sm leading-7 text-white/58">
          <p>Try the first 3 questions of each section free — no account needed.</p>
          <Link href="/sample" className="font-semibold text-[var(--gold)] transition hover:text-white">
            Start Free Sample →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
