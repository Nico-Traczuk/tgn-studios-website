import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import ScrollProgress from '@/components/ScrollProgress';
import Insights from '@/components/Insights';
import Footer from '@/components/Footer';
import { getPublishedInsights } from '@/lib/insights';

export const metadata: Metadata = {
  title: 'Insights — TGN Studios',
  description: 'Practical notes from TGN Studios for founders turning an MVP into the next build.',
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  const posts = getPublishedInsights();

  return (
    <>
      <Nav />
      <ScrollProgress />
      <main>
        <Insights posts={posts} />
        <Footer />
      </main>
    </>
  );
}
