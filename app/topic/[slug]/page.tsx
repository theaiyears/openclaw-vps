import { notFound } from 'next/navigation';
import { getTopic, topics } from '../../../lib/topics';
import { LeadForm } from '../../../components/LeadForm';
import { MonetizationBlock } from '../../../components/MonetizationBlock';
import { StickyCta } from '../../../components/StickyCta';

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic) return notFound();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How long does ${topic.title} take to start?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most people can publish their first asset and capture initial leads within 24-72 hours.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does this page make money?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Through affiliate recommendations, sponsorship placements, and lead capture follow-up offers.'
        }
      }
    ]
  };

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: 24, paddingBottom: 96 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <h1>{topic.title}</h1>
      <p style={{ opacity: 0.9 }}>{topic.summary}</p>
      <p style={{ opacity: 0.75 }}>Intent: {topic.intent} • CPC hint: {topic.cpcHint}</p>

      <div
        style={{
          margin: '16px 0',
          padding: 12,
          border: '1px solid #294164',
          borderRadius: 10,
          background: 'rgba(35,52,84,0.35)'
        }}
      >
        <strong>Proof-driven approach:</strong> this page is optimized for conversion (lead capture + monetization blocks + SEO metadata).
      </div>

      <h3>Fast action checklist</h3>
      <ol>
        {topic.checklist.map((i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            {i}
          </li>
        ))}
      </ol>

      <MonetizationBlock category={topic.affiliateCategory} />

      <h3>Get the full playbook</h3>
      <LeadForm topic={topic.slug} />

      <StickyCta />
    </main>
  );
}
