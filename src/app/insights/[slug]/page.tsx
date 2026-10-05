import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import ScrollProgress from '@/components/ScrollProgress';
import InsightArticle from '@/components/InsightArticle';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/config';
import { getPublishedInsight, getPublishedInsights } from '@/lib/insights';
import { getWriterSession } from '@/lib/writers';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedInsights().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedInsight(slug);
  if (!post) return {};

  return {
    title: post.seoTitle,
    description: post.description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      type: 'article',
      url: `/insights/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary',
      title: post.seoTitle,
      description: post.description,
    },
  };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedInsight(slug);
  if (!post) notFound();
  const writer = await getWriterSession();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TGN Studios',
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/insights/${post.slug}`,
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <SiteNav />
      <ScrollProgress />
      <main>
        <InsightArticle post={post} editHref={writer ? `/write/${post.slug}` : undefined} />
        <Footer />
      </main>
    </>
  );
}
