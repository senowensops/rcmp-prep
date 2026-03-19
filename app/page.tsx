import type { Metadata } from "next";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { SectionBreakdown } from "@/components/landing/SectionBreakdown";
import { WhyItWorks } from "@/components/landing/WhyItWorks";
import { BlogSlider } from "@/components/landing/BlogSlider";

export const metadata: Metadata = {
  title: "RCMP Online Assessment Practice Test | RCMPPrep.ca",
  description:
    "Practice tests built to mirror the real RCMP Online Assessment — all 6 sections, timed, with full answer explanations. Try 3 questions per section free. No account needed.",
  keywords: [
    "rcmp online assessment practice test",
    "rcmp assessment prep",
    "rcmp online test questions",
    "rcmp aptitude test",
    "rcmp prep test canada",
    "rcmp police test",
    "rcmp entrance exam practice",
  ],
  alternates: {
    canonical: "https://rcmpprep.ca",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--dark)] text-white">
      <Hero />
      <SectionBreakdown />
      <WhyItWorks />
      <BlogSlider />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
