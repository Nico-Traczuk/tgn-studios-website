'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WriteLogin({ configured, nextPath = '/' }: { configured: boolean; nextPath?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError('');
    const response = await fetch('/api/write/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => ({}));
    setPending(false);
    if (!response.ok) {
      setError(typeof data.error === 'string' ? data.error : 'Those details are not recognized.');
      return;
    }
    router.push(nextPath);
    router.refresh();
  }

  return (
    <form className="write-login-card" onSubmit={onSubmit}>
        <p className="write-kicker">Studio writing</p>
        <h1>Sign in to write</h1>
        <p>This desk is only for the two people who publish Insights.</p>
        {configured ? null : (
          <p className="write-note">Add BLOG_EDITOR_PASSWORD to .env.local, then restart the server.</p>
        )}
        <label>
          Email
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error ? <p className="write-error">{error}</p> : null}
        <button className="btn-cta" type="submit" disabled={pending || !configured}>
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
    </form>
  );
}
