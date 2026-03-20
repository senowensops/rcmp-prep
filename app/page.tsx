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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the RCMP Online Assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The RCMP Online Assessment (OEA) is a mandatory test all RCMP applicants must pass. It covers six sections: Workstyle, Language Comprehension, Numerical Reasoning, Spatial Reasoning, Memory, and Business Reasoning. Candidates who fail are typically deferred for 6-12 months.",
      },
    },
    {
      "@type": "Question",
      name: "Is RCMPPrep.ca affiliated with the RCMP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. RCMPPrep.ca is an unofficial, independent practice resource. It is not affiliated with, endorsed by, or connected to the Royal Canadian Mounted Police.",
      },
    },
    {
      "@type": "Question",
      name: "How much does RCMPPrep.ca cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Lifetime access is $29 CAD — a one-time payment with no subscription. You get access to 3 full practice tests covering all 6 sections.",
      },
    },
    {
      "@type": "Question",
      name: "Can I try it before buying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The free sample lets you try questions from every section with no account required.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I fail the RCMP Online Assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Candidates who do not pass are typically deferred from re-applying for 6 to 12 months. Proper preparation significantly reduces this risk.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--dark)] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
