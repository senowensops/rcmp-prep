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
    questionOrder: sections.flatMap((section) => section.questions.map((question) => question.id)),
    timestamps: {
      updatedAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      activeStartedAt: new Date().toISOString(),
      sectionEnteredAt: new Date().toISOString(),
      activeDurationSeconds: 0,
      sectionTimes: {},
      questionTimes: {},
      sectionVisits: sections[0]?.id ? { [sections[0].id]: 1 } : {},
    },
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const currentSection = useMemo(
    () => sections.find((section) => section.id === stored.currentSectionId) ?? sections[0],
    [sections, stored.currentSectionId]
  );
  const currentQuestion = currentSection.questions[stored.currentQuestionIndex] ?? currentSection.questions[0];

  const updateActiveDuration = (prev: TestState) => {
    const activeStartedAt = prev.timestamps.activeStartedAt ? new Date(prev.timestamps.activeStartedAt).getTime() : null;
    const additionalActive = activeStartedAt ? Math.max(0, Math.round((Date.now() - activeStartedAt) / 1000)) : 0;

    return {
      ...prev.timestamps,
      activeStartedAt: new Date().toISOString(),
      activeDurationSeconds: (prev.timestamps.activeDurationSeconds ?? 0) + additionalActive,
    };
  };

  const setAnswer = (questionId: string, value: number) =>
    setStored((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
      questionOrder: prev.questionOrder ?? sections.flatMap((section) => section.questions.map((question) => question.id)),
      timestamps: {
        ...updateActiveDuration(prev),
        updatedAt: new Date().toISOString(),
        questionTimes: {
          ...(prev.timestamps.questionTimes ?? {}),
          [questionId]: ((prev.timestamps.questionTimes ?? {})[questionId] ?? 0) + 1,
        },
      },
    }));

  const toggleFlag = (questionId: string) =>
    setStored((prev) => ({
      ...prev,
      flags: { ...prev.flags, [questionId]: !prev.flags[questionId] },
      timestamps: {
        ...updateActiveDuration(prev),
        updatedAt: new Date().toISOString(),
      },
    }));

  const goTo = (sectionId: string, questionIndex = 0) =>
    setStored((prev) => {
      const nowIso = new Date().toISOString();
      const nowMs = Date.now();
      const previousSectionEnteredAt = prev.timestamps.sectionEnteredAt ? new Date(prev.timestamps.sectionEnteredAt).getTime() : null;
      const elapsedSectionSeconds = previousSectionEnteredAt ? Math.max(0, Math.round((nowMs - previousSectionEnteredAt) / 1000)) : 0;
      const activeStartedAt = prev.timestamps.activeStartedAt ? new Date(prev.timestamps.activeStartedAt).getTime() : null;
      const elapsedActiveSeconds = activeStartedAt ? Math.max(0, Math.round((nowMs - activeStartedAt) / 1000)) : 0;
      const previousSectionId = prev.currentSectionId;

      return {
        ...prev,
        currentSectionId: sectionId,
        currentQuestionIndex: questionIndex,
        questionOrder: prev.questionOrder ?? sections.flatMap((section) => section.questions.map((question) => question.id)),
        timestamps: {
          ...prev.timestamps,
          updatedAt: nowIso,
          sectionEnteredAt: nowIso,
          activeStartedAt: nowIso,
          activeDurationSeconds: (prev.timestamps.activeDurationSeconds ?? 0) + elapsedActiveSeconds,
          sectionTimes: {
            ...(prev.timestamps.sectionTimes ?? {}),
            ...(previousSectionId
              ? {
                  [previousSectionId]: (prev.timestamps.sectionTimes?.[previousSectionId] ?? 0) + elapsedSectionSeconds,
                }
              : {}),
          },
          sectionVisits: {
            ...(prev.timestamps.sectionVisits ?? {}),
            [sectionId]: (prev.timestamps.sectionVisits?.[sectionId] ?? 0) + (sectionId === previousSectionId ? 0 : 1),
          },
        },
      };
    });

  const next = () => {
    const sectionIndex = sections.findIndex((section) => section.id === currentSection.id);
    if (stored.currentQuestionIndex < currentSection.questions.length - 1) return goTo(currentSection.id, stored.currentQuestionIndex + 1);
    if (sectionIndex < sections.length - 1) return goTo(sections[sectionIndex + 1].id, 0);
  };

  const prev = () => {
    const sectionIndex = sections.findIndex((section) => section.id === currentSection.id);
    if (stored.currentQuestionIndex > 0) return goTo(currentSection.id, stored.currentQuestionIndex - 1);
    if (sectionIndex > 0) {
      const previousSection = sections[sectionIndex - 1];
      return goTo(previousSection.id, previousSection.questions.length - 1);
    }
  };

  return { hydrated, state: stored, setStored, currentSection, currentQuestion, setAnswer, toggleFlag, goTo, next, prev };
}
