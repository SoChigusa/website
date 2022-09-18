import fs from 'fs';
import matter from 'gray-matter';
import { Box, Grid } from '@mui/material';
import createHeaderData from '../../../utils/createHeaderData';
import ArticlesMeta from "../../../components/meta/articles";
import PaginationBar from '../../../components/PaginationBar';
import { PAGE_SIZE, range } from '../../../components/PaginationBar';
import PostCard from '../../../components/PostCard';

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

  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );
  const slicedPosts = sortedPosts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );

  const headerData = createHeaderData();
  return {
    props: {
      headerData,
      posts: slicedPosts,
      totalPages,
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

const Page = ({ headerData, posts, totalPages, current_page }) => {
  return (
    <>
      <ArticlesMeta
        title="Tips by So Chigusa"
        description="Summary of tips written by So Chigusa"
        url={`/tips/page/${current_page}`}
        img=""
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Grid>
      </Box>
      <PaginationBar totalPages={totalPages} current_page={current_page} />
    </>
  );
};

export default Page;