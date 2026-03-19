const testimonials = [
  {
    quote:
      "I went in blind the first time and got deferred. Found this site, spent two weeks on the spatial and memory sections, and passed on my second attempt. The timed practice made a huge difference.",
    name: "Marcus T.",
    location: "Alberta",
    detail: "Passed on second attempt",
  },
  {
    quote:
      "The spatial section felt impossible until I actually practiced it. The cube nets and gear questions were the ones I needed most. Confident going in now.",
    name: "Sarah K.",
    location: "British Columbia",
    detail: "Currently in background check",
  },
  {
    quote:
      "I appreciated that the explanations tell you WHY the answer is correct, not just what it is. That's how I actually learned instead of just memorizing.",
    name: "Devon M.",
    location: "Ontario",
    detail: "Passed on first attempt",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-white/8 bg-white/[0.02] px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">
            What Candidates Say
          </p>
          <h2 className="mt-3 font-head text-4xl font-extrabold uppercase tracking-[0.04em] text-white sm:text-5xl">
            Real Results
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#161616] p-7"
            >
              <span
                className="mb-4 font-head text-6xl font-extrabold leading-none text-[var(--red)]"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="flex-1 text-base leading-7 text-white/80">{t.quote}</p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="font-head text-base font-bold uppercase tracking-[0.05em] text-white">
                  {t.name}
                </p>
                <p className="mt-1 text-sm text-[var(--gold)]">
                  {t.location} &middot; {t.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/25">
          * Results may vary. These are representative experiences from candidates who used
          structured practice to prepare.
        </p>
      </div>
    </section>
  );
}
