import type { MetadataRoute } from 'next';
import { topics } from '../lib/topics';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 }
  ];
  const topicRoutes = topics.map((t) => ({
    url: `${base}/topic/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8
  }));
  return [...staticRoutes, ...topicRoutes];
}
