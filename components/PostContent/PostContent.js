import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import styles from './styles.module.css';

// UI component for post page content
const PostContent = ({ post }) => {
  // Makes sure that we are rendering createdAt in the right format
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className={styles.card}>
      <h1>{post?.title}</h1>
      <span className={styles.text}>
        Written by{' '}
        <Link className={styles.link} href={`/${post.username}/`}>
          @{post.username}
        </Link>{' '}
        on {createdAt.toLocaleDateString('en-GB')}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
};
export default PostContent;
