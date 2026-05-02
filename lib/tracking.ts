import { analytics } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";

const ATTEMPT_KEY_PREFIX = "rcmp-attempt-id-";

// Generate a session ID for this browser session.
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
  sections: Array<{
    label: string;
    correct: number;
    total: number;
    pct: number;
  }>;
  sectionTimes?: Record<string, number>;
  lastSectionId?: string;
}

function getAttemptStorageKey(testId: string) {
  return `${ATTEMPT_KEY_PREFIX}${testId}`;
}

function getAttemptId(testId: string): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(getAttemptStorageKey(testId));
}

function setAttemptId(testId: string, attemptId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(getAttemptStorageKey(testId), attemptId);
}

export async function trackTestStart(testId: string) {
  analytics.testStarted(testId);

  const sessionId = getSessionId();

  try {
    const attemptId = crypto.randomUUID();
    setAttemptId(testId, attemptId);

    await supabase.from("test_attempts").insert({
      id: attemptId,
      session_id: sessionId,
      test_id: testId,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer : null,
    });
  } catch (error) {
    console.error("Failed to track test start:", error);
  }
}

export async function trackTestComplete(attempt: TestAttempt) {
  analytics.completePracticeTest(attempt.testId);
  analytics.testCompleted({
    testId: attempt.testId,
    score: attempt.scorePercent,
    questionsAnswered: attempt.answeredQuestions,
    durationSeconds: attempt.durationSeconds,
  });

  const attemptId = getAttemptId(attempt.testId);
  const sessionId = getSessionId();

  try {
    const update = supabase
      .from("test_attempts")
      .update({
        completed_at: new Date().toISOString(),
        duration_seconds: attempt.durationSeconds,
        total_questions: attempt.totalQuestions,
        answered_questions: attempt.answeredQuestions,
        correct_answers: attempt.correctAnswers,
        score_percent: attempt.scorePercent,
        sections: attempt.sections,
        session_id: sessionId,
      });

    if (attemptId) {
      await update.eq("id", attemptId).execute();
    } else {
      await update.eq("session_id", sessionId).eq("test_id", attempt.testId).is("completed_at", null);
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

export async function trackCheckoutStarted() {
  analytics.checkoutStarted();
}

export async function trackPurchaseComplete(
  sessionId: string,
  amount: number
) {
  analytics.purchaseComplete(sessionId, amount);
}
