# TrendForge

Trend-focused SEO micro-site starter designed for traffic capture, lead collection, and affiliate monetization.

## What Pass 3 adds

- Conversion UX: sticky CTA and trust/proof section on topic pages
- Structured data: FAQ JSON-LD on topic pages
- Content pipeline starter:
  - `content/seeds/trends.json`
  - `scripts/generate-topics.mjs`
  - output: `content/generated-topics.md`
- Deploy checklist automation:
  - `scripts/deploy-check.mjs`
  - `npm run deploy:check`

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

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import project in Vercel
3. Set env vars from `.env.example`
4. Deploy

## Environment

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)

## Monetization note

`components/MonetizationBlock.tsx` uses placeholder links (`#`). Replace those with real affiliate/sponsor URLs before launch.
