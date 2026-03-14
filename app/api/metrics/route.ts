import { NextRequest, NextResponse } from 'next/server';
import { getMetricsSummary } from '../../../lib/metrics';

function extractToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length).trim();
  }

  return req.headers.get('x-metrics-token') || req.nextUrl.searchParams.get('token');
}

export async function GET(req: NextRequest) {
  const configuredToken = process.env.METRICS_TOKEN;
  const providedToken = extractToken(req);

  if (configuredToken && providedToken !== configuredToken) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const summary = await getMetricsSummary();
  return NextResponse.json(summary, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
