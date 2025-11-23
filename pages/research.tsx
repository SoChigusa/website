import createHeaderData from "../utils/createHeaderData";
import extractPublicationData from "../utils/extractPublicationData";
import extractTalkData from "../utils/extractTalkData";
// import setDatabase from "../utils/db/setDatabase";
import useLocale from "../utils/useLocale";
import tailorResearchStatement from "../utils/tailorResearchStatement";
import { Box, Stack, Typography, Tooltip, IconButton } from "@mui/material";
import { Article } from "@mui/icons-material";
import HistoryIcon from '@mui/icons-material/History';
import Link from "../components/Link";
import ArticlesMeta from "../components/meta/articles";
import PublicationCard from "../components/PublicationCard";
import TalkList from "../components/TalkList";
import SeeMoreButton from "../components/SeeMoreButton";
import InspireHEPButton from "../components/InspireHEPButton";
import { MathJax } from "better-react-mathjax";
import StatementCard from "../components/StatementCard";
import { GetStaticProps } from "next";
import GoogleScholarButton from "../components/GoogleScholarButton";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  const publications: Publication[] = await extractPublicationData({ slice: 6 });
  // await setDatabase({ collection: 'publications', publications });
  const talk_list: TalkList = await extractTalkData({ slice: 3 });
  const latex_RS: LatexRS = tailorResearchStatement();
  return { props: { headerData, publications, talk_list, latex_RS }, };
}

const Research = ({ publications, talk_list, latex_RS }: MyPageProps) => {
  const { t } = useLocale();

  return (
    <>
      <ArticlesMeta
        title={t.RESEARCH_TITLE}
        description={t.RESEARCH_DESCRIPTION}
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
              <Typography gutterBottom variant="body1" dangerouslySetInnerHTML={{ __html: latex_RS.summary }} />
            </MathJax>
            <Box>
              {latex_RS.statements.map(statement => (
                <StatementCard key={statement.title} statement={statement} />
              ))}
            </Box>
            <MathJax>
              <Typography gutterBottom variant="body1" dangerouslySetInnerHTML={{ __html: latex_RS.conclusion }} />
            </MathJax>
            <Stack direction="row" spacing={1}>
              <Link href='rs.pdf'>
                <Tooltip title={t.OPEN_PDF} placement="bottom" arrow>
                  <IconButton aria-label={t.OPEN_PDF} color="primary">
                    <Article />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link href="research/history">
                <Tooltip title={t.SHOW_RS_HISTORY} placement="bottom" arrow>
                  <IconButton aria-label={t.SHOW_RS_HISTORY} color="primary">
                    <HistoryIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Stack>
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
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <SeeMoreButton href='research/publications' />
          <GoogleScholarButton />
          <InspireHEPButton />
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Typography gutterBottom variant="h5">
          {t.INVITED_SEMINARS}
        </Typography>
        <TalkList talks={talk_list.seminars} seeMore />
      </Box>
      <Box sx={{ flexGrow: 1, my: 2 }}>
        <Typography gutterBottom variant="h5">
          {t.OTHER_TALKS}
        </Typography>
        <TalkList talks={talk_list.talks} seeMore />
      </Box>
      <Box sx={{ flexGrow: 1, mb: 5 }}>
        <Typography gutterBottom variant="h5">
          {t.AWARDS}
        </Typography>
        <TalkList talks={talk_list.awards} />
      </Box>
    </>
  )
};

export default Research;