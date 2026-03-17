import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Stripe(key, { apiVersion: '2025-01-27.acrobat' as any });
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sen.owens.ops@gmail.com',
    pass: 'dnhercyigwfftxqp',
  },
});

async function sendConfirmationEmail(customerEmail: string) {
  await transporter.sendMail({
    from: '"RCMP Prep" <support@rcmpprep.ca>',
    to: customerEmail,
    subject: 'You\'re in — RCMP Prep Full Access',
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0f0f0f; color: #fff; padding: 40px; border-radius: 16px;">
        <div style="font-size: 2rem; margin-bottom: 8px;">🏅</div>
        <h1 style="font-size: 1.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; margin: 0 0 8px;">You're in.</h1>
        <p style="color: rgba(255,255,255,0.7); font-size: 1rem; line-height: 1.7; margin: 0 0 24px;">
          Thanks for joining as a Founding Member. Your lifetime access to RCMP Prep is now active.
        </p>
        <a href="https://rcmpprep.ca/test/1" style="display: inline-block; background: #c8102e; color: #fff; padding: 14px 28px; border-radius: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; text-decoration: none; font-size: 1rem;">
          Start Practice Test →
        </a>
        <p style="color: rgba(255,255,255,0.35); font-size: 0.8rem; margin-top: 32px; line-height: 1.6;">
          This is an unofficial practice resource. Not affiliated with the RCMP or Government of Canada.<br/>
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

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_email ?? session.customer_details?.email;

      console.log('✅ Payment completed:', {
        sessionId: session.id,
        customerEmail,
        amountTotal: session.amount_total,
      });

      if (customerEmail) {
        try {
          await sendConfirmationEmail(customerEmail);
          console.log('✅ Confirmation email sent to:', customerEmail);
        } catch (err) {
          console.error('Failed to send confirmation email:', err);
        }
      }
      break;
    }

    default:
      console.log(`Unhandled webhook event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
