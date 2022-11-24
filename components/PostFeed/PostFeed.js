import Link from 'next/link';

const PostFeed = ({ posts, admin }) => {
  const feed = posts
    ? post.map((post) => <PostItem post={post} key={post.slug} admin={admin} />)
    : null;
  return feed;
};

const PostItem = ({ post }) => {
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

      <footer className={styles.footer}>
        <span>
          {wordCount} words. {minutesToRead} min read.
        </span>
        <span>❤️ {post.heartCount} Hearts</span>
      </footer>
    </div>
  );
};
export default PostFeed;
