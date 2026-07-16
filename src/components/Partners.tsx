import ScrollReveal from './ScrollReveal';
import Link from 'next/link';

export default function Partners() {
  return (
    <section
      id="partners"
      style={{
        background: '#1A1007',
        padding: '90px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        borderTop: '1px solid rgba(240,232,218,0.05)',
      }}
    >
      <ScrollReveal>
        <div className="sec-label" style={{ color: 'rgba(240,232,218,0.45)' }}>
          <span className="sec-label-num">5</span>
          <span className="sec-label-line" />
          Studio Partners
        </div>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(42px, 4.4vw, 60px)',
          fontWeight: 300,
          lineHeight: 1.1,
          color: 'var(--cream)',
        }}>
          We Occasionally Build<br />Alongside Founders
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={2}>
        <p style={{ fontSize: '17px', color: 'rgba(240,232,218,0.52)', lineHeight: 1.9, marginBottom: '18px' }}>
          For a select number of companies each year, TGN Studios offers flexible engagement
          structures that may include a combination of services, advisory support, and long-term
          alignment.
        </p>
        <p style={{ fontSize: '17px', color: 'rgba(240,232,218,0.52)', lineHeight: 1.9, marginBottom: '18px' }}>
          We reserve these partnerships for founders building businesses with exceptional potential
          and strong alignment with our values.
        </p>
        <Link href="#book" className="btn-outline">Inquire About Partnership →</Link>
      </ScrollReveal>
    </section>
  );
}
