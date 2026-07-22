import type { Metadata } from 'next';
import Nav from '@/components/Nav';
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
      <Nav />
      <ScrollProgress />
      <main>
        <Portfolio />
        <Footer />
      </main>
    </>
  );
}
