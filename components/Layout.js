import React from 'react';
import Header from './Header';
import { MathJaxContext } from 'better-react-mathjax';
import { Container } from '@mui/material';

export default function Layout({ children, headerData, slug, existTranslation }) {
  return (
    <>
      <Header headerData={headerData} slug={slug} existTranslation={existTranslation} />
      <main>
        <Container maxWidth='lg'>
          <MathJaxContext>{children}</MathJaxContext>
        </Container>
      </main>
    </>
  )
}