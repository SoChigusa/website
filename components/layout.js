import React from 'react';
import { SSRProvider, Container } from 'react-bootstrap';
import Head from 'next/head';
import Header from './header';
import styles from './layout.module.css';

export default function Layout({ children, title }) {
  return (
    <SSRProvider>
      <Head>
        <title>{title}</title>
      </Head>
      <body className={styles.paddingNavbar}>
        <Header></Header>
        <Container>
          {children}
        </Container>
      </body>
    </SSRProvider>
  )
}