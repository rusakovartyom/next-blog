import PostFeed from '../components/PostFeed';
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

export default function Home() {
  return <main></main>;
}
