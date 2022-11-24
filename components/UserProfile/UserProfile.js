import UserProfilePic from '../UserProfilePic';

import styles from './styles.module.css';

const UserProfile = ({ user }) => {
  return (
    <div className={styles.userProfile}>
      <UserProfilePic
        style={{
          width: '150px',
          height: '150px',
          margin: 'auto',
        }}
        src={user.photoURL}
        alt={user.username}
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
};
export default UserProfile;
