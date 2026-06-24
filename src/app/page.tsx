import Nav from '@/components/Nav';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Studio from '@/components/Studio';
import Packages from '@/components/Packages';
import Partners from '@/components/Partners';
import Why from '@/components/Why';
import Philosophy from '@/components/Philosophy';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Studio />
        <Packages />
        <Partners />
        <Why />
        <Philosophy />
        <Footer />
      </main>
    </>
  );
}
