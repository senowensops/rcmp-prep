import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RCMP Prep",
  description: "Privacy Policy for RCMP Prep. We collect minimal data, never sell it, and the platform is completely free to use.",
};

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--dark)] px-6 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <Link href="/" className="font-head text-sm font-bold uppercase tracking-[0.12em] text-[var(--red)] hover:opacity-80">← Back to RCMPPREP.CA</Link>
        </div>
        <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">Legal</p>
        <h1 className="mt-3 font-head text-4xl font-extrabold uppercase tracking-[0.04em]">Privacy Policy</h1>
        <p className="mt-4 text-sm text-white/40">Last updated: March 2026</p>

        <div className="mt-10 space-y-10 text-white/72 leading-8">

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">1. Overview</h2>
            <p>
              RCMP Prep (<strong className="text-white">rcmpprep.ca</strong>) is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.
            </p>
            <p className="mt-3">
              By using this platform, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">2. Information We Collect</h2>
            <h3 className="font-head text-base font-bold uppercase tracking-[0.04em] text-white/80 mb-2 mt-4">Email Address (Optional)</h3>
            <p>
              RCMP Prep is free and requires no payment or account. If you choose to contact us via support@rcmpprep.ca, we may retain your email to respond to your inquiry. No email is collected through the platform itself.
            </p>
            <h3 className="font-head text-base font-bold uppercase tracking-[0.04em] text-white/80 mb-2 mt-4">Local Browser Data</h3>
            <p>
              RCMP Prep uses your browser&apos;s <strong className="text-white">localStorage</strong> to store your test progress, answers, and access status. This data never leaves your browser and is not transmitted to our servers. Clearing your browser data will reset your progress.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">3. How We Use Your Information</h2>
            <p>Any personal information we collect (email address via support contact) is used solely for:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Responding to support requests</li>
              <li>Sending occasional product updates if you opt in (you can unsubscribe at any time)</li>
            </ul>
            <p className="mt-3">
              We do not use your email address for third-party advertising or share it with data brokers.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">4. We Do Not Sell Your Data</h2>
            <p>
              <strong className="text-white">We do not sell, rent, lease, or trade your personal information to any third party.</strong> Your data is used only to operate and improve the RCMP Prep platform.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">5. Data Retention</h2>
            <p>
              We retain your email address for as long as necessary to fulfil the purposes described in this policy, or as required by law. If you wish to have your email removed from our records, contact us at the address below and we will delete it promptly.
            </p>
            <p className="mt-3">
              Progress data stored in your browser&apos;s localStorage is controlled entirely by you and can be cleared at any time through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">6. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li><strong className="text-white">Vercel</strong> — hosting and server infrastructure.</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies and data handling practices. We encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">7. Cookies</h2>
            <p>
              RCMP Prep does not use tracking cookies or advertising cookies. We use browser localStorage for functional purposes only (storing your test progress and access status).
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">8. Children&apos;s Privacy</h2>
            <p>
              RCMP Prep is intended for adults who are applying to the Royal Canadian Mounted Police. We do not knowingly collect personal information from individuals under 18 years of age.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">9. Governing Law</h2>
            <p>
              This Privacy Policy is governed by the laws of the Province of <strong className="text-white">New Brunswick, Canada</strong>, including the <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and applicable provincial legislation.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be reflected by updating the date at the top of this page. Continued use of the platform constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to request deletion of your data, please contact:{' '}
              <a href="mailto:support@rcmpprep.ca" className="text-[var(--gold)] hover:underline">support@rcmpprep.ca</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
