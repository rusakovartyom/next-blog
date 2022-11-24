import { useState, useContext } from 'react';
import UserContext from '../../lib/context';
import { useRouter } from 'next/router';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

import AuthCheck from '../../components/AuthCheck';
import PostFeed from '../../components/PostFeed';
import Button from '../../components/Button';

import styles from './styles.module.css';

const AdminPostsPage = () => {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
};

const PostList = () => {
  // Create reference to current user document
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts');
  // Order posts by timestamps
  const query = ref.orderBy('createdAt');
  // Use hook to read posts collection in realtime
  const [querySnapshot] = useCollection(query);

  // Map posts
  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
};
const CreateNewPost = () => {
  // next/router
  const router = useRouter();
  // Grabs username from the app context
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // Ensures that slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validates length
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();
    // Grabs user's id
    const uid = auth.currentUser.uid;
    // Reference to user's posts collection
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug);

    // Determines which data it saves
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };
    // Sets new post
    await ref.set(data);
    // Shows toast notification
    toast.success('Post created!');
    // Imperative navigation after set was set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        className={styles.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter article title here..."
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <Button green type="submit" disabled={!isValid}>
        Create new post
      </Button>
    </form>
  );
};

export default AdminPostsPage;
