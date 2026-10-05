import SiteNav from '@/components/SiteNav';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Studio from '@/components/Studio';
import Packages from '@/components/Packages';
import Partners from '@/components/Partners';
import Why from '@/components/Why';
import Philosophy from '@/components/Philosophy';
import BookCall from '@/components/BookCall';
import ReferralTeaser from '@/components/ReferralTeaser';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <SiteNav />
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Studio />
        <Packages />
        <Partners />
        <Why />
        <Philosophy />
        <BookCall />
        <ReferralTeaser />
        <Footer />
      </main>
    </>
  );
}
