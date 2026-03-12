# TrendForge

Trend-focused SEO micro-site starter designed for traffic capture, lead collection, and affiliate monetization.

## What Pass 4 adds

- Internal-link automation on topic pages
  - Related content module based on tags/category scoring
- Monetization click tracking
  - New endpoint: `POST /api/click`
  - Tracks offer click events for sponsor/affiliate measurement
- Conversion upgrades retained
  - Sticky CTA + FAQ JSON-LD + lead form anchor targeting
- Content scaling support retained
  - Seeded trend input + generated draft file
- Deploy verification retained
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
