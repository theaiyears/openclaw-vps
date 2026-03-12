# TrendForge

Trend-focused SEO micro-site starter designed for traffic capture, lead collection, and affiliate monetization.

## What Pass 5 adds

- Event persistence layer (`data/events.jsonl`)
  - Lead events saved from `/api/lead`
  - Click events saved from `/api/click`
- Metrics API
  - `GET /api/metrics?token=...`
  - Returns totals + per-topic counts + simple conversion ratio
- Local reporting command
  - `npm run metrics:report`

## Existing stack (Pass 1-4 retained)

- Programmatic topic pages (`/topic/[slug]`)
- Related-topic internal linking
- Lead capture + monetization blocks + click tracking
- SEO support (`robots.txt`, `sitemap.xml`, FAQ JSON-LD)
- Deploy validation command

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

## Environment

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)
- `METRICS_TOKEN` (recommended)

## Monetization note

`components/MonetizationBlock.tsx` uses placeholder links (`#`). Replace those with real affiliate/sponsor URLs before launch.
