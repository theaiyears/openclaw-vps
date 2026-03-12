import fs from 'fs';
import path from 'path';

const p = path.join(process.cwd(), 'data', 'events.jsonl');
if (!fs.existsSync(p)) {
  console.log('No events yet.');
  process.exit(0);
}

const rows = fs.readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const leads = rows.filter((r) => r.type === 'lead');
const clicks = rows.filter((r) => r.type === 'click');

const byTopic = new Map();
for (const r of rows) {
  const topic = r.payload.topic || r.payload.topicSlug || 'unknown';
  const curr = byTopic.get(topic) || { leads: 0, clicks: 0 };
  if (r.type === 'lead') curr.leads += 1;
  if (r.type === 'click') curr.clicks += 1;
  byTopic.set(topic, curr);
}

console.log('=== TrendForge Metrics ===');
console.log(`Leads: ${leads.length}`);
console.log(`Clicks: ${clicks.length}`);
console.log('By topic:');
for (const [topic, v] of byTopic.entries()) {
  console.log(`- ${topic}: leads=${v.leads}, clicks=${v.clicks}`);
}
