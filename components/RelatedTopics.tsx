import Link from 'next/link';
import { Topic } from '../lib/topics';

export function RelatedTopics({ topics }: { topics: Topic[] }) {
  if (!topics.length) return null;

  return (
    <section style={{ marginTop: 26 }}>
      <h3 style={{ marginBottom: 10 }}>Related guides</h3>
      <div style={{ display: 'grid', gap: 10 }}>
        {topics.map((t) => (
          <Link
            key={t.slug}
            href={`/topic/${t.slug}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #2c3f5e',
              borderRadius: 10,
              padding: 12
            }}
          >
            <strong>{t.title}</strong>
            <p style={{ margin: '6px 0 0 0', opacity: 0.85 }}>{t.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
