"use client";

import Link from "next/link";
import type { SectionDefinition } from "@/types";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function TopBar({ answered, section, progress }: { answered: number; total: number; section?: SectionDefinition; progress: number }) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--red)] bg-[var(--dark)] px-4 py-3 text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <Link href="/" className="min-w-fit font-head text-lg font-extrabold uppercase tracking-[0.08em]">
          RCMP<span className="text-[var(--red)]">PREP</span>
        </Link>
        <div className="flex-1"><ProgressBar value={progress} /></div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="pill font-head text-sm font-bold uppercase tracking-[0.08em] text-[var(--gold)]">{answered} answered</span>
          {section ? <span className="font-head text-sm uppercase tracking-[0.08em] text-white/70">{section.label}</span> : null}
        </div>
      </div>
    </header>
  );
}
