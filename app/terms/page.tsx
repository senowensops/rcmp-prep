export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--dark)] px-6 py-20 text-white sm:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="font-head text-sm font-bold uppercase tracking-[0.18em] text-[var(--red)]">Legal</p>
        <h1 className="mt-3 font-head text-4xl font-extrabold uppercase tracking-[0.04em]">Terms of Service</h1>
        <p className="mt-4 text-sm text-white/40">Last updated: March 2026</p>

        <div className="mt-10 space-y-10 text-white/72 leading-8">

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">1. Service Description</h2>
            <p>
              RCMP Prep (<strong className="text-white">rcmpprep.ca</strong>) is an independent digital practice test platform designed to help individuals prepare for the Royal Canadian Mounted Police (RCMP) written assessment. The platform provides timed practice questions across multiple cognitive and aptitude domains, including verbal reasoning, numerical reasoning, spatial reasoning, memory recall, and situational judgement.
            </p>
            <p className="mt-3">
              Access to the full platform is provided upon a one-time purchase. A free sample test is available without purchase.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">2. No Affiliation Disclaimer</h2>
            <p>
              <strong className="text-white">RCMP Prep is not affiliated with, endorsed by, or associated with the Royal Canadian Mounted Police (RCMP), the Government of Canada, Public Safety Canada, or any federal, provincial, or territorial government body.</strong>
            </p>
            <p className="mt-3">
              This platform is an independent, third-party study resource. Content is created based on publicly available information about the RCMP application process. Questions on this platform do not represent actual RCMP examination questions and are intended for practice purposes only.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">3. Payment Terms</h2>
            <p>
              Full access to RCMP Prep is available for a one-time payment of <strong className="text-white">$29 CAD</strong> (subject to change for new purchases). This payment grants you lifetime access to all available practice tests on the platform.
            </p>
            <p className="mt-3">
              <strong className="text-white">All sales are final and non-refundable.</strong> By completing your purchase, you acknowledge that you are receiving immediate access to digital content and waive any right to a refund under applicable consumer protection legislation, to the extent permitted by law.
            </p>
            <p className="mt-3">
              Payments are processed securely by Stripe. RCMP Prep does not store your payment card information.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">4. Acceptable Use</h2>
            <p>Your access to RCMP Prep is granted for <strong className="text-white">personal, non-commercial use only</strong>. You agree not to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Share, sell, sublicense, or redistribute your access credentials or account access to any third party</li>
              <li>Copy, reproduce, scrape, or redistribute any practice questions, answer explanations, or other platform content</li>
              <li>Use the platform for any commercial purpose, including reselling access or content</li>
              <li>Attempt to reverse-engineer, decompile, or extract the underlying data or software</li>
              <li>Use automated tools (bots, scripts, scrapers) to access the platform</li>
            </ul>
            <p className="mt-3">
              Violation of these terms may result in immediate termination of your access without refund.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">5. Intellectual Property</h2>
            <p>
              All content on RCMP Prep — including practice questions, answer explanations, diagrams, SVG illustrations, and interface design — is the intellectual property of the platform owner and is protected by Canadian copyright law. You may not reproduce or distribute any content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">6. Limitation of Liability</h2>
            <p>
              RCMP Prep is provided <strong className="text-white">"as is"</strong> without warranties of any kind, express or implied. We do not guarantee that use of this platform will result in passing the RCMP assessment or any other examination.
            </p>
            <p className="mt-3">
              To the maximum extent permitted by applicable law, RCMP Prep and its owner(s) shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, the platform.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">7. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Province of <strong className="text-white">New Brunswick, Canada</strong>, and the applicable laws of Canada. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of New Brunswick.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Continued use of the platform after changes are posted constitutes acceptance of the updated terms. Material changes will be noted by updating the date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="font-head text-xl font-bold uppercase tracking-[0.06em] text-white mb-3">9. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at:{' '}
              <a href="mailto:support@rcmpprep.ca" className="text-[var(--gold)] hover:underline">support@rcmpprep.ca</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
