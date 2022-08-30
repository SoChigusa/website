import React from 'react';
import { SSRProvider, Container } from 'react-bootstrap';
import Header from './header';
import { MathJaxContext } from 'better-react-mathjax';

export default function Layout({ children, title, description }) {
  return (
    <SSRProvider>
      <Header></Header>
      <main>
        <Container>
          <MathJaxContext>{children}</MathJaxContext>
        </Container>
      </main>
    </SSRProvider>
  )
}