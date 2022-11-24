import Image from 'next/image';

import styles from './styles.module.css';

const UserProfilePic = (props) => {
  return (
    <Image
      className={styles.image}
      src={props.src === null ? '/assets/profile-picture.svg' : props.src}
      alt={`${props.alt} profile picture`}
      width={props.width}
      height={props.height}
    />
  );
};

export default UserProfilePic;
