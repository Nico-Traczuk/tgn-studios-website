import { NextResponse } from 'next/server';
import { getWriterSession } from '@/lib/writers';
import { imageExtension, saveImage } from '@/lib/post-store';

const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request) {
  const writer = await getWriterSession();
  if (!writer) return NextResponse.json({ error: 'Sign in to upload an image.' }, { status: 401 });

  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 });
  }

  const extension = imageExtension(file.type);
  if (!extension) {
    return NextResponse.json({ error: 'Use a JPEG, PNG, WebP, or GIF image.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Images need to be 4 MB or smaller.' }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  try {
    const url = await saveImage(bytes, extension);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The image could not be saved.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
