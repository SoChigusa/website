import fs from 'fs';
import { useRouter } from 'next/router';
import { Box, Grid } from '@mui/material';
import createHeaderData from '../../../utils/createHeaderData';
import ArticlesMeta from "../../../components/meta/articles";
import PaginationBar from '../../../components/PaginationBar';
import { PAGE_SIZE, range } from '../../../components/PaginationBar';
import PostCard from '../../../components/PostCard';

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  return {
    props: {
      headerData,
      current_page: params.page,
      existTranslation: false,
    },
  };
}

export async function getStaticPaths() {
  const count_ja = fs.readdirSync('tips').length;
  const paths_ja = range(1, Math.ceil(count_ja / PAGE_SIZE)).map((i) =>
  ({
    params: { page: i.toString() },
    locale: 'ja',
  }));
  const count_en = fs.readdirSync('tips/en').length;
  const paths_en = range(1, Math.ceil(count_en / PAGE_SIZE)).map((i) =>
  ({
    params: { page: i.toString() },
    locale: 'en',
  }));
  const paths = paths_ja.concat(paths_en);

  return {
    paths,
    fallback: false,
  }
}

const Page = ({ headerData, current_page }) => {
  const { locale } = useRouter();
  const totalPosts = locale === 'en' ? headerData.tips_en : headerData.tips_ja;
  const totalPages = Math.ceil(totalPosts.length / PAGE_SIZE);
  const posts = totalPosts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );

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