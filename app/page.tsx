import type { Metadata } from "next";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { SectionBreakdown } from "@/components/landing/SectionBreakdown";
import { WhyItWorks } from "@/components/landing/WhyItWorks";

export const metadata: Metadata = {
  title: "RCMP Online Assessment Practice Test | RCMP Prep",
  description:
    "The most realistic RCMP Online Assessment practice test. 3 full-length tests, 6 sections, timed. Try free — no account needed.",
  keywords: [
    "rcmp online assessment practice test",
    "rcmp assessment prep",
    "rcmp online test questions",
    "rcmp aptitude test",
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--dark)] text-white">
      <Hero />
      <SectionBreakdown />
      <WhyItWorks />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
