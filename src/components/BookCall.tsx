import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import { BOOKING_URL } from '@/config';

export default function BookCall() {
  return (
    <section
      id="book"
      style={{
        background: 'var(--dark)',
        padding: '120px 48px',
        borderTop: '1px solid rgba(240,232,218,0.06)',
      }}
    >
      <ScrollReveal>
        <div className="sec-label" style={{ color: 'rgba(240,232,218,0.35)', marginBottom: '40px' }}>
          <span className="sec-label-num">8</span>
          <span className="sec-label-line" />
          Let&apos;s Talk
        </div>

        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(48px, 5.5vw, 80px)',
          fontWeight: 300,
          lineHeight: 1.05,
          color: 'var(--cream)',
          letterSpacing: '-0.01em',
          marginBottom: '24px',
        }}>
          Ready to Build Something<br />
          <em>That Lasts?</em>
        </h2>

        <p style={{
          fontSize: '17px',
          color: 'rgba(240,232,218,0.5)',
          lineHeight: 1.8,
          maxWidth: '460px',
          marginBottom: '48px',
        }}>
          Schedule a discovery call and let&apos;s explore what we can build together.
        </p>

        {BOOKING_URL ? (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
            style={{ fontSize: '13px', padding: '14px 36px' }}
          >
            Book a Discovery Call →
          </a>
        ) : (
          <Link href="#contact" className="btn-cta" style={{ fontSize: '13px', padding: '14px 36px' }}>
            Book a Discovery Call →
          </Link>
        )}
      </ScrollReveal>
    </section>
  );
}
