# RCMP Prep

The free, donation-supported practice app at https://rcmpprep.ca. Built with Next.js App Router, React, TypeScript, and Tailwind CSS; deployed on Vercel. Supabase stores practice analytics. Legacy Stripe purchase and access routes remain for existing integrations.

## Local setup

Use Node.js 22 (see `.nvmrc`) and npm:

```sh
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The free practice interface runs without external credentials. Browser progress is stored locally; analytics persistence requires a configured Supabase project. Use a development database when testing integrations, not production credentials.

`.env.example` lists server and browser settings. Never prefix service-role keys, Stripe secrets, or the admin token with `NEXT_PUBLIC_`. The existing GA helper defaults to the production property if `NEXT_PUBLIC_GA_ID` is empty, so use a separate property when intentionally testing analytics.

## Validation

```sh
npm run validate
```

Runs ESLint, generated Next.js route types and TypeScript checks, API regression tests, and the production build. Tests mock provider calls: they do not send email, charge cards, or access the production database. GitHub Actions runs the same command on pull requests and pushes to `main`, without production secrets.

The memory component's existing `react-hooks/set-state-in-effect` finding is temporarily a warning scoped to that file. Existing results-hook and spatial-data warnings also remain visible. Their behavior is deferred to the planned test update, rather than refactored during foundation work.

## Application layout

- `app/`: routes, pages, and API handlers.
- `components/`: landing-page, layout, and practice UI.
- `data/`: question banks and blog content.
- `hooks/`: browser progress and timers.
- `lib/`: scoring, analytics, and data access.
- `lib/server/`: server-only purchase email delivery.
- `tests/`: API authorization and webhook/email regression coverage.

## Admin metrics

`GET /api/admin/test-metrics` requires a server-only `ADMIN_API_KEY` and an `Authorization: Bearer <token>` header. Generate a strong random token with `openssl rand -hex 32`, store it in Vercel's environment settings and your private reporting client, and redeploy. Do not put it in a URL, browser bundle, repository, or shared screenshot.

If no key is configured, the endpoint returns 503 without reading Supabase. Missing or invalid authorization returns 401. Authorized responses use `Cache-Control: private, no-store`. Existing reporting scripts must send the header after this change.

## Legacy purchase email

The Stripe webhook verifies the original request body and signature before calling the server-only email helper. It calls Resend directly. The former public `POST /api/send-confirmation` route has been removed and returns 404; external callers must no longer use it. No additional email authentication secret is required.

Existing `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, and `RESEND_API_KEY` settings continue to support the legacy webhook. Missing email configuration skips delivery with a server warning, matching the previous behavior. Webhook retry/idempotency semantics and paid-access design have not been redesigned in this stage.

## Deployment

1. Work on a feature branch and open a pull request.
2. Require the `Validate / validate` check in GitHub branch rules before merging (adding the workflow alone does not configure branch protection).
3. Set `ADMIN_API_KEY` and update any private metrics consumers before deploying this stage. Public practice remains available if the token is not configured.
4. Verify the preview homepage, practice page, and protected endpoint before merging.
5. The existing deployment setup is documented as auto-deploying `main` to Vercel. Merging is the production release step; verify the project settings before relying on it.

## Staged updates

Stage 1 establishes API protections, dependency maintenance, setup instructions, and automated validation. Questions, scoring, question-bank selection, timers, progress storage, and memory/spatial behavior are intentionally unchanged.

Before a later analytics/database stage, inspect the live Supabase schema and RLS policies and capture them in migrations. `TRACKING_BRIEFING.md` is a historical proposal, not an authoritative current schema. Do not apply it blindly to production.

The later practice update should address distinct test-bank loading, fresh attempts versus resume, timer enforcement, and the planned memory/spatial redesign together. See `docs/foundation-stage-1.md` for the current stage's scope and rollout notes.
