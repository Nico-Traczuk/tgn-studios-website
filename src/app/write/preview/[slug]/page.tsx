import { notFound, redirect } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import ScrollProgress from '@/components/ScrollProgress';
import InsightArticle from '@/components/InsightArticle';
import Footer from '@/components/Footer';
import { getInsight } from '@/lib/insights';
import { getWriterSession } from '@/lib/writers';

export const dynamic = 'force-dynamic';

export default async function PreviewPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const writer = await getWriterSession();
  if (!writer) redirect(`/login?next=${encodeURIComponent(`/write/preview/${slug}`)}`);
  const post = getInsight(slug);
  if (!post) notFound();

  return (
    <>
      <SiteNav />
      <ScrollProgress />
      <main>
        <InsightArticle post={post} />
        <Footer />
      </main>
    </>
  );
}
