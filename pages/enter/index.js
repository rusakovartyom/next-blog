import Image from 'next/image';
import { auth, googleAuthProvider } from '../../lib/firebase';
import Button from '../../components/Button';

import styles from './styles.module.css';

const EnterPage = () => {
  const user = null;
  const username = null;

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
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
    <div className={styles.container}>
      <Button google>
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
    </div>
  );
};
const SignOutButton = () => {};
const UsernameForm = () => {};
