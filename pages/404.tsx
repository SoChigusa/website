import createHeaderData from '../utils/createHeaderData';
import Head from 'next/head';
import ErrorPage from 'next/error'

export async function getStaticProps({ params }: { params: any }) {
  const headerData = createHeaderData();
  return { props: { headerData, }, };
}

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