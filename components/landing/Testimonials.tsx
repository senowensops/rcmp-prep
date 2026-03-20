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

        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#161616] p-7">
            <span
              className="mb-4 font-head text-6xl font-extrabold leading-none text-[var(--red)]"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="flex-1 text-base leading-7 text-white/80">
              I hadn&apos;t written a test like this since high school — that&apos;s over 20
              years ago. Without proper preparation I would have failed for sure. This helped me
              feel genuinely ready.
            </blockquote>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-head text-base font-bold uppercase tracking-[0.05em] text-white">
                Jordan
              </p>
              <p className="mt-1 text-sm text-[var(--gold)]">RCMP Applicant</p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-white/25">
          * Results may vary. These are representative experiences from candidates who used
          structured practice to prepare.
        </p>
      </div>
    </section>
  );
}
