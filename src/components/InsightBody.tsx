import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  body: string;
  ctaHref: string;
};

function isExternal(href: string) {
  return href.startsWith('https://') || href.startsWith('http://');
}

export default function InsightBody({ body, ctaHref }: Props) {
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
