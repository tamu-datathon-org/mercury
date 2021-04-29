import { GeistProvider, CssBaseline, User } from '@geist-ui/react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { UserProvider } from '../components/UserProvider';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faFacebook, faGithub, faInstagram, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons';
library.add(fab as any, faInstagram as any, faLinkedin as any, faFacebook as any, faMedium as any, faGithub as any);

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <GeistProvider>
      <UserProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </UserProvider>
    </GeistProvider>
  );
}

export default MyApp;
