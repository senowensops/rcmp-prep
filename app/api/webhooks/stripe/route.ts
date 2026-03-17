import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Stripe(key, { apiVersion: '2026-02-25.clover' as any });
}

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://oganoylgybihscjfmrqt.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? '';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sen.owens.ops@gmail.com',
    pass: 'agzdrzlfniafxclo',
  },
});

async function storeAccess(email: string, sessionId: string) {
  await fetch(`${SUPABASE_URL}/rest/v1/purchases`, {
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
      product: 'rcmp-prep-full-access',
      purchased_at: new Date().toISOString(),
    }),
  });
}

async function sendConfirmationEmail(customerEmail: string) {
  const accessLink = `https://rcmpprep.ca/access?email=${encodeURIComponent(customerEmail)}`;
  await transporter.sendMail({
    from: '"RCMP Prep" <support@rcmpprep.ca>',
    to: customerEmail,
    subject: "You're in — RCMP Prep Full Access",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f0f0f;color:#fff;padding:40px;border-radius:16px;">
        <div style="font-size:2rem;margin-bottom:8px;">🏅</div>
        <h1 style="font-size:1.8rem;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;margin:0 0 8px;">You're in.</h1>
        <p style="color:rgba(255,255,255,0.7);font-size:1rem;line-height:1.7;margin:0 0 24px;">
          Thanks for joining as a Founding Member. Your lifetime access to RCMP Prep is now active.
        </p>
        <a href="https://rcmpprep.ca/test/1" style="display:inline-block;background:#c8102e;color:#fff;padding:14px 28px;border-radius:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;text-decoration:none;font-size:1rem;">
          Start Practice Test →
        </a>
        <div style="margin-top:24px;padding:16px;background:rgba(255,255,255,0.05);border-radius:10px;">
          <p style="color:rgba(255,255,255,0.5);font-size:0.85rem;margin:0 0 8px;">Lost access? Use this link to restore it on any device:</p>
          <a href="${accessLink}" style="color:#d4900a;font-size:0.85rem;word-break:break-all;">${accessLink}</a>
        </div>
        <p style="color:rgba(255,255,255,0.35);font-size:0.8rem;margin-top:32px;line-height:1.6;">
          Unofficial practice resource — not affiliated with the RCMP or Government of Canada.<br/>
          Questions? Reply to this email or contact support@rcmpprep.ca
        </p>
      </div>
    `,
  });
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
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email ?? session.customer_details?.email;

    console.log('✅ Payment completed:', session.id, customerEmail);

    if (customerEmail) {
      await Promise.allSettled([
        storeAccess(customerEmail, session.id),
        sendConfirmationEmail(customerEmail),
      ]);
    }
  }

  return NextResponse.json({ received: true });
}
