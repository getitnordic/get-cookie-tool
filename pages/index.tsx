import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { RegexComp } from './components/regexComp';
import React from 'react';
const inter = Inter({ subsets: ['latin'] });

import fs from 'fs';

type Props = {
  websites: string[],
};

export const getStaticProps = async () => {
  const data = fs.readFileSync('filename.txt', 'utf-8');
  const websites = data.match(/^[^/].*/gm)?.map((line) => line.trim()) ?? [];

  return {
    props: { websites },
  };
};

const IndexPage: React.FC<Props> = ({ websites }) => {
  return (
    <div>
      {websites.map((website, index) => (
        <div key={index}>{website}</div>
      ))}
    </div>
  );
};

export default function Home() {
  export const RegexComp = ({ websites }) => {
    // Render the websites
    return (
      <div>
        {websites.map((website, index) => (
          <div key={index}>{website}</div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p> COOOKIES!!</p>
          <p> Läs Readme.md</p>
          <Link href="/faq">Faq</Link>
        </div>
      </main>
    </>
  );
}
