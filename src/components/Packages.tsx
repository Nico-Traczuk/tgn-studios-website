import ScrollReveal from './ScrollReveal';

const packages = [
  {
    name: 'Foundation',
    price: '2,500',
    desc: 'For founders turning ideas into plans.',
    items: ['Brand Discovery', 'Founder Strategy Session', 'MVP Roadmap', 'Launch Plan'],
    bg: '#FAF5EE',
  },
  {
    name: 'Launch',
    price: '7,500',
    desc: 'For founders preparing to validate.',
    items: ['Brand Identity', 'Landing Page', 'Product Prototype', 'Customer & Discovery Framework'],
    bg: '#FAF5EE',
  },
  {
    name: 'MVP',
    price: '15,000',
    desc: 'For founders ready to build.',
    items: ['Product Design', 'Functional MVP', 'Investor Materials', 'Go-To-Market Planning'],
    bg: '#E8DDD0',
  },
];

export default function Packages() {
  return (
    <section
      id="packages"
      style={{
        background: '#F0E8DA',
        padding: '110px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '80px',
        alignItems: 'start',
      }}
    >
      <ScrollReveal>
        <div className="sec-label" style={{ color: 'rgba(26,16,7,0.4)' }}>
          <span className="sec-label-num">④</span>
          <span className="sec-label-line" />
          Packages
        </div>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(50px, 5.2vw, 74px)',
          fontWeight: 300,
          lineHeight: 1.05,
          color: '#1A1007',
          letterSpacing: '-0.01em',
        }}>
          Designed for<br />Every Stage
        </h2>
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', background: 'rgba(26,16,7,0.08)' }}>
        {packages.map((pkg, i) => (
          <ScrollReveal key={pkg.name} delay={(i > 0 ? i + 1 : 0) as 0 | 1 | 2 | 3}>
            <div
              style={{ background: pkg.bg, padding: '34px 28px', transition: 'background 0.3s', height: '100%' }}
              className="hover:brightness-105"
            >
              <div style={{ fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B8B72', marginBottom: '6px' }}>Starting at</div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '38px', fontWeight: 400, color: '#1A1007', marginBottom: '4px' }}>{pkg.name}</div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '54px', fontWeight: 300, color: '#1A1007', lineHeight: 1.05, marginBottom: '12px' }}>
                <sup style={{ fontSize: '18px', fontFamily: 'var(--font-inter)', fontWeight: 300, opacity: 0.45, verticalAlign: 'super', marginRight: '2px' }}>$</sup>
                {pkg.price}
              </div>
              <p style={{ fontSize: '16px', color: '#7A6A58', lineHeight: 1.75, marginBottom: '24px' }}>{pkg.desc}</p>
              <div style={{ height: '1px', background: 'rgba(26,16,7,0.08)', marginBottom: '20px' }} />
              <div style={{ fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9B8B72', marginBottom: '14px' }}>Includes</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {pkg.items.map((item) => (
                  <li key={item} style={{ fontSize: '16px', color: '#6A5A48', paddingLeft: '16px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#9B8B72' }}>·</span>
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
