import { NextRequest, NextResponse } from 'next/server';
import { appendEvent } from '../../../lib/events';
import { checkRateLimit, getClientIp } from '../../../lib/rate-limit';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rate = checkRateLimit(`lead:${ip}`, { max: 10, windowMs: 60_000 });

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

  const { email, topic, website, variant, utm_source, utm_medium, utm_campaign } = body as Record<string, unknown>;

  if (typeof email !== 'string' || typeof topic !== 'string') {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
  }

  if (email.length > 320 || topic.length > 120) {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
  }

  if (typeof website === 'string' && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedTopic = topic.trim();

  if (!emailRe.test(normalizedEmail)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const record = {
    email: normalizedEmail,
    topic: normalizedTopic,
    variant: typeof variant === 'string' ? variant : undefined,
    utm_source: typeof utm_source === 'string' ? utm_source : undefined,
    utm_medium: typeof utm_medium === 'string' ? utm_medium : undefined,
    utm_campaign: typeof utm_campaign === 'string' ? utm_campaign : undefined,
    ip,
    userAgent: req.headers.get('user-agent') || undefined,
    at: new Date().toISOString()
  };

  console.log('[lead]', { topic: record.topic, variant: record.variant, at: record.at });

  try {
    await appendEvent({ type: 'lead', at: record.at, payload: record });
  } catch (error) {
    console.error('[lead][appendEvent][error]', error);
    return NextResponse.json({ ok: true, warning: 'event_store_unavailable' });
  }

  return NextResponse.json({ ok: true });
}
