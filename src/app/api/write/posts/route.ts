import { NextResponse } from 'next/server';
import { BOOKING_URL } from '@/config';
import { getInsight, isValidSlug } from '@/lib/insights';
import { deletePost, savePost } from '@/lib/post-store';
import { htmlHasContent, sanitizePostHtml } from '@/lib/sanitize-post';
import { getWriterSession } from '@/lib/writers';

type Payload = {
  originalSlug?: unknown;
  draft?: unknown;
  title?: unknown;
  seoTitle?: unknown;
  description?: unknown;
  slug?: unknown;
  category?: unknown;
  tags?: unknown;
  excerpt?: unknown;
  date?: unknown;
  author?: unknown;
  ctaLabel?: unknown;
  ctaHref?: unknown;
  episode?: unknown;
  replay?: unknown;
  html?: unknown;
};

function text(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  const writer = await getWriterSession();
  if (!writer) return NextResponse.json({ error: 'Sign in to save a post.' }, { status: 401 });

  const body = await request.json().catch(() => null) as Payload | null;
  if (!body) return NextResponse.json({ error: 'The post could not be read.' }, { status: 400 });

  const draft = body.draft !== false;
  const title = text(body.title);
  const slug = text(body.slug);
  const originalSlug = text(body.originalSlug);
  const tags = Array.isArray(body.tags)
    ? body.tags.filter((tag): tag is string => typeof tag === 'string').map((tag) => tag.trim()).filter(Boolean)
    : [];

  if (!title) return NextResponse.json({ error: 'Add a title before saving.' }, { status: 400 });
  if (!isValidSlug(slug) || slug === 'new') {
    return NextResponse.json({ error: 'Use a slug made of lowercase words separated by hyphens.' }, { status: 400 });
  }

  const excerpt = text(body.excerpt) || title;
  const description = text(body.description) || excerpt;
  const seoTitle = text(body.seoTitle) || title;
  const category = text(body.category) || 'Product Development';
  const date = text(body.date);
  const author = text(body.author) || 'TGN Studios';
  const ctaLabel = text(body.ctaLabel) || 'Book a conversation with TGN Studios';
  const ctaHref = text(body.ctaHref) || BOOKING_URL;
  const episode = text(body.episode);
  const replay = text(body.replay);
  const html = sanitizePostHtml(typeof body.html === 'string' ? body.html : '');

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Use a publication date in YYYY-MM-DD format.' }, { status: 400 });
  }
  if (!ctaHref.startsWith('https://')) {
    return NextResponse.json({ error: 'The booking link must start with https://.' }, { status: 400 });
  }
  if (replay && !replay.startsWith('https://')) {
    return NextResponse.json({ error: 'The replay link must start with https://.' }, { status: 400 });
  }
  if (!draft) {
    if (!excerpt || !category || tags.length === 0 || !htmlHasContent(html)) {
      return NextResponse.json({ error: 'Add the excerpt, a tag, and some article text before publishing.' }, { status: 400 });
    }
  }

  const existing = await getInsight(slug);
  if (existing && slug !== originalSlug) {
    return NextResponse.json({ error: 'Another post already uses that slug.' }, { status: 409 });
  }

  try {
    const via = await savePost({
      title,
      seoTitle,
      description,
      slug,
      category,
      tags: tags.length > 0 ? tags : ['Insights'],
      excerpt,
      date,
      author,
      ctaLabel,
      ctaHref,
      episode: episode || undefined,
      replay: replay || undefined,
      draft,
      format: 'html',
      body: html || '<p></p>',
    }, originalSlug || undefined);
    return NextResponse.json({ slug, draft, via });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The post could not be saved.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const writer = await getWriterSession();
  if (!writer) return NextResponse.json({ error: 'Sign in to delete a post.' }, { status: 401 });

  const body = await request.json().catch(() => null) as { slug?: unknown } | null;
  const slug = text(body?.slug);
  if (!isValidSlug(slug) || slug === 'new') {
    return NextResponse.json({ error: 'That post could not be found.' }, { status: 400 });
  }
  if (!(await getInsight(slug))) {
    return NextResponse.json({ error: 'That post could not be found.' }, { status: 404 });
  }

  try {
    const via = await deletePost(slug);
    return NextResponse.json({ slug, via });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The post could not be deleted.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
