import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }

  return req.headers.get('x-metrics-token') || req.nextUrl.searchParams.get('token');
}

export async function POST(req: NextRequest) {
  const configuredToken = process.env.METRICS_TOKEN;
  const providedToken = extractToken(req);
  if (configuredToken && providedToken !== configuredToken) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const ip = getClientIp(req.headers);
  const rate = checkRateLimit(`content-plan:${ip}`, { max: 12, windowMs: 60_000 });
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'rate_limited', retryAfterSec: rate.retryAfterSec },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSec) } }
    );
  }

  const payload = await req.json().catch(() => ({}));
  const rawNiche = typeof payload?.niche === 'string' ? payload.niche : 'ai growth';
  const niche = rawNiche.trim().slice(0, 80) || 'ai growth';
  const count = Math.min(Math.max(Number(payload?.count) || 10, 1), 50);

  const ideas = Array.from({ length: count }).map((_, i) => ({
    title: `${niche} strategy #${i + 1}`,
    slug: `${String(niche).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i + 1}`,
    angle: i % 2 === 0 ? 'comparison' : 'tutorial'
  }));

  return NextResponse.json({ niche, ideas });
}
