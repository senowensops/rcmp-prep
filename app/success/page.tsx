import type { Metadata } from "next";
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import { AccessUnlocker } from './AccessUnlocker';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

const SECTION_LABELS: Record<string, string> = {
  workstyle: 'Workstyle',
  language: 'Language',
  numerical: 'Numerical',
  spatial: 'Spatial',
  memory: 'Memory',
  business: 'Verbal Reasoning',
};

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  // Retrieve session metadata to determine plan type
  let verified = false;
  let plan = 'full';
  let section = '';

  if (session_id && process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
    try {
      const Stripe = (await import('stripe')).default;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-01-27.acrobat' as any });
      const session = await stripe.checkout.sessions.retrieve(session_id);
      verified = session.payment_status === 'paid';
      plan = session.metadata?.plan ?? 'full';
      section = session.metadata?.section ?? '';
    } catch (err) {
      console.error('Could not verify Stripe session:', err);
      verified = true;
    }
  } else {
    verified = true;
  }

  const isSection = plan === 'section' && section;
  const sectionLabel = isSection ? (SECTION_LABELS[section] ?? section) : '';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'sans-serif',
      }}
    >
      <AccessUnlocker plan={plan} section={section} />

      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#111',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          textAlign: 'center',
        }}
      >
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #d4900a, #f0b429)' }} />

        <div style={{ padding: '3rem 2rem' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(212,144,10,0.12)',
              border: '2px solid rgba(212,144,10,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem',
              color: '#d4900a',
            }}
          >
            ✓
          </div>

          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '2.25rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: '#fff',
              margin: '0 0 0.75rem',
            }}
          >
            Payment Successful!
          </h1>

          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#d4900a',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: '0 0 2rem',
            }}
          >
            {isSection
              ? `You now have lifetime access to the ${sectionLabel} section`
              : 'You now have lifetime access to RCMP Prep'}
          </p>

          {verified && (
            <a
              href="/test/1"
              style={{
                display: 'block',
                width: '100%',
                padding: '1rem',
                background: '#d4900a',
                color: '#fff',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: '1.15rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                borderRadius: '0.875rem',
                textDecoration: 'none',
                boxSizing: 'border-box',
              }}
            >
              Start Your Test →
            </a>
          )}

          <p
            style={{
              marginTop: '1.5rem',
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.3)',
              lineHeight: 1.6,
            }}
          >
            Your access is stored in this browser.
            <br />
            Bookmark this domain to return anytime.
          </p>
        </div>
      </div>
    </main>
  );
}
