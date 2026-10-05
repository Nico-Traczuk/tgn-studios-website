'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeletePostButton({
  slug,
  title,
  className,
  onError,
}: {
  slug: string;
  title: string;
  className?: string;
  onError?: (message: string) => void;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function remove() {
    if (pending) return;
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;

    setPending(true);
    const response = await fetch('/api/write/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    const payload = await response.json().catch(() => ({}));
    if (response.status === 401) {
      window.location.href = '/write';
      return;
    }
    if (!response.ok) {
      setPending(false);
      const message = typeof payload.error === 'string' ? payload.error : 'The post could not be deleted.';
      if (onError) onError(message);
      else window.alert(message);
      return;
    }
    router.push('/write');
    router.refresh();
  }

  return (
    <button type="button" className={className} disabled={pending} onClick={remove}>
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}
