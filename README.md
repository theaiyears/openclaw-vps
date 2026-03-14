# TrendForge

Trend-focused SEO micro-site starter designed for traffic capture, lead collection, and affiliate monetization.

## What Pass 6 adds

- A/B lead CTA variant framework
  - Deterministic variant assignment per topic (`lib/ab.ts`)
  - Lead form button copy varies by variant
  - Variant stored in lead events
- UTM capture on lead submit
  - `utm_source`, `utm_medium`, `utm_campaign` captured from URL query
- Metrics refactor + admin dashboard
  - Shared metrics summarizer (`lib/metrics.ts`)
  - API endpoint: `GET /api/metrics?token=...`
  - Dashboard page: `/admin?token=...`
- Existing event persistence maintained
  - `data/events.jsonl` log for lead + click events

## Existing stack (Pass 1-5 retained)

- Programmatic topic pages (`/topic/[slug]`)
- Related-topic internal linking
- Lead capture + monetization blocks + click tracking
- SEO support (`robots.txt`, `sitemap.xml`, FAQ JSON-LD)
- Topic draft generation + deploy checks

## Local run

```bash
npm install
npm run dev
```

## Generate topic drafts

```bash
npm run topics:generate
```

## Production checks

```bash
npm run deploy:check
```

## Metrics report

```bash
npm run metrics:report
```

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import project in Vercel
3. Set env vars from `.env.example`
4. Deploy

## Production hardening updates

This repo now includes:

- Basic API rate limiting for `POST /api/lead` and `POST /api/click`
- Honeypot spam field for lead submissions
- Improved metrics auth support (`Authorization: Bearer ...` or `x-metrics-token`)
- `Cache-Control: no-store` on `/api/metrics`
- Optional env-based affiliate offer links (no more hardcoded `#` placeholders)

### Metrics API auth examples

```bash
curl -H "Authorization: Bearer $METRICS_TOKEN" https://your-site.vercel.app/api/metrics
# or
curl -H "x-metrics-token: $METRICS_TOKEN" https://your-site.vercel.app/api/metrics
```

## Environment

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)
- `METRICS_TOKEN` (recommended)

## Monetization note

`components/MonetizationBlock.tsx` uses placeholder links (`#`). Replace those with real affiliate/sponsor URLs before launch.
