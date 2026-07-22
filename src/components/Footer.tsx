import Link from 'next/link';

const links = [
  { label: 'TGN Ventures',  href: 'https://tgnventures.vc', external: true },
  { label: 'TGN Community', href: 'https://app.ourloop.life/loop/the-good-news-founder-community', external: true },
  { label: 'Portfolio',     href: '/portfolio', external: false },
  { label: 'Careers',       href: '/careers', external: false },
  { label: 'TGN Studios',   href: '/', external: false },
];

const linkStyle = { fontSize: '11.5px', color: 'rgba(240,232,218,0.38)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' };

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: 'var(--dark)',
        padding: '48px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center',
        borderTop: '1px solid rgba(240,232,218,0.06)',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '120px', height: '48px', overflow: 'hidden', borderRadius: '2px', flexShrink: 0 }}>
          <img src="/tgn-logo.jpg" alt="TGN Studios" style={{ width: '162px', height: 'auto', marginLeft: '-13px', marginTop: '-39px' }} />
        </div>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,232,218,0.55)' }}>
            TGN Studios
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(240,232,218,0.3)', marginTop: '3px' }}>
            Branding · Product · Advisory · Part of the TGN Ecosystem
          </div>
        </div>
      </div>

      {/* Links */}
      <ul style={{ display: 'flex', gap: '22px', justifyContent: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" style={linkStyle} className="hover:text-[rgba(240,232,218,0.7)]">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} style={linkStyle} className="hover:text-[rgba(240,232,218,0.7)]">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

    </footer>
  );
}
