'use client';

import Link from 'next/link';

export default function WriteHeader({ name }: { name?: string }) {
  async function logout() {
    await fetch('/api/write/logout', { method: 'POST' });
    window.location.href = '/';
  }

  return (
    <header className="write-header">
      <Link href="/" className="write-brand">TGN Studios</Link>
      <span className="write-brand-mark">Write</span>
      <div className="write-header-actions">
        {name ? <Link href="/write">All posts</Link> : null}
        {name ? <span>{name}</span> : null}
        {name ? (
          <button type="button" onClick={logout}>Log out</button>
        ) : null}
      </div>
    </header>
  );
}
