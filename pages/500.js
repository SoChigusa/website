import createHeaderData from '../utils/createHeaderData';
import Head from 'next/head';
import ErrorPage from 'next/error'
import { Container } from 'react-bootstrap';

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  return { props: { headerData, }, };
}

const Custom500 = () => {
  return (
    <>
      <Head>
        <title>500 internal server error</title>
      </Head>
      <ErrorPage statusCode={500} />
    </>
  )
};

export default Custom500;