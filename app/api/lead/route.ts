import { NextRequest, NextResponse } from 'next/server';
import { appendEvent } from '../../../lib/events';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email, topic } = await req.json();

  if (typeof email !== 'string' || typeof topic !== 'string') {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
  }

  if (!emailRe.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const record = {
    email: email.toLowerCase(),
    topic,
    at: new Date().toISOString()
  };

  console.log('[lead]', record);
  await appendEvent({ type: 'lead', at: record.at, payload: record });

  return NextResponse.json({ ok: true });
}
