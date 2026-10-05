import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';
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

type GithubConfig = { token: string; repository: string; branch: string };

function githubConfig(): GithubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  return {
    token,
    repository: process.env.GITHUB_REPOSITORY ?? 'Nico-Traczuk/tgn-studios-website',
    branch: process.env.GITHUB_BRANCH ?? 'main',
  };
}

function usesGithub() {
  return process.env.VERCEL === '1';
}

async function githubContents(config: GithubConfig, filePath: string, init?: RequestInit) {
  const encoded = filePath.split('/').map(encodeURIComponent).join('/');
  const url = new URL(`https://api.github.com/repos/${config.repository}/contents/${encoded}`);
  if (!init?.method || init.method === 'GET') url.searchParams.set('ref', config.branch);
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  return response;
}

async function githubSha(config: GithubConfig, filePath: string) {
  const response = await githubContents(config, filePath);
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error('Could not reach GitHub to save this post.');
  const data = await response.json() as { sha?: string };
  return data.sha;
}

async function githubWrite(filePath: string, content: Buffer | string, message: string) {
  const config = githubConfig();
  if (!config) throw new Error('Set GITHUB_TOKEN so posts can be saved on the live site.');
  const sha = await githubSha(config, filePath);
  const body = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8');
  const response = await githubContents(config, filePath, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: body.toString('base64'),
      branch: config.branch,
      sha,
    }),
  });
  if (!response.ok) throw new Error('GitHub did not accept the saved post.');
}

async function githubRemove(filePath: string, message: string) {
  const config = githubConfig();
  if (!config) return;
  const sha = await githubSha(config, filePath);
  if (!sha) return;
  const response = await githubContents(config, filePath, {
    method: 'DELETE',
    body: JSON.stringify({ message, sha, branch: config.branch }),
  });
  if (!response.ok) throw new Error('GitHub did not remove the previous post file.');
}

export async function deletePost(slug: string) {
  const filename = `${slug}.md`;
  const repoPath = `content/insights/${filename}`;

  if (usesGithub()) {
    const config = githubConfig();
    if (!config) throw new Error('Set GITHUB_TOKEN so posts can be deleted on the live site.');
    const sha = await githubSha(config, repoPath);
    if (!sha) throw new Error('That post is already gone.');
    const response = await githubContents(config, repoPath, {
      method: 'DELETE',
      body: JSON.stringify({
        message: `Delete insight: ${slug}`,
        sha,
        branch: config.branch,
      }),
    });
    if (!response.ok) throw new Error('GitHub did not delete the post.');
    return 'github' as const;
  }

  const file = path.join(INSIGHTS_DIR, filename);
  if (!fs.existsSync(file)) throw new Error('That post is already gone.');
  fs.unlinkSync(file);
  return 'file' as const;
}

export async function savePost(post: StoredPost, previousSlug?: string) {
  const filename = `${post.slug}.md`;
  const contents = serializePost(post);
  const message = `${post.draft ? 'Save draft' : 'Publish'}: ${post.title}`;

  if (usesGithub()) {
    await githubWrite(`content/insights/${filename}`, contents, message);
    if (previousSlug && previousSlug !== post.slug) {
      await githubRemove(`content/insights/${previousSlug}.md`, `Remove previous file for ${post.title}`);
    }
    return 'github' as const;
  }

  fs.mkdirSync(INSIGHTS_DIR, { recursive: true });
  fs.writeFileSync(path.join(INSIGHTS_DIR, filename), contents, 'utf8');
  if (previousSlug && previousSlug !== post.slug) {
    const previous = path.join(INSIGHTS_DIR, `${previousSlug}.md`);
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

  if (usesGithub()) {
    await githubWrite(`public/insights/${name}`, bytes, `Add insight image ${name}`);
    return publicPath;
  }

  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  fs.writeFileSync(path.join(IMAGE_DIR, name), bytes);
  return publicPath;
}
