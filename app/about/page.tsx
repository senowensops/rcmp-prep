import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "About RCMP Prep — Unofficial RCMP Online Assessment Practice",
  description:
    "RCMPPrep.ca is an unofficial practice resource for the RCMP Online Assessment. Covers all 6 sections with timed practice and answer explanations. Not affiliated with the RCMP.",
  keywords: [
    "RCMP practice test",
    "RCMP Online Assessment preparation",
    "RCMP OEA prep",
    "RCMP test practice Canada",
  ],
  alternates: {
    canonical: "https://rcmpprep.ca/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--dark)] text-white">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
        <Link
          href="/"
          className="mb-12 inline-block font-head text-2xl font-extrabold uppercase tracking-[0.08em] text-white"
        >
          RCMP<span className="text-[var(--red)]">PREP</span>
        </Link>

        <h1 className="font-head text-5xl font-extrabold uppercase tracking-[0.04em] text-white sm:text-6xl">
          About RCMP Prep
        </h1>

        <p className="mt-6 text-lg leading-8 text-white/72">
          RCMPPrep.ca is an unofficial, independent practice resource built to help Canadians prepare for the RCMP Online Assessment (OEA). We are <strong className="text-white">not affiliated with, endorsed by, or connected to the Royal Canadian Mounted Police</strong>.
        </p>

        <h2 className="mt-12 font-head text-2xl font-extrabold uppercase tracking-[0.04em] text-white">
          Who It&apos;s For
        </h2>
        <p className="mt-4 text-base leading-7 text-white/72">
          Anyone applying to the RCMP who wants to walk into the Online Assessment prepared. Whether you&apos;re a first-time applicant or re-applying after a deferral, our practice tests help you build confidence across all six sections before your real test date.
        </p>

        <h2 className="mt-12 font-head text-2xl font-extrabold uppercase tracking-[0.04em] text-white">
          What We Cover
        </h2>
        <ul className="mt-4 space-y-2 text-base leading-7 text-white/72">
          <li>Workstyle (Personality Preferences)</li>
          <li>Language Comprehension</li>
          <li>Numerical Reasoning</li>
          <li>Spatial &amp; Mechanical Reasoning</li>
          <li>Memory Recall</li>
          <li>Business Reasoning</li>
        </ul>
        <p className="mt-4 text-base leading-7 text-white/72">
          Each practice test covers all six sections with timed conditions and full answer explanations. Three complete tests are included with lifetime access — no subscription, no recurring fees.
        </p>

        <h2 className="mt-12 font-head text-2xl font-extrabold uppercase tracking-[0.04em] text-white">
          Disclaimer
        </h2>
        <p className="mt-4 text-base leading-7 text-white/72">
          RCMPPrep.ca is an independent resource. It is not affiliated with, endorsed by, or connected to the Royal Canadian Mounted Police, the Government of Canada, or any official government body. Our practice materials are based on publicly available information about common police aptitude assessment formats and do not replicate any official test content.
        </p>

        <div className="mt-12">
          <Link
            href="/sample"
            className="inline-flex rounded-2xl bg-[var(--red)] px-7 py-4 font-head text-xl font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)]"
          >
            Try Free Sample →
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
