# Foundation stage 1

## Scope

Make future updates reviewable and reduce exposed server capabilities while preserving the current practice experience.

- Require a private bearer token for admin metrics and prevent response caching.
- Remove the public purchase-email endpoint; deliver email directly from the verified Stripe webhook through a server-only module.
- Escape customer-controlled values interpolated into email HTML.
- Update Next.js and its ESLint configuration from 16.1.7 to 16.3.3; refresh compatible dependency fixes. Next.js 16.3.3 addresses [GHSA-2xp9-vwfh-vxw4](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4).
- Remove unused Nodemailer and Resend SDK dependencies (delivery uses the Resend HTTP API).
- Add Node version guidance, an environment template, API tests, type checking, a combined validation command, and CI.
- Fix pre-existing non-test lint errors without changing displayed copy. Keep the existing memory effect finding as a scoped warning until its planned redesign.

## Deployment requirement

Configure `ADMIN_API_KEY` as a server-only Vercel environment variable and update private metrics consumers to send it in the Authorization header. Generate a random token using `openssl rand -hex 32`. Do not commit the value. Without it, admin metrics fail closed with 503. This has no effect on public practice access.

The removed `/api/send-confirmation` endpoint must return 404. The signed Stripe webhook remains the supported purchase-email entry point. Existing payment/email credentials do not change.

## Verification

- `npm run validate`: lint, type checking, 14 mocked API/email regression tests, and production build.
- `npm audit`: check the resolved dependency tree.
- Local production smoke checks: homepage and practice routes respond; unauthenticated admin metrics fail closed; public email route is absent; unsigned webhook is rejected.
- Check the diff to confirm question banks, test/results pages, test hooks, scoring, and section renderers are unchanged.

## Deferred work

This stage does not establish that the entire app or production database is secure. Live Supabase policies and deployed configuration have not been inspected. The following remain separate stages:

- Reconcile the free product with legacy checkout, access-by-email, and success-page behavior.
- Capture the real database schema and RLS policies in migrations before changing analytics writes.
- Improve webhook fulfillment retries and idempotency if legacy purchases will remain supported.
- Repair analytics duration semantics and attempt lifecycle during the planned practice update.
- Address the existing memory effect, results effect dependency, and unused spatial helper lint warnings.
- Redesign memory and spatial sections and connect distinct question banks after foundation work.

No database migration or production release is part of this change.
