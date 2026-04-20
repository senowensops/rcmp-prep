# RCMP Prep — Claude Project Context

This is the master reference for rcmpprep.ca. Use this to understand the app's architecture, integrations, and how to contribute.

## Quick Facts

- **Live URL:** https://rcmpprep.ca
- **Repo:** git@github.com:senowensops/rcmp-prep.git
- **Stack:** Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe Checkout (dynamic pricing, no pre-created products)
- **Email:** Resend (confirmation emails after purchase)
- **Analytics:** Google Analytics 4 (G-C60PNKEMZX) + Supabase test_attempts table
- **Donations:** Buy Me a Coffee (https://buymeacoffee.com/rcmpprep)

---

## What This App Does

RCMP Prep helps candidates prepare for the Royal Canadian Mounted Police Online Assessment (RCMP-OEA). It provides:

1. **3 Full Practice Tests** — Each with 6 sections mirroring the real exam
2. **6 Section Types:**
   - Workstyle (personality/behavioural)
   - Language (reading comprehension)
   - Numerical (data interpretation, basic math)
   - Spatial (shape rotation, 3D visualization)
   - Memory (recall details from images/scenes)
   - Business (situational judgment)
3. **Timed Sections** — Matches real exam pressure
4. **Detailed Results** — Score breakdown by section with radar chart
5. **SEO Blog** — 11+ articles targeting RCMP assessment keywords

---

## Repository Structure

```
rcmp-prep/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── sample/page.tsx             # Free sample test
│   ├── test/[testId]/page.tsx      # Main test interface (tracks start)
│   ├── results/[testId]/page.tsx   # Results page (tracks completion)
│   ├── success/page.tsx            # Post-purchase confirmation
│   ├── blog/page.tsx               # Blog index
│   ├── blog/[slug]/page.tsx        # Individual blog posts
│   ├── api/
│   │   ├── checkout/route.ts       # Creates Stripe checkout session
│   │   ├── webhooks/stripe/route.ts # Handles payment completion
│   │   ├── send-confirmation/route.ts # Sends purchase email via Resend
│   │   ├── access/route.ts         # Checks if email has access
│   │   └── leads/route.ts          # Captures email leads
│   ├── about/, privacy-policy/, terms/
│   └── layout.tsx                  # Root layout with GA script
├── components/
│   ├── ui/                         # QuestionCard, Timer, RadarChart, etc.
│   ├── sections/                   # Section-specific renderers
│   └── landing/                    # Hero, Pricing, WhyItWorks
├── data/
│   ├── blog/posts.ts               # All blog content (2100+ lines)
│   ├── test1/, test2/, test3/      # Question banks per test
│   └── shared/                     # Shared question utilities
├── lib/
│   ├── analytics.ts                # GA4 event helpers
│   ├── tracking.ts                 # Supabase test tracking
│   ├── supabase.ts                 # Minimal Supabase REST client
│   └── testData.ts                 # Test loading utilities
├── hooks/
│   ├── useTestState.ts             # Test progress state management
│   ├── useTimer.ts                 # Countdown timer hook
│   └── useLocalStorage.ts          # Persistent state
└── types/index.ts                  # TypeScript interfaces
```

---

## Integrations

### Stripe (Payments)

- **Mode:** Checkout Sessions with dynamic pricing (no pre-created products)
- **Products:**
  - Full Access: $29 CAD (lifetime)
  - Section Access: $9 CAD per section (lifetime)
- **Flow:**
  1. User clicks "Unlock" → `POST /api/checkout` creates session
  2. User pays on Stripe-hosted checkout
  3. Webhook `checkout.session.completed` fires → stores in Supabase, sends email
- **Keys (in Vercel env):**
  - `STRIPE_SECRET_KEY` — sk_live_...
  - `STRIPE_WEBHOOK_SECRET` — whsec_...
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — pk_live_...

### Supabase (Database)

- **Project:** oganoylgybihscjfmrqt
- **Tables:**
  - `purchases` — email, stripe_session_id, product, purchased_at
  - `test_attempts` — session_id, test_id, started_at, completed_at, duration, scores, sections (JSONB)
  - `tasks` — (for external task management, not user-facing)
- **RLS:** Enabled. Anonymous inserts allowed for tracking; reads require service_role.
- **Keys (in Vercel env):**
  - `SUPABASE_URL` — https://oganoylgybihscjfmrqt.supabase.co
  - `SUPABASE_SERVICE_KEY` — sb_secret_...
  - `NEXT_PUBLIC_SUPABASE_URL` — same URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — sb_publishable_...

### Resend (Email)

- **Sender:** support@rcmpprep.ca (verified domain)
- **Trigger:** Stripe webhook calls `/api/send-confirmation`
- **Key:** `RESEND_API_KEY` in Vercel env

### Google Analytics 4

- **Property ID:** G-C60PNKEMZX (properties/529035510)
- **Events tracked:**
  - `test_started` — when user begins a test
  - `test_completed` — when user finishes (includes score, duration)
  - `begin_checkout` — checkout initiated
  - `purchase` — payment completed
  - `hit_paywall` — user tries locked content
- **Service Account:** `/Users/sen/.openclaw/credentials/ga-rcmpprep.json` (for CLI queries)

### Buy Me a Coffee (Donations)

- **Link:** https://buymeacoffee.com/rcmpprep
- **Appears on:** Homepage footer, Results page "Support the App" button
- **Revenue:** Goes to Jordan's connected account (not tracked in Stripe API)

---

## Analytics & Tracking

### Test Attempt Tracking (Supabase)

Every test start and completion is logged:

```sql
SELECT 
  test_id,
  COUNT(*) as starts,
  COUNT(completed_at) as completions,
  AVG(score_percent) as avg_score,
  AVG(duration_seconds)/60 as avg_minutes
FROM test_attempts
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY test_id;
```

### GA4 Queries (Python)

Script at `~/.openclaw/workspace/scripts/ga-report.py` queries:
- Users, sessions, pageviews
- Top pages
- Traffic sources
- Bounce rate, session duration

---

## Deployment

### Auto-Deploy

Push to `main` → Vercel builds and deploys automatically.

```bash
git add -A && git commit -m "feat: description" && git push origin main
```

### Manual Deploy

```bash
cd ~/dev/rcmp-prep
vercel --prod --token "$VERCEL_TOKEN"
```

### Environment Variables

All secrets are in Vercel Project Settings → Environment Variables. Never commit keys to the repo.

---

## Blog & SEO

### Structure

- Posts defined in `data/blog/posts.ts` as TypeScript objects
- Each post has: slug, title, subtitle, date, content (HTML string), FAQs, sources
- Rendered at `/blog/[slug]`
- FAQ schema markup for Google rich results

### Current Posts (11)

1. how-to-pass-rcmp-online-assessment
2. rcmp-application-process-complete-guide
3. rcmp-online-assessment-workstyle-section
4. rcmp-salary-and-benefits
5. what-happens-if-you-get-deferred-rcmp
6. how-long-is-the-rcmp-online-assessment
7. rcmp-aptca-what-to-expect
8. rcmp-polygraph-test-what-to-expect
9. rcmp-physical-abilities-test-pare
10. rcmp-interview-tips
11. rcmp-field-investigation-background-check

### Content Rules (Non-Negotiable)

- **Every factual claim must be verified against rcmp.ca or gc.ca**
- No blog post goes live with unverified RCMP policy info
- Include `sources` array with official URLs

### SEO Opportunities

1. More long-tail keywords: "rcmp assessment practice test free", "rcmp oea sample questions"
2. Location pages: "rcmp hiring [province]"
3. Comparison content: "rcmp vs local police salary"
4. YouTube embeds for visual learners

---

## Growth Ideas

### Quick Wins

1. **Email capture popup** — Offer free sample test in exchange for email
2. **Exit intent modal** — "Before you go, try our free sample"
3. **Social proof** — Add testimonials/success stories
4. **Retargeting** — Facebook/Google remarketing pixels

### Product Improvements

1. **Progress saving** — Resume tests across sessions (partially implemented)
2. **Study mode** — Untimed practice with explanations shown immediately
3. **Mobile app** — React Native wrapper for offline practice
4. **Leaderboard** — Anonymous score comparisons
5. **Detailed explanations** — Every question gets a "why" breakdown

### Content Marketing

1. **Reddit/forums** — Answer RCMP questions, link to relevant blog posts
2. **RCMP Facebook groups** — Share helpful content (not spammy)
3. **YouTube shorts** — Quick tips from blog content
4. **Email drip** — 5-day "RCMP Prep Crash Course" for leads

### Pricing Experiments

1. **Bundle discount** — Full access + study guide PDF
2. **Referral program** — $5 off for referrer and friend
3. **Seasonal pricing** — Discount during RCMP hiring pushes

---

## How Claude Can Contribute

### Access

1. **Clone repo:** `git clone git@github.com:senowensops/rcmp-prep.git`
2. **Install:** `npm install`
3. **Dev server:** `npm run dev` (localhost:3000)
4. **Build:** `npm run build`

### Safe Changes

- Adding/editing blog posts in `data/blog/posts.ts`
- UI tweaks in components
- New pages that don't touch payments
- Analytics improvements
- Bug fixes

### Careful Changes (Test Thoroughly)

- Anything in `app/api/` (payment flows)
- `lib/tracking.ts` or `lib/supabase.ts`
- Test data in `data/test1/`, etc.

### Commit Convention

```
feat: add new feature
fix: bug fix
content: blog/content changes
refactor: code cleanup
chore: deps, config
```

### Before Pushing

1. `npm run build` — must pass
2. `npm run lint` — fix any errors
3. Test the specific feature locally
4. Write clear commit message

---

## Credentials Reference

All secrets are stored in Vercel Environment Variables. Never commit credentials to the repo.

Required env vars:
- `STRIPE_SECRET_KEY` — Stripe live secret key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret  
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_KEY` — Supabase service role key
- `NEXT_PUBLIC_SUPABASE_URL` — Same as SUPABASE_URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
- `RESEND_API_KEY` — Resend email API key
- `NEXT_PUBLIC_BASE_URL` — https://rcmpprep.ca

GA4 Property ID: properties/529035510

---

## Questions?

This doc should cover 90% of what you need. For anything else:
- Check the actual code (it's well-structured)
- Look at Vercel logs for runtime errors
- Check Stripe dashboard for payment issues
- Check Supabase dashboard for data issues

Owner: Jordan Owens (jordan@origincreative.ca)
