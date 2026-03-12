import Link from 'next/link';
import { topics } from '../lib/topics';

export default function Home() {
  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 40, marginBottom: 8 }}>TrendForge</h1>
      <p style={{ opacity: 0.85 }}>
        SEO-focused micro-publications for high-intent trending topics.
      </p>
      <p style={{ opacity: 0.7, marginTop: 8 }}>
        Pass 2 includes analytics hooks, monetization blocks, and deploy hardening.
      </p>

      <div style={{ display: 'grid', gap: 14, marginTop: 20 }}>
        {topics.map((t) => (
          <Link
            key={t.slug}
            href={`/topic/${t.slug}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #223',
              borderRadius: 12,
              padding: 16
            }}
          >
            <h2 style={{ margin: 0 }}>{t.title}</h2>
            <p style={{ marginBottom: 4, opacity: 0.9 }}>{t.summary}</p>
            <small style={{ opacity: 0.7 }}>Intent: {t.intent} • CPC hint: {t.cpcHint}</small>
          </Link>
        ))}
      </div>
    </main>
  );
}
