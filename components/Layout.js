import React from 'react';
import Header from './Header';
import { MathJaxContext } from 'better-react-mathjax';
import { Container } from '@mui/material';

export default function Layout({ children, headerData }) {
  return (
    <>
      <Header headerData={headerData} />
      <main>
        <Container maxWidth='lg'>
          <MathJaxContext>{children}</MathJaxContext>
        </Container>
      </main>
    </>
  )
}