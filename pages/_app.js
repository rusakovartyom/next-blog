import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserContext.Provider>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
