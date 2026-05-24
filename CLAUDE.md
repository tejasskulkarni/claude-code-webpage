# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Node.js and npm live at `E:\Claude Code\Tools\` — not on system PATH. Prepend before running any node command in PowerShell:

```powershell
$env:PATH = "E:\Claude Code\Tools;" + $env:PATH
```

```bash
npm run dev          # dev server on :3000
npm run build        # production build (uses Turbopack)
npm run start        # serve the production build
npm run lint         # ESLint (eslint-config-next + prettier)
npm run lint:fix     # ESLint with auto-fix
npm run format       # prettier --write .
npm test             # vitest unit tests (tests/unit/ only)
npm run test:e2e     # playwright E2E tests (requires a running build)
npx tsc --noEmit     # type-check without emitting
```

Run a single unit test file:

```bash
npx vitest run tests/unit/validation.test.ts
```

Run a single E2E spec (chromium only):

```bash
npx playwright test tests/e2e/ctas.spec.ts --project=chromium
```

## Architecture

**Stack**: Next.js 16.2.6 (App Router, Turbopack), React 19, TypeScript strict, Tailwind CSS 3.4, deployed on Vercel.

### Design token flow

`lib/tokens.ts` is the single source of truth for colors, fonts, spacing, and motion values. These are consumed by `tailwind.config.ts` which extends Tailwind's theme. Never hardcode colors or spacing — always use the Tailwind classes generated from tokens (`bg-paper`, `text-ink`, `text-accent`, `py-section`, etc.).

### Content lives in typed config files

All copy and data is in `lib/`:

- `lib/nav.ts` — nav links, social URLs, external links, contact email
- `lib/stats.ts` — subscriber count, issues shipped, lessons, referrals
- `lib/issues.ts` — latest newsletter issues (3 items)
- `lib/testimonials.ts` — reader testimonials
- `lib/faq.ts` — FAQ questions and answers

Updating site content = editing these files. No CMS, no database.

### Server vs. client components

Default is Server Component. Add `"use client"` only for state/effects/browser APIs. Current client components with their reasons:

- `TopNav` — scroll state, mobile menu toggle, focus trap
- `Footer` — analytics `onClick` handlers on social links
- `FAQ` — `onToggle` analytics event
- `VideoSection` — IntersectionObserver, video control
- `SubscribeForm` — form state, fetch
- `Reveal` — IntersectionObserver for scroll fade-in
- `OfferingTracker` — analytics `onClick`

### Subscribe form pipeline

`SubscribeForm` (client) → `POST /api/subscribe` (Edge runtime) → `lib/validation.ts` (zod + disposable domain blocklist + honeypot check) → `lib/newsletter.ts` (ConvertKit v3 REST API). The honeypot field (`name="website"`) silently returns 200 to deceive bots. Rate limit: 5 req/min per IP (in-memory token bucket — resets on cold start).

### Environment variables

```
CONVERTKIT_API_KEY     # required for subscriptions to actually work
CONVERTKIT_FORM_ID     # required for subscriptions to actually work
NEXT_PUBLIC_SITE_URL   # used in metadata.metadataBase (falls back to localhost:3000)
```

Without ConvertKit keys, the subscribe API returns `{ ok: false, reason: "misconfigured" }` and the form shows a generic error. Everything else on the site works without env vars.

### TypeScript strictness

`noUncheckedIndexedAccess` and `noImplicitOverride` are enabled on top of `strict: true`. Array/object index access returns `T | undefined`. Never use `any`, `@ts-ignore`, or `as unknown as`.

### Testing

- **Unit tests** (`tests/unit/`) use Vitest + jsdom + @testing-library/react. Vitest is configured to exclude `tests/e2e/`.
- **E2E tests** (`tests/e2e/`) use Playwright against a production build. The `playwright.config.ts` webServer runs `npm run build && npm run start`. Mock `/api/subscribe` in tests with `page.route()` — never hit ConvertKit from tests.
- Snapshot directory: `tests/e2e/__snapshots__/`

### Placeholder TODOs before launch

All items requiring real assets from the site owner are documented in `LAUNCH.md`. Key ones: ConvertKit keys, social handles, portrait images, intro video, and real issue/testimonial data. Search for `// TODO` in the codebase for inline markers.
