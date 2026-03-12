import { NextRequest, NextResponse } from 'next/server';
import { appendEvent } from '../../../lib/events';

export async function POST(req: NextRequest) {
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
    at: new Date().toISOString()
  };

  console.log('[click]', record);
  await appendEvent({ type: 'click', at: record.at, payload: record });

  return NextResponse.json({ ok: true });
}
