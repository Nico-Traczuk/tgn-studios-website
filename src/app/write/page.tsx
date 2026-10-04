import WriteDesk from '@/components/WriteDesk';
import WriteLogin from '@/components/WriteLogin';
import { getAllInsights } from '@/lib/insights';
import { getWriterSession, writingConfigured } from '@/lib/writers';

export const dynamic = 'force-dynamic';

export default async function WritePage() {
  const writer = await getWriterSession();
  if (!writer) return <WriteLogin configured={writingConfigured()} />;

  const posts = getAllInsights().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    draft: post.draft,
    category: post.category,
  }));

  return <WriteDesk name={writer.name} posts={posts} />;
}
