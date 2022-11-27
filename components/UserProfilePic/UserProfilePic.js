import Image from 'next/image';

import styles from './styles.module.css';

const UserProfilePic = ({ style, src, alt }) => {
  return (
    <div style={style} className={styles.container}>
      <Image
        className={styles.image}
        src={src === null ? '/assets/profile-picture.png' : src}
        alt={`${alt} profile picture`}
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
