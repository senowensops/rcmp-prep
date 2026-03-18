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

  // User completes a full practice test
  completePracticeTest: (testId: string) =>
    trackEvent("complete_test", {
      test_id: testId,
      event_category: "engagement",
    }),

  // User hits the paywall (tries to access paid content)
  hitPaywall: () =>
    trackEvent("hit_paywall", { event_category: "conversion" }),
};
