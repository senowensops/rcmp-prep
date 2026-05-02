"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { SectionNav } from "@/components/ui/SectionNav";
import { Timer } from "@/components/ui/Timer";
import { WorkstyleSection } from "@/components/sections/WorkstyleSection";
import { LanguageSection } from "@/components/sections/LanguageSection";
import { NumericalSection } from "@/components/sections/NumericalSection";
import { SpatialSection } from "@/components/sections/SpatialSection";
import { MemorySection } from "@/components/sections/MemorySection";
import { BusinessSection } from "@/components/sections/BusinessSection";
import { useTestState } from "@/hooks/useTestState";
import { useTimer } from "@/hooks/useTimer";
import { getSectionsForTest } from "@/lib/testData";
import { trackQuestionAnswered, trackSectionAbandoned, trackSectionViewed, trackTestStart } from "@/lib/tracking";

const renderers = {
  workstyle: WorkstyleSection,
  language: LanguageSection,
  numerical: NumericalSection,
  spatial: SpatialSection,
  business: BusinessSection,
};

export default function TestPage() {
  const params = useParams<{ testId: string }>();
  const router = useRouter();
  const testId = params.testId;
  const sections = useMemo(() => getSectionsForTest(testId), [testId]);
  const { hydrated, state, currentSection, currentQuestion, setAnswer, toggleFlag, goTo, next, prev } = useTestState(testId, sections);
  const [oriented, setOriented] = useState(true);
  const [studyActive, setStudyActive] = useState(false);
  const [resumeReady, setResumeReady] = useState(false);
  const [lockedSubsections, setLockedSubsections] = useState<Record<string, boolean>>({});
  const [lockedChallenges, setLockedChallenges] = useState<Record<string, boolean>>({});
  const [hasStudied, setHasStudied] = useState<Record<string, boolean>>({});
  const currentChallengeIdRef = useRef<string | null>(null);
  const questionSubsection = currentQuestion.subsectionId;
  const activeSubsection = currentSection.subsections?.find((sub) => sub.id === questionSubsection) ?? currentSection.subsections?.[0];
  const challenge = currentSection.challengeMap?.[currentQuestion.id];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setOriented(window.localStorage.getItem('rcmp-oriented') === '1');
    setResumeReady(Boolean(window.localStorage.getItem(`rcmp-progress-${testId}`)));
  }, [testId]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const startKey = `rcmp-test-started-${testId}`;
    if (sessionStorage.getItem(startKey)) return;

    void trackTestStart(testId);
    sessionStorage.setItem(startKey, "1");
    sessionStorage.setItem(`rcmp-test-start-${testId}`, Date.now().toString());
  }, [testId]);

  useEffect(() => {
    if (!activeSubsection) return;
    void trackSectionViewed(testId, activeSubsection.id, state.currentQuestionIndex);
  }, [testId, activeSubsection, state.currentQuestionIndex]);

  useEffect(() => {
    return () => {
      if (typeof window === "undefined" || !activeSubsection) return;
      const answeredInSection = currentSection.questions.filter((q) => q.id in state.answers).length;
      void trackSectionAbandoned(testId, activeSubsection.id, answeredInSection);
    };
  }, [testId, activeSubsection, currentSection.questions, state.answers]);

  const { secondsLeft: subsectionTime, setSecondsLeft: setSubsectionTime } = useTimer(activeSubsection?.timerSeconds ?? null, Boolean(activeSubsection?.timerSeconds && !studyActive && !lockedSubsections[activeSubsection.id]), () => {
    if (activeSubsection) setLockedSubsections((prev) => ({ ...prev, [activeSubsection.id]: true }));
  });
  // Keep a ref to the current challenge ID so the study timer callback can access it
  useEffect(() => {
    currentChallengeIdRef.current = challenge?.id ?? null;
  }, [challenge?.id]);

  const { secondsLeft: studyRemaining, setSecondsLeft: setStudyRemaining } = useTimer(challenge?.studyTime ?? null, studyActive, () => {
    setStudyActive(false);
    const cid = currentChallengeIdRef.current;
    if (cid) setHasStudied((prev) => ({ ...prev, [cid]: true }));
  });
  const { secondsLeft: answerRemaining, setSecondsLeft: setAnswerRemaining } = useTimer(challenge?.answerTime ?? null, Boolean(currentSection.type === 'memory' && !studyActive && challenge && !lockedChallenges[challenge.id] && hasStudied[challenge?.id ?? '']), () => {
    if (challenge) {
      setLockedChallenges((prev) => ({ ...prev, [challenge.id]: true }));
      next();
    }
  });

  useEffect(() => {
    if (activeSubsection?.timerSeconds && !lockedSubsections[activeSubsection.id]) setSubsectionTime(activeSubsection.timerSeconds);
  }, [activeSubsection, lockedSubsections, setSubsectionTime]);

  useEffect(() => {
    if (challenge && !studyActive && !lockedChallenges[challenge.id] && hasStudied[challenge.id]) setAnswerRemaining(challenge.answerTime ?? 45);
  }, [challenge, studyActive, lockedChallenges, hasStudied, setAnswerRemaining]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["a", "b", "c", "d"].includes(key)) setAnswer(currentQuestion.id, key.charCodeAt(0) - 97);
      if (key === "f") toggleFlag(currentQuestion.id);
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentQuestion.id, next, prev, setAnswer, toggleFlag]);

  const answered = Object.keys(state.answers).length;
  const total = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredMap = Object.fromEntries(sections.map((section) => [section.id, section.questions.filter((q) => q.id in state.answers).length]));
  const progress = Math.round((answered / total) * 100);
  const locked = Boolean((activeSubsection && lockedSubsections[activeSubsection.id]) || (challenge && lockedChallenges[challenge.id]));
  const Renderer = currentSection.type === "memory" ? null : renderers[currentSection.type as keyof typeof renderers];

  if (!hydrated) return null;

  return (
    <main className="min-h-screen">
      <head><meta name="robots" content="noindex, nofollow" /></head>
      <TopBar answered={answered} total={total} section={currentSection} progress={progress} />
      {!oriented ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="surface-card max-w-2xl p-8">
            <div className="font-head text-sm font-bold uppercase tracking-[0.2em] text-[var(--red)]">Before you begin</div>
            <h2 className="mt-2 font-head text-4xl font-extrabold uppercase">Orientation</h2>
            <ul className="mt-5 space-y-3 text-[var(--muted)]">
              <li>&bull; Numerical Level 1 — 3 min</li>
              <li>&bull; Numerical Level 2 — 3 min</li>
              <li>&bull; Spatial 2D Rotation — 3 min</li>
              <li>&bull; Spatial 3D Shapes — 3 min</li>
              <li>&bull; Spatial Mechanical — 4 min</li>
              <li>&bull; Spatial Cubes — 5 min</li>
              <li>&bull; Memory answers — 45 seconds per challenge</li>
            </ul>
            <button onClick={() => { window.localStorage.setItem("rcmp-oriented", "1"); setOriented(true); }} className="mt-6 rounded-2xl bg-[var(--red)] px-6 py-4 font-head text-lg font-bold uppercase tracking-[0.08em] text-white">I&apos;m Ready — Start the Test</button>
          </div>
        </div>
      ) : null}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <SectionNav sections={sections} currentSectionId={currentSection.id} answeredMap={answeredMap} onSelect={(id) => goTo(id, 0)} />
        <section className="min-w-0 flex-1">
          {resumeReady ? <div className="surface-card mb-4 border-l-4 border-[var(--gold)] p-4 text-sm text-[var(--muted)]">Resume available — your progress has been restored automatically.</div> : null}
          <div className="surface-card mb-4 p-6">
            <div className="font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--red)]">Test {testId}</div>
            <h1 className="mt-2 font-head text-4xl font-extrabold uppercase">{currentSection.label}</h1>
            <p className="mt-2 text-[var(--muted)]" aria-live="polite" aria-atomic="true">Question {state.currentQuestionIndex + 1} of {currentSection.questions.length}</p>
            {activeSubsection ? <p className="mt-2 font-head text-sm uppercase tracking-[0.08em] text-[var(--gold)]">{activeSubsection.label}</p> : null}
            {currentSection.bannerNote ? <p className="mt-3 rounded-xl bg-[var(--surface2)] p-3 text-sm text-[var(--muted)]">{currentSection.bannerNote}</p> : null}
          </div>
          <Timer label={activeSubsection ? `${activeSubsection.label} timer` : `${currentSection.label} timer`} secondsLeft={subsectionTime} />
          {currentSection.type === "memory" && !studyActive && hasStudied[challenge?.id ?? ''] ? <div className="mb-4 text-center font-mono text-lg text-[var(--gold)]">Answer timer: {answerRemaining ?? challenge?.answerTime ?? 45}s</div> : null}
          {currentSection.type === "memory" ? (
            <MemorySection question={currentQuestion} answer={state.answers[currentQuestion.id]} flagged={Boolean(state.flags[currentQuestion.id])} onAnswer={(value) => { setAnswer(currentQuestion.id, value); void trackQuestionAnswered(testId, currentSection.id, currentQuestion.id, value); }} onFlag={() => toggleFlag(currentQuestion.id)} challenge={challenge} studying={studyActive} studyRemaining={studyRemaining} onBeginStudy={() => { setStudyRemaining(challenge?.studyTime ?? 60); setStudyActive(true); }} onSkipStudy={() => { setStudyActive(false); if (challenge) setHasStudied(prev => ({ ...prev, [challenge.id]: true })); }} />
          ) : Renderer ? (
            <Renderer question={currentQuestion} answer={state.answers[currentQuestion.id]} flagged={Boolean(state.flags[currentQuestion.id])} onAnswer={(value) => { setAnswer(currentQuestion.id, value); void trackQuestionAnswered(testId, currentSection.id, currentQuestion.id, value); }} onFlag={() => toggleFlag(currentQuestion.id)} locked={locked} />
          ) : null}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button onClick={() => prev()} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em]">Previous</button>
            <div className="flex gap-3">
              <Link href="/" className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em]">Exit</Link>
              <button onClick={() => (currentSection.id === sections[sections.length - 1].id && state.currentQuestionIndex === currentSection.questions.length - 1) ? router.push(`/results/${testId}`) : next()} className="rounded-2xl bg-[var(--red)] px-5 py-3 font-head text-lg font-bold uppercase tracking-[0.08em] text-white">{currentSection.id === sections[sections.length - 1].id && state.currentQuestionIndex === currentSection.questions.length - 1 ? "Finish test" : "Next question"}</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
