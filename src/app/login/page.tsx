import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import WriteLogin from '@/components/WriteLogin';
import { safeNextPath } from '@/lib/next-path';
import { getWriterSession, writingConfigured } from '@/lib/writers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sign in — TGN Studios',
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const writer = await getWriterSession();
  const params = await searchParams;
  const nextPath = safeNextPath(params.next, '/');
  if (writer) redirect(nextPath);

  return (
    <div className="write-login login-page">
      <SiteNav />
      <WriteLogin configured={writingConfigured()} nextPath={nextPath} />
    </div>
  );
}
