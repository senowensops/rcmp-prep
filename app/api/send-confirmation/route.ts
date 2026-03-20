import { NextRequest, NextResponse } from 'next/server';

// ============================================================
// TODO: RESEND API KEY SETUP
// ============================================================
// 1. Go to https://resend.com and create a free account
// 2. Get your API key from the dashboard
// 3. Add it to Vercel env vars:
//    - Go to Vercel project → Settings → Environment Variables
//    - Add: RESEND_API_KEY = re_xxxxxxxxxxxx
//    - Redeploy for it to take effect
// 4. Also add your "from" domain in Resend → Domains
//    (verify rcmpprep.ca so emails come from noreply@rcmpprep.ca)
// ============================================================

function buildEmailHtml(name: string, email: string, plan: string, section: string): string {
  const displayName = name && name.trim() ? name.split(' ')[0] : 'there';
  const accessUrl = `https://rcmpprep.ca/access?email=${encodeURIComponent(email)}`;
  const isSection = plan === 'section' && section;
  const sectionLabel = isSection ? section.charAt(0).toUpperCase() + section.slice(1) : '';
  const emailTitle = isSection
    ? `You're in — RCMP Prep ${sectionLabel} Section Unlocked`
    : "You're in — RCMP Prep Full Access Unlocked";
  const bodyCopy = isSection
    ? `Your ${sectionLabel} section is now unlocked across all 3 practice tests.`
    : 'Full access is now active. This is a serious move — and you made it. The RCMP selection process is competitive, and the candidates who commit early are the ones who show up prepared.';
  const featureLine = isSection
    ? `Full access to the ${sectionLabel} section — across all 3 tests`
    : '6 test sections — Written Communication, Composition, Memory, Problem Solving, Judgement, and more';
  const ctaText = isSection ? `Start ${sectionLabel} Practice →` : 'Start Practicing Now →';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${emailTitle}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#111118;border-radius:16px;border:1px solid rgba(200,16,46,0.2);overflow:hidden;">

          <!-- Header stripe -->
          <tr>
            <td style="background:linear-gradient(135deg,#c8102e 0%,#8b0a1e 100%);padding:6px 0;"></td>
          </tr>

          <!-- Logo / top -->
          <tr>
            <td style="padding:48px 48px 0;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#c8102e;border-radius:10px;padding:8px 14px;">
                    <span style="color:#fff;font-weight:800;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;">RCMP PREP</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:36px 48px 0;">
              <p style="margin:0 0 8px;color:rgba(200,16,46,0.9);font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Access Confirmed</p>
              <h1 style="margin:0 0 16px;color:#ffffff;font-size:32px;font-weight:800;line-height:1.2;letter-spacing:-0.01em;">
                You're in, ${displayName}.
              </h1>
              <p style="margin:0;color:rgba(255,255,255,0.65);font-size:16px;line-height:1.7;">
                ${bodyCopy}
              </p>
            </td>
          </tr>

          <!-- What you get -->
          <tr>
            <td style="padding:32px 48px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">What's Unlocked</p>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding:7px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:22px;color:#c8102e;font-size:16px;vertical-align:top;">✓</td>
                              <td style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.5;">3 full-length RCMP practice tests</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:22px;color:#c8102e;font-size:16px;vertical-align:top;">✓</td>
                              <td style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.5;">${featureLine}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:22px;color:#c8102e;font-size:16px;vertical-align:top;">✓</td>
                              <td style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.5;">Timed conditions — simulates real test pressure</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:7px 0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:22px;color:#c8102e;font-size:16px;vertical-align:top;">✓</td>
                              <td style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.5;">Lifetime access — yours forever, no subscription</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Access note -->
          <tr>
            <td style="padding:24px 48px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(200,16,46,0.08);border:1px solid rgba(200,16,46,0.2);border-radius:12px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 4px;color:#c8102e;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">How to Access</p>
                    <p style="margin:0;color:rgba(255,255,255,0.7);font-size:14px;line-height:1.6;">
                      Your access is tied to this email address: <strong style="color:#fff;">${email}</strong><br/>
                      Just visit <a href="https://rcmpprep.ca" style="color:#c8102e;text-decoration:none;">rcmpprep.ca</a> and enter your email to unlock everything — on any device, any time.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:36px 48px 0;" align="center">
              <a href="https://rcmpprep.ca" style="display:inline-block;background:linear-gradient(135deg,#c8102e 0%,#a00d24 100%);color:#fff;padding:16px 40px;border-radius:10px;font-weight:800;font-size:15px;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;border:none;">
                ${ctaText}
              </a>
            </td>
          </tr>

          <!-- Quote / motivation -->
          <tr>
            <td style="padding:36px 48px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid rgba(200,16,46,0.6);">
                <tr>
                  <td style="padding:4px 0 4px 18px;">
                    <p style="margin:0;color:rgba(255,255,255,0.45);font-size:14px;line-height:1.7;font-style:italic;">
                      "The will to win is nothing without the will to prepare."
                    </p>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.25);font-size:12px;">— Every officer who passed the process</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer stripe -->
          <tr>
            <td style="background:rgba(255,255,255,0.03);border-top:1px solid rgba(255,255,255,0.07);padding:24px 48px;">
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.25);font-size:12px;line-height:1.7;">
                Questions? Reply to this email or reach us at <a href="mailto:support@rcmpprep.ca" style="color:rgba(200,16,46,0.7);text-decoration:none;">support@rcmpprep.ca</a>
              </p>
              <p style="margin:0;color:rgba(255,255,255,0.15);font-size:11px;line-height:1.7;">
                RCMP Prep is an unofficial study resource and is not affiliated with, endorsed by, or connected to the Royal Canadian Mounted Police or the Government of Canada.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, plan, section } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    // ============================================================
    // TODO: Add RESEND_API_KEY to Vercel environment variables
    // See instructions at the top of this file
    // ============================================================
    if (!apiKey) {
      console.warn('[send-confirmation] RESEND_API_KEY not set — email not sent');
      return NextResponse.json(
        { warning: 'RESEND_API_KEY not configured — email skipped' },
        { status: 200 }
      );
    }

    const emailPlan = plan ?? 'full';
    const emailSection = section ?? '';
    const isSection = emailPlan === 'section' && emailSection;
    const sectionLabel = isSection ? emailSection.charAt(0).toUpperCase() + emailSection.slice(1) : '';
    const emailSubject = isSection
      ? `You're in — RCMP Prep ${sectionLabel} Section Unlocked`
      : "You're in — RCMP Prep Full Access Unlocked";
    const html = buildEmailHtml(name ?? '', email, emailPlan, emailSection);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'RCMP Prep <noreply@rcmpprep.ca>',
        to: [email],
        subject: emailSubject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('[send-confirmation] Resend error:', res.status, body);
      return NextResponse.json({ error: 'Failed to send email', detail: body }, { status: 500 });
    }

    const data = await res.json();
    console.log('[send-confirmation] Email sent:', data.id, '→', email);
    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('[send-confirmation] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
