import UserProfile from '../../components/UserProfile';

const UserProfilePage = ({ user }) => {
  return (
    <main>
      <UserProfile user={user} />
    </main>
  );
};
export default UserProfilePage;
