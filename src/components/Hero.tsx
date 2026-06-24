'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const slides = [
  { cls: 'slide-1', label: 'Branding · Product · Advisory' },
  { cls: 'slide-2', label: 'Building What Endures' },
  { cls: 'slide-3', label: 'Institutional Quality' },
  { cls: 'slide-4', label: 'For Founders' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      style={{ background: 'var(--dark)' }}
      className="min-h-screen grid grid-cols-2 items-center gap-16 px-12 pt-24 pb-16 overflow-hidden"
    >
      {/* Left */}
      <div className="relative z-[2]">
        <div className="sec-label hero-anim-1" style={{ color: 'rgba(240,232,218,0.45)' }}>
          <span className="sec-label-num">①</span>
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
          className="hero-anim-3 font-light leading-[1.8] mb-10"
          style={{ fontSize: '18px', color: 'rgba(240,232,218,0.6)', maxWidth: '460px' }}
        >
          We help founders launch companies through exceptional branding, product
          development, and strategic guidance — bringing institutional-quality
          execution to early-stage builders.
        </p>

        <div className="hero-anim-4 flex gap-[14px] mb-12">
          <Link href="#contact" className="btn-cta">Start a Project →</Link>
          <Link href="#studio" className="btn-secondary">View Services →</Link>
        </div>

        <p
          className="hero-anim-5 italic leading-[1.75]"
          style={{ fontSize: '13.5px', color: 'rgba(240,232,218,0.35)', maxWidth: '340px' }}
        >
          Built by founders, operators, and investors who understand what it takes
          to go from idea to launch.
        </p>
      </div>

      {/* Right — carousel */}
      <div className="hero-slide-in relative h-[580px] rounded-sm overflow-hidden">
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

        {/* Dots */}
        <div className="absolute bottom-8 right-8 flex gap-2 z-[3]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                background: i === current ? 'var(--cream)' : 'rgba(240,232,218,0.25)',
                transform: i === current ? 'scale(1.3)' : 'scale(1)',
              }}
              className="w-[5px] h-[5px] rounded-full border-none cursor-pointer transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
