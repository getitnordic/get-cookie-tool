import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/* styles */
import styles from '@/styles/Home.module.css';

/* utils */
import { fetchPublicSuffixList } from './utils/utils';

/* components */
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WebsiteList from './components/WebsiteList';
import { CompareCookie } from './components/CompareCookie';
import FAQ from './components/FAQ';
import CookiesInfo from './components/CookiesInfo';
export default function Home() {

  const [websites, setWebsites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWebsites = async () => {
      const { data } = await fetchPublicSuffixList();
      setWebsites(data);
      setLoading(false);
    };

    getWebsites();
  }, []);

  return (
    <>
      <Head>
        <title>Get Cookies</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.titelContainer}> 
        <h1 className={styles.titelH1}> Get Cookies
        </h1>
        <h2><Link href="https://github.com/getitnordic/get-cookie-tool" >
            <FontAwesomeIcon
              icon={faGithub}
              style={{ fontSize: 30, color: "grey" }}
            />
          </Link></h2>
        </div>
        
        < CompareCookie />
        

        {/* <div id={styles.websiteContainer}>
          <div id={styles.websiteContainer}>
            <WebsiteList loading={loading} websites={websites} />
          </div>
        </div> */}
        <CookiesInfo/>
        <FAQ/>
      </main>
      <Footer/>
    </>
  );
}
