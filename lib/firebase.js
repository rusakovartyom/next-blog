import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBTmGX5_YbkonhdMubPDRFk9joDPxwyb_I',
  authDomain: 'rusakov-next-blog.firebaseapp.com',
  projectId: 'rusakov-next-blog',
  storageBucket: 'rusakov-next-blog.appspot.com',
  messagingSenderId: '740023546573',
  appId: '1:740023546573:web:cdd92ed39ab2c164a56f84',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

// Storage exports
export const storage = firebase.storage();

// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */

export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**
 * Converts a firestore doc to JSON
 * @param {DocumentSnapshot} doc
 */

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
