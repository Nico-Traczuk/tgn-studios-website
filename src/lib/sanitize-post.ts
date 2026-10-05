import sanitizeHtml from 'sanitize-html';

const COLOR = [/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, /^rgb\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*\)$/];

export function sanitizePostHtml(dirty: string) {
  return sanitizeHtml(dirty, {
    allowedTags: [
      'p', 'h2', 'h3', 'h4', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
      'blockquote', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span', 'br', 'hr',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt'],
      span: ['style'],
      th: ['colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
    },
    allowedStyles: {
      span: { color: COLOR },
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (_tagName, attribs) => {
        const href = attribs.href ?? '';
        const safe = href.startsWith('https://') || href.startsWith('http://') || href.startsWith('/') || href.startsWith('mailto:');
        if (!safe) return { tagName: 'span', attribs: {} };
        const external = href.startsWith('http');
        return {
          tagName: 'a',
          attribs: {
            href,
            ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
          },
        };
      },
      img: (_tagName, attribs): { tagName: string; attribs: Record<string, string> } => {
        const src = attribs.src ?? '';
        const safe = src.startsWith('/insights/') || src.startsWith('https://');
        if (!safe) return { tagName: 'span', attribs: { title: 'removed' } };
        return { tagName: 'img', attribs: { src, alt: attribs.alt ?? '' } };
      },
    },
  });
}

export function htmlHasContent(html: string) {
  const text = html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
  return text.length > 0 || /<img\b/i.test(html);
}
