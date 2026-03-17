import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Link href="/" className="font-head text-2xl font-extrabold uppercase tracking-[0.08em] text-white">
            RCMP<span className="text-[var(--red)]">PREP</span>
          </Link>
          <p className="text-sm text-white/55 sm:text-right">
            Unofficial practice resource — not affiliated with the RCMP
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-sm text-white/48 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            <Link href="/sample" className="transition hover:text-white">/sample</Link>
            <Link href="/terms" className="transition hover:text-white">/terms</Link>
            <Link href="/privacy-policy" className="transition hover:text-white">/privacy-policy</Link>
          </div>
          <p>© 2026 · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
