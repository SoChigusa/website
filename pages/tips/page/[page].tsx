import fs from 'fs';
import { Box, Grid } from '@mui/material';
import createHeaderData from '../../../utils/createHeaderData';
import ArticlesMeta from "../../../components/meta/articles";
import PaginationBar from '../../../components/PaginationBar';
import { PAGE_SIZE, range } from '../../../components/PaginationBar';
import PostCard from '../../../components/PostCard';
import useLocale from '../../../utils/useLocale';
import { GetStaticPaths, GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  return {
    props: {
      headerData,
      current_page: params!.page,
      existTranslation: false,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const count_ja: number = fs.readdirSync('tips').length;
  const paths_ja: PostPath[] = range(1, Math.ceil(count_ja / PAGE_SIZE)).map((i) =>
  ({
    params: { page: i.toString() },
    locale: 'ja',
  }));
  const count_en: number = fs.readdirSync('tips/en').length;
  const paths_en: PostPath[] = range(1, Math.ceil(count_en / PAGE_SIZE)).map((i) =>
  ({
    params: { page: i.toString() },
    locale: 'en',
  }));
  const paths: PostPath[] = paths_ja.concat(paths_en);

  return {
    paths,
    fallback: false,
  }
};

const Page = ({ headerData, current_page }: { headerData: any, current_page: number }) => {
  const { locale, t } = useLocale();
  const totalPosts: Post[] = locale === 'en' ? headerData.tips_en : headerData.tips_ja;
  const total_page: number = Math.ceil(totalPosts.length / PAGE_SIZE);
  const posts: Post[] = totalPosts.slice(
    PAGE_SIZE * (current_page - 1),
    PAGE_SIZE * current_page
  );

  return (
    <>
      <ArticlesMeta
        title={t.TIPS_TITLE + ' (' + t.PAGE + ' ' + current_page.toString() + ')'}
        description={t.TIPS_DESCRIPTION}
        url={`/tips/page/${current_page}`}
        img=""
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {posts.map((post: any) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Grid>
      </Box>
      <PaginationBar total_page={total_page} current_page={current_page} />
    </>
  );
};

export default Page;