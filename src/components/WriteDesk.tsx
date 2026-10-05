import Link from 'next/link';
import DeletePostButton from './DeletePostButton';
import WriteHeader from './WriteHeader';
import { formatInsightDate } from '@/lib/insights';

type PostCard = {
  slug: string;
  title: string;
  date: string;
  draft: boolean;
  category: string;
};

export default function WriteDesk({ name, posts }: { name: string; posts: PostCard[] }) {
  return (
    <div className="write-desk">
      <WriteHeader name={name} />
      <div className="write-desk-body">
        <div className="write-desk-top">
          <div>
            <p className="write-kicker">Insights</p>
            <h1>Posts</h1>
          </div>
          <Link href="/write/new" className="btn-cta">New post</Link>
        </div>
        {posts.length === 0 ? (
          <p className="write-empty">No posts yet.</p>
        ) : (
          <ul className="write-post-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/write/${post.slug}`}>
                  <span>{post.category}</span>
                  <strong>{post.title}</strong>
                  <em>
                    <time dateTime={post.date}>{formatInsightDate(post.date)}</time>
                    {post.draft ? ' · Draft' : ' · Published'}
                    {' · Edit'}
                  </em>
                </Link>
                <DeletePostButton slug={post.slug} title={post.title} className="write-post-delete" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
