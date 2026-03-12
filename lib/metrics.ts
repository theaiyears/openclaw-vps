import { readEvents } from './events';

export async function getMetricsSummary() {
  const events = await readEvents();
  const leads = events.filter((e) => e.type === 'lead');
  const clicks = events.filter((e) => e.type === 'click');

  const leadsByTopic: Record<string, number> = {};
  const clicksByTopic: Record<string, number> = {};
  const leadsByVariant: Record<string, number> = {};

  for (const l of leads) {
    const topic = String(l.payload.topic || 'unknown');
    leadsByTopic[topic] = (leadsByTopic[topic] || 0) + 1;
    const variant = String(l.payload.variant || 'unknown');
    leadsByVariant[variant] = (leadsByVariant[variant] || 0) + 1;
  }

  for (const c of clicks) {
    const topic = String(c.payload.topicSlug || 'unknown');
    clicksByTopic[topic] = (clicksByTopic[topic] || 0) + 1;
  }

  return {
    totals: { leads: leads.length, clicks: clicks.length },
    leadsByTopic,
    clicksByTopic,
    leadsByVariant,
    conversionRate: leads.length ? Number((clicks.length / leads.length).toFixed(2)) : 0
  };
}
