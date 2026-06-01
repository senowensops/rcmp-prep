import { analytics } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";

const ATTEMPT_KEY_PREFIX = "rcmp-attempt-id-";
const ATTEMPT_SNAPSHOT_PREFIX = "rcmp-attempt-snapshot-";
const QUESTION_EVENTS_PREFIX = "rcmp-question-events-";
const MIN_VALID_COMPLETION_SECONDS = 120;

type AttemptSnapshot = {
  currentSectionId?: string;
  currentQuestionId?: string;
  currentQuestionIndex?: number;
  answers: Record<string, number>;
  flags?: Record<string, boolean>;
  questionOrder?: string[];
  questionTimes?: Record<string, number>;
  sectionTimes?: Record<string, number>;
  updatedAt?: string;
};

type QuestionEvent = {
  questionId: string;
  sectionId: string;
  answerIndex: number;
  answeredAt: string;
  changed: boolean;
};

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";

  let sessionId = sessionStorage.getItem("rcmp-session-id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem("rcmp-session-id", sessionId);
  }

  return sessionId;
}

export interface TestAttempt {
  testId: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  durationSeconds: number;
  activeDurationSeconds?: number;
  sections: Array<{
    label: string;
    correct: number;
    total: number;
    pct: number;
  }>;
  sectionTimes?: Record<string, number>;
  questionTimes?: Record<string, number>;
  sectionVisits?: Record<string, number>;
  lastSectionId?: string;
  startedAt?: string;
  completedAt?: string;
  questionOrder?: string[];
  answers?: Record<string, number>;
  skippedQuestions?: string[];
}

function getAttemptStorageKey(testId: string) {
  return `${ATTEMPT_KEY_PREFIX}${testId}`;
}

function getSnapshotStorageKey(testId: string) {
  return `${ATTEMPT_SNAPSHOT_PREFIX}${testId}`;
}

function getQuestionEventsStorageKey(testId: string) {
  return `${QUESTION_EVENTS_PREFIX}${testId}`;
}

function getAttemptId(testId: string): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(getAttemptStorageKey(testId));
}

function setAttemptId(testId: string, attemptId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(getAttemptStorageKey(testId), attemptId);
}

function clearAttemptState(testId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(`rcmp-test-completed-${testId}`);
  sessionStorage.removeItem(`rcmp-results-tracked-${testId}`);
  sessionStorage.removeItem(`rcmp-support-modal-shown-${testId}`);
  sessionStorage.removeItem(`rcmp-test-start-${testId}`);
  sessionStorage.removeItem(`rcmp-test-started-${testId}`);
  sessionStorage.removeItem(`rcmp-answered-count-${testId}`);
  sessionStorage.removeItem(getSnapshotStorageKey(testId));
  sessionStorage.removeItem(getQuestionEventsStorageKey(testId));
}

function readSnapshot(testId: string): AttemptSnapshot | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(getSnapshotStorageKey(testId));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AttemptSnapshot;
  } catch {
    return null;
  }
}

function writeSnapshot(testId: string, snapshot: AttemptSnapshot) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(getSnapshotStorageKey(testId), JSON.stringify(snapshot));
}

function readQuestionEvents(testId: string): QuestionEvent[] {
  if (typeof window === "undefined") return [];

  const raw = sessionStorage.getItem(getQuestionEventsStorageKey(testId));
  if (!raw) return [];

  try {
    return JSON.parse(raw) as QuestionEvent[];
  } catch {
    return [];
  }
}

function writeQuestionEvents(testId: string, events: QuestionEvent[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(getQuestionEventsStorageKey(testId), JSON.stringify(events));
}

function getSkippedQuestions(snapshot: AttemptSnapshot | null, totalQuestions?: number) {
  if (!snapshot?.questionOrder?.length) return [] as string[];

  const answeredIds = new Set(Object.keys(snapshot.answers ?? {}));
  const ordered = totalQuestions ? snapshot.questionOrder.slice(0, totalQuestions) : snapshot.questionOrder;
  return ordered.filter((questionId) => !answeredIds.has(questionId));
}

function countChangedAnswers(events: QuestionEvent[]) {
  return events.filter((event) => event.changed).length;
}

function countUniqueAnswered(events: QuestionEvent[]) {
  return new Set(events.map((event) => event.questionId)).size;
}

function clampAnsweredQuestions(answeredQuestions: number, totalQuestions: number) {
  return Math.min(Math.max(answeredQuestions, 0), Math.max(totalQuestions, 0));
}

function isValidCompletion(attempt: TestAttempt) {
  const answeredQuestions = clampAnsweredQuestions(attempt.answeredQuestions, attempt.totalQuestions);
  const activeDurationSeconds = attempt.activeDurationSeconds ?? attempt.durationSeconds;

  return answeredQuestions > 0 && activeDurationSeconds >= MIN_VALID_COMPLETION_SECONDS;
}

export async function trackTestStart(testId: string) {
  analytics.testStarted(testId);

  const sessionId = getSessionId();

  try {
    const attemptId = crypto.randomUUID();
    setAttemptId(testId, attemptId);
    clearAttemptState(testId);

    await supabase.from("test_attempts").insert({
      id: attemptId,
      session_id: sessionId,
      test_id: testId,
      started_at: new Date().toISOString(),
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer : null,
      funnel: {
        started: true,
        results_viewed: false,
        completed: false,
        support_modal_shown: false,
        sections_seen: {},
      },
    });
  } catch (error) {
    console.error("Failed to track test start:", error);
  }
}

export async function trackTestProgress(testId: string, snapshot: AttemptSnapshot) {
  const attemptId = getAttemptId(testId);
  const sessionId = getSessionId();
  const questionEvents = readQuestionEvents(testId);
  const skippedQuestions = getSkippedQuestions(snapshot);

  writeSnapshot(testId, snapshot);

  try {
    const values = {
      session_id: sessionId,
      last_section_id: snapshot.currentSectionId ?? null,
      last_question_id: snapshot.currentQuestionId ?? null,
      last_question_index: snapshot.currentQuestionIndex ?? null,
      answered_questions: Object.keys(snapshot.answers ?? {}).length,
      skipped_questions: skippedQuestions,
      skipped_count: skippedQuestions.length,
      answers: snapshot.answers,
      flags: snapshot.flags ?? {},
      question_order: snapshot.questionOrder ?? [],
      question_times: snapshot.questionTimes ?? {},
      section_times: snapshot.sectionTimes ?? {},
      answer_changes: countChangedAnswers(questionEvents),
      unique_questions_answered: countUniqueAnswered(questionEvents),
      progress_updated_at: snapshot.updatedAt ?? new Date().toISOString(),
    };

    let updatedRows: unknown[] = [];

    if (attemptId) {
      updatedRows = await supabase
        .from("test_attempts")
        .update(values)
        .eq("id", attemptId)
        .execute();
    }

    if (!updatedRows.length) {
      await supabase
        .from("test_attempts")
        .update(values)
        .eq("session_id", sessionId)
        .eq("test_id", testId)
        .is("completed_at", null)
        .execute();
    }
  } catch (error) {
    console.error("Failed to track test progress:", error);
  }
}

export async function trackTestComplete(attempt: TestAttempt) {
  const answeredQuestions = clampAnsweredQuestions(attempt.answeredQuestions, attempt.totalQuestions);
  const activeDurationSeconds = attempt.activeDurationSeconds ?? attempt.durationSeconds;

  if (!isValidCompletion({ ...attempt, answeredQuestions, activeDurationSeconds })) {
    console.warn("Skipping invalid completion payload", {
      testId: attempt.testId,
      answeredQuestions,
      totalQuestions: attempt.totalQuestions,
      activeDurationSeconds,
    });
    return;
  }

  analytics.completePracticeTest(attempt.testId);
  analytics.testCompleted({
    testId: attempt.testId,
    score: attempt.scorePercent,
    questionsAnswered: answeredQuestions,
    durationSeconds: activeDurationSeconds,
  });

  const attemptId = getAttemptId(attempt.testId);
  const sessionId = getSessionId();
  const snapshot = readSnapshot(attempt.testId);
  const questionEvents = readQuestionEvents(attempt.testId);
  const skippedQuestions = attempt.skippedQuestions ?? getSkippedQuestions(snapshot, attempt.totalQuestions);

  try {
    const values = {
      completed_at: attempt.completedAt ?? new Date().toISOString(),
      started_at: attempt.startedAt ?? null,
      duration_seconds: attempt.durationSeconds,
      active_duration_seconds: activeDurationSeconds,
      total_questions: attempt.totalQuestions,
      answered_questions: answeredQuestions,
      correct_answers: attempt.correctAnswers,
      score_percent: attempt.scorePercent,
      skipped_questions: skippedQuestions,
      skipped_count: skippedQuestions.length,
      sections: attempt.sections,
      section_times: attempt.sectionTimes ?? snapshot?.sectionTimes ?? {},
      question_times: attempt.questionTimes ?? snapshot?.questionTimes ?? {},
      question_order: attempt.questionOrder ?? snapshot?.questionOrder ?? [],
      answers: attempt.answers ?? snapshot?.answers ?? {},
      flags: snapshot?.flags ?? {},
      last_section_id: attempt.lastSectionId ?? snapshot?.currentSectionId ?? null,
      last_question_id: snapshot?.currentQuestionId ?? null,
      last_question_index: snapshot?.currentQuestionIndex ?? null,
      answer_changes: countChangedAnswers(questionEvents),
      unique_questions_answered: countUniqueAnswered(questionEvents),
      progress_updated_at: attempt.completedAt ?? new Date().toISOString(),
      session_id: sessionId,
      funnel: {
        started: true,
        results_viewed: true,
        completed: true,
        support_modal_shown: Boolean(sessionStorage.getItem(`rcmp-support-modal-shown-${attempt.testId}`)),
        sections_seen: attempt.sectionVisits ?? {},
      },
    };

    let updatedRows: unknown[] = [];

    if (attemptId) {
      updatedRows = await supabase
        .from("test_attempts")
        .update(values)
        .eq("id", attemptId)
        .execute();
    }

    if (!updatedRows.length) {
      updatedRows = await supabase
        .from("test_attempts")
        .update(values)
        .eq("session_id", sessionId)
        .eq("test_id", attempt.testId)
        .is("completed_at", null)
        .execute();
    }

    if (!updatedRows.length) {
      throw new Error(`No attempt row updated for test ${attempt.testId} in session ${sessionId}`);
    }
  } catch (error) {
    console.error("Failed to track test completion:", error);
  }
}

export async function trackSectionViewed(testId: string, sectionId: string, questionIndex: number) {
  analytics.sectionViewed({ testId, sectionId, questionIndex });
}

export async function trackQuestionAnswered(testId: string, sectionId: string, questionId: string, answerIndex: number) {
  analytics.questionAnswered({ testId, sectionId, questionId, answerIndex });

  const now = new Date().toISOString();
  const questionEvents = readQuestionEvents(testId);
  const latestSnapshot = readSnapshot(testId);
  const existingAnswer = latestSnapshot?.answers?.[questionId];

  questionEvents.push({
    questionId,
    sectionId,
    answerIndex,
    answeredAt: now,
    changed: typeof existingAnswer === "number" && existingAnswer !== answerIndex,
  });
  writeQuestionEvents(testId, questionEvents);

  const attemptId = getAttemptId(testId);
  const sessionId = getSessionId();

  try {
    const rawAnswered = Number.parseInt(sessionStorage.getItem(`rcmp-answered-count-${testId}`) ?? "0", 10);
    const totalQuestions = Number.parseInt(sessionStorage.getItem(`rcmp-total-questions-${testId}`) ?? "0", 10);
    const answeredQuestions = clampAnsweredQuestions(rawAnswered, totalQuestions || rawAnswered);

    const values = {
      session_id: sessionId,
      answered_questions: Math.max(1, answeredQuestions),
      last_section_id: sectionId,
      last_question_id: questionId,
      answer_changes: countChangedAnswers(questionEvents),
      unique_questions_answered: countUniqueAnswered(questionEvents),
      progress_updated_at: now,
    };

    let updatedRows: unknown[] = [];

    if (attemptId) {
      updatedRows = await supabase
        .from("test_attempts")
        .update(values)
        .eq("id", attemptId)
        .execute();
    }

    if (!updatedRows.length) {
      await supabase
        .from("test_attempts")
        .update(values)
        .eq("session_id", sessionId)
        .eq("test_id", testId)
        .is("completed_at", null)
        .execute();
    }
  } catch (error) {
    console.error("Failed to track question progress:", error);
  }
}

export async function trackSectionAbandoned(testId: string, sectionId: string, answeredQuestions: number) {
  analytics.sectionAbandoned({ testId, sectionId, answeredQuestions });
}

export async function trackSupportModalShown(testId: string) {
  analytics.supportModalShown(testId);
}

export async function trackSupportClicked(testId: string) {
  analytics.supportClicked(testId);
}

export async function trackSupportDismissed(testId: string) {
  analytics.supportDismissed(testId);
}

export async function trackResultsViewed(testId: string) {
  analytics.resultsViewed(testId);
}

export async function trackRetakeClicked(testId: string) {
  analytics.retakeClicked(testId);
}

export async function trackNextTestClicked(testId: string, nextTestId: string) {
  analytics.nextTestClicked(testId, nextTestId);
}

export async function trackCheckoutStarted() {
  analytics.checkoutStarted();
}

export async function trackPurchaseComplete(sessionId: string, amount: number) {
  analytics.purchaseComplete(sessionId, amount);
}
