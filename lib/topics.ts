export type Topic = {
  slug: string;
  title: string;
  intent: string;
  summary: string;
  checklist: string[];
  cpcHint: string;
  affiliateCategory: 'software' | 'education' | 'creator-tools';
  tags: string[];
};

export const topics: Topic[] = [
  {
    slug: 'best-ai-side-hustles-2026',
    title: 'Best AI Side Hustles in 2026',
    intent: 'Informational + affiliate',
    summary:
      'Practical AI side hustles with startup cost, difficulty, and first-sale timeline.',
    checklist: [
      'Choose one niche',
      'Validate audience pain',
      'Ship a landing page in 24h',
      'Collect 20 lead emails'
    ],
    cpcHint: '$3.50-$12.00',
    affiliateCategory: 'software',
    tags: ['ai', 'side-hustle', 'monetization']
  },
  {
    slug: 'faceless-youtube-tools',
    title: 'Faceless YouTube Tools That Actually Save Time',
    intent: 'Commercial investigation',
    summary:
      'Compares script, voice, and editing tools with practical workflow stacks.',
    checklist: [
      'Pick one workflow',
      'Batch-produce 5 shorts',
      'Cross-post to 3 channels',
      'Measure CTR + retention'
    ],
    cpcHint: '$2.00-$9.00',
    affiliateCategory: 'creator-tools',
    tags: ['youtube', 'creator', 'automation']
  },
  {
    slug: 'viral-content-hooks-library',
    title: 'Viral Content Hooks Library',
    intent: 'Template/search traffic',
    summary: 'Copy-paste hook formulas grouped by platform, niche, and goal.',
    checklist: [
      'Pick 10 hooks',
      'Customize with niche words',
      'Post daily for 7 days',
      'Keep top 20% performers'
    ],
    cpcHint: '$1.20-$4.80',
    affiliateCategory: 'education',
    tags: ['content', 'hooks', 'growth']
  }
];

export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug);
}

export function getRelatedTopics(slug: string, limit = 2) {
  const current = getTopic(slug);
  if (!current) return topics.slice(0, limit);

  const scored = topics
    .filter((t) => t.slug !== slug)
    .map((t) => {
      const sharedTags = t.tags.filter((tag) => current.tags.includes(tag)).length;
      const categoryBonus = t.affiliateCategory === current.affiliateCategory ? 1 : 0;
      return { topic: t, score: sharedTags * 2 + categoryBonus };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.topic);

  return scored;
}
