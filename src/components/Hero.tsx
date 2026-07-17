'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BOOKING_URL } from '@/config';

const slides = [
  { cls: 'slide-1', label: 'Branding · Product · Advisory' },
  { cls: 'slide-2', label: 'Building What Endures' },
  { cls: 'slide-3', label: 'Institutional Quality' },
  { cls: 'slide-4', label: 'For Founders' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      style={{ background: 'var(--dark)' }}
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16 px-6 md:px-12 pt-20 md:pt-24 pb-10 md:pb-16 overflow-hidden"
    >
      {/* Left */}
      <div className="relative z-[2]">
        <div className="sec-label hero-anim-1" style={{ color: 'rgba(240,232,218,0.45)' }}>
          <span className="sec-label-num">1</span>
          <span className="sec-label-line" />
          Venture Studio
        </div>

        <h1
          className="hero-anim-2 font-light leading-[1.04] tracking-[-0.01em] mb-6"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(62px, 6.5vw, 96px)',
            color: 'var(--cream)',
          }}
        >
          TGN Studios
          <br />
          <em>Building What
          <br />Endures</em>
        </h1>

        <p
          className="hero-anim-3 font-light leading-[1.8] mb-6 md:mb-10"
          style={{ fontSize: '18px', color: 'rgba(240,232,218,0.6)', maxWidth: '460px' }}
        >
          We help founders launch companies through exceptional branding, product
          development, and strategic guidance — bringing institutional-quality
          execution to early-stage builders.
        </p>

        <div className="hero-anim-4 flex flex-wrap gap-[14px] mb-6 md:mb-12">
          {BOOKING_URL ? (
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
              Book a Discovery Call →
            </a>
          ) : (
            <Link href="#book" className="btn-cta">Book a Discovery Call →</Link>
          )}
          <Link href="#studio" className="btn-secondary">View Services →</Link>
        </div>

        <p
          className="hero-anim-5 italic leading-[1.75] hidden md:block"
          style={{ fontSize: '13.5px', color: 'rgba(240,232,218,0.35)', maxWidth: '340px' }}
        >
          Built by founders, operators, and investors who understand what it takes
          to go from idea to launch.
        </p>
      </div>

      {/* Right — carousel */}
      <div className="hero-slide-in relative h-[340px] md:h-[580px] rounded-sm overflow-hidden" style={{ display: 'none' }}>
        {slides.map((s, i) => (
          <div key={s.cls} className={`slide ${s.cls} ${i === current ? 'active' : ''}`}>
            <span
              style={{ color: 'rgba(240,232,218,0.35)', fontFamily: 'var(--font-cormorant)' }}
              className="absolute bottom-8 left-8 text-[11px] tracking-[0.2em] uppercase z-[2]"
            >
              {s.label}
            </span>
          </div>
        ))}

        {/* Slide progress */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-[3]" style={{ background: 'rgba(240,232,218,0.06)' }}>
          <div
            key={current}
            style={{ height: '100%', background: 'rgba(240,232,218,0.32)', animation: 'slideProgress 4.5s linear forwards' }}
          />
        </div>

        {/* Dots */}
        <div className="absolute bottom-[18px] right-8 flex gap-[7px] z-[3]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                background: i === current ? 'var(--cream)' : 'rgba(240,232,218,0.22)',
                transform: i === current ? 'scale(1.35)' : 'scale(1)',
                width: i === current ? '18px' : '6px',
              }}
              className="h-[6px] rounded-full border-none cursor-pointer transition-all duration-500 p-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
