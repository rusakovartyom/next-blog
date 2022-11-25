import Image from 'next/image';

import styles from './styles.module.css';

const UserProfilePic = (props) => {
  return (
    <div style={props.style} className={styles.container}>
      <Image
        className={styles.image}
        src={props.src === null ? '/assets/profile-picture.png' : props.src}
        alt={`${props.alt} profile picture`}
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default UserProfilePic;
