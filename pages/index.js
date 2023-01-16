import createHeaderData from "../utils/createHeaderData";
import extractPublicationData from "../utils/extractPublicationData";
import extractTalkData from "../utils/extractTalkData";
import useLocale from "../utils/useLocale";
import { Box, Grid, Stack, Typography } from "@mui/material";
import IndexMeta from '../components/meta';
import RecentResearchTab from "../components/RecentResearchTab";
import NewestPublication from "../components/NewestPublication";
import PostCard from "../components/PostCard";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const publications = await extractPublicationData({ slice: 4 });
  const talks = await extractTalkData({ slice: 8 });
  return { props: { headerData, publications, talks }, };
}

export default function Home({ headerData, publications, talks }) {
  const { locale, t } = useLocale();
  const publications_recent = publications.slice(1);
  const totalPosts = locale === 'en' ? headerData.tips_en : headerData.tips_ja;
  const posts = totalPosts.slice(0, 2);

  return (
    <>
      <IndexMeta />
      <Typography gutterBottom variant="h4">
        {t.RECENT_ACTIVITIES}
      </Typography>

      <Typography gutterBottom variant="h5">
        {t.RESEARCH}
      </Typography>
      <Stack spacing={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '48%' } }}>
          <NewestPublication publication={publications[0]} />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '48%' } }}>
          <RecentResearchTab publications={publications_recent} talks={talks} />
        </Box>
      </Stack>

      <Typography gutterBottom variant="h5">
        {t.TIPS}
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} isIndexPage />
        ))}
      </Grid>
    </>
  );
}
