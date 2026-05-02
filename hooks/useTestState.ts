"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { SectionDefinition, TestState } from "@/types";

export function useTestState(testId: string, sections: SectionDefinition[]) {
  const storageKey = `rcmp-progress-${testId}`;
  const [stored, setStored] = useLocalStorage<TestState>(storageKey, {
    testId,
    currentSectionId: sections[0]?.id ?? "workstyle",
    currentQuestionIndex: 0,
    answers: {},
    flags: {},
    timestamps: {
      updatedAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      sectionEnteredAt: new Date().toISOString(),
      sectionTimes: {},
      questionTimes: {},
    },
  });
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const currentSection = useMemo(() => sections.find((s) => s.id === stored.currentSectionId) ?? sections[0], [sections, stored.currentSectionId]);
  const currentQuestion = currentSection.questions[stored.currentQuestionIndex] ?? currentSection.questions[0];
  const setAnswer = (questionId: string, value: number) => setStored((prev) => ({ ...prev, answers: { ...prev.answers, [questionId]: value }, timestamps: { updatedAt: new Date().toISOString() } }));
  const toggleFlag = (questionId: string) => setStored((prev) => ({ ...prev, flags: { ...prev.flags, [questionId]: !prev.flags[questionId] }, timestamps: { updatedAt: new Date().toISOString() } }));
  const goTo = (sectionId: string, questionIndex = 0) =>
    setStored((prev) => {
      const now = new Date().toISOString();
      const previousSectionEnteredAt = prev.timestamps.sectionEnteredAt ? new Date(prev.timestamps.sectionEnteredAt).getTime() : null;
      const elapsedSeconds = previousSectionEnteredAt ? Math.max(0, Math.round((Date.now() - previousSectionEnteredAt) / 1000)) : 0;
      const previousSectionId = prev.currentSectionId;

      return {
        ...prev,
        currentSectionId: sectionId,
        currentQuestionIndex: questionIndex,
        timestamps: {
          ...prev.timestamps,
          updatedAt: now,
          sectionEnteredAt: now,
          sectionTimes: {
            ...(prev.timestamps.sectionTimes ?? {}),
            ...(previousSectionId
              ? {
                  [previousSectionId]: (prev.timestamps.sectionTimes?.[previousSectionId] ?? 0) + elapsedSeconds,
                }
              : {}),
          },
        },
      };
    });
  const next = () => {
    const sectionIndex = sections.findIndex((s) => s.id === currentSection.id);
    if (stored.currentQuestionIndex < currentSection.questions.length - 1) return goTo(currentSection.id, stored.currentQuestionIndex + 1);
    if (sectionIndex < sections.length - 1) return goTo(sections[sectionIndex + 1].id, 0);
  };
  const prev = () => {
    const sectionIndex = sections.findIndex((s) => s.id === currentSection.id);
    if (stored.currentQuestionIndex > 0) return goTo(currentSection.id, stored.currentQuestionIndex - 1);
    if (sectionIndex > 0) {
      const previousSection = sections[sectionIndex - 1];
      return goTo(previousSection.id, previousSection.questions.length - 1);
    }
  };
  return { hydrated, state: stored, setStored, currentSection, currentQuestion, setAnswer, toggleFlag, goTo, next, prev };
}
