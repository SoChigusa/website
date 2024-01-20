import createHeaderData from '../utils/createHeaderData';
import setDatabase from "../utils/db/setDatabase";
import { Box, Grid } from "@mui/material";
import ArticlesMeta from "../components/meta/articles";
import PaginationBar from '../components/PaginationBar';
import { PAGE_SIZE } from '../components/PaginationBar';
import PostCard from '../components/PostCard';
import useLocale from "../utils/useLocale";
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const headerData: HeaderData = createHeaderData();
  await setDatabase({ collection: 'posts', posts: headerData.tips_ja });
  return {
    props: {
      headerData,
    },
  };
};

const Tips = ({ headerData }: MyPageProps) => {
  const { locale, t } = useLocale();
  const totalPosts: Post[] = locale === 'en' ? headerData.tips_en : headerData.tips_ja;
  const total_page: number = Math.ceil(totalPosts.length / PAGE_SIZE);
  const posts: Post[] = totalPosts.slice(0, PAGE_SIZE);

  return (
    <>
      <ArticlesMeta
        title={t.TIPS_TITLE}
        description={t.TIPS_DESCRIPTION}
        url="/tips"
        img=""
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {posts.map((post: any) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Grid>
      </Box>
      <PaginationBar total_page={total_page} />
    </>
  )
};

export default Tips;