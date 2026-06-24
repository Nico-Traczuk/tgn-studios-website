import ScrollReveal from './ScrollReveal';

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      style={{
        background: 'var(--stone)',
        paddingTop: '110px',
        paddingLeft: '48px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 0.65fr',
        gap: '64px',
        alignItems: 'start',
        overflow: 'hidden',
      }}
    >
      <ScrollReveal>
        <div className="sec-label" style={{ color: 'rgba(26,16,7,0.4)' }}>
          <span className="sec-label-num">7</span>
          <span className="sec-label-line" />
          Philosophy
        </div>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(38px, 4.2vw, 60px)',
          fontWeight: 300,
          lineHeight: 1.1,
          color: 'var(--dark)',
          letterSpacing: '-0.01em',
          paddingBottom: '110px',
        }}>
          Stewardship<br />Over Hype
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={2} className="pt-10">
        <p style={{ fontSize: '17px', color: 'var(--muted-dark)', lineHeight: 1.9 }}>
          We believe building a company is an act of stewardship. Capital, talent, time,
          and opportunity are resources entrusted to founders. Our role is to help deploy
          those resources wisely in pursuit of meaningful and lasting impact.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={3} className="phil-image-ph" />
    </section>
  );
}
