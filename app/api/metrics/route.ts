import { NextRequest, NextResponse } from 'next/server';
import { readEvents } from '../../../lib/events';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (process.env.METRICS_TOKEN && token !== process.env.METRICS_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const events = await readEvents();
  const leads = events.filter((e) => e.type === 'lead');
  const clicks = events.filter((e) => e.type === 'click');

  const leadsByTopic: Record<string, number> = {};
  const clicksByTopic: Record<string, number> = {};

  for (const l of leads) {
    const topic = String(l.payload.topic || 'unknown');
    leadsByTopic[topic] = (leadsByTopic[topic] || 0) + 1;
  }

  for (const c of clicks) {
    const topic = String(c.payload.topicSlug || 'unknown');
    clicksByTopic[topic] = (clicksByTopic[topic] || 0) + 1;
  }

  return NextResponse.json({
    totals: { leads: leads.length, clicks: clicks.length },
    leadsByTopic,
    clicksByTopic,
    conversionRate: leads.length ? Number((clicks.length / leads.length).toFixed(2)) : 0
  });
}
