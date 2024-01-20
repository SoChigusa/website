import React, { ReactNode } from 'react';
import Header from './Header';
import { MathJaxContext } from 'better-react-mathjax';
import { Container } from '@mui/material';

export default function Layout({ children, headerData, slug, existTranslation }: { children: ReactNode, headerData: HeaderData, slug: string, existTranslation: boolean }) {
  return (
    <>
      <Header headerData={headerData} slug={slug} existTranslation={existTranslation} />
      <main>
        <Container maxWidth='lg' sx={{ paddingBottom: '2rem' }}>
          <MathJaxContext>{children}</MathJaxContext>
        </Container>
      </main>
    </>
  )
}