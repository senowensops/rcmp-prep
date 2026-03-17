import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://oganoylgybihscjfmrqt.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? '';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  if (!email || !email.includes('@')) {
    return NextResponse.json({ found: false });
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/purchases?email=eq.${encodeURIComponent(email)}&select=email&limit=1`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) return NextResponse.json({ found: false });
  const data = await res.json();
  return NextResponse.json({ found: Array.isArray(data) && data.length > 0 });
}
