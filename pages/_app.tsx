// add bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// own css files here
import '@/styles/globals.scss';

// add Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.css';

// add Font Awesome core styles (skip automatic CSS injection)
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import Head from 'next/head';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
