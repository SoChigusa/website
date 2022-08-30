import Layout from '../components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/panda-syntax-light.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
