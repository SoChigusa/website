import Layout from '../components/Layout';
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/panda-syntax-light.css';
import '../styles/globals.css'
import { MathJaxContext } from 'better-react-mathjax';

function MyApp({ Component, pageProps }) {
  const config = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    }
  };

  return (
    <MathJaxContext config={config}>
      <Layout headerData={pageProps.headerData} slug={pageProps.slug} existTranslation={pageProps.existTranslation}>
        <Component {...pageProps} />
      </Layout>
    </MathJaxContext>
  );
}

export default MyApp
