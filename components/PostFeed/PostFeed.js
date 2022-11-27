import Link from 'next/link';
import Button from '../Button';

import styles from './styles.module.css';

const PostFeed = ({ posts, admin }) => {
  const feed = posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
  return feed;
};

const PostItem = ({ post, admin = false }) => {
  // Naive method to calc word count and read time
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className={styles.post}>
      <Link href={`/${post.username}`}>
        <strong>By @{post.username}</strong>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>

      <span className={styles.count}>
        {wordCount} words. {minutesToRead} min read.
      </span>

      <footer className={styles.footer}>
        {admin && (
          <>
            <Link className={styles.editButton} href={`/admin/${post.slug}`}>
              <Button blue>Edit</Button>
            </Link>

            {post.published ? (
              <p className="success">Published</p>
            ) : (
              <p className="danger">Not published</p>
            )}
          </>
        )}
        <span className="pushLeft">❤️ {post.heartCount} Hearts</span>
      </footer>
    </div>
  );
};
export default PostFeed;
