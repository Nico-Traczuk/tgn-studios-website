'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const steps = [
  {
    title: 'Submit the Referral Form',
    description:
      'Share the prospective client’s information through the referral form below.',
  },
  {
    title: 'Make a Warm Introduction',
    warmIntroLink: true,
  },
  {
    title: 'Earn 20%',
    description:
      'If the referral signs an engagement and pays TGN Studios, you will receive 20% of the collected revenue from their initial engagement.',
  },
];

const eligibilityItems = [
  'Be submitted before the prospective client begins active conversations with TGN Studios.',
  'Be a new prospective client who is not already in our pipeline.',
  'Include a warm introduction to the TGN Studios team.',
  'Result in a signed and paid engagement.',
];

const subLabel: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'rgba(240,232,218,0.35)',
  marginBottom: '32px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(240,232,218,0.04)',
  border: '1px solid rgba(240,232,218,0.12)',
  color: 'rgba(240,232,218,0.85)',
  padding: '12px 16px',
  fontSize: '14px',
  fontFamily: 'var(--font-inter)',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(240,232,218,0.35)',
  marginBottom: '8px',
};

export default function Referral() {
  const [form, setForm] = useState({
    referrerName: '',
    referrerEmail: '',
    clientName: '',
    clientCompany: '',
    clientContact: '',
    notes: '',
  });

  const [focused, setFocused] = useState<string | null>(null);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Referral Submission — ${form.clientCompany || form.clientName}`;
    const body = [
      `Referrer Name:    ${form.referrerName}`,
      `Referrer Email:   ${form.referrerEmail}`,
      '',
      `Client Name:      ${form.clientName}`,
      `Client Company:   ${form.clientCompany}`,
      `Client Contact:   ${form.clientContact}`,
      '',
      'Notes:',
      form.notes,
    ].join('\n');

    window.location.href = `mailto:Studio@tgnventures.vc?cc=Info@tgnventures.vc&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function focusStyle(field: string): React.CSSProperties {
    return {
      ...inputStyle,
      borderColor: focused === field ? 'rgba(240,232,218,0.35)' : 'rgba(240,232,218,0.12)',
    };
  }

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
      <div style={{ maxWidth: '900px', marginBottom: '88px' }}>
        <ScrollReveal>
          <div className="sec-label" style={{ color: 'rgba(240,232,218,0.45)' }}>
            <span className="sec-label-num">01</span>
            <span className="sec-label-line" />
            Referral Program
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
              marginBottom: '28px',
            }}
          >
            Refer a Client.<br />Earn 20%.
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
            Know a business, organization, or entrepreneur that could benefit from TGN Studios?
            Refer them to our team — and if they become a paying client, you receive 20% of
            the revenue collected from their initial engagement.
          </p>
        </ScrollReveal>
      </div>

      {/* How It Works */}
      <div style={{ marginBottom: '80px' }}>
        <ScrollReveal>
          <div style={subLabel}>How It Works</div>
        </ScrollReveal>

        <div
          id="referral-steps"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
            background: 'rgba(240,232,218,0.06)',
          }}
        >
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={(i as 0 | 1 | 2)}>
              <div
                className="pkg-card"
                style={{ background: 'var(--card-light)', padding: '36px 28px', height: '100%' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '64px',
                    fontWeight: 300,
                    color: 'rgba(59,41,33,0.12)',
                    lineHeight: 1,
                    marginBottom: '20px',
                  }}
                >
                  0{i + 1}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: 'var(--dark)',
                    marginBottom: '12px',
                    lineHeight: 1.25,
                  }}
                >
                  {step.title}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--muted-dark)', lineHeight: 1.7, margin: 0 }}>
                  {step.warmIntroLink ? (
                    <>
                      Connect the prospective client directly with the TGN Studios team via{' '}
                      <a
                        href="mailto:Studio@tgnventures.vc,Info@tgnventures.vc"
                        style={{
                          color: 'var(--dark)',
                          textDecoration: 'underline',
                          textDecorationColor: 'rgba(59,41,33,0.35)',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        warm introduction
                      </a>{' '}
                      by email or another agreed-upon method.
                    </>
                  ) : (
                    step.description
                  )}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Eligibility */}
      <div style={{ marginBottom: '80px' }}>
        <ScrollReveal>
          <div style={subLabel}>Referral Eligibility</div>
        </ScrollReveal>

        <div
          id="referral-eligibility"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          <ScrollReveal>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '22px',
                  fontWeight: 300,
                  color: 'rgba(240,232,218,0.65)',
                  lineHeight: 1.5,
                  marginBottom: '32px',
                  marginTop: 0,
                }}
              >
                To qualify, the referral must:
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {eligibilityItems.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      fontSize: '14px',
                      color: 'rgba(240,232,218,0.5)',
                      lineHeight: 1.65,
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        width: '20px',
                        height: '1px',
                        background: 'rgba(240,232,218,0.22)',
                        marginTop: '11px',
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(240,232,218,0.28)',
                lineHeight: 1.9,
                borderTop: '1px solid rgba(240,232,218,0.07)',
                paddingTop: '28px',
                marginTop: '72px',
                marginBottom: 0,
              }}
            >
              Referral compensation is paid after TGN Studios receives payment from the client
              and applies only to the initial engagement. Taxes, refunds, reimbursed expenses,
              and direct third-party costs are excluded.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Form */}
      <ScrollReveal>
        <div
          style={{
            border: '1px solid rgba(240,232,218,0.1)',
            padding: '64px 48px',
          }}
        >
          <div style={{ ...subLabel, marginBottom: '12px' }}>Have Someone in Mind?</div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(36px, 4vw, 54px)',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1.1,
              margin: '0 0 48px',
            }}
          >
            Submit a referral and help someone<br />move from idea to execution.
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Row 1 */}
            <div className="referral-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label htmlFor="referrerName" style={labelStyle}>Your Name</label>
                <input
                  id="referrerName"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={form.referrerName}
                  onChange={(e) => set('referrerName', e.target.value)}
                  onFocus={() => setFocused('referrerName')}
                  onBlur={() => setFocused(null)}
                  style={focusStyle('referrerName')}
                />
              </div>
              <div>
                <label htmlFor="referrerEmail" style={labelStyle}>Your Email</label>
                <input
                  id="referrerEmail"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={form.referrerEmail}
                  onChange={(e) => set('referrerEmail', e.target.value)}
                  onFocus={() => setFocused('referrerEmail')}
                  onBlur={() => setFocused(null)}
                  style={focusStyle('referrerEmail')}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="referral-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label htmlFor="clientName" style={labelStyle}>Client Name</label>
                <input
                  id="clientName"
                  type="text"
                  required
                  placeholder="John Smith"
                  value={form.clientName}
                  onChange={(e) => set('clientName', e.target.value)}
                  onFocus={() => setFocused('clientName')}
                  onBlur={() => setFocused(null)}
                  style={focusStyle('clientName')}
                />
              </div>
              <div>
                <label htmlFor="clientCompany" style={labelStyle}>Client Company / Organization</label>
                <input
                  id="clientCompany"
                  type="text"
                  placeholder="Acme Corp"
                  value={form.clientCompany}
                  onChange={(e) => set('clientCompany', e.target.value)}
                  onFocus={() => setFocused('clientCompany')}
                  onBlur={() => setFocused(null)}
                  style={focusStyle('clientCompany')}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div>
              <label htmlFor="clientContact" style={labelStyle}>Client Email or Phone</label>
              <input
                id="clientContact"
                type="text"
                required
                placeholder="john@acme.com or +1 555 000 0000"
                value={form.clientContact}
                onChange={(e) => set('clientContact', e.target.value)}
                onFocus={() => setFocused('clientContact')}
                onBlur={() => setFocused(null)}
                style={focusStyle('clientContact')}
              />
            </div>

            {/* Row 4 */}
            <div>
              <label htmlFor="notes" style={labelStyle}>What do they need? (Optional)</label>
              <textarea
                id="notes"
                rows={4}
                placeholder="Brief description of their project or goals..."
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                onFocus={() => setFocused('notes')}
                onBlur={() => setFocused(null)}
                style={{
                  ...focusStyle('notes'),
                  resize: 'vertical',
                  minHeight: '100px',
                }}
              />
            </div>

            <div>
              <button type="submit" className="btn-cta" style={{ cursor: 'pointer', border: 'none' }}>
                Submit Referral →
              </button>
            </div>
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
}
