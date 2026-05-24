# AI Daily — Pre-launch Checklist

## Technical checklist (all code-verifiable)

- [x] All 9 phases committed, CI workflow defined
- [x] TypeScript strict mode — no `any`, no `@ts-ignore`, no `as unknown as`
- [x] Server Components by default; `"use client"` justified in each component
- [x] `<Image priority fetchPriority="high">` on hero portrait; all others lazy
- [x] `next/font` with `display: "swap"` and `subsets: ["latin"]` for all three typefaces
- [x] Video uses `preload="none"`; src set programmatically after IntersectionObserver fires
- [x] Honeypot field in subscribe form (aria-hidden, tabindex=-1, silent 200 drop)
- [x] Rate limiting on subscribe API (5 req/min per IP, in-memory token bucket)
- [x] Disposable email domain blocklist in validation layer
- [x] OG image at `/opengraph-image` (1200×630)
- [x] `robots.txt` — allow all, points to `/sitemap.xml`
- [x] `sitemap.xml` — single root URL entry
- [x] JSON-LD structured data (Person + WebSite) in `<head>`
- [x] 404 page matches site palette and type
- [x] Privacy page at `/privacy` (placeholder, needs real content)
- [x] Terms page at `/terms` (placeholder, needs real content)
- [x] Footer links to `/privacy` and `/terms`
- [x] Skip-to-content link for keyboard/screen-reader users
- [x] `prefers-reduced-motion` respected — scroll reveal and video autoplay skipped
- [x] `@vercel/analytics` and `@vercel/speed-insights` wired up; no GA, no Pixel, no Hotjar
- [x] Vercel Analytics tracks `subscribe_submitted`, `subscribe_succeeded`, `subscribe_failed`
- [x] 20 unit tests pass (validation, newsletter adapter, SubscribeForm)
- [x] 9 Playwright E2E spec files cover page-load, responsive, CTAs, nav, media, forms, social, scroll-reveal, a11y
- [x] Lighthouse CI config: perf ≥ 0.9, a11y ≥ 0.95, best-practices ≥ 0.95, SEO ≥ 0.95, LCP ≤ 2s, CLS ≤ 0.05
- [x] `poweredByHeader: false` in next.config.ts

## Pre-launch with real assets (gated on Tejas supplying content)

- [ ] **ConvertKit keys**: Set `CONVERTKIT_API_KEY` and `CONVERTKIT_FORM_ID` in Vercel env vars; verify a test subscription triggers a confirmation email within 60 seconds
- [ ] **Instagram handle**: Replace `https://www.instagram.com/` placeholder in `lib/nav.ts`
- [ ] **X (Twitter) handle**: Replace `https://x.com/` placeholder in `lib/nav.ts`; update `@tejaskulkarni` in `app/layout.tsx` twitter metadata
- [ ] **Contact email**: Replace `hello@ai-daily.example` in `lib/nav.ts`
- [ ] **Real subscriber count**: Replace `12,000+` in `lib/stats.ts` and `components/ui/SubscribeForm.tsx`
- [ ] **Hero portrait**: Replace `/images/portrait-hero.jpg` with real photo (recommended: 800×1000px)
- [ ] **About portrait**: Replace `/images/portrait-about.jpg` with real photo (recommended: 600×800px)
- [ ] **Intro video**: Replace `/intro.mp4`, `/intro.webm`, `/poster.jpg`, and `/captions.vtt` with real files
- [ ] **Latest issues**: Update `lib/issues.ts` with real issue titles, dates, summaries, and URLs
- [ ] **Testimonials**: Update `lib/testimonials.ts` with real names, roles, and quotes
- [ ] **Courses URL**: Replace `https://example.com/courses` in `lib/nav.ts`
- [ ] **Referrals URL**: Replace `https://tally.so/r/placeholder` in `lib/nav.ts`
- [ ] **Archive URL**: Replace `https://example.com/archive` in `lib/nav.ts`
- [ ] **Community URL**: Replace `https://example.com/community` in `lib/nav.ts`
- [ ] **JSON-LD social links**: Replace Instagram/X placeholder URLs in `app/layout.tsx`
- [ ] **Site URL**: Set `NEXT_PUBLIC_SITE_URL` to production domain in Vercel env vars
- [ ] **Privacy policy**: Replace placeholder text in `app/privacy/page.tsx` with real content
- [ ] **Terms of service**: Replace placeholder text in `app/terms/page.tsx` with real content
- [ ] **OG image social preview**: Verify OG image renders correctly on X, LinkedIn, and iMessage using link previews
- [ ] **E2E tests on prod build**: Run `npm run test:e2e` against a production build with real assets

## Deployment checklist

- [ ] Connect GitHub repo to Vercel
- [ ] Set all env vars in Vercel project settings (CONVERTKIT_API_KEY, CONVERTKIT_FORM_ID, NEXT_PUBLIC_SITE_URL)
- [ ] Set production branch to `main`
- [ ] Enable preview deployments for PRs (Vercel default)
- [ ] Configure custom domain and add www → apex redirect
- [ ] Verify `/robots.txt` and `/sitemap.xml` are accessible at production URL

## Post-launch monitoring

- [ ] Confirm Vercel Analytics is receiving `subscribe_succeeded` events
- [ ] Check Lighthouse CI passes on production (perf ≥ 90 mobile, a11y ≥ 95)
- [ ] Monitor Core Web Vitals in Vercel Speed Insights dashboard
- [ ] Verify no console errors or warnings on page load in production
