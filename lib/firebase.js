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

// Storage exports
export const storage = firebase.storage();
