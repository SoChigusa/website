import { useRouter } from "next/router";
import createHeaderData from '../utils/createHeaderData';
import setDatabase from "../utils/db/setDatabase";
import { Box, Grid } from "@mui/material";
import ArticlesMeta from "../components/meta/articles";
import PaginationBar from '../components/PaginationBar';
import { PAGE_SIZE } from '../components/PaginationBar';
import PostCard from '../components/PostCard';

export async function getStaticProps() {
  const headerData = createHeaderData();
  await setDatabase({ collection: 'posts', posts: headerData.tips_ja });
  return {
    props: {
      headerData,
    },
  };
};

const Tips = ({ headerData }) => {
  const { locale } = useRouter();
  const totalPosts = locale === 'en' ? headerData.tips_en : headerData.tips_ja;
  const totalPages = Math.ceil(totalPosts.length / PAGE_SIZE);
  const posts = totalPosts.slice(0, PAGE_SIZE);

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
};

export default Tips;