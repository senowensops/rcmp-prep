import type { Metadata } from "next";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { SectionBreakdown } from "@/components/landing/SectionBreakdown";
import { WhyItWorks } from "@/components/landing/WhyItWorks";
import { BlogSlider } from "@/components/landing/BlogSlider";
import { Testimonials } from "@/components/landing/Testimonials";

export const metadata: Metadata = {
  title: "RCMP Online Assessment Practice Test | RCMPPrep.ca",
  description:
    "Unofficial RCMP Online Assessment practice — all 6 skill areas, timed, with full answer explanations. 100% free, no account needed.",
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
        text: "RCMPPrep.ca is 100% free. All practice tests and sections are available at no cost.",
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
      <FAQ />

      <section className="bg-gray-900 py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-3xl font-bold text-white">This app is 100% free.</h2>
          <p className="mb-8 text-lg text-gray-300">If it helped you prep for your RCMP exam, consider buying us a coffee</p>
          <a
            href="https://buymeacoffee.com/rcmpprep"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-green-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-green-700"
          >
            Support the App
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
