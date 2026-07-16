import ScrollReveal from './ScrollReveal';

const disciplines = [
  {
    name: 'Branding',
    tagline: 'Craft a brand worthy of the vision.',
    colorClass: '#2A3D22',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
    items: ['Brand Strategy', 'Visual Identity', 'Websites', 'Pitch Deck Design', 'Marketing Assets'],
  },
  {
    name: 'Product',
    tagline: 'Transform ideas into products people actually use.',
    colorClass: '#1E3028',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    items: ['Product Design', 'MVP Development', 'AI Applications', 'No-Code & Low-Code Builds', 'Technical Strategy'],
  },
  {
    name: 'Advisory',
    tagline: 'Navigate growth with experienced founders and investors.',
    colorClass: '#7A2020',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    items: ['Venture Readiness', 'Fundraising Preparation', 'Growth Strategy', 'Partnerships', 'Investor Guidance'],
  },
];

export default function Studio() {
  return (
    <section id="studio" style={{ background: 'var(--stone)', padding: '110px 48px' }}>
      <div style={{ marginBottom: '56px' }}>
        <ScrollReveal>
          <div className="sec-label" style={{ color: 'rgba(26,16,7,0.4)' }}>
            <span className="sec-label-num">3</span>
            <span className="sec-label-line" />
            Our Studio
          </div>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(42px, 4.7vw, 66px)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: 'var(--dark)',
            letterSpacing: '-0.01em',
          }}>
            Three Disciplines.<br />One Team.
          </h2>
        </ScrollReveal>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'rgba(26,16,7,0.1)' }}>
        {disciplines.map((d, i) => (
          <ScrollReveal key={d.name} delay={(i > 0 ? i + 1 : 0) as 0 | 1 | 2 | 3}>
            <div
              style={{ background: 'var(--card-light)', padding: '36px 32px', height: '100%' }}
              className="pkg-card"
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                paddingBottom: '22px', marginBottom: '22px',
                borderBottom: '1px solid rgba(26,16,7,0.1)',
              }}>
                <div className="disc-icon" style={{ background: d.colorClass }}>
                  {d.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '32px', fontWeight: 400, color: 'var(--dark)' }}>{d.name}</div>
                </div>
              </div>
              <p style={{ fontSize: '17px', color: 'var(--muted-dark)', marginBottom: '22px', lineHeight: 1.7 }}>{d.tagline}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {d.items.map((item) => (
                  <li key={item} style={{ fontSize: '16.5px', color: 'var(--muted-dark)', paddingLeft: '18px', position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--muted)', fontSize: '11px', top: '3px' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
