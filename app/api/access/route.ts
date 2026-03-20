import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://oganoylgybihscjfmrqt.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY ?? '';

export async function GET(req: NextRequest) {
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
