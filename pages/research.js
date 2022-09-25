import { Box, Button, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import createHeaderData from "../utils/createHeaderData";
import extractPublicationData from "../utils/extractPublicationData";
import extractTalkData from "../utils/extractTalkData";
import ArticlesMeta from "../components/meta/articles";
import TemporalAlert from "../components/TemporalAlert";
import PublicationCard from "../components/PublicationCard";
import Link from "../components/Link";
import TalkList from "../components/TalkList";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const publications = await extractPublicationData({ slice: 6 });
  const [seminars, talks, awards] = await extractTalkData({ slice: 3, separate: true })
  return { props: { headerData, publications, seminars, talks, awards }, };
}

const Research = ({ headerData, publications, seminars, talks, awards }) => {
  return (
    <>
      <ArticlesMeta
        title="Research works by So Chigusa"
        description="Summary of research works of So Chigusa: publications, talks, and awards"
        url="/research"
        img=""
      />
      <Typography gutterBottom variant="h4">
        Recent research activities
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Publications
        </Typography>
        {publications.map((publication) => (
          <PublicationCard key={publication.citationKey} publication={publication} />
        ))}
        <Stack spacing={2} direction="row" sx={{ my: 2 }}>
          <Link href='research/publications'>
            <Button variant="contained">
              See More
            </Button>
          </Link>
          <Link href="https://inspirehep.net/authors/1474093#with-citation-summary" target='_blank'>
            <Button variant="contained">
              See on inspire hep
            </Button>
          </Link>
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Invited Seminars
        </Typography>
        <TalkList talks={seminars} seminar />
        <Link href='research/talks'>
          <Button variant="contained" sx={{ my: 2 }}>
            See More
          </Button>
        </Link>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Talks
        </Typography>
        <TalkList talks={talks} />
        <Link href='research/talks'>
          <Button variant="contained" sx={{ my: 2 }}>
            See More
          </Button>
        </Link>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Awards
        </Typography>
        <TalkList talks={awards} award />
      </Box>
    </>
  )
};

export default Research;