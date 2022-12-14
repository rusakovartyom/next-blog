import Link from 'next/link';
import UserProfilePic from '../UserProfilePic';
import clsx from 'clsx';
import { useContext } from 'react';
import UserContext from '../../lib/context';
import { useRouter } from 'next/router';
import { auth } from '../../lib/firebase';

import Button from '../Button';

import styles from './styles.module.css';

const Navbar = () => {
  const router = useRouter();
  const { user, username } = useContext(UserContext);

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li>
          <Link className={styles.logo} href="/">
            Blog
          </Link>
        </li>
        {/* {user is signed-in and has username} */}
        {username && (
          <>
            <li className="pushLeft">
              <Button onClick={signOut}>Sign Out</Button>
            </li>
            <li>
              <Link href="/admin">
                <Button blue>Write Posts</Button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <UserProfilePic
                  style={{ width: '50px', height: '50px' }}
                  src={user?.photoURL}
                  alt={username}
                />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <Button blue>Log in</Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
