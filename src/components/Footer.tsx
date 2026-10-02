import Link from 'next/link';

const links = [
  { label: 'TGN Ventures',  href: 'https://tgnventures.vc', external: true },
  { label: 'TGN Community', href: 'https://app.ourloop.life/loop/the-good-news-founder-community', external: true },
  { label: 'Portfolio',     href: '/portfolio', external: false },
  { label: 'Insights',      href: '/insights', external: false },
  { label: 'Referral',      href: '/referral', external: false },
  { label: 'Careers',       href: '/careers', external: false },
  { label: 'TGN Studios',   href: '/', external: false },
];

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/tgnventures/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.84v2.12h.05c.53-1.01 1.84-2.08 3.79-2.08 4.06 0 4.81 2.67 4.81 6.15V24h-4v-7.73c0-1.84-.03-4.21-2.56-4.21-2.57 0-2.96 2-2.96 4.07V24h-4V8.5z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/tgnventures',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/tgn_ventures',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.8 4.8 0 0 0 12 7.2zm0 7.92A3.12 3.12 0 1 1 15.12 12 3.12 3.12 0 0 1 12 15.12zM17.85 6.96a1.12 1.12 0 1 1-1.12-1.12 1.12 1.12 0 0 1 1.12 1.12zM21.6 7.46a6.55 6.55 0 0 0-1.79-4.64 6.58 6.58 0 0 0-4.64-1.79C13.86.96 13.53.9 12 .9s-1.86.06-3.17.13a6.58 6.58 0 0 0-4.64 1.79A6.55 6.55 0 0 0 2.4 7.46C2.33 8.77 2.27 9.1 2.27 12s.06 3.23.13 4.54a6.55 6.55 0 0 0 1.79 4.64 6.58 6.58 0 0 0 4.64 1.79c1.31.07 1.64.13 3.17.13s1.86-.06 3.17-.13a6.58 6.58 0 0 0 4.64-1.79 6.55 6.55 0 0 0 1.79-4.64c.07-1.31.13-1.64.13-3.17s-.06-1.86-.13-3.17zm-1.68 8.66a3.74 3.74 0 0 1-2.11 2.11c-1.46.58-4.93.44-6.81.44s-5.36.13-6.81-.44a3.74 3.74 0 0 1-2.11-2.11c-.58-1.46-.44-4.93-.44-6.81s-.13-5.36.44-6.81a3.74 3.74 0 0 1 2.11-2.11c1.46-.58 4.93-.44 6.81-.44s5.36-.13 6.81.44a3.74 3.74 0 0 1 2.11 2.11c.58 1.46.44 4.93.44 6.81s.14 5.35-.44 6.81z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/tgnventures',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M14.5 8.5V6.8c0-.7.5-1.3 1.2-1.3H17.5V3h-2.2C12.6 3 11 4.7 11 7.1v1.4H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7z" />
      </svg>
    ),
  },
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
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ flexShrink: 0 }}>
            <img src="/tgn-logo-full.png" alt="TGN Studios" style={{ height: '32px', width: 'auto', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,232,218,0.55)' }}>
              TGN Studios
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(240,232,218,0.3)', marginTop: '3px' }}>
              Product · Go-To-Market · Fundraising · Part of the TGN Ecosystem
            </div>
          </div>
        </div>
        <ul className="footer-socials" aria-label="Social media">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ul style={{ display: 'flex', gap: '22px', rowGap: '12px', justifyContent: 'center', flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0 }}>
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
