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
              href="mailto:Studio@tgnventures.vc,darrel@tgnventures.vc"
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
