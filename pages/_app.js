import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import UserContext from '../lib/context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  return (
    <UserContext.Provider value={{ user: {}, username: 'rusakov' }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
