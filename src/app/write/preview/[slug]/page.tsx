import { notFound, redirect } from 'next/navigation';
import Nav from '@/components/Nav';
import ScrollProgress from '@/components/ScrollProgress';
import InsightArticle from '@/components/InsightArticle';
import Footer from '@/components/Footer';
import { getInsight } from '@/lib/insights';
import { getWriterSession } from '@/lib/writers';

export const dynamic = 'force-dynamic';

export default async function PreviewPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const writer = await getWriterSession();
  if (!writer) redirect('/write');

  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <ScrollProgress />
      <main>
        <InsightArticle post={post} />
        <Footer />
      </main>
    </>
  );
}
