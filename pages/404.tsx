import createHeaderData from '../utils/createHeaderData';
import Head from 'next/head';
import ErrorPage from 'next/error'
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  return { props: { headerData, }, };
};

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 not found</title>
      </Head>
      <ErrorPage statusCode={404} />
    </>
  )
};

export default Custom404;