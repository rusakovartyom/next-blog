import Link from 'next/link';
import UserProfilePic from '../UserProfilePic';
import clsx from 'clsx';
import { useContext } from 'react';
import UserContext from '../../lib/context';

import styles from './styles.module.css';

const Navbar = () => {
  const { user, username } = useContext(UserContext);
  const linkBlue = clsx(styles.navbarLink, styles.navbarLinkBlue);

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
              <Link className={linkBlue} href="/admin">
                Write Posts
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <UserProfilePic src={user?.photoURL} width="50" height="50" />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link className={linkBlue} href="/enter">
              Log in
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
