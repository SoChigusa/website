import Layout from '../components/Layout';
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/panda-syntax-light.css';
import '../styles/globals.css'
import { MathJaxContext } from 'better-react-mathjax';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

function MyApp({ Component, pageProps }) {
  const serifFamily = [
    '"Times New Roman"',
    '"Hiragino Mincho ProN"',
    '"MS P明朝"',
    'serif',
  ].join(',');
  const sanserifFamily = [
    '"Helvetica Neue"',
    '"Hiragino Sans"',
    '"Arial"',
    '"游ゴシック"',
    'san-serif',
  ].join(',');
  const theme = createTheme({
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
      button: {
        fontFamily: sanserifFamily,
      },
    },
  });

  const config = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    }
  };

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
