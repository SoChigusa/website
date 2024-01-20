import createHeaderData from "../utils/createHeaderData";
import extractPublicationData from "../utils/extractPublicationData";
import extractTalkData from "../utils/extractTalkData";
import useLocale from "../utils/useLocale";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { List } from "@mui/icons-material";
import IndexMeta from '../components/meta';
import RecentResearchTab from "../components/RecentResearchTab";
import NewestPublication from "../components/NewestPublication";
import PostCard from "../components/PostCard";
import Link from "next/link";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  const publications: Publication[] = await extractPublicationData({ slice: 4 });
  const talk_list: TalkList = await extractTalkData({ slice: 8 });
  return { props: { headerData, publications, talk_list }, };
}

const IndexSubTitle = ({ title, href, buttonText }: { title: string, href: string, buttonText: string }) => (
  <Stack spacing={2} direction='row' sx={{ alignItems: 'center' }} mb={2}>
    <Typography variant="h5" sx={{ display: 'inline' }}>
      {title}
    </Typography>
    <Link href={href}>
      <Button variant="outlined" startIcon={<List />}>
        <Typography variant="button" sx={{ display: 'inline' }}>
          {buttonText}
        </Typography>
      </Button>
    </Link>
  </Stack>
);

export default function Home({ headerData, publications, talk_list }: MyPageProps) {
  const { locale, t } = useLocale();
  const publications_recent: Publication[] = publications.slice(1);
  const totalPosts: Post[] = locale === 'en' ? headerData.tips_en : headerData.tips_ja;
  const posts: Post[] = totalPosts.slice(0, 2);

  return (
    <>
      <IndexMeta />
      <Typography gutterBottom variant="h4">
        {t.RECENT_ACTIVITIES}
      </Typography>

      <IndexSubTitle title={t.RESEARCH} href='research' buttonText={t.LIST_PAGE} />
      <Stack spacing={2} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '48%' } }}>
          <NewestPublication publication={publications[0]} />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '48%' } }}>
          <RecentResearchTab publications={publications_recent} talks={talk_list.all} />
        </Box>
      </Stack>

      <IndexSubTitle title={t.TIPS} href='tips' buttonText={t.LIST_PAGE} />
      <Grid container spacing={2}>
        {posts.map((post: any) => (
          <PostCard key={post.slug} post={post} isIndexPage />
        ))}
      </Grid>
    </>
  );
}
