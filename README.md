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
- Optional Supabase-backed event storage for durable analytics on Vercel

### Metrics API auth examples

```bash
curl -H "Authorization: Bearer $METRICS_TOKEN" https://your-site.vercel.app/api/metrics
# or
curl -H "x-metrics-token: $METRICS_TOKEN" https://your-site.vercel.app/api/metrics
```

### Durable event storage (Supabase)

On Vercel, local file storage is ephemeral. For persistent leads/click analytics, configure Supabase.

1) Create a table:

```sql
create table if not exists public.events (
  id bigint generated always as identity primary key,
  type text not null check (type in ('lead','click')),
  at timestamptz not null default now(),
  payload jsonb not null
);

create index if not exists events_at_idx on public.events (at desc);
create index if not exists events_type_idx on public.events (type);
```

2) Add Vercel env vars:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_EVENTS_TABLE` (optional, defaults to `events`)

If these are set, the app writes/reads events from Supabase automatically.

## Environment

Required:
- `NEXT_PUBLIC_SITE_URL`
- `METRICS_TOKEN`

Optional:
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_EVENTS_TABLE`
- `NEXT_PUBLIC_OFFER_SOFTWARE_1_URL`
- `NEXT_PUBLIC_OFFER_SOFTWARE_2_URL`
- `NEXT_PUBLIC_OFFER_EDUCATION_1_URL`
- `NEXT_PUBLIC_OFFER_EDUCATION_2_URL`
- `NEXT_PUBLIC_OFFER_CREATOR_TOOLS_1_URL`
- `NEXT_PUBLIC_OFFER_CREATOR_TOOLS_2_URL`

## Monetization note

Offer cards now use env vars for links. Any unset offer URL is shown as "Offer link coming soon".
