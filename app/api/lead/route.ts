import { NextRequest, NextResponse } from 'next/server';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email, topic } = await req.json();

  if (typeof email !== 'string' || typeof topic !== 'string') {
    return NextResponse.json({ error: 'invalid payload' }, { status: 400 });
  }

  if (!emailRe.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  console.log('[lead]', { email: email.toLowerCase(), topic, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
