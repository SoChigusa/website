import React from 'react';
import { SSRProvider, Container } from 'react-bootstrap';
import Header from './Header';
import { MathJaxContext } from 'better-react-mathjax';

export default function Layout({ children, headerData }) {
  return (
    <SSRProvider>
      <Header headerData={headerData} />
      <main>
        <Container>
          <MathJaxContext>{children}</MathJaxContext>
        </Container>
      </main>
    </SSRProvider>
  )
}