import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';
import { BlobNotFoundError, del, get, list, put } from '@vercel/blob';
import type { Insight } from '@/lib/insights';

const INSIGHTS_DIR = path.join(process.cwd(), 'content/insights');
const IMAGE_DIR = path.join(process.cwd(), 'public/insights');

export type StoredPost = Omit<Insight, 'format'> & { format: 'html' };

function quote(value: string) {
  return JSON.stringify(value);
}

export function serializePost(post: StoredPost) {
  const lines = [
    '---',
    `title: ${quote(post.title)}`,
    `seoTitle: ${quote(post.seoTitle)}`,
    `description: ${quote(post.description)}`,
    `slug: ${post.slug}`,
    `category: ${quote(post.category)}`,
    'tags:',
    ...post.tags.map((tag) => `  - ${quote(tag)}`),
    `excerpt: ${quote(post.excerpt)}`,
    `date: ${post.date}`,
    `author: ${quote(post.author)}`,
    `ctaLabel: ${quote(post.ctaLabel)}`,
    `ctaHref: ${quote(post.ctaHref)}`,
  ];
  if (post.episode) lines.push(`episode: ${quote(post.episode)}`);
  if (post.replay) lines.push(`replay: ${quote(post.replay)}`);
  lines.push('format: html', `draft: ${post.draft ? 'true' : 'false'}`, '---', '', post.body.trim(), '');
  return lines.join('\n');
}

const POST_PREFIX = 'insights/posts/';
const DELETED_PREFIX = 'insights/deleted/';

export function usesProjectStore() {
  return process.env.VERCEL === '1';
}

function assertStore() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('In Vercel, open Storage, create a Blob store, and connect it to this project. The site then saves posts itself.');
  }
}

function postPath(slug: string) {
  return `${POST_PREFIX}${slug}.md`;
}

function deletedPath(slug: string) {
  return `${DELETED_PREFIX}${slug}`;
}

function fileFor(slug: string) {
  return path.join(INSIGHTS_DIR, `${slug}.md`);
}

async function listPathnames(prefix: string) {
  const pathnames: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    pathnames.push(...page.blobs.map((blob) => blob.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return pathnames;
}

async function readPrivate(pathname: string) {
  const result = await get(pathname, { access: 'private', useCache: false });
  if (!result || result.statusCode !== 200) return null;
  return new Response(result.stream).text();
}

export async function storedInsights() {
  assertStore();
  const [postNames, deletedNames] = await Promise.all([
    listPathnames(POST_PREFIX),
    listPathnames(DELETED_PREFIX),
  ]);
  const posts = (await Promise.all(postNames.map(async (pathname) => {
    const source = await readPrivate(pathname);
    if (!source) return null;
    const fileName = pathname.slice(POST_PREFIX.length);
    return { fileName, source };
  }))).filter((item): item is { fileName: string; source: string } => item !== null);

  const deleted = deletedNames.map((pathname) => pathname.slice(DELETED_PREFIX.length)).filter(Boolean);
  return { posts, deleted };
}

export async function deletePost(slug: string) {
  const file = fileFor(slug);
  if (!usesProjectStore()) {
    if (!fs.existsSync(file)) throw new Error('That post is already gone.');
    fs.unlinkSync(file);
    return 'file' as const;
  }

  assertStore();
  const stored = await readPrivate(postPath(slug));
  const onDisk = fs.existsSync(file);
  if (!stored && !onDisk) throw new Error('That post is already gone.');
  if (stored) await del(postPath(slug));
  if (onDisk) {
    await put(deletedPath(slug), '1', {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'text/plain',
    });
  }
  return 'store' as const;
}

export async function savePost(post: StoredPost, previousSlug?: string) {
  const contents = serializePost(post);

  if (usesProjectStore()) {
    assertStore();
    await put(postPath(post.slug), contents, {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'text/markdown',
    });
    try {
      await del(deletedPath(post.slug));
    } catch (error) {
      if (!(error instanceof BlobNotFoundError)) throw error;
    }
    if (previousSlug && previousSlug !== post.slug) await deletePost(previousSlug);
    return 'store' as const;
  }

  fs.mkdirSync(INSIGHTS_DIR, { recursive: true });
  fs.writeFileSync(fileFor(post.slug), contents, 'utf8');
  if (previousSlug && previousSlug !== post.slug) {
    const previous = fileFor(previousSlug);
    if (fs.existsSync(previous)) fs.unlinkSync(previous);
  }
  return 'file' as const;
}

const IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export function imageExtension(type: string) {
  return IMAGE_TYPES[type];
}

export async function saveImage(bytes: Buffer, extension: string) {
  const name = `${Date.now().toString(36)}-${randomBytes(4).toString('hex')}.${extension}`;
  const publicPath = `/insights/${name}`;

  if (usesProjectStore()) {
    assertStore();
    const type = Object.entries(IMAGE_TYPES).find(([, value]) => value === extension)?.[0] ?? 'application/octet-stream';
    const blob = await put(`insights/images/${name}`, bytes, {
      access: 'public',
      addRandomSuffix: false,
      contentType: type,
    });
    return blob.url;
  }

  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  fs.writeFileSync(path.join(IMAGE_DIR, name), bytes);
  return publicPath;
}
