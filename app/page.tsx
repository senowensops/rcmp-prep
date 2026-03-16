import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--dark)] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.25em] text-[var(--gold)] font-head">
          RCMP Assessment Practice
        </div>
        <div className="font-head text-6xl font-extrabold uppercase tracking-[0.06em] sm:text-8xl">
          RCMP<span className="text-[var(--red)]">PREP</span>
        </div>
        <h1 className="mt-6 font-head text-4xl font-extrabold uppercase sm:text-6xl">
          Train like the test is tomorrow.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
          Full six-section RCMP-style practice tests with timed sections, memory drills, instant scoring, and section-by-section review.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/test/1" className="rounded-2xl bg-[var(--red)] px-8 py-4 font-head text-xl font-extrabold uppercase tracking-[0.08em] text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5">
            Start Test 1
          </Link>
          <Link href="/sample" className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-head text-xl font-bold uppercase tracking-[0.08em] text-white/90 transition hover:bg-white/10">
            Try Free Sample
          </Link>
        </div>
      </section>
    </main>
  );
}
