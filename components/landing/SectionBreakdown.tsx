const sections = [
  {
    number: "01",
    title: "Workstyle Preference",
    description: "Rate your approach to workplace scenarios.",
    meta: "15 statements · Likert scale",
  },
  {
    number: "02",
    title: "Language Comprehension",
    description: "Synonyms and word analogies.",
    meta: "30 questions · Part A + Part B",
  },
  {
    number: "03",
    title: "Numerical Skills",
    description: "Mental math and order of operations.",
    meta: "30 questions · Timed sub-sections",
  },
  {
    number: "04",
    title: "Spatial & Mechanical",
    description: "Gears, pulleys, cube nets, and patterns.",
    meta: "28 questions · Timed sub-sections",
  },
  {
    number: "05",
    title: "Memory",
    description: "Study an image or report, then answer from memory.",
    meta: "4 challenges · 45-second answer window",
  },
  {
    number: "06",
    title: "Business Reasoning",
    description: "Logic, verbal reasoning, and numerical word problems.",
    meta: "30 questions · Part A + Part B",
  },
];

export function SectionBreakdown() {
  return (
    <section className="px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">What You'll Face</p>
          <h2 className="mt-3 font-head text-4xl font-extrabold uppercase tracking-[0.04em] text-white sm:text-5xl">
            Six Sections. Zero Surprises.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.number}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
            >
              <p className="font-head text-sm font-bold uppercase tracking-[0.16em] text-[var(--gold)]">{section.number}</p>
              <h3 className="mt-3 font-head text-2xl font-bold uppercase tracking-[0.04em] text-white">{section.title}</h3>
              <p className="mt-3 text-base leading-7 text-white/72">{section.description}</p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-white/48">{section.meta}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
