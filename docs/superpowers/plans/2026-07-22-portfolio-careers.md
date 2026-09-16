# Portfolio & Careers Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/portfolio` and `/careers` pages to the TGN Studios website, wire them into the Nav and Footer, and save the Loop screenshot asset.

**Architecture:** Two new Next.js App Router page routes, each with a dedicated full-section component following the exact same patterns as existing components (ScrollReveal, sec-label, CSS variables, inline styles). Nav gains `usePathname()` to support both hash-anchor and page-route active states. No new CSS classes — everything reuses globals.css.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS (utility classes only where needed), ImageMagick (for asset prep)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `public/loop-preview.png` | Loop website screenshot (visual for portfolio card) |
| Create | `src/components/Portfolio.tsx` | Portfolio page hero + company cards |
| Create | `src/app/portfolio/page.tsx` | Route entry + metadata |
| Create | `src/components/Careers.tsx` | Careers page hero + empty state |
| Create | `src/app/careers/page.tsx` | Route entry + metadata |
| Modify | `src/components/Nav.tsx` | Add Portfolio/Careers links; pathname-aware active state; fix hash links to `/#hash` format |
| Modify | `src/components/Footer.tsx` | Add Portfolio and Careers footer links |

---

## Task 1: Save Loop Preview Image

**Files:**
- Create: `public/loop-preview.png`

- [ ] **Step 1: Copy and crop the screenshot**

Run (the screenshot was already captured in `/tmp/loop-screenshot.png`):
```bash
magick /tmp/loop-screenshot.png \
  -crop 1440x600+0+0 +repage \
  public/loop-preview.png
```
Expected: `public/loop-preview.png` created (~200–400 KB).

- [ ] **Step 2: Verify the file**

Run:
```bash
identify public/loop-preview.png
```
Expected output contains: `PNG 1440x600`

- [ ] **Step 3: Commit**

```bash
git add public/loop-preview.png
git commit -m "feat: add Loop website preview image for portfolio page"
```

---

## Task 2: Build Portfolio Component

**Files:**
- Create: `src/components/Portfolio.tsx`

- [ ] **Step 1: Create the component**

Write `src/components/Portfolio.tsx` with this exact content:

```tsx
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

const companies = [
  {
    name: 'Loop',
    tagline: 'A private space for your closest people.',
    description:
      'No followers. No likes. Just connection. Loop is the home for the relationships that matter most.',
    tags: ['Community', 'App'],
    url: 'https://ourloop.life/',
    visual: 'screenshot' as const,
  },
  {
    name: 'SereneOS',
    tagline: 'Calm, structured ops for growing teams.',
    description:
      'An operations platform built for clarity — helping founders run their companies without the chaos.',
    tags: ['Operations', 'Platform'],
    url: 'https://sereneos.co',
    visual: 'brand' as const,
  },
];

const tagStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '4px 10px',
  background: 'rgba(59,41,33,0.08)',
  color: 'var(--muted-dark)',
};

const visitLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '11px 24px',
  border: '1px solid rgba(59,41,33,0.22)',
  color: 'var(--dark)',
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.04em',
  textDecoration: 'none',
  transition: 'border-color 0.2s, background 0.2s',
};

export default function Portfolio() {
  return (
    <section
      style={{
        background: 'var(--dark)',
        paddingTop: '140px',
        paddingBottom: '110px',
        paddingLeft: '48px',
        paddingRight: '48px',
      }}
    >
      {/* Hero */}
      <div style={{ maxWidth: '900px', marginBottom: '80px' }}>
        <ScrollReveal>
          <div className="sec-label" style={{ color: 'rgba(240,232,218,0.45)' }}>
            <span className="sec-label-num">01</span>
            <span className="sec-label-line" />
            Portfolio
          </div>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(52px, 5.5vw, 80px)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: 'var(--cream)',
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}
          >
            What We&apos;ve Built
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(240,232,218,0.5)',
              lineHeight: 1.7,
              maxWidth: '560px',
            }}
          >
            Every company in our portfolio starts with a conviction and a team willing to
            build toward it.
          </p>
        </ScrollReveal>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2px',
          background: 'rgba(240,232,218,0.06)',
        }}
      >
        {companies.map((c, i) => (
          <ScrollReveal key={c.name} delay={(i === 0 ? 0 : 1) as 0 | 1}>
            <div
              style={{ background: 'var(--card-light)', height: '100%' }}
              className="pkg-card"
            >
              {/* Visual panel */}
              <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                {c.visual === 'screenshot' ? (
                  <img
                    src="/loop-preview.png"
                    alt="Loop app homepage"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #1d7a6e 0%, #2c9e91 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="rgba(255,255,255,0.9)"
                      stroke="none"
                    >
                      <path d="M12 2 L13.4 10.6 L22 12 L13.4 13.4 L12 22 L10.6 13.4 L2 12 L10.6 10.6 Z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: '28px 32px' }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {c.tags.map((tag) => (
                    <span key={tag} style={tagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '36px',
                    fontWeight: 400,
                    color: 'var(--dark)',
                    marginBottom: '10px',
                  }}
                >
                  {c.name}
                </div>
                <p
                  style={{
                    fontSize: '15px',
                    color: 'var(--muted-dark)',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}
                >
                  {c.description}
                </p>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={visitLinkStyle}
                >
                  Visit Site →
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Portfolio.tsx
git commit -m "feat: add Portfolio component with Loop and SereneOS cards"
```

---

## Task 3: Build Portfolio Page Route

**Files:**
- Create: `src/app/portfolio/page.tsx`

- [ ] **Step 1: Create the page**

Write `src/app/portfolio/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Verify the route loads**

Run dev server if not already running:
```bash
npm run dev
```
Open `http://localhost:3000/portfolio` in a browser. Expected: page renders with Nav, the "What We've Built" heading, two company cards (Loop with screenshot, SereneOS with teal panel), and Footer.

- [ ] **Step 4: Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "feat: add /portfolio page route"
```

---

## Task 4: Build Careers Component

**Files:**
- Create: `src/components/Careers.tsx`

- [ ] **Step 1: Create the component**

Write `src/components/Careers.tsx`:

```tsx
import ScrollReveal from './ScrollReveal';

interface Role {
  title: string;
  company: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  url: string;
}

const openRoles: Role[] = [];

export default function Careers() {
  return (
    <section
      style={{
        background: 'var(--dark)',
        paddingTop: '140px',
        paddingBottom: '110px',
        paddingLeft: '48px',
        paddingRight: '48px',
      }}
    >
      {/* Hero */}
      <div style={{ maxWidth: '900px', marginBottom: '80px' }}>
        <ScrollReveal>
          <div className="sec-label" style={{ color: 'rgba(240,232,218,0.45)' }}>
            <span className="sec-label-num">01</span>
            <span className="sec-label-line" />
            Careers
          </div>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(52px, 5.5vw, 80px)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: 'var(--cream)',
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}
          >
            Join the Portfolio
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(240,232,218,0.5)',
              lineHeight: 1.7,
              maxWidth: '560px',
            }}
          >
            We build companies people love. As our portfolio grows, so does our team.
            If you&apos;re driven, curious, and ready to build — there&apos;s a place for
            you here.
          </p>
        </ScrollReveal>
      </div>

      {/* Roles */}
      <ScrollReveal delay={3}>
        {openRoles.length > 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              background: 'rgba(240,232,218,0.06)',
            }}
          >
            {openRoles.map((role) => (
              <div
                key={`${role.company}-${role.title}`}
                style={{
                  background: 'var(--card-light)',
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '28px',
                      fontWeight: 400,
                      color: 'var(--dark)',
                      marginBottom: '6px',
                    }}
                  >
                    {role.title}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--muted-dark)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {role.company} · {role.type} · {role.location}
                  </div>
                </div>
                <a
                  href={role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '11px 24px',
                    border: '1px solid rgba(59,41,33,0.22)',
                    color: 'var(--dark)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    flexShrink: 0,
                    transition: 'border-color 0.2s',
                  }}
                >
                  Apply →
                </a>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              border: '1px solid rgba(240,232,218,0.1)',
              padding: '80px 48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '520px',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(240,232,218,0.35)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: '24px' }}
            >
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2" />
              <line x1="12" y1="12" x2="12" y2="16" />
              <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '28px',
                fontWeight: 300,
                color: 'rgba(240,232,218,0.7)',
                marginBottom: '12px',
                lineHeight: 1.3,
              }}
            >
              No open positions right now.
            </p>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(240,232,218,0.35)',
                lineHeight: 1.7,
                marginBottom: '32px',
              }}
            >
              Follow our journey or reach out directly — we&apos;re always interested in
              meeting exceptional people.
            </p>
            <a
              href="mailto:hello@tgnstudios.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 24px',
                background: 'transparent',
                color: 'rgba(240,232,218,0.75)',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.04em',
                border: '1px solid rgba(240,232,218,0.22)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              Get in Touch →
            </a>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Careers.tsx
git commit -m "feat: add Careers component with empty state and role list scaffold"
```

---

## Task 5: Build Careers Page Route

**Files:**
- Create: `src/app/careers/page.tsx`

- [ ] **Step 1: Create the page**

Write `src/app/careers/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Verify the route loads**

Open `http://localhost:3000/careers` in a browser. Expected: page renders with Nav, "Join the Portfolio" heading, the empty-state panel with briefcase icon and "Get in Touch →" link, and Footer.

- [ ] **Step 4: Commit**

```bash
git add src/app/careers/page.tsx
git commit -m "feat: add /careers page route"
```

---

## Task 6: Update Nav — Links and Active State

**Files:**
- Modify: `src/components/Nav.tsx`

Context: The Nav currently uses `activeSection` (scroll-based) to highlight hash-anchor links on the homepage. Adding page routes (`/portfolio`, `/careers`) requires `usePathname()` for those links. Hash links also need to become `/#hash` so they work correctly when navigating from sub-pages back to the homepage.

- [ ] **Step 1: Replace Nav.tsx**

Write the full updated `src/components/Nav.tsx`:

```tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'About',      href: '/#about' },
  { label: 'Services',   href: '/#studio' },
  { label: 'Packages',   href: '/#packages' },
  { label: 'Our Studio', href: '/#partners' },
  { label: 'Philosophy', href: '/#philosophy' },
  { label: 'Portfolio',  href: '/portfolio' },
  { label: 'Careers',    href: '/careers' },
];

function isPageLink(href: string) {
  return !href.includes('#');
}

function getSectionId(href: string) {
  return href.split('#')[1] ?? '';
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links
      .filter((l) => !isPageLink(l.href))
      .map((l) => getSectionId(l.href));

    const track = () => {
      if (window.scrollY < 80) { setActiveSection(''); return; }
      let active = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) active = id;
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', track, { passive: true });
    track();
    return () => window.removeEventListener('scroll', track);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  function isActive(href: string) {
    if (isPageLink(href)) return pathname === href;
    return activeSection === getSectionId(href);
  }

  return (
    <nav
      aria-label="Main navigation"
      style={{
        background: 'rgba(59,41,33,0.97)',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.4)' : '0 1px 0 rgba(240,232,218,0.08)',
        borderBottom: 'none',
      }}
      className="fixed top-0 left-0 right-0 z-[100] transition-[background,box-shadow] duration-300 relative"
    >
      {/* Main bar */}
      <div className="flex items-center justify-between px-5 md:px-12 h-14 md:h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center no-underline" onClick={closeMenu}>
          <div style={{ width: '146px', height: '56px', overflow: 'hidden', borderRadius: '2px', flexShrink: 0 }}>
            <img src="/tgn-logo.jpg" alt="TGN Studios" style={{ width: '198px', height: 'auto', marginLeft: '-16px', marginTop: '-47px' }} />
          </div>
        </Link>

        {/* Desktop: links + CTA */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-7 list-none m-0 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`nav-link text-[12.5px] font-normal tracking-[0.02em]${isActive(l.href) ? ' active' : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#book" className="btn-cta">
            Schedule a Call →
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
          background: 'rgba(59,41,33,0.98)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
        }}
        className="md:hidden"
      >
        {/* Top bar inside overlay */}
        <div className="flex items-center justify-between px-5 h-14 flex-shrink-0">
          <Link href="/" className="flex items-center no-underline" onClick={closeMenu}>
            <div style={{ width: '146px', height: '56px', overflow: 'hidden', borderRadius: '2px', flexShrink: 0 }}>
              <img src="/tgn-logo.jpg" alt="TGN Studios" style={{ width: '198px', height: 'auto', marginLeft: '-16px', marginTop: '-47px' }} />
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
                color: isActive(l.href) ? 'rgba(240,232,218,0.96)' : 'rgba(240,232,218,0.65)',
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
              transition: `transform 0.35s ease ${links.length * 0.05 + 0.1}s, opacity 0.35s ease ${links.length * 0.05 + 0.1}s`,
            }}
            className="px-6 py-5"
          >
            <Link href="/#book" className="btn-cta w-full justify-center" onClick={closeMenu}>
              Schedule a Call →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Verify nav behavior**

Open `http://localhost:3000` — scroll down and confirm About/Services/etc. still highlight correctly.
Open `http://localhost:3000/portfolio` — confirm "Portfolio" link is underlined/active in the nav.
Open `http://localhost:3000/careers` — confirm "Careers" link is active.
Click a hash link (e.g., "About") from `/portfolio` — should navigate to homepage and scroll to that section.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: add Portfolio and Careers nav links with pathname-aware active state"
```

---

## Task 7: Update Footer

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Add Portfolio and Careers to footer links**

Open `src/components/Footer.tsx`. Replace the `links` array:

```ts
const links = [
  { label: 'TGN Ventures',  href: 'https://tgnventures.vc', external: true },
  { label: 'TGN Community', href: 'https://app.ourloop.life/loop/the-good-news-founder-community', external: true },
  { label: 'Portfolio',     href: '/portfolio', external: false },
  { label: 'Careers',       href: '/careers', external: false },
  { label: 'TGN Studios',   href: '/', external: false },
];
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Verify footer on all three pages**

Check `http://localhost:3000`, `/portfolio`, and `/careers` — footer should show all five links. Portfolio and Careers links should navigate correctly.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Portfolio and Careers links to footer"
```

---

## Task 8: Mobile Responsive Styles + Final Build

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add mobile rules for new pages**

Open `src/app/globals.css`. Inside the `@media (max-width: 768px)` block, append before the closing `}`:

```css
  /* Portfolio */
  #portfolio-cards {
    grid-template-columns: 1fr !important;
  }

  /* Portfolio + Careers hero */
  .page-hero {
    padding-left: 24px !important;
    padding-right: 24px !important;
    padding-top: 100px !important;
    padding-bottom: 64px !important;
  }
```

Then in `src/components/Portfolio.tsx`, add `id="portfolio-cards"` to the cards grid div:

```tsx
<div
  id="portfolio-cards"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2px',
    background: 'rgba(240,232,218,0.06)',
  }}
>
```

And add `className="page-hero"` to the outer `<section>` in both `Portfolio.tsx` and `Careers.tsx`, keeping the existing `style` prop (the CSS class will override padding on mobile via `!important`).

- [ ] **Step 2: Run production build**

Run:
```bash
npm run build
```
Expected: `✓ Compiled successfully` with routes `/portfolio` and `/careers` listed in the output. Zero TypeScript errors or build failures.

- [ ] **Step 3: Run lint**

Run:
```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 4: Final commit**

```bash
git add src/app/globals.css src/components/Portfolio.tsx src/components/Careers.tsx
git commit -m "feat: add mobile responsive styles for Portfolio and Careers pages"
```
