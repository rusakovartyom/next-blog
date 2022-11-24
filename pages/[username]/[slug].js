import { getUserWithUsername, postToJSON } from '../../lib/firebase';

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

const PostPage = () => {
  return <main>PostPage</main>;
};
export default PostPage;
