import { useState } from 'react';
import { firebase, fromMillis, postToJSON } from '../lib/firebase';

import PostFeed from '../components/PostFeed';
import Button from '../components/Button';
import Loader from '../components/Loader';

import styles from '../styles/Home.module.css';

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

      {!loading && !postsEnd && (
        <Button onClick={getMorePosts}>Load more...</Button>
      )}

      <Loader show={loading} />

      {postsEnd && <p>You have reached the end!</p>}

      {}
    </main>
  );
};

export default Home;
