import { NextResponse } from 'next/server';
import { findWriter, passwordMatches, sessionCookie, writingConfigured } from '@/lib/writers';

export async function POST(request: Request) {
  if (!writingConfigured()) {
    return NextResponse.json({ error: 'Writing is not configured yet.' }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown } | null;
  const email = typeof body?.email === 'string' ? body.email : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const writer = findWriter(email);

  if (!writer || !passwordMatches(password)) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return NextResponse.json({ error: 'Those details are not recognized.' }, { status: 401 });
  }

  const cookie = sessionCookie(writer.email);
  const response = NextResponse.json({ name: writer.name });
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
