import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://oganoylgybihscjfmrqt.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? '';

/* ── In-memory rate limiter: 10 requests per IP per minute ── */
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Clean up expired entries
  for (const [key, entry] of ipMap) {
    if (now > entry.resetAt) ipMap.delete(key);
  }

  const entry = ipMap.get(ip);
  if (!entry) {
    ipMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const email = req.nextUrl.searchParams.get('email');
  if (!email || !email.includes('@')) {
    return NextResponse.json({ found: false });
  }

  // Fetch all purchases for this email to determine access level
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/purchases?email=eq.${encodeURIComponent(email)}&select=product`,
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
  if (!Array.isArray(data) || data.length === 0) {
    return NextResponse.json({ found: false });
  }

  // Aggregate access: check for full access and collect unlocked sections
  let fullAccess = false;
  const unlockedSections: string[] = [];

  for (const row of data) {
    const product = row.product as string;
    if (product === 'rcmp-prep-full-access') {
      fullAccess = true;
      break;
    }
    if (product.startsWith('rcmp-prep-section-')) {
      const section = product.replace('rcmp-prep-section-', '');
      if (!unlockedSections.includes(section)) {
        unlockedSections.push(section);
      }
    }
  }

  return NextResponse.json({
    found: true,
    fullAccess,
    unlockedSections: fullAccess ? [] : unlockedSections,
  });
}
