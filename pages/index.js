import { useState } from 'react';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';

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

  const getMorePosts = async () => {
    setLoading(true);
    // Last post from initial query
    const last = posts[posts.length - 1];
    // Last post timestamp
    // Converting if createdAt is not a timestamp
    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;
    // Creating new query that starts from the last post
    // That will offset the query to give a new batch of posts till the limit reached
    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);
    // Fetch new posts
    const newPosts = (await query.get()).docs.map((doc) => doc.data());
    // Add new posts to existing posts list
    setPosts(posts.concat(newPosts));
    setLoading(false);

    // If length of new posts query is less than limit — user reached the end of database
    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

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
