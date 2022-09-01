import fs from 'fs';
import matter from 'gray-matter';
import { Container, Stack, Row } from 'react-bootstrap';
import ArticlesMeta from "../../../components/meta/articles";
import PaginationBar from '../../../components/pagination';
import { PAGE_SIZE, range } from '../../../components/pagination';
import PostCard from '../../../components/postcard';

export async function getStaticProps({ params }) {
  const current_page = params.page;
  const files = fs.readdirSync('tips');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`tips/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));
  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );
  const slicedPosts = sortedPosts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );

  return {
    props: {
      posts: slicedPosts,
      pages,
      current_page,
    },
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('tips');
  const count = files.length;

  const paths = range(1, Math.ceil(count / PAGE_SIZE)).map((i) =>
  ({
    params: { page: i.toString() },
  }));

  return {
    paths,
    fallback: false,
  }
}

const Page = ({ posts, pages, current_page }) => {
  return (
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
          <PaginationBar pages={pages} current_page={current_page} />
        </Row>
      </Stack>
    </Container >
  );
};

export default Page;