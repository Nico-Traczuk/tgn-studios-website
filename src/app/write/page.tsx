import { redirect } from 'next/navigation';
import WriteDesk from '@/components/WriteDesk';
import { getAllInsights } from '@/lib/insights';
import { getWriterSession } from '@/lib/writers';

export const dynamic = 'force-dynamic';

export default async function WritePage() {
  const writer = await getWriterSession();
  if (!writer) redirect('/login?next=/write');

  const posts = (await getAllInsights()).map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    draft: post.draft,
    category: post.category,
  }));

  return <WriteDesk name={writer.name} posts={posts} />;
}
