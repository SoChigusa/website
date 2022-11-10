import createHeaderData from "../utils/createHeaderData";
import extractPublicationData from "../utils/extractPublicationData";
import extractTalkData from "../utils/extractTalkData";
import setDatabase from "../utils/db/setDatabase";
import useLocale from "../utils/useLocale";
import { Box, Stack, Typography } from "@mui/material";
import ArticlesMeta from "../components/meta/articles";
import PublicationCard from "../components/PublicationCard";
import TalkList from "../components/TalkList";
import SeeMoreButton from "../components/SeeMoreButton";
import InspireHEPButton from "../components/InspireHEPButton";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const publications = await extractPublicationData({ slice: 6 });
  await setDatabase({ publications });
  console.log(publications);
  const [seminars, talks, awards] = await extractTalkData({ slice: 3, separate: true });
  return { props: { headerData, publications, seminars, talks, awards }, };
}

const Research = ({ publications, seminars, talks, awards }) => {
  const { t } = useLocale();
  return (
    <>
      <ArticlesMeta
        title="Research works by So Chigusa"
        description="Summary of research works of So Chigusa: publications, talks, and awards"
        url="/research"
        img=""
      />
      <Typography gutterBottom variant="h4">
        {t.RESEARCH_ACTIVITIES}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          {t.PUBLICATIONS}
        </Typography>
        {publications.map((publication) => (
          <PublicationCard key={publication.citationKey} publication={publication} />
        ))}
        <Stack spacing={2} direction="row" sx={{ my: 2 }}>
          <SeeMoreButton href='research/publications' />
          <InspireHEPButton />
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          {t.INVITED_SEMINARS}
        </Typography>
        <TalkList talks={seminars} seeMore />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          {t.OTHER_TALKS}
        </Typography>
        <TalkList talks={talks} seeMore />
      </Box>
      <Box sx={{ flexGrow: 1, mb: 5 }}>
        <Typography gutterBottom variant="h5">
          {t.AWARDS}
        </Typography>
        <TalkList talks={awards} />
      </Box>
    </>
  )
};

export default Research;