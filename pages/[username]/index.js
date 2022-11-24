import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';

const UserProfilePage = ({ user }) => {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
};
export default UserProfilePage;
