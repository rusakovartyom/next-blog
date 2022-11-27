import Link from 'next/link';
import { useContext } from 'react';
import UserContext from '../../lib/context';

import styles from './styles.module.css';

// Shows component's children only to logged-in users
const AuthCheck = ({ children, fallback }) => {
  const { username } = useContext(UserContext);
  return username
    ? children
    : fallback || (
        <div className={styles.container}>
          <Link className={styles.link} href="/enter">
            You need to be signed in. <br /> Click here.
          </Link>
        </div>
      );
};

export default AuthCheck;
