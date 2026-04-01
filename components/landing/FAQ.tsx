"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is this the official RCMP test?",
    answer:
      "No. This is an unofficial practice resource covering skill areas commonly assessed in police entrance evaluations. It is not affiliated with the RCMP or the Government of Canada, and does not claim to replicate any official test.",
  },
  {
    question: "Is this really free?",
    answer: "Yes — completely free. No payment, no account, no catch. Just start the test.",
  },
  {
    question: "How many tests do I get?",
    answer: "Three complete practice tests, each with all 6 sections. No question repeats across tests.",
  },
  {
    question: "What sections does the real RCMP assessment include?",
    answer:
      "The RCMP Online Assessment covers workstyle preferences, language comprehension, numerical reasoning, spatial and mechanical reasoning, memory, and business reasoning. Our tests cover all six.",
  },
  {
    question: "Can I retake the tests?",
    answer:
      "Yes — as many times as you like.",
  },
  {
    question: "Do I need an account?",
    answer: "No account required. Just go to the test and start. Nothing to sign up for.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-white/8 px-6 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">FAQ</p>
          <h2 className="mt-3 font-head text-4xl font-extrabold uppercase tracking-[0.04em] text-white sm:text-5xl">
            Questions, Answered.
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-1">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 rounded-[1rem] px-5 py-4 text-left"
                >
                  <span className="font-head text-xl font-bold uppercase tracking-[0.03em] text-white">{faq.question}</span>
                  <span className="font-head text-2xl font-bold text-[var(--gold)]">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen ? <div className="px-5 pb-5 text-base leading-7 text-white/72">{faq.answer}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
