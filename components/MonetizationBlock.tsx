type Props = {
  category: 'software' | 'education' | 'creator-tools';
};

const offers = {
  software: [
    { name: 'AI Writing Suite', cta: 'Start free trial', href: '#' },
    { name: 'Automation Platform', cta: 'Get 30% off', href: '#' }
  ],
  education: [
    { name: 'Prompt Engineering Bootcamp', cta: 'View curriculum', href: '#' },
    { name: 'Freelancer Accelerator', cta: 'Enroll today', href: '#' }
  ],
  'creator-tools': [
    { name: 'Shorts Editor Pro', cta: 'Try creator plan', href: '#' },
    { name: 'Voiceover Toolkit', cta: 'Compare plans', href: '#' }
  ]
} as const;

export function MonetizationBlock({ category }: Props) {
  return (
    <section style={{ marginTop: 24, border: '1px solid #233', borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Recommended tools</h3>
      <p style={{ opacity: 0.8, marginTop: 0 }}>Monetization slot (replace # with real affiliate links).</p>
      <div style={{ display: 'grid', gap: 10 }}>
        {offers[category].map((o) => (
          <a
            key={o.name}
            href={o.href}
            rel="nofollow sponsored"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #2f4560',
              borderRadius: 10,
              padding: 12,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>{o.name}</span>
            <strong>{o.cta} →</strong>
          </a>
        ))}
      </div>
    </section>
  );
}
