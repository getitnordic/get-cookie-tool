// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'

// own css files here
import '@/styles/globals.css'

import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

import Head from "next/head";
import type { AppProps } from 'next/app'

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
