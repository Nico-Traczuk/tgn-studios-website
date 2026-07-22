import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import ScrollProgress from '@/components/ScrollProgress';
import Careers from '@/components/Careers';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Careers — TGN Studios',
  description:
    'Open roles across the TGN Studios portfolio. Join a team building companies that endure.',
};

export default function CareersPage() {
  return (
    <>
      <Nav />
      <ScrollProgress />
      <main>
        <Careers />
        <Footer />
      </main>
    </>
  );
}
