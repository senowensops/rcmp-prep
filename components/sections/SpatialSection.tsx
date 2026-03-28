'use client';

import { useState, useEffect, useRef } from 'react';
import type { SectionRendererProps } from "@/types";
import { QuestionCard } from "@/components/ui/QuestionCard";

/**
 * For questions 1-5 in the spatial section, animate the prompt SVG through
 * multiple rotation steps before landing on the final position.
 * This makes the viewer mentally track sequential transforms.
 */
function AnimatedPrompt({ svg, questionId }: { svg: string; questionId: string }) {
  const [step, setStep] = useState(0);
  const totalSteps = 4; // 0°, 90°, 180°, 270°, then final (original SVG)
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStep(0);
    setDone(false);
  }, [questionId]);

  useEffect(() => {
    if (done) return;
    if (step >= totalSteps) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => setStep((s) => s + 1), 350);
    return () => clearTimeout(timer);
  }, [step, done, totalSteps]);

  const rotation = done ? 0 : step * 90;

  return (
    <div className="mb-5 rounded-2xl bg-[var(--surface2)] p-4 flex justify-center">
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '200px',
          transform: `rotate(${rotation}deg)`,
          transition: step === 0 && !done ? 'none' : 'transform 300ms ease-in-out',
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}

/** Track which question index we're on within spatial section */
let spatialQuestionCounter = 0;

export function SpatialSection(props: SectionRendererProps) {
  const { question } = props;
  const [localIndex, setLocalIndex] = useState(0);
  const prevIdRef = useRef(question.id);

  // Track question index — increment on each new question ID
  useEffect(() => {
    if (question.id !== prevIdRef.current) {
      prevIdRef.current = question.id;
      spatialQuestionCounter += 1;
      setLocalIndex(spatialQuestionCounter);
    } else {
      setLocalIndex(spatialQuestionCounter);
    }
  }, [question.id]);

  // Reset counter when component mounts (new test session)
  useEffect(() => {
    spatialQuestionCounter = 0;
    setLocalIndex(0);
    return () => { spatialQuestionCounter = 0; };
  }, []);

  const isHardQuestion = localIndex < 5 && question.promptSvg;

  if (isHardQuestion) {
    // Render with animated prompt — pass question without promptSvg to QuestionCard
    // and render our own animated prompt above it
    const questionWithoutPrompt = { ...question, promptSvg: undefined };
    return (
      <div>
        <div className="surface-card p-6">
          <div className="mb-2 font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">{question.id}</div>
          <div className="review-html mb-5 text-lg leading-8" dangerouslySetInnerHTML={{ __html: question.text }} />
          <AnimatedPrompt svg={question.promptSvg!} questionId={question.id} />
          <div className="mb-2 rounded-lg bg-[var(--surface2)] px-3 py-1.5 text-xs font-mono text-[var(--gold)] inline-block">Multi-step transform — watch carefully</div>
        </div>
        <div className="mt-2">
          <QuestionCard {...props} question={questionWithoutPrompt} showDontKnow />
        </div>
      </div>
    );
  }

  return <QuestionCard {...props} showDontKnow />;
}
