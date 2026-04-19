import { analytics } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";

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
}

export async function trackTestStart(testId: string) {
  analytics.testStarted(testId);

  const sessionId = getSessionId();

  try {
    await supabase.from("test_attempts").insert({
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
  analytics.testCompleted({
    testId: attempt.testId,
    score: attempt.scorePercent,
    questionsAnswered: attempt.answeredQuestions,
    durationSeconds: attempt.durationSeconds,
  });

  const sessionId = getSessionId();

  try {
    await supabase
      .from("test_attempts")
      .update({
        completed_at: new Date().toISOString(),
        duration_seconds: attempt.durationSeconds,
        total_questions: attempt.totalQuestions,
        answered_questions: attempt.answeredQuestions,
        correct_answers: attempt.correctAnswers,
        score_percent: attempt.scorePercent,
        sections: attempt.sections,
      })
      .eq("session_id", sessionId)
      .eq("test_id", attempt.testId)
      .is("completed_at", null);
  } catch (error) {
    console.error("Failed to track test completion:", error);
  }
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
