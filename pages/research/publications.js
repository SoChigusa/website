import { useRouter } from "next/router";
import createHeaderData from "../../utils/createHeaderData";
import extractPublicationData from "../../utils/extractPublicationData";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import ArticlesMeta from "../../components/meta/articles";
import PublicationCard from "../../components/PublicationCard";
import Link from "../../components/Link";
import GoBackButton from "../../components/GoBackButton";
import { useState } from "react";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  const publications = await extractPublicationData();
  return { props: { headerData, publications }, };
}

const Publications = ({ headerData, publications }) => {

  // state to organize accordions
  const router = useRouter();
  const [expanded, setExpanded] = useState(router.query.expanded);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <ArticlesMeta
        title="Publications of So Chigusa"
        description="Summary of publications of So Chigusa"
        url="/research/publications"
        img=""
      />
      <Typography gutterBottom variant="h4">
        Publications
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {publications.map((publication) => (
          <PublicationCard
            key={publication.citationKey}
            publication={publication}
            expanded={expanded === publication.entryTags.EPRINT}
            handle={handleChange(publication.entryTags.EPRINT)}
          />
        ))}
        <Stack spacing={2} direction="row" sx={{ my: 2 }}>
          <GoBackButton gutterLeft gutterBottom href='/research' />
          <Link href="https://inspirehep.net/authors/1474093#with-citation-summary" target='_blank'>
            <Button variant="contained">
              See on inspire hep
            </Button>
          </Link>
        </Stack>
      </Box>
    </>
  )
};

export default Publications;