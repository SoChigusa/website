import createHeaderData from '../utils/createHeaderData';
import Head from 'next/head';
import ErrorPage from 'next/error'
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  return { props: { headerData, }, };
};

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