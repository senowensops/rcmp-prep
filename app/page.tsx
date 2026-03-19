import type { Metadata } from "next";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { SectionBreakdown } from "@/components/landing/SectionBreakdown";
import { WhyItWorks } from "@/components/landing/WhyItWorks";
import { BlogSlider } from "@/components/landing/BlogSlider";
import { Testimonials } from "@/components/landing/Testimonials";

export const metadata: Metadata = {
  title: "RCMP Online Assessment Practice Test | RCMPPrep.ca",
  description:
    "Unofficial RCMP Online Assessment practice — all 6 skill areas, timed, with full answer explanations. Try free, no account needed.",
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
      <Testimonials />
      <BlogSlider />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
