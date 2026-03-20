import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Stripe(key, { apiVersion: '2026-02-25.clover' as any });
}

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://oganoylgybihscjfmrqt.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? '';

async function storeAccess(email: string, sessionId: string, product: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/purchases`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      email,
      stripe_session_id: sessionId,
      product,
      purchased_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[stripe-webhook] Supabase insert failed:', res.status, body);
  }
}

async function sendConfirmationEmail(email: string, name: string, plan: string, section: string) {
  // ============================================================
  // TODO: Add RESEND_API_KEY to Vercel environment variables
  // 1. Go to https://resend.com — create a free account
  // 2. Copy your API key from the Resend dashboard
  // 3. In Vercel: Project → Settings → Environment Variables
  //    Add: RESEND_API_KEY = re_xxxxxxxxxxxx
  // 4. Also verify rcmpprep.ca as a sending domain in Resend
  // 5. Redeploy for the env var to take effect
  // ============================================================

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://rcmpprep.ca';

  const res = await fetch(`${baseUrl}/api/send-confirmation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, plan, section }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('[stripe-webhook] send-confirmation failed:', res.status, body);
  } else {
    const data = await res.json();
    if (data.warning) {
      console.warn('[stripe-webhook] send-confirmation warning:', data.warning);
    } else {
      console.log('[stripe-webhook] Confirmation email sent:', data.id);
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') ?? '';
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('[stripe-webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email ?? session.customer_details?.email ?? '';
    const customerName = session.customer_details?.name ?? '';
    const metadata = session.metadata ?? {};

    // Determine product identifier from metadata
    const product = metadata.product ?? 'rcmp-prep-full-access';

    console.log('[stripe-webhook] ✅ Payment completed:', session.id, customerEmail, product);

    if (customerEmail) {
      await Promise.allSettled([
        storeAccess(customerEmail, session.id, product),
        sendConfirmationEmail(customerEmail, customerName, metadata.plan ?? "full", metadata.section ?? ""),
      ]);
    }
  }

  return NextResponse.json({ received: true });
}
