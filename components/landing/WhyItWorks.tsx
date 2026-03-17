const bullets = [
  "Mirrors the real format — same section order, same timing, same question types",
  "3 full tests — practice once, compare progress, build confidence",
  "Memory section uses real photos — not generic diagrams",
  "Detailed explanations on every question — learn, don't just drill",
  "Canadian content — detachments, CAD figures, Canadian scenarios",
  "One-time price — no subscription, no recurring charges",
];

export function WhyItWorks() {
  return (
    <section className="border-y border-white/8 bg-white/[0.02] px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">Why It Works</p>
          <h2 className="mt-3 font-head text-4xl font-extrabold uppercase tracking-[0.04em] text-white sm:text-5xl">Built Different</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {bullets.map((bullet) => (
            <div key={bullet} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-black/20 p-5">
              <span className="mt-1 font-head text-2xl font-bold text-[var(--red)]">✓</span>
              <p className="text-lg leading-8 text-white/78">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
