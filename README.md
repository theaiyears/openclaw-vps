# TrendForge

Trend-focused SEO micro-site starter designed for traffic capture, lead collection, and affiliate monetization.

## What Pass 2 adds

- Programmatic topic pages (`/topic/[slug]`)
- Lead capture endpoint with email validation (`/api/lead`)
- Monetization blocks ready for affiliate links
- Analytics hook (Plausible)
- `sitemap.xml` + `robots.txt` generation
- Vercel-ready config

## Local run

```bash
npm install
npm run dev
```

## Production build test

```bash
npm run build
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

`components/MonetizationBlock.tsx` currently uses placeholder links (`#`). Replace those with affiliate/sponsor URLs before launch.
