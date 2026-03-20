import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rcmpprep.ca';

const VALID_SECTIONS = ['workstyle', 'language', 'numerical', 'spatial', 'memory', 'business'] as const;
type SectionId = (typeof VALID_SECTIONS)[number];

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Stripe(key, { apiVersion: '2026-02-25.clover' as any });
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await req.json().catch(() => ({}));
    const { email, plan, section } = body as { email?: string; plan?: string; section?: string };

    let lineItem: Stripe.Checkout.SessionCreateParams.LineItem;
    let metadata: Record<string, string>;

    if (plan === 'section') {
      // Validate section
      if (!section || !VALID_SECTIONS.includes(section as SectionId)) {
        return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
      }

      const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1);
      lineItem = {
        price_data: {
          currency: 'cad',
          unit_amount: 900,
          product_data: {
            name: `RCMP Prep — ${sectionLabel} Section Access`,
            description: `Lifetime access to the ${sectionLabel} section across all 3 practice tests.`,
          },
        },
        quantity: 1,
      };
      metadata = {
        product: `rcmp-prep-section-${section}`,
        plan: 'section',
        section,
      };
    } else {
      // Default: full access at $29
      lineItem = {
        price_data: {
          currency: 'cad',
          unit_amount: 2900,
          product_data: {
            name: 'RCMP Prep — Full Access (Founding Member)',
            description: 'Lifetime access to all 3 practice tests, 6 sections each, timed, with full explanations.',
          },
        },
        quantity: 1,
      };
      metadata = {
        product: 'rcmp-prep-full-access',
        plan: 'full',
      };
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: [lineItem],
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/?cancelled=1`,
      metadata,
    };

    if (email && email.includes('@')) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
