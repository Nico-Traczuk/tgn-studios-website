import ScrollReveal from './ScrollReveal';

const items = [
  {
    title: 'Institutional Quality',
    desc: 'Work that looks and feels world-class from day one.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
  },
  {
    title: 'Founder-Led',
    desc: 'Built by operators who have launched companies, raised capital, and navigated growth firsthand.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: 'Fair Pricing',
    desc: 'Exceptional execution without the overhead of large agencies.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path d="M6 6h.008v.008H6V6Z" />
      </svg>
    ),
  },
  {
    title: 'Long-Term Thinking',
    desc: 'We optimize for enduring businesses, not short-term trends.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
];

export default function Why() {
  return (
    <section
      id="why"
      style={{
        background: '#EDE2D4',
        padding: '80px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gap: '64px',
        alignItems: 'start',
      }}
    >
      <ScrollReveal>
        <div className="sec-label" style={{ color: 'rgba(59,41,33,0.4)' }}>
          <span className="sec-label-num">6</span>
          <span className="sec-label-line" />
          Why TGN Studios
        </div>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(38px, 4vw, 56px)',
          fontWeight: 300,
          lineHeight: 1.1,
          color: '#3B2921',
        }}>
          Why Founders<br />Choose Us
        </h2>
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
        {items.map((item, i) => (
          <ScrollReveal key={item.title} delay={(i as 0 | 1 | 2 | 3)}>
            <div style={{ paddingLeft: '24px' }} className="why-item">
              <div style={{ width: '64px', height: '64px', marginBottom: '24px', color: '#3B2921', opacity: 0.45 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" style={{ width: '64px', height: '64px' }}>
                  {item.icon.props.children}
                </svg>
              </div>
              <div
                className="why-title"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '17px',
                  fontWeight: 600,
                  color: '#3B2921',
                  marginBottom: '12px',
                  letterSpacing: '0.01em',
                  transition: 'color 0.25s ease',
                }}
              >
                {item.title}
              </div>
              <p style={{ fontSize: '16px', color: '#6A5A48', lineHeight: 1.85 }}>{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
