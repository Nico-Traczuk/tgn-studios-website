import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config';
import { getPublishedInsights } from '@/lib/insights';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedInsights().map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/insights`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/referral`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/careers`, changeFrequency: 'monthly', priority: 0.5 },
    ...posts,
  ];
}
