import createHeaderData from "../utils/createHeaderData";
import extractPublicationData from "../utils/extractPublicationData";
import extractTalkData from "../utils/extractTalkData";
import setDatabase from "../utils/db/setDatabase";
import useLocale from "../utils/useLocale";
import tailorResearchStatement from "../utils/tailorResearchStatement";
import { Box, Stack, Typography, Tooltip, IconButton } from "@mui/material";
import { Article } from "@mui/icons-material";
import Link from "../components/Link";
import ArticlesMeta from "../components/meta/articles";
import PublicationCard from "../components/PublicationCard";
import TalkList from "../components/TalkList";
import SeeMoreButton from "../components/SeeMoreButton";
import InspireHEPButton from "../components/InspireHEPButton";
import { MathJax } from "better-react-mathjax";
import StatementCard from "../components/StatementCard";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const publications = await extractPublicationData({ slice: 6 });
  await setDatabase({ collection: 'publications', publications });
  const [seminars, talks, awards] = await extractTalkData({ slice: 3, separate: true });
  const [summary, statement] = tailorResearchStatement();
  return { props: { headerData, publications, seminars, talks, awards, summary, statement }, };
}

const Research = ({ publications, seminars, talks, awards, summary, statement }) => {
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
          {t.RESEARCH_INTERESTS}
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Stack spacing={1}>
            <MathJax>
              <Typography gutterBottom variant="body1" dangerouslySetInnerHTML={{ __html: summary }} />
            </MathJax>
            <Box>
              {statement.map(element => (
                <StatementCard key={element.title} statement={element} />
              ))}
            </Box>
            <Link href='rs.pdf'>
              <Tooltip title={t.OPEN_PDF} placement="bottom" arrow>
                <IconButton aria-label={t.OPEN_PDF}>
                  <Article />
                </IconButton>
              </Tooltip>
            </Link>
          </Stack>
        </Box>
      </Box >
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          {t.RECENT_PUBLICATIONS}
        </Typography>
        {publications.map((publication) => (
          <PublicationCard key={publication.citationKey} publication={publication} />
        ))}
        <Stack spacing={2} direction="row" sx={{ my: 2 }}>
          <SeeMoreButton href='research/publications' />
          <InspireHEPButton />
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Typography gutterBottom variant="h5">
          {t.INVITED_SEMINARS}
        </Typography>
        <TalkList talks={seminars} seeMore />
      </Box>
      <Box sx={{ flexGrow: 1, my: 2 }}>
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