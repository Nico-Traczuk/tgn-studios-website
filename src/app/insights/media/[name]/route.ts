import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { get } from '@vercel/blob';

const NAME = /^[a-z0-9]+-[a-f0-9]+\.(jpg|png|webp|gif)$/;

const TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
};

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!NAME.test(name)) return new NextResponse(null, { status: 404 });

  const local = path.join(process.cwd(), 'public/insights', name);
  if (fs.existsSync(local)) {
    const extension = name.slice(name.lastIndexOf('.') + 1);
    return new NextResponse(new Uint8Array(fs.readFileSync(local)), {
      headers: {
        'Content-Type': TYPES[extension] ?? 'application/octet-stream',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  if (process.env.VERCEL !== '1') return new NextResponse(null, { status: 404 });

  const result = await get(`insights/images/${name}`, { access: 'private', useCache: false });
  if (!result || result.statusCode !== 200) return new NextResponse(null, { status: 404 });

  return new NextResponse(result.stream, {
    headers: {
      'Content-Type': result.blob.contentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
