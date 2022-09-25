import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "../../components/Link";
import ArticlesMeta from "../../components/meta/articles";
import TalkList from "../../components/TalkList";
import createHeaderData from "../../utils/createHeaderData";
import extractTalkData from "../../utils/extractTalkData";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const all_talks = await extractTalkData()
  return { props: { headerData, all_talks }, };
}

const Talks = ({ headerData, all_talks }) => {
  return (
    <>
      <ArticlesMeta
        title="Talks by So Chigusa"
        description="Summary of talks by So Chigusa"
        url="/research/talks"
        img=""
      />
      <Typography gutterBottom variant="h4">
        Talks and Awards
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <TalkList talks={all_talks} icon />
        <Link href='../research'>
          <IconButton aria-label="go back">
            <ArrowBack />
          </IconButton>
        </Link>
      </Box>
    </>
  );
}

export default Talks;