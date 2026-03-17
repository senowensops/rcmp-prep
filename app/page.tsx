import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "Workstyle Preference",
    description:
      "15 statements. No right or wrong. Assess your tendencies honestly.",
  },
  {
    number: "02",
    title: "Language Comprehension",
    description:
      "Word meanings & analogies. Two timed 5-min components.",
  },
  {
    number: "03",
    title: "Numerical Skills",
    description:
      "Two timed levels. Basic math, ratios, data interpretation.",
  },
  {
    number: "04",
    title: "Spatial & Mechanical",
    description:
      "4 components: 2D rotation, 3D visualization, mechanical, cube folding.",
  },
  {
    number: "05",
    title: "Memory Quotient",
    description:
      "Study real scenarios, then answer from memory. Police-context material.",
  },
  {
    number: "06",
    title: "Business Reasoning",
    description:
      "Logic, syllogisms, and workplace decision-making. 20-min section.",
  },
];

const features = [
  {
    title: "Timed Like the Real Thing",
    description:
      "Subsection timers auto-advance. No surprises on test day.",
  },
  {
    title: "Instant Answer Review",
    description:
      "Right, wrong, and why. Explanations for every single question.",
  },
  {
    title: "3 Full Test Variants",
    description:
      "Tests 1, 2, and 3 — all unique questions. Practice until it clicks.",
  },
];

const checklist = [
  "3 complete practice tests",
  "75+ questions across all sections",
  "All 6 RCMP assessment sections",
  "Timed exactly like the real test",
  "Instant answer review + explanations",
  "Works on any device",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--dark)] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--dark)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-head text-2xl font-extrabold uppercase tracking-[0.08em] text-white"
          >
            RCMP<span className="text-[var(--red)]">PREP</span>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/sample"
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 font-head text-sm font-bold uppercase tracking-[0.08em] text-white/90 transition hover:bg-white/10 sm:px-5"
            >
              Try Free Sample
            </Link>
            <Link
              href="/test/1"
              className="rounded-2xl bg-[var(--red)] px-4 py-3 font-head text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)] sm:px-5"
            >
              Start Test 1
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[var(--dark)]">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20 text-center sm:py-24">
          <div className="mx-auto inline-flex items-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-4 py-2 font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
            RCMP Online Entrance Assessment — 2026
          </div>

          <h1 className="mx-auto mt-8 max-w-5xl font-head text-5xl font-extrabold uppercase leading-none tracking-[0.04em] text-white sm:text-7xl lg:text-8xl">
            Train like the test is tomorrow.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl">
            The only practice platform built to match the real RCMP assessment —
            6 sections, timed subsections, instant feedback, and detailed
            explanations.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/test/1"
              className="w-full rounded-2xl bg-[var(--red)] px-8 py-4 font-head text-lg font-extrabold uppercase tracking-[0.08em] text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)] sm:w-auto"
            >
              Start Test 1 — Free
            </Link>
            <Link
              href="/sample"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-head text-lg font-bold uppercase tracking-[0.08em] text-white/90 transition hover:bg-white/10 sm:w-auto"
            >
              Try Free Sample
            </Link>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/65 sm:flex-row sm:gap-0">
            <span className="px-4">75+ Questions</span>
            <span className="hidden h-5 w-px bg-white/15 sm:block" />
            <span className="px-4">6 Sections</span>
            <span className="hidden h-5 w-px bg-white/15 sm:block" />
            <span className="px-4">Timed Like The Real Test</span>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] text-[var(--dark)]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">
              Section Breakdown
            </p>
            <h2 className="mt-4 font-head text-4xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl">
              Every section. Fully covered.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sections.map((section) => (
              <article key={section.number} className="surface-card p-7">
                <div className="inline-flex rounded-full bg-[var(--red)]/10 px-3 py-1 font-head text-sm font-bold uppercase tracking-[0.14em] text-[var(--red)]">
                  Section {section.number}
                </div>
                <h3 className="mt-5 font-head text-2xl font-extrabold uppercase tracking-[0.03em] text-[var(--dark)]">
                  {section.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--muted)]">
                  {section.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--dark)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="max-w-2xl">
            <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
              Why RCMP Prep
            </p>
            <h2 className="mt-4 font-head text-4xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl">
              Practice with real-test pressure.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-[18px] border border-white/10 bg-white/5 p-7"
              >
                <h3 className="font-head text-2xl font-extrabold uppercase tracking-[0.03em] text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-white/70">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg)] text-[var(--dark)]">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
          <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">
            Pricing
          </p>
          <h2 className="mt-4 font-head text-4xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl">
            One price. Full access.
          </h2>

          <div className="mx-auto mt-12 max-w-2xl rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_18px_60px_rgba(15,15,15,0.08)] sm:p-10">
            <div className="font-head text-6xl font-extrabold uppercase text-[var(--dark)] sm:text-7xl">
              $29
            </div>
            <p className="mt-3 text-lg text-[var(--muted)]">
              One-time. No subscription.
            </p>

            <ul className="mt-8 space-y-4 text-left text-base text-[var(--dark)]">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--red)]/10 text-[var(--red)]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/test/1"
              className="mt-10 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--red)] px-8 py-4 font-head text-lg font-extrabold uppercase tracking-[0.08em] text-white shadow-lg shadow-red-950/25 transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)]"
            >
              Unlock Full Access — $29
            </Link>

            <div className="mt-5">
              <Link
                href="/sample"
                className="text-sm font-semibold text-[var(--red)] transition hover:text-[var(--red-dk)]"
              >
                Or start with the free sample →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[var(--dark)] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-head text-2xl font-extrabold uppercase tracking-[0.08em] text-white">
              RCMP<span className="text-[var(--red)]">PREP</span>
            </div>
            <p className="mt-2 text-sm text-white/65">
              Train like the test is tomorrow.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-white/70 sm:items-end">
            <div className="flex items-center gap-4">
              <Link href="/test/1" className="transition hover:text-white">
                Start Test 1
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/sample" className="transition hover:text-white">
                Free Sample
              </Link>
            </div>
            <p>© 2026 RCMP Prep</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
