import fs from 'fs';
import matter from 'gray-matter';
import { Container } from "react-bootstrap";
import { Stack } from 'react-bootstrap';
import ArticlesMeta from "../components/meta/articles";
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

  return {
    props: {
      posts: sortedPosts,
    },
  };
};

export default function Home({ posts }) {
  return (
    <Container>
      <ArticlesMeta
        title="Tips by So Chigusa"
        description="Summary of tips written by So Chigusa"
        url=""
        img=""
      />
      <Stack gap={3}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Stack>
    </Container>
  )
}