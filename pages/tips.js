import fs from 'fs';
import matter from 'gray-matter';
import { Container } from "react-bootstrap";
import { Stack, Row } from 'react-bootstrap';
import ArticlesMeta from "../components/meta/articles";
import PaginationBar from '../components/pagination';
import { PAGE_SIZE, range } from '../components/pagination';
import PostCard from '../components/postcard';

export const getStaticProps = () => {
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

  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );
  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));

  return {
    props: {
      posts: sortedPosts.slice(0, PAGE_SIZE),
      pages,
    },
  };
};

export default function Home({ posts, pages }) {
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
          <PaginationBar pages={pages} />
        </Row>
      </Stack>
    </Container >
  )
}