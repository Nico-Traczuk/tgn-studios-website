import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { sanitizePostHtml } from '@/lib/sanitize-post';

type Props = {
  body: string;
  ctaHref: string;
  format?: 'markdown' | 'html';
};

function isExternal(href: string) {
  return href.startsWith('https://') || href.startsWith('http://');
}

export default function InsightBody({ body, ctaHref, format = 'markdown' }: Props) {
  if (format === 'html') {
    return (
      <div
        className="insight-prose"
        dangerouslySetInnerHTML={{ __html: sanitizePostHtml(body) }}
      />
    );
  }

  const components: Components = {
    a: ({ href, children }) => {
      if (!href) return <>{children}</>;

      if (href === ctaHref) {
        return (
          <a className="insight-cta-inline" href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }

      if (isExternal(href)) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }

      return <a href={href}>{children}</a>;
    },
    table: ({ children }) => (
      <div className="insight-table-wrap">
        <table>{children}</table>
      </div>
    ),
  };

  return (
    <div className="insight-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
