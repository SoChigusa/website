import Layout from '../components/Layout';
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/panda-syntax-light.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout headerData={pageProps.headerData} slug={pageProps.slug} existTranslation={pageProps.existTranslation}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
