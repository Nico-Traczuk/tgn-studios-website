import ScrollReveal from './ScrollReveal';

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--cream)',
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
        <div className="sec-label" style={{ color: 'rgba(59,41,33,0.4)' }}>
          <span className="sec-label-num">2</span>
          <span className="sec-label-line" />
          About
        </div>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(46px, 4.4vw, 64px)',
          color: 'var(--dark)',
          fontWeight: 400,
          lineHeight: 1.08,
          letterSpacing: '-0.01em',
          paddingBottom: '110px',
        }}>
          More Than a<br />Service Provider
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={2} className="pt-10">
        <p style={{ fontSize: '16.5px', color: 'var(--muted-dark)', lineHeight: 1.9, marginBottom: '18px' }}>
          Most agencies sell deliverables. Most consultants sell advice.
        </p>
        <p style={{ fontSize: '16.5px', color: 'var(--muted-dark)', lineHeight: 1.9 }}>
          TGN Studios exists to help founders build meaningful businesses with the right
          team around them from day one. As part of The Good News ecosystem, we bring
          together branding, product development, and venture expertise to help founders
          move from idea to execution with clarity and conviction.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={3} className="about-image-ph" />
    </section>
  );
}
