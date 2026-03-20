"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { RadarChart } from "@/components/ui/RadarChart";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getResults } from "@/lib/testData";
import type { TestState } from "@/types";

export default function ResultsPage() {
  const params = useParams<{ testId: string }>();
  const [state] = useLocalStorage<TestState>(`rcmp-progress-${params.testId}`, { testId: params.testId, currentSectionId: 'workstyle', currentQuestionIndex: 0, answers: {}, flags: {}, timestamps: { updatedAt: new Date().toISOString() } });
  const results = useMemo(() => getResults(params.testId, state.answers), [params.testId, state.answers]);
  const heroClass = results.overallPct >= 80 ? 'text-[var(--gold)]' : results.overallPct >= 60 ? 'text-[var(--blue)]' : 'text-[var(--muted)]';

  const flaggedIds = Object.keys(state.flags ?? {}).filter(id => (state.flags as Record<string, boolean>)[id]);
  const flaggedQuestions = results.review.filter(({ question }) => flaggedIds.includes(question.id));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <head><meta name="robots" content="noindex, nofollow" /></head>
      {/* 1. Score hero */}
      <section className="surface-card p-8 text-center">
        <div className="font-head text-sm font-bold uppercase tracking-[0.2em] text-[var(--red)]">Results</div>
        <div className={`mt-3 font-head text-7xl font-extrabold ${heroClass}`}>{results.overallPct}%</div>
        <p className="mt-2 font-mono text-lg">{results.overallCorrect} of {results.totalScored} correct</p>
      </section>

      {/* 2. Study recommendations + action buttons */}
      <section className="mt-6 surface-card p-6">
        <h2 className="font-head text-2xl font-extrabold uppercase">Study recommendations</h2>
        <div className="mt-4 space-y-3 text-[var(--muted)]">
          {results.sections.filter((section) => section.label !== 'Workstyle' && section.pct < 80).length === 0 ? <p>You&apos;re in strong shape — keep reviewing for consistency.</p> : results.sections.filter((section) => section.label !== 'Workstyle' && section.pct < 80).map((section) => <p key={section.label}>Focus on <strong>{section.label}</strong> — aim to bring that section above 80% before your next attempt.</p>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/test/${params.testId}`} className="rounded-2xl bg-[var(--red)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em] text-white">Retake</Link>
          {params.testId === 'sample' ? (
            <Link href="/test/1" className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em]">Try Full Test →</Link>
          ) : Number(params.testId) < 3 ? (
            <Link href={`/test/${Number(params.testId) + 1}`} className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em]">Try Test {Number(params.testId) + 1}</Link>
          ) : null}
          <Link href="/" className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em]">Back to Dashboard</Link>
        </div>
      </section>

      {/* 3. Radar chart + section breakdown */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="surface-card p-6"><RadarChart data={results.sections.map((section) => ({ section: section.label, score: section.pct }))} /></div>
        <div className="space-y-4">
          {results.sections.map((section) => (
            <div key={section.label} className="surface-card p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-head text-xl font-extrabold uppercase">{section.label}</div>
                  <div className="text-sm text-[var(--muted)]">{section.label === 'Workstyle' ? `Completed: ${section.total}/${section.total}` : `${section.correct} of ${section.total} correct`}</div>
                </div>
                <div className="font-mono text-lg font-bold">{section.pct}%</div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface2)]"><div className="h-full rounded-full bg-gradient-to-r from-[var(--red)] to-[var(--gold)]" style={{ width: `${section.pct}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Flagged Questions */}
      {flaggedQuestions.length > 0 && (
        <section className="mt-6 surface-card p-6">
          <h2 className="font-head text-2xl font-extrabold uppercase">Flagged Questions</h2>
          <div className="mt-6 space-y-4">
            {flaggedQuestions.map(({ question, selected, isCorrect }) => (
              <div key={question.id} className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-5">
                <span className="absolute right-4 top-4 text-xl">🚩</span>
                <div className="font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{question.id}</div>
                <div className="review-html mt-2" dangerouslySetInnerHTML={{ __html: question.text }} />
                <div className="mt-4 space-y-2">
                  {question.opts.map((opt, index) => {
                    const selectedMatch = selected === index || (selected === -1 && opt === "I don't know");
                    const correctMatch = question.correct === index;
                    return <div key={`${question.id}-flag-${index}`} className={`rounded-xl border px-4 py-3 ${correctMatch ? 'border-[var(--correct)] bg-[var(--correct-bg)]' : selectedMatch && !isCorrect ? 'border-[var(--wrong)] bg-[var(--wrong-bg)]' : 'border-[var(--border)] bg-white'}`}>{opt}</div>;
                  })}
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">{question.exp}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Full review */}
      <section className="mt-6 surface-card p-6">
        <details open>
          <summary className="cursor-pointer font-head text-2xl font-extrabold uppercase">Full review</summary>
          <div className="mt-6 space-y-4">
            {results.review.map(({ question, selected, isCorrect }) => (
              <div key={question.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-5">
                <div className="font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{question.id}</div>
                <div className="review-html mt-2" dangerouslySetInnerHTML={{ __html: question.text }} />
                <div className="mt-4 space-y-2">
                  {question.opts.map((opt, index) => {
                    const selectedMatch = selected === index || (selected === -1 && opt === "I don't know");
                    const correctMatch = question.correct === index;
                    return <div key={`${question.id}-${index}`} className={`rounded-xl border px-4 py-3 ${correctMatch ? 'border-[var(--correct)] bg-[var(--correct-bg)]' : selectedMatch && !isCorrect ? 'border-[var(--wrong)] bg-[var(--wrong-bg)]' : 'border-[var(--border)] bg-white'}`}>{opt}</div>;
                  })}
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">{question.exp}</p>
              </div>
            ))}
          </div>
        </details>
      </section>
    </main>
  );
}
