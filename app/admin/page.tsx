import { getMetricsSummary } from '../../lib/metrics';

export default async function AdminPage({
  searchParams
}: {
  searchParams: { token?: string };
}) {
  const tokenOk = !process.env.METRICS_TOKEN || searchParams.token === process.env.METRICS_TOKEN;
  if (!tokenOk) {
    return (
      <main style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
        <h1>Unauthorized</h1>
        <p>Add the correct <code>?token=...</code> in URL.</p>
      </main>
    );
  }

  const summary = await getMetricsSummary();

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: 24 }}>
      <h1>TrendForge Admin</h1>
      <p style={{ opacity: 0.8 }}>Simple metrics dashboard (Pass 6).</p>

      <section style={{ border: '1px solid #233', borderRadius: 12, padding: 14, marginTop: 16 }}>
        <h3>Totals</h3>
        <p>Leads: {summary.totals.leads}</p>
        <p>Clicks: {summary.totals.clicks}</p>
        <p>Click/Lead ratio: {summary.conversionRate}</p>
      </section>

      <section style={{ border: '1px solid #233', borderRadius: 12, padding: 14, marginTop: 16 }}>
        <h3>Leads by topic</h3>
        <pre>{JSON.stringify(summary.leadsByTopic, null, 2)}</pre>
      </section>

      <section style={{ border: '1px solid #233', borderRadius: 12, padding: 14, marginTop: 16 }}>
        <h3>Clicks by topic</h3>
        <pre>{JSON.stringify(summary.clicksByTopic, null, 2)}</pre>
      </section>

      <section style={{ border: '1px solid #233', borderRadius: 12, padding: 14, marginTop: 16 }}>
        <h3>Leads by variant</h3>
        <pre>{JSON.stringify(summary.leadsByVariant, null, 2)}</pre>
      </section>
    </main>
  );
}
