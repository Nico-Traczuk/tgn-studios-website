import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import ScrollProgress from '@/components/ScrollProgress';
import Insights from '@/components/Insights';
import Footer from '@/components/Footer';
import { getPublishedInsights } from '@/lib/insights';
import { getWriterSession } from '@/lib/writers';

export const metadata: Metadata = {
  title: 'Insights — TGN Studios',
  description: 'Practical notes from TGN Studios for founders turning an MVP into the next build.',
  alternates: { canonical: '/insights' },
};

export default async function InsightsPage() {
  const posts = getPublishedInsights();
  const writer = await getWriterSession();

  return (
    <>
      <SiteNav />
      <ScrollProgress />
      <main>
        <Insights posts={posts} canEdit={Boolean(writer)} />
        <Footer />
      </main>
    </>
  );
}
