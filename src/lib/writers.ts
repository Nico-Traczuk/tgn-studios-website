import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

/**
 * Only these two people can open /write.
 * The shared password lives in BLOG_EDITOR_PASSWORD, never in the repository.
 */
export const WRITERS = [
  { name: 'Darrel', email: 'darrel@tgnventures.vc' },
  { name: 'Amadeu', email: 'amadeu@tgnventures.vc' },
] as const;

export type Writer = (typeof WRITERS)[number];

const COOKIE = 'tgn_write';
const FOURTEEN_DAYS = 60 * 60 * 24 * 14;

export function writingConfigured() {
  return Boolean(process.env.BLOG_EDITOR_PASSWORD);
}

export function findWriter(email: string) {
  const normalized = email.trim().toLowerCase();
  return WRITERS.find((writer) => writer.email === normalized) ?? null;
}

export function passwordMatches(input: string) {
  const expected = process.env.BLOG_EDITOR_PASSWORD ?? '';
  if (!expected) return false;
  const actual = Buffer.from(input);
  const stored = Buffer.from(expected);
  if (actual.length !== stored.length) return false;
  return timingSafeEqual(actual, stored);
}

function sign(email: string) {
  const password = process.env.BLOG_EDITOR_PASSWORD;
  if (!password) throw new Error('Writing is not configured');
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + FOURTEEN_DAYS * 1000 })).toString('base64url');
  const signature = createHmac('sha256', password).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function readSessionToken(token: string | undefined) {
  const password = process.env.BLOG_EDITOR_PASSWORD;
  if (!token || !password) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = createHmac('sha256', password).update(payload).digest('base64url');
  const actual = Buffer.from(signature);
  const stored = Buffer.from(expected);
  if (actual.length !== stored.length || !timingSafeEqual(actual, stored)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { email?: string; exp?: number };
    if (!data.email || typeof data.exp !== 'number' || data.exp < Date.now()) return null;
    return findWriter(data.email);
  } catch {
    return null;
  }
}

export async function getWriterSession() {
  const store = await cookies();
  return readSessionToken(store.get(COOKIE)?.value);
}

export function sessionCookie(email: string) {
  return {
    name: COOKIE,
    value: sign(email),
    options: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: FOURTEEN_DAYS,
    },
  };
}

export const WRITE_COOKIE = COOKIE;
