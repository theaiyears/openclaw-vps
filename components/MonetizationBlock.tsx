'use client';

type Props = {
  category: 'software' | 'education' | 'creator-tools';
  topicSlug: string;
};

type Offer = {
  name: string;
  cta: string;
  href?: string;
};

const offerLinks = {
  software: [
    process.env.NEXT_PUBLIC_OFFER_SOFTWARE_1_URL,
    process.env.NEXT_PUBLIC_OFFER_SOFTWARE_2_URL
  ],
  education: [
    process.env.NEXT_PUBLIC_OFFER_EDUCATION_1_URL,
    process.env.NEXT_PUBLIC_OFFER_EDUCATION_2_URL
  ],
  'creator-tools': [
    process.env.NEXT_PUBLIC_OFFER_CREATOR_TOOLS_1_URL,
    process.env.NEXT_PUBLIC_OFFER_CREATOR_TOOLS_2_URL
  ]
} as const;

const offers: Record<Props['category'], Offer[]> = {
  software: [
    { name: 'AI Writing Suite', cta: 'Start free trial', href: offerLinks.software[0] },
    { name: 'Automation Platform', cta: 'Get 30% off', href: offerLinks.software[1] }
  ],
  education: [
    { name: 'Prompt Engineering Bootcamp', cta: 'View curriculum', href: offerLinks.education[0] },
    { name: 'Freelancer Accelerator', cta: 'Enroll today', href: offerLinks.education[1] }
  ],
  'creator-tools': [
    { name: 'Shorts Editor Pro', cta: 'Try creator plan', href: offerLinks['creator-tools'][0] },
    { name: 'Voiceover Toolkit', cta: 'Compare plans', href: offerLinks['creator-tools'][1] }
  ]
};

async function trackClick(topicSlug: string, offerName: string, href: string) {
  try {
    await fetch('/api/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicSlug, offerName, href })
    });
  } catch {
    // best-effort only
  }
}

export function MonetizationBlock({ category, topicSlug }: Props) {
  return (
    <section style={{ marginTop: 24, border: '1px solid #233', borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Recommended tools</h3>
      <p style={{ opacity: 0.8, marginTop: 0 }}>
        Some links may be affiliate links. We only recommend tools relevant to this topic.
      </p>
      <div style={{ display: 'grid', gap: 10 }}>
        {offers[category].map((o) => {
          if (!o.href) {
            return (
              <div
                key={o.name}
                style={{
                  border: '1px dashed #2f4560',
                  borderRadius: 10,
                  padding: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  opacity: 0.7
                }}
              >
                <span>{o.name}</span>
                <strong>Offer link coming soon</strong>
              </div>
            );
          }

          return (
            <a
              key={o.name}
              href={o.href}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => trackClick(topicSlug, o.name, o.href!)}
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
          );
        })}
      </div>
    </section>
  );
}
