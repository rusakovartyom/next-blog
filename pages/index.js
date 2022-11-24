import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

// Max post to query per page
const LIMIT = 2;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

const Home = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  return (
    <main>
      <PostFeed posts={posts} />
    </main>
  );
};
