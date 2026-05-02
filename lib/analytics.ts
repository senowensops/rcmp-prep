// GA4 event tracking helpers for rcmpprep.ca
// Usage: import { trackEvent } from "@/lib/analytics"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Conversion events — call these at key moments
export const analytics = {
  // User starts the free sample
  startFreeSample: () =>
    trackEvent("begin_sample", { event_category: "engagement" }),

  // User starts a tracked full test attempt
  testStarted: (testId: string) =>
    trackEvent("test_started", {
      test_id: testId,
      event_category: "engagement",
    }),

  // User clicks unlock / goes to checkout
  initiateCheckout: () =>
    trackEvent("begin_checkout", {
      currency: "CAD",
      value: 29,
      event_category: "conversion",
    }),

  // Stripe checkout completed (call from /success page)
  purchase: (sessionId: string) =>
    trackEvent("purchase", {
      transaction_id: sessionId,
      currency: "CAD",
      value: 29,
      event_category: "conversion",
    }),

  // User lands on checkout for the tracked offer flow
  checkoutStarted: () =>
    trackEvent("checkout_started", {
      currency: "CAD",
      value: 29,
      event_category: "conversion",
    }),

  // Custom purchase completion event for non-GA ecommerce reporting
  purchaseComplete: (sessionId: string, amount: number) =>
    trackEvent("purchase_complete", {
      transaction_id: sessionId,
      value: amount,
      currency: "CAD",
      event_category: "conversion",
    }),

  // User completes a full practice test
  completePracticeTest: (testId: string) =>
    trackEvent("complete_test", {
      test_id: testId,
      event_category: "engagement",
    }),

  sectionViewed: (params: { testId: string; sectionId: string; questionIndex: number }) =>
    trackEvent("test_section_viewed", {
      test_id: params.testId,
      section_id: params.sectionId,
      question_index: params.questionIndex,
      event_category: "engagement",
    }),

  questionAnswered: (params: { testId: string; questionId: string; sectionId: string; answerIndex: number }) =>
    trackEvent("test_question_answered", {
      test_id: params.testId,
      question_id: params.questionId,
      section_id: params.sectionId,
      answer_index: params.answerIndex,
      event_category: "engagement",
    }),

  sectionAbandoned: (params: { testId: string; sectionId: string; answeredQuestions: number }) =>
    trackEvent("test_section_abandoned", {
      test_id: params.testId,
      section_id: params.sectionId,
      answered_questions: params.answeredQuestions,
      event_category: "engagement",
    }),

  supportModalShown: (testId: string) =>
    trackEvent("support_modal_shown", {
      test_id: testId,
      event_category: "conversion",
    }),

  supportClicked: (testId: string) =>
    trackEvent("support_clicked", {
      test_id: testId,
      event_category: "conversion",
    }),

  // Full completion event with result metadata
  testCompleted: (params: {
    testId: string;
    score: number;
    questionsAnswered: number;
    durationSeconds: number;
  }) =>
    trackEvent("test_completed", {
      test_id: params.testId,
      score: params.score,
      questions_answered: params.questionsAnswered,
      duration_seconds: params.durationSeconds,
      event_category: "engagement",
    }),

  // User hits the paywall (tries to access paid content)
  hitPaywall: () =>
    trackEvent("hit_paywall", { event_category: "conversion" }),
};
