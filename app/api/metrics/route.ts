import { NextRequest, NextResponse } from 'next/server';
import { getMetricsSummary } from '../../../lib/metrics';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (process.env.METRICS_TOKEN && token !== process.env.METRICS_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const summary = await getMetricsSummary();
  return NextResponse.json(summary);
}
