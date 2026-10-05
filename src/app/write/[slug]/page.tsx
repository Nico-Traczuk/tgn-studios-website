import { notFound, redirect } from 'next/navigation';
import PostEditor, { type EditorDraft } from '@/components/PostEditor';
import { BOOKING_URL } from '@/config';
import { getInsight } from '@/lib/insights';
import { markdownToHtml } from '@/lib/markdown-html';
import { sanitizePostHtml } from '@/lib/sanitize-post';
import { getWriterSession } from '@/lib/writers';

export const dynamic = 'force-dynamic';

function today() {
  return new Date().toISOString().slice(0, 10);
}

function blankPost(): EditorDraft {
  return {
    originalSlug: null,
    title: '',
    seoTitle: '',
    description: '',
    slug: '',
    category: 'Product Development',
    tags: '',
    excerpt: '',
    date: today(),
    author: 'TGN Studios',
    ctaLabel: 'Book a conversation with TGN Studios',
    ctaHref: BOOKING_URL,
    episode: '',
    replay: '',
    draft: true,
    html: '<p></p>',
  };
}

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const writer = await getWriterSession();
  if (!writer) redirect(`/login?next=${encodeURIComponent(`/write/${slug}`)}`);
  if (slug === 'new') return <PostEditor writerName={writer.name} initial={blankPost()} />;

  const post = await getInsight(slug);
  if (!post) notFound();

  const html = sanitizePostHtml(post.format === 'html' ? post.body : markdownToHtml(post.body));
  const initial: EditorDraft = {
    originalSlug: post.slug,
    title: post.title,
    seoTitle: post.seoTitle,
    description: post.description,
    slug: post.slug,
    category: post.category,
    tags: post.tags.join(', '),
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    ctaLabel: post.ctaLabel,
    ctaHref: post.ctaHref,
    episode: post.episode ?? '',
    replay: post.replay ?? '',
    draft: post.draft,
    html,
  };

  return <PostEditor writerName={writer.name} initial={initial} />;
}
