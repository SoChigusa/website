import { Container } from "react-bootstrap";
import { Stack, Row } from 'react-bootstrap';
import createHeaderData from '../utils/createHeaderData';
import ArticlesMeta from "../components/meta/articles";
import PaginationBar from '../components/pagination';
import { PAGE_SIZE, range } from '../components/pagination';
import PostCard from '../components/postcard';
import Layout from '../components/layout';

export const getStaticProps = () => {
  const headerData = createHeaderData();
  const pages = range(1, Math.ceil(headerData.tips.length / PAGE_SIZE));

  return {
    props: {
      headerData,
      posts: headerData.tips.slice(0, PAGE_SIZE),
      pages,
    },
  };
};

export default function Home({ headerData, posts, pages }) {
  return (
    <Layout headerData={headerData}>
      <Container className='w-100'>
        <ArticlesMeta
          title="Tips by So Chigusa"
          description="Summary of tips written by So Chigusa"
          url=""
          img=""
        />
        <Stack gap={3}>
          <Row className='justify-content-center'>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </Row>
          <Row>
            <PaginationBar pages={pages} />
          </Row>
        </Stack>
      </Container >
    </Layout>
  )
}