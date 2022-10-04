import { Box, Grid, Stack, Typography } from "@mui/material";
import createHeaderData from "../utils/createHeaderData";
import extractPublicationData from "../utils/extractPublicationData";
import extractTalkData from "../utils/extractTalkData";
import IndexMeta from '../components/meta';
import TemporalAlert from "../components/TemporalAlert";
import RecentResearchTab from "../components/RecentResearchTab";
import NewestPublication from "../components/NewestPublication";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const publications = await extractPublicationData({ slice: 4 });
  const talks = await extractTalkData({ slice: 8 });
  return { props: { headerData, publications, talks }, };
}

export default function Home({ headerData, publications, talks }) {
  const publications_recent = publications.slice(1);

  return (
    <>
      <IndexMeta />
      <TemporalAlert />
      <Typography gutterBottom variant="h4">
        Recent activities
      </Typography>
      <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: '48%' } }}>
          <NewestPublication publication={publications[0]} />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '48%' } }}>
          <RecentResearchTab publications={publications_recent} talks={talks} />
        </Box>
      </Grid>
    </>
  );
}
