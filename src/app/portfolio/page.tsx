import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import ScrollProgress from '@/components/ScrollProgress';
import Portfolio from '@/components/Portfolio';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Portfolio — TGN Studios',
  description:
    'Companies built by TGN Studios — from community platforms to operations software.',
};

export default function PortfolioPage() {
  return (
    <>
      <SiteNav />
      <ScrollProgress />
      <main>
        <Portfolio />
        <Footer />
      </main>
    </>
  );
}
