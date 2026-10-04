import Link from 'next/link';
import ScrollReveal from './ScrollReveal';
import { formatInsightDate, type Insight } from '@/lib/insights';

const tagStyle = {
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  padding: '4px 10px',
  background: 'rgba(59,41,33,0.08)',
  color: 'var(--muted-dark)',
};

export default function Insights({ posts, canEdit = false }: { posts: Insight[]; canEdit?: boolean }) {
  return (
    <section
      className="page-hero"
      style={{
        background: 'var(--dark)',
        paddingTop: '140px',
        paddingBottom: '110px',
        paddingLeft: '48px',
        paddingRight: '48px',
      }}
    >
      <div style={{ maxWidth: '900px', marginBottom: '80px' }}>
        <ScrollReveal>
          <div className="sec-label" style={{ color: 'rgba(240,232,218,0.45)' }}>
            <span className="sec-label-num">01</span>
            <span className="sec-label-line" />
            Writing
          </div>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <h1
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(52px, 5.5vw, 80px)',
              fontWeight: 300,
              lineHeight: 1.05,
              color: 'var(--cream)',
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}
          >
            Insights
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(240,232,218,0.5)',
              lineHeight: 1.7,
              maxWidth: '560px',
            }}
          >
            Practical notes for founders turning an MVP into the next build.
          </p>
        </ScrollReveal>
      </div>

      {posts.length > 0 ? (
        <div className="insight-list">
          {posts.map((post, index) => (
            <ScrollReveal
              key={post.slug}
              delay={(index === 0 ? 0 : 1) as 0 | 1}
              style={posts.length % 2 === 1 && index === posts.length - 1 ? { gridColumn: '1 / -1' } : undefined}
            >
              <div className="insight-card-wrap">
              <Link href={`/insights/${post.slug}`} className="insight-card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '16px',
                    alignItems: 'baseline',
                    marginBottom: '18px',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  <span>{post.category}</span>
                  <time dateTime={post.date}>{formatInsightDate(post.date)}</time>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(32px, 3vw, 42px)',
                    fontWeight: 400,
                    lineHeight: 1.15,
                    color: 'var(--dark)',
                    marginBottom: '14px',
                  }}
                >
                  {post.title}
                </h2>
                <p
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.7,
                    color: 'var(--muted-dark)',
                    marginBottom: '22px',
                    maxWidth: '680px',
                  }}
                >
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                  {post.tags.map((tag) => (
                    <span key={tag} style={tagStyle}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: '44px',
                    color: 'var(--dark)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  Read article →
                </span>
              </Link>
              {canEdit ? (
                <Link href={`/write/${post.slug}`} className="insight-card-edit">Edit</Link>
              ) : null}
              </div>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '17px', color: 'rgba(240,232,218,0.5)', lineHeight: 1.7 }}>
          New writing will appear here.
        </p>
      )}
    </section>
  );
}
