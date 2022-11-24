import UserProfilePic from '../UserProfilePic';

import styles from './styles.module.css';

const UserProfile = (user) => {
  return (
    <div className={styles.userProfile}>
      <UserProfilePic
        className={styles.userImage}
        src={user.photoURL}
        alt={user.username}
        width="20%"
        height="auto"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
};
export default UserProfile;
