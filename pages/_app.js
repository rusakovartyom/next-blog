import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
