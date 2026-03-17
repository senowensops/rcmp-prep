import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-01-27.acrobat' as any });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rcmpprep.ca';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body as { email?: string };

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'cad',
            unit_amount: 2900,
            product_data: {
              name: 'RCMP Prep — Full Access (Founding Member)',
              description: 'Lifetime access to all 3 practice tests, 6 sections each, timed, with full explanations.',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/?cancelled=1`,
      metadata: {
        product: 'rcmp-prep-full-access',
      },
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
