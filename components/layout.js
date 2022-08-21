import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import Head from 'next/head';
import Header from './Header';
import styles from './layout.module.css';

export default function Layout({ children, title }) {
  return (
    <SSRProvider>
      <Head>
        <title>{title}</title>
      </Head>
      <Header></Header>
      <div className={styles.container}>
        {children}
      </div>
    </SSRProvider>
  )
}