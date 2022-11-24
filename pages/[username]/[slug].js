import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';

// Fetches data at build-time, pre-renders page in advance
export async function getStaticProps({ params }) {
  // Grabs username and slug from URL parameters
  const { username, slug } = params;
  // Uses username to fetch user document
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  // If user document exists — creates ref to the actual post, uses slug as id
  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    // Fetches post data and converts data to JSON
    post = postToJSON(await postRef.get());

    // Sets prop for path to make it easier to re-fetch post from the client side
    path = postRef.path;
  }

  return {
    // Returns props from a function
    props: { post, path },
    // Regenerates the page on the server when new request comes in after 5000 milliseconds
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Queries all posts in the database
  const snapshot = firestore.collectionGroup('posts').get();

  // Maps each post into an object that contains username and slug to make paths to each of them
  const paths = snapshot.docs.map((doc) => {
    const { username, slug } = doc.data();
    return {
      params: { username, slug },
    };
  });
  return {
    // Must be in this format:
    // paths: [
    //  {params: {username, slug}}
    // ],
    paths,
    // When user nagivates to the page that has not been rendered yet, tells Next.js to fallback to server-side rendering
    fallback: 'blocking',
  };
}

const PostPage = () => {
  return <main>PostPage</main>;
};
export default PostPage;
