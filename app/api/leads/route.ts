import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://oganoylgybihscjfmrqt.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? '';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email, source: 'paywall' }),
    });
    if (res.status === 409) {
      return NextResponse.json({ error: 'already_registered' }, { status: 409 });
    }
    if (!res.ok) {
      const err = await res.text();
      console.error('Supabase error:', err);
      // Still return success from app perspective — capture failed silently
      return NextResponse.json({ success: true, note: 'db_warn' });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('API error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
