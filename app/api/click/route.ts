import { NextRequest, NextResponse } from 'next/server';
import { appendEvent } from '../../../lib/events';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rate = checkRateLimit(`click:${ip}`, { max: 60, windowMs: 60_000 });

  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'rate_limited', retryAfterSec: rate.retryAfterSec },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSec) } }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const { topicSlug, offerName, href } = body as Record<string, unknown>;

  if (
    typeof topicSlug !== 'string' ||
    typeof offerName !== 'string' ||
    typeof href !== 'string' ||
    topicSlug.length > 120 ||
    offerName.length > 160 ||
    href.length > 2000
  ) {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
  }

  let normalizedHref = href.trim();
  try {
    const parsed = new URL(normalizedHref);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'invalid href' }, { status: 400 });
    }
    normalizedHref = parsed.toString();
  } catch {
    return NextResponse.json({ error: 'invalid href' }, { status: 400 });
  }

  const record = {
    topicSlug: topicSlug.trim(),
    offerName: offerName.trim(),
    href: normalizedHref,
    ip,
    userAgent: req.headers.get('user-agent') || undefined,
    at: new Date().toISOString()
  };

  console.log('[click]', { topicSlug: record.topicSlug, offerName: record.offerName, at: record.at });

  try {
    await appendEvent({ type: 'click', at: record.at, payload: record });
  } catch (error) {
    console.error('[click][appendEvent][error]', error);
    return NextResponse.json({ ok: true, warning: 'event_store_unavailable' });
  }

  return NextResponse.json({ ok: true });
}
