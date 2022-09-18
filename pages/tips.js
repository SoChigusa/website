import { Box, Grid } from "@mui/material";
import createHeaderData from '../utils/createHeaderData';
import ArticlesMeta from "../components/meta/articles";
import PaginationBar from '../components/PaginationBar';
import { PAGE_SIZE, range } from '../components/PaginationBar';
import PostCard from '../components/PostCard';

export const getStaticProps = () => {
  const headerData = createHeaderData();
  const totalPages = Math.ceil(headerData.tips.length / PAGE_SIZE);

  return {
    props: {
      headerData,
      posts: headerData.tips.slice(0, PAGE_SIZE),
      totalPages,
    },
  };
};

export default function Home({ headerData, posts, totalPages }) {
  return (
    <>
      <ArticlesMeta
        title="Tips by So Chigusa"
        description="Summary of tips written by So Chigusa"
        url="/tips"
        img=""
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Grid>
      </Box>
      <PaginationBar totalPages={totalPages} />
    </>
  )
}