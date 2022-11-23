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
const UsernameForm = () => {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    // Force form value typed in form to match correct format
    const value = event.target.value.toLowerCase();
    const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length < 3 OR it passes regex
    if (value.length < 3) {
      setFormValue(value);
      setLoading(false);
      setIsValid(false);
    }

    if (regex.test(value)) {
      setFormValue(value);
      setLoading(true);
      setIsValid(false);
    }
  };

  return (
    !username && (
      <section>
        <h3>Choose username</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter username..."
            value={formValue}
            onChange={onChange}
          />

          <Button green type="submit" disabled={!isValid}>
            Choose
          </Button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
};
