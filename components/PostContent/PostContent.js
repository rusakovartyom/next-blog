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
      <span className={style.text}>
        Written by {''}
        <Link className={style.link} href={`/${post.username}/`}>
          @{post.username}
        </Link>
        {''}
        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
};
export default PostContent;
