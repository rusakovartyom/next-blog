import Image from 'next/image';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { useContext } from 'react';
import UserContext from '../../lib/context';

import Button from '../../components/Button';

import styles from './styles.module.css';

const EnterPage = () => {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      <div className={styles.container}>
        {user ? (
          !username ? (
            <UsernameForm />
          ) : (
            <SignOutButton />
          )
        ) : (
          <SignInButton />
        )}
      </div>
    </main>
  );
};
export default EnterPage;

const SignInButton = () => {
  const signInGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <Button google onClick={signInGoogle}>
        <Image
          className={styles.googleIcon}
          width="30"
          height="30"
          src="/assets/icons8-google.svg"
          alt=""
        />
        Sign in with Google
      </Button>
      <Button onClick={() => auth.signInAnonymously()}>
        Sign in Anonymously
      </Button>
    </>
  );
};
const SignOutButton = () => {
  return <Button onClick={() => auth.signOut()}>Sign Out</Button>;
};
const UsernameForm = () => {};
