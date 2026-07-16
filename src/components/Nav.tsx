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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map(l => l.href.slice(1));
    const track = () => {
      if (window.scrollY < 80) { setActiveSection(''); return; }
      let active = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) active = id;
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', track, { passive: true });
    track();
    return () => window.removeEventListener('scroll', track);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      aria-label="Main navigation"
      style={{
        background: 'rgba(26,16,7,0.97)',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.4)' : '0 1px 0 rgba(240,232,218,0.08)',
        borderBottom: 'none',
      }}
      className="fixed top-0 left-0 right-0 z-[100] transition-[background,box-shadow] duration-300 relative"
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-5 md:px-12 h-14 md:h-16">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-[10px] no-underline" onClick={closeMenu}>
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

        {/* Desktop: links + CTA */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-7 list-none m-0 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`nav-link text-[12.5px] font-normal tracking-[0.02em]${activeSection === l.href.slice(1) ? ' active' : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="#book" className="btn-cta">
            Book a Discovery Call →
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col gap-[5px] p-3 bg-transparent border-none cursor-pointer"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            style={{ background: 'rgba(240,232,218,0.75)' }}
            className={`block h-[1.5px] w-5 transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`}
          />
          <span
            style={{ background: 'rgba(240,232,218,0.75)' }}
            className={`block h-[1.5px] w-3.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            style={{ background: 'rgba(240,232,218,0.75)' }}
            className={`block h-[1.5px] w-5 transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26,16,7,0.98)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
        }}
        className="md:hidden"
      >
        {/* Top bar inside overlay: logo + close button */}
        <div className="flex items-center justify-between px-5 h-14 flex-shrink-0">
          <Link href="#hero" className="flex items-center gap-[10px] no-underline" onClick={closeMenu}>
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
          <button
            onClick={closeMenu}
            className="bg-transparent border-none cursor-pointer p-3 flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4L16 16M16 4L4 16" stroke="rgba(240,232,218,0.75)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Links */}
        <div style={{ borderTop: '1px solid rgba(240,232,218,0.07)' }} className="flex flex-col flex-1">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              style={{
                color: activeSection === l.href.slice(1) ? 'rgba(240,232,218,0.96)' : 'rgba(240,232,218,0.65)',
                borderBottom: '1px solid rgba(240,232,218,0.05)',
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.35s ease ${i * 0.05 + 0.1}s, opacity 0.35s ease ${i * 0.05 + 0.1}s`,
              }}
              className="px-6 py-5 text-[15px] tracking-[0.02em] no-underline"
            >
              {l.label}
            </Link>
          ))}
          <div
            style={{
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.35s ease 0.35s, opacity 0.35s ease 0.35s`,
            }}
            className="px-6 py-5"
          >
            <Link href="#book" className="btn-cta w-full justify-center" onClick={closeMenu}>
              Book a Discovery Call →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
