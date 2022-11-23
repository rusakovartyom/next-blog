import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import styles from './styles.module.css';

const Navbar = () => {
  const user = null;
  const username = null;
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
                <Image
                  className={styles.navbarImg}
                  src={user?.photoURL}
                  alt=""
                />
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
