'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Services',   href: '#studio' },
  { label: 'Packages',   href: '#packages' },
  { label: 'Our Studio', href: '#partners' },
  { label: 'Philosophy', href: '#philosophy' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        background: scrolled ? 'rgba(26,16,7,0.97)' : 'var(--dark)',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.4)' : 'none',
        borderBottom: '1px solid rgba(240,232,218,0.07)',
      }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 h-16 transition-[background,box-shadow] duration-300"
    >
      {/* Logo */}
      <Link href="#hero" className="flex items-center gap-[10px] no-underline">
        <div
          style={{ border: '1.5px solid rgba(240,232,218,0.6)', color: 'var(--cream)', fontFamily: 'var(--font-cormorant)' }}
          className="w-[46px] h-9 rounded-sm flex items-center justify-center text-[13px] tracking-[0.05em]"
        >
          TGN
        </div>
        <div style={{ color: 'rgba(240,232,218,0.75)' }} className="text-[10px] font-medium tracking-[0.14em] uppercase leading-[1.4]">
          TGN<br />Studios
        </div>
      </Link>

      {/* Right: links + CTA */}
      <div className="flex items-center gap-8">
        <ul className="flex gap-7 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{ color: 'rgba(240,232,218,0.6)' }}
                className="text-[12.5px] font-normal tracking-[0.02em] no-underline hover:opacity-100 transition-opacity"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="#contact" className="btn-cta">
          Start a Project →
        </Link>
      </div>
    </nav>
  );
}
