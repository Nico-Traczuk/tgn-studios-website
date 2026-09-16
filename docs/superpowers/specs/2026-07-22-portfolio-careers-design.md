# Portfolio & Careers Pages — Design Spec
Date: 2026-07-22

## Overview

Add two new routes to the TGN Studios website: `/portfolio` and `/careers`. Both are standalone pages sharing the same Nav and Footer as the homepage, following the existing design system (dark brown palette, Cormorant Garamond headings, Inter body, `--dark` base).

---

## Portfolio Page (`/portfolio`)

### Purpose
Showcase companies built by TGN Studios. Currently two companies: Loop and SereneOS.

### Data
Defined in a static array in the component — easy to extend with new companies later:

```ts
const companies = [
  {
    name: 'Loop',
    tagline: 'A private space for your closest people.',
    description: 'No followers. No likes. Just connection. Loop is the home for the relationships that matter most.',
    tags: ['Community', 'App'],
    url: 'https://ourloop.life/',
    visual: 'screenshot', // uses /public/loop-preview.png
  },
  {
    name: 'SereneOS',
    tagline: 'Calm, structured ops for growing teams.',
    description: 'An operations platform built for clarity — helping founders run their companies without the chaos.',
    tags: ['Operations', 'Platform'],
    url: 'https://sereneos.co',
    visual: 'brand', // teal gradient + compass icon
  },
]
```

### Layout

**Hero section** (dark `--dark` background):
- Section label: `sec-label` pattern with number `01` + line + "Portfolio"
- Heading: Cormorant, `clamp(52px, 5.5vw, 80px)`, weight 300, cream — "What We've Built"
- Subheading: Inter, 17px, muted — "Every company in our portfolio starts with a conviction and a team willing to build toward it."

**Cards section** (same dark background, max-width container centered):
- Desktop: 2-column CSS grid, `gap: 2px` (same gap style as Studio cards)
- Mobile: single column
- Each card: `--card-light` background (`#F0EAE0`)

**Card anatomy** (top to bottom):
1. Visual panel — `height: 280px`, `overflow: hidden`
   - Loop: `<img>` of `/public/loop-preview.png`, `object-fit: cover`, `object-position: top`
   - SereneOS: teal gradient div (`#1d7a6e` → `#2c9e91`) with centered compass-star SVG icon
2. Content area — `padding: 28px 32px`
   - Tags row: small uppercase pills, `background: rgba(59,41,33,0.08)`, `color: var(--muted-dark)`
   - Company name: Cormorant, 36px, `--dark`
   - Tagline: Inter, 15px, `--muted-dark`, `line-height: 1.6`
   - External link: `btn-outline` style adapted to dark-on-light — "Visit Site →" — opens in new tab

**Hover**: `pkg-card` class (translateY -5px, shadow) — same as Studio cards.

**ScrollReveal**: hero text reveals on scroll; cards stagger with `delay-1` / `delay-2`.

### Files
- `src/app/portfolio/page.tsx` — page entry, metadata
- `src/components/Portfolio.tsx` — full section component
- `/public/loop-preview.png` — Loop screenshot (saved from headless Chrome capture)

---

## Careers Page (`/careers`)

### Purpose
List open roles across TGN Studios portfolio companies. Starts as an empty state; adding a job later = adding an object to an array.

### Data
```ts
const openRoles: Role[] = []
// Future shape:
// { title, company, type ('Full-time'|'Part-time'|'Contract'), location, url }
```

### Layout

**Hero section** (`--dark` background):
- Section label: `sec-label` with `01` + "Careers"
- Heading: "Join the Portfolio"
- Subheading: "We build companies people love. As our portfolio grows, so does our team. If you're driven, curious, and ready to build — there's a place for you here."

**Roles section**:
- When `openRoles.length > 0`: render a bordered list of role cards (design: role title in Cormorant, company + type + location in Inter, "Apply →" link)
- When `openRoles.length === 0`: empty state panel
  - Bordered box (`border: 1px solid rgba(240,232,218,0.12)`, `padding: 64px 48px`, centered)
  - Small icon (briefcase SVG, 28px, cream muted)
  - Text: "No open positions right now."
  - Sub-text: "Follow our journey or reach out directly."
  - CTA link: `btn-secondary` → `mailto:hello@tgnstudios.com` or booking link from `config.ts`

### Files
- `src/app/careers/page.tsx` — page entry, metadata
- `src/components/Careers.tsx` — full section component

---

## Navigation & Footer Updates

**Nav** (`src/components/Nav.tsx`):
- Add `{ label: 'Portfolio', href: '/portfolio' }` and `{ label: 'Careers', href: '/careers' }` to the `links` array
- These are page routes (not hash anchors), so active-section tracking via scroll doesn't apply — use `usePathname()` from `next/navigation` to highlight the active page link instead
- Nav active detection: if `pathname === l.href` → apply `active` class (for page links); existing scroll-based logic stays for hash links

**Footer** (`src/components/Footer.tsx`):
- Add `{ label: 'Portfolio', href: '/portfolio', external: false }` and `{ label: 'Careers', href: '/careers', external: false }` to footer links

---

## Assets

- `/public/loop-preview.png`: crop of the Loop homepage screenshot captured at 1440×900. Save the existing `/tmp/loop-screenshot.png` to this path.
- SereneOS visual: generated with CSS/SVG in-component, no image file needed.

---

## Constraints & Notes

- Both pages use the existing `Nav` and `Footer` components unchanged (except the links arrays).
- No new CSS classes needed — reuse `sec-label`, `sec-label-num`, `sec-label-line`, `btn-outline`, `btn-secondary`, `pkg-card`, `reveal`, `reveal-delay-*` from `globals.css`.
- `ScrollReveal` component used for entrance animations, same as other pages.
- Mobile: cards stack to 1 column; hero text scales via `clamp()`.
- `<Link>` for internal routes, `<a target="_blank" rel="noopener noreferrer">` for external.
