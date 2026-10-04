import { NextResponse } from 'next/server';
import { WRITE_COOKIE } from '@/lib/writers';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(WRITE_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
