import Link from 'next/link';
import InsightBody from './InsightBody';
import { formatInsightDate, type Insight } from '@/lib/insights';

export default function InsightArticle({ post, editHref }: { post: Insight; editHref?: string }) {
  return (
    <article>
      <header
        className="page-hero insight-header"
        style={{
          background: 'var(--dark)',
          paddingTop: '140px',
          paddingBottom: '72px',
          paddingLeft: '48px',
          paddingRight: '48px',
        }}
      >
        <div style={{ maxWidth: '860px' }}>
          <div className="insight-tools">
            <Link href="/insights" className="insight-back">
              ← All insights
            </Link>
            {editHref ? (
              <Link href={editHref} className="insight-edit">Edit</Link>
            ) : null}
          </div>
          <div className="sec-label" style={{ color: 'rgba(240,232,218,0.45)' }}>
            <span className="sec-label-line" />
            {post.category}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(40px, 4.8vw, 68px)',
              fontWeight: 400,
              lineHeight: 1.08,
              color: 'var(--cream)',
              letterSpacing: '-0.01em',
              marginBottom: '22px',
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: '22px',
              fontWeight: 400,
              color: 'rgba(240,232,218,0.72)',
              marginBottom: '8px',
            }}
          >
            By {post.author}
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(240,232,218,0.45)', marginBottom: post.episode ? '8px' : '22px' }}>
            <time dateTime={post.date}>{formatInsightDate(post.date)}</time>
          </p>
          {post.episode ? (
            <p style={{ fontSize: '14px', color: 'rgba(240,232,218,0.45)', marginBottom: '22px' }}>
              {post.episode}
            </p>
          ) : null}
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {post.tags.map((tag) => (
              <li
                key={tag}
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,232,218,0.62)',
                  border: '1px solid rgba(240,232,218,0.18)',
                  padding: '6px 10px',
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="insight-article">
        <InsightBody body={post.body} ctaHref={post.ctaHref} format={post.format} />
      </div>
    </article>
  );
}
