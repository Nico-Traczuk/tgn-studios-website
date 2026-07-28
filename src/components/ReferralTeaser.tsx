import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function ReferralTeaser() {
  return (
    <section
      style={{
        background: 'var(--dark)',
        padding: '0 48px 80px',
      }}
      id="referral"
    >
      <ScrollReveal>
        <div
          style={{
            border: '1px solid rgba(240,232,218,0.09)',
            padding: '48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(240,232,218,0.35)',
                marginBottom: '14px',
              }}
            >
              Referral Program
            </div>
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 300,
                color: 'var(--cream)',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Know someone we should meet?
            </p>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(240,232,218,0.4)',
                lineHeight: 1.7,
                marginTop: '10px',
                marginBottom: 0,
                maxWidth: '420px',
              }}
            >
              Refer a client to TGN Studios and earn 20% of the revenue from their initial engagement.
            </p>
          </div>
          <Link href="/referral" className="btn-secondary" style={{ flexShrink: 0 }}>
            Learn More →
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
