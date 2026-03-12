import { notFound } from 'next/navigation';
import { getTopic, topics } from '../../../lib/topics';
import { LeadForm } from '../../../components/LeadForm';
import { MonetizationBlock } from '../../../components/MonetizationBlock';

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic) return notFound();

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: 24 }}>
      <h1>{topic.title}</h1>
      <p style={{ opacity: 0.9 }}>{topic.summary}</p>
      <p style={{ opacity: 0.75 }}>Intent: {topic.intent} • CPC hint: {topic.cpcHint}</p>

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
    </main>
  );
}
