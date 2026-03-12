import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (process.env.METRICS_TOKEN && token !== process.env.METRICS_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { niche = 'ai growth', count = 10 } = await req.json().catch(() => ({}));

  const ideas = Array.from({ length: Math.min(Math.max(Number(count) || 10, 1), 50) }).map((_, i) => ({
    title: `${niche} strategy #${i + 1}`,
    slug: `${String(niche).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i + 1}`,
    angle: i % 2 === 0 ? 'comparison' : 'tutorial'
  }));

  return NextResponse.json({ niche, ideas });
}
