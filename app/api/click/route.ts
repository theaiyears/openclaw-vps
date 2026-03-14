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

  const { topicSlug, offerName, href } = await req.json();

  if (
    typeof topicSlug !== 'string' ||
    typeof offerName !== 'string' ||
    typeof href !== 'string'
  ) {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
  }

  const record = {
    topicSlug,
    offerName,
    href,
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
