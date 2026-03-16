import type { ReactNode } from "react";

export type Question = {
  id: string;
  text: string;
  opts: string[];
  correct: number;
  exp: string;
  svg?: string;
  gears?: { cx: number; cy: number; r: number; teeth: number; color: string; label: string; sub?: string }[];
  gw?: number;
  gh?: number;
  useNet?: number;
  subsectionId?: string;
  promptSvg?: string;
  choicesSvg?: string[];
};

export type WorkstyleStatement = { id: string; text: string };
export type TestQuestion = Question | WorkstyleStatement;
export type MemoryChallenge = {
  id: string;
  title: string;
  studyTime: number;
  answerTime?: number;
  studyType: "image" | "text" | "table";
  studyPrompt?: string;
  studyContent?: string;
  studyRows?: string[][];
  questions: Question[];
};
export type SubsectionDefinition = {
  id: string;
  label: string;
  timerSeconds?: number;
  description?: string;
  questionIds: string[];
};
export type SectionDefinition = {
  id: string;
  label: string;
  type: "workstyle" | "language" | "numerical" | "spatial" | "memory" | "business";
  questions: Question[];
  timerSeconds?: number;
  challengeMap?: Record<string, MemoryChallenge>;
  subsections?: SubsectionDefinition[];
  bannerNote?: string;
};
export type TestState = {
  testId: string;
  currentSectionId: string;
  currentQuestionIndex: number;
  answers: Record<string, number>;
  flags: Record<string, boolean>;
  timestamps: { updatedAt: string };
};
export type SectionRendererProps = {
  question: Question;
  answer?: number;
  flagged: boolean;
  locked?: boolean;
  showDontKnow?: boolean;
  onAnswer: (value: number) => void;
  onFlag: () => void;
};
export type ResultsSection = { label: string; total: number; correct: number; pct: number };
export type ResultsSummary = { overallPct: number; overallCorrect: number; totalScored: number; sections: ResultsSection[]; review: { question: Question; selected?: number; isCorrect: boolean }[] };
export type AppChild = ReactNode;
