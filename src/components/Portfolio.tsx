import { CSSProperties } from 'react';
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

const tagStyle: CSSProperties = {
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '4px 10px',
  background: 'rgba(59,41,33,0.08)',
  color: 'var(--muted-dark)',
};

const visitLinkStyle: CSSProperties = {
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
      className="page-hero"
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
        id="portfolio-cards"
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
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '18px',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'var(--muted-dark)',
                    marginBottom: '12px',
                    lineHeight: 1.4,
                  }}
                >
                  {c.tagline}
                </p>
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
