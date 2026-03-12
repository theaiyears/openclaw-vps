import { notFound } from 'next/navigation';
import { topics } from '../../../lib/topics';
import { LeadForm } from '../../../components/LeadForm';
export function generateStaticParams(){return topics.map(t=>({slug:t.slug}));}
export default function TopicPage({params}:{params:{slug:string}}){const topic=topics.find(t=>t.slug===params.slug);if(!topic)return notFound();return <main style={{maxWidth:860,margin:'0 auto',padding:24}}><h1>{topic.title}</h1><p style={{opacity:.9}}>{topic.summary}</p><h3>Fast action checklist</h3><ol>{topic.checklist.map(i=><li key={i} style={{marginBottom:6}}>{i}</li>)}</ol><h3>Get the full playbook</h3><LeadForm topic={topic.slug}/></main>}
