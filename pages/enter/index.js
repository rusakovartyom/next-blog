import Image from 'next/image';
import { auth, firestore, googleAuthProvider } from '../../lib/firebase';
import { useContext, useState, useEffect, useMemo } from 'react';
import UserContext from '../../lib/context';
import debounce from 'lodash.debounce';

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

  const { user, username } = useContext(UserContext);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, {
      uid: user.uid,
    });

    try {
      await batch.commit();
    } catch (error) {
      alert(error);
    }
  };
  // Hit the database for username match after each debounced change
  // useMemo required for debounce to work
  const checkUsername = useMemo(
    () =>
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`username/$(username)`);
          const { exists } = await ref.get();
          console.log('Firestore read executed!');
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  return (
    !username && (
      <section>
        <h3>Choose your username</h3>
        <form onSubmit={onSubmit}>
          <input
            className={styles.input}
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
