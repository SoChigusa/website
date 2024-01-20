import ReactGA from "react-ga4";
import Layout from '../components/Layout';
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/panda-syntax-light.css';
import '../styles/globals.css'
import { MathJaxContext } from 'better-react-mathjax';
import { ThemeProvider } from '@emotion/react';
import { Theme, createTheme, responsiveFontSizes } from '@mui/material';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from "react";
import { AppProps } from "next/app";

const usePageTracking = () => {
  const router: NextRouter = useRouter();

  useEffect(() => {
    // Google Analytics
    ReactGA.initialize("G-WYZ5SV33BD");
    ReactGA.send({
      hitType: "pageview",
      page: router.pathname + router.query.slug + router.query.page,
    });
  }, [router]);
};

function MyApp({ Component, pageProps }: AppProps) {
  const serifFamily: string = [
    '"Times New Roman"',
    '"Hiragino Mincho ProN"',
    '"MS P明朝"',
    'serif',
  ].join(',');
  const sanserifFamily: string = [
    '"Helvetica Neue"',
    '"Hiragino Sans"',
    '"Arial"',
    '"游ゴシック"',
    'san-serif',
  ].join(',');
  let theme: Theme = createTheme({
    typography: {
      fontFamily: serifFamily,
      h4: {
        fontFamily: sanserifFamily,
      },
      h5: {
        fontFamily: sanserifFamily,
      },
      h6: {
        fontFamily: sanserifFamily,
      },
      body1: {
        fontSize: 17,
      },
      button: {
        fontFamily: sanserifFamily,
      },
    },
  });
  theme = responsiveFontSizes(theme);

  const config: MathjaxContextConfig = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    }
  };

  usePageTracking();
  return (
    <ThemeProvider theme={theme}>
      <MathJaxContext config={config}>
        <Layout headerData={pageProps.headerData} slug={pageProps.slug} existTranslation={pageProps.existTranslation}>
          <Component {...pageProps} />
        </Layout>
      </MathJaxContext>
    </ThemeProvider>
  );
}

export default MyApp
