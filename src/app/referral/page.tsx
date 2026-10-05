import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import ScrollProgress from '@/components/ScrollProgress';
import Referral from '@/components/Referral';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Referral Program — TGN Studios',
  description:
    'Refer a client to TGN Studios and earn 20% of the revenue from their initial engagement.',
};

export default function ReferralPage() {
  return (
    <>
      <SiteNav />
      <ScrollProgress />
      <main>
        <Referral />
        <Footer />
      </main>
    </>
  );
}
