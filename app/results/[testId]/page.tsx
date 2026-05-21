"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { RadarChart } from "@/components/ui/RadarChart";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getResults } from "@/lib/testData";
import { trackNextTestClicked, trackResultsViewed, trackRetakeClicked, trackSupportClicked, trackSupportDismissed, trackSupportModalShown, trackTestComplete } from "@/lib/tracking";
import type { TestState } from "@/types";

function SupportModal({ onClose, testId }: { onClose: () => void; testId: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6" onClick={onClose}>
      <div className="relative max-w-md w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          aria-label="Close support modal"
          onClick={() => { void trackSupportDismissed(testId); onClose(); }}
          className="absolute right-4 top-4 rounded-full px-3 py-1 text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          ×
        </button>
        <h2 className="font-head text-3xl font-extrabold uppercase text-white">Keep the momentum going</h2>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Most candidates do better after a second attempt. Review your weak spots, then come back and improve your score.
        </p>
        <button
          onClick={() => { void trackSupportDismissed(testId); onClose(); }}
          className="mt-6 inline-block rounded-lg bg-[var(--red)] px-8 py-3 font-semibold text-lg text-white transition-colors hover:bg-[var(--red-dk)]"
        >
          Continue Reviewing
        </button>
        <a
          href="https://buymeacoffee.com/rcmpprep"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => void trackSupportClicked(testId)}
          className="mt-4 block w-full text-sm text-white/50 transition hover:text-white/80"
        >
          Want to support the project instead?
        </a>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const params = useParams<{ testId: string }>();
  const [state] = useLocalStorage<TestState>(`rcmp-progress-${params.testId}`, { testId: params.testId, currentSectionId: 'workstyle', currentQuestionIndex: 0, answers: {}, flags: {}, timestamps: { updatedAt: new Date().toISOString() } });
  const results = useMemo(() => getResults(params.testId, state.answers), [params.testId, state.answers]);
  const heroClass = results.overallPct >= 80 ? 'text-[var(--gold)]' : results.overallPct >= 60 ? 'text-[var(--blue)]' : 'text-[var(--muted)]';
  const [showSupport, setShowSupport] = useState(false);

  const flaggedIds = Object.keys(state.flags ?? {}).filter(id => (state.flags as Record<string, boolean>)[id]);
  const flaggedQuestions = results.review.filter(({ question }) => flaggedIds.includes(question.id));
  const weakSections = results.sections.filter((section) => section.label !== 'Workstyle' && section.pct < 80);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    void trackResultsViewed(params.testId);
    if (sessionStorage.getItem(`rcmp-support-modal-shown-${params.testId}`) === 'true') return;
    const timer = setTimeout(() => {
      setShowSupport(true);
      void trackSupportModalShown(params.testId);
      sessionStorage.setItem(`rcmp-support-modal-shown-${params.testId}`, 'true');
    }, 1500);
    return () => clearTimeout(timer);
  }, [params.testId]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const completeKey = `rcmp-test-completed-${params.testId}`;
    if (sessionStorage.getItem(completeKey)) return;
    if (!Object.keys(state.answers).length) return;

    const startTime = sessionStorage.getItem(`rcmp-test-start-${params.testId}`);
    const durationSeconds = startTime
      ? Math.round((Date.now() - Number.parseInt(startTime, 10)) / 1000)
      : 0;
    const activeDurationSeconds = state.timestamps.activeDurationSeconds ?? durationSeconds;
    const completedAt = new Date().toISOString();

    void trackTestComplete({
      testId: params.testId,
      totalQuestions: results.totalScored,
      answeredQuestions: Object.keys(state.answers).length,
      correctAnswers: results.overallCorrect,
      scorePercent: results.overallPct,
      durationSeconds,
      activeDurationSeconds,
      startedAt: state.timestamps.startedAt,
      completedAt,
      sections: results.sections,
      sectionTimes: state.timestamps.sectionTimes,
      questionTimes: state.timestamps.questionTimes,
      sectionVisits: state.timestamps.sectionVisits,
      lastSectionId: state.currentSectionId,
      answers: state.answers,
      skippedQuestions: (state.questionOrder ?? []).filter((questionId) => !(questionId in state.answers)),
      questionOrder: state.questionOrder,
    });

    sessionStorage.setItem(completeKey, "1");
    sessionStorage.setItem(`rcmp-test-completed-at-${params.testId}`, completedAt);
  }, [params.testId, results, state.answers, state.currentSectionId, state.questionOrder, state.timestamps.questionTimes, state.timestamps.sectionTimes]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <head><meta name="robots" content="noindex, nofollow" /></head>

      <section className="surface-card p-8 text-center">
        <div className="font-head text-sm font-bold uppercase tracking-[0.2em] text-[var(--red)]">Results</div>
        <div className={`mt-3 font-head text-7xl font-extrabold ${heroClass}`}>{results.overallPct}%</div>
        <p className="mt-2 font-mono text-lg">{results.overallCorrect} of {results.totalScored} correct</p>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
          {results.overallPct < 50
            ? "That score is actually useful. It shows exactly where to focus before the real RCMP assessment."
            : results.overallPct < 80
              ? "Solid start. A bit more focused practice should make this score much more consistent."
              : "Strong result. Keep sharpening the weaker sections so this level holds under pressure."}
        </p>
      </section>

      <section className="mt-6 surface-card p-6">
        <h2 className="font-head text-2xl font-extrabold uppercase">What to do next</h2>
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-5">
          <p className="text-lg text-[var(--dark)]">
            {results.overallPct < 50
              ? "Most applicants should not walk into the real test cold. Use this result as your baseline, then practice again with a clear target."
              : results.overallPct < 80
                ? "You are on the right track, but there are still gaps worth tightening before test day."
                : "You are in a good spot. Now the goal is consistency across every section."}
          </p>
          <div className="mt-4 space-y-3 text-[var(--muted)]">
            {weakSections.length === 0
              ? <p>You&apos;re in strong shape, keep reviewing for consistency and retake a full test soon.</p>
              : weakSections.map((section) => <p key={section.label}>Focus on <strong>{section.label}</strong> first, then retake the test and aim to bring that section above 80%.</p>)}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/test/${params.testId}`} onClick={() => void trackRetakeClicked(params.testId)} className="rounded-2xl bg-[var(--red)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em] text-white">Retake this test</Link>
          {Number(params.testId) < 3 ? (
            <Link href={`/test/${Number(params.testId) + 1}`} onClick={() => void trackNextTestClicked(params.testId, String(Number(params.testId) + 1))} className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em]">Try Test {Number(params.testId) + 1}</Link>
          ) : null}
          <Link href="/" className="rounded-2xl border border-[var(--border)] bg-[var(--surface2)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em]">Back to dashboard</Link>
        </div>
      </section>

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

      {flaggedQuestions.length > 0 && (
        <section className="mt-6 surface-card p-6">
          <h2 className="font-head text-2xl font-extrabold uppercase">Flagged Questions</h2>
          <div className="mt-6 space-y-4">
            {flaggedQuestions.map(({ question, selected, isCorrect }) => (
              <div key={question.id} className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-5">
                <span className="absolute right-4 top-4 text-xl">&#x1F6A9;</span>
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

      {showSupport && <SupportModal testId={params.testId} onClose={() => setShowSupport(false)} />}
    </main>
  );
}
