import fs from 'fs';
import path from 'path';

/**
 * Insights posts are Markdown files in /content/insights.
 * To add one: copy an existing file, keep the filename equal to `slug`,
 * fill in the front matter, and set `draft: false` when it should go live.
 * Supported body syntax: headings, paragraphs, lists, links, emphasis, and tables.
 */

const INSIGHTS_DIR = path.join(process.cwd(), 'content/insights');

const REQUIRED_FIELDS = [
  'title',
  'seoTitle',
  'description',
  'slug',
  'category',
  'excerpt',
  'date',
  'author',
  'ctaLabel',
  'ctaHref',
] as const;

export type Insight = {
  title: string;
  seoTitle: string;
  description: string;
  slug: string;
  category: string;
  tags: string[];
  excerpt: string;
  date: string;
  author: string;
  ctaLabel: string;
  ctaHref: string;
  episode?: string;
  replay?: string;
  draft: boolean;
  body: string;
};

type FrontMatterValue = string | boolean | string[];

function unquote(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontMatter(source: string, fileName: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`Missing front matter in content/insights/${fileName}`);
  }

  const data: Record<string, FrontMatterValue> = {};
  let listKey: string | null = null;

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;

    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      const current = data[listKey];
      if (Array.isArray(current)) current.push(unquote(item[1]));
      continue;
    }

    const field = line.match(/^([A-Za-z0-9]+):\s*(.*)$/);
    if (!field) {
      throw new Error(`Could not read front matter in content/insights/${fileName}: "${line}"`);
    }

    const key = field[1];
    const raw = field[2].trim();
    if (raw === '') {
      data[key] = [];
      listKey = key;
      continue;
    }

    listKey = null;
    if (raw === 'true' || raw === 'false') data[key] = raw === 'true';
    else data[key] = unquote(raw);
  }

  return { data, body: match[2].trim() };
}

function requireString(data: Record<string, FrontMatterValue>, key: string, fileName: string) {
  const value = data[key];
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`content/insights/${fileName} is missing "${key}"`);
  }
  return value;
}

function loadInsight(fileName: string): Insight {
  const raw = fs.readFileSync(path.join(INSIGHTS_DIR, fileName), 'utf8');
  const { data, body } = parseFrontMatter(raw, fileName);

  for (const field of REQUIRED_FIELDS) {
    requireString(data, field, fileName);
  }

  const slug = requireString(data, 'slug', fileName);
  const expectedFile = `${slug}.md`;
  if (fileName !== expectedFile) {
    throw new Error(`content/insights/${fileName} must be named ${expectedFile} so it matches its slug`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`content/insights/${fileName} has an invalid slug "${slug}"`);
  }

  const date = requireString(data, 'date', fileName);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`content/insights/${fileName} has an invalid date "${date}". Use YYYY-MM-DD.`);
  }

  const ctaHref = requireString(data, 'ctaHref', fileName);
  if (!ctaHref.startsWith('https://')) {
    throw new Error(`content/insights/${fileName} ctaHref must be an https URL`);
  }

  const tags = data.tags;
  if (!Array.isArray(tags) || tags.length === 0 || tags.some((tag) => tag.length === 0)) {
    throw new Error(`content/insights/${fileName} needs at least one tag`);
  }

  const replay = typeof data.replay === 'string' ? data.replay : undefined;
  if (replay && !replay.startsWith('https://')) {
    throw new Error(`content/insights/${fileName} replay must be an https URL`);
  }

  if (!body) {
    throw new Error(`content/insights/${fileName} is missing an article body`);
  }

  return {
    title: requireString(data, 'title', fileName),
    seoTitle: requireString(data, 'seoTitle', fileName),
    description: requireString(data, 'description', fileName),
    slug,
    category: requireString(data, 'category', fileName),
    tags,
    excerpt: requireString(data, 'excerpt', fileName),
    date,
    author: requireString(data, 'author', fileName),
    ctaLabel: requireString(data, 'ctaLabel', fileName),
    ctaHref,
    episode: typeof data.episode === 'string' ? data.episode : undefined,
    replay,
    draft: data.draft === true,
    body,
  };
}

function loadInsights() {
  if (!fs.existsSync(INSIGHTS_DIR)) return [];

  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(loadInsight)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

export function getPublishedInsights() {
  return loadInsights().filter((post) => !post.draft);
}

export function getPublishedInsight(slug: string) {
  return getPublishedInsights().find((post) => post.slug === slug);
}

export function formatInsightDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
