import { useRouter } from "next/router";
import { useState } from "react";
import useLocale from "../../utils/useLocale";
import createHeaderData from "../../utils/createHeaderData";
import extractPublicationData from "../../utils/extractPublicationData";
import setDatabase from "../../utils/db/setDatabase";
import { Box, Stack, Typography } from "@mui/material";
import ArticlesMeta from "../../components/meta/articles";
import PublicationCard from "../../components/PublicationCard";
import GoBackButton from "../../components/GoBackButton";
import InspireHEPButton from "../../components/InspireHEPButton";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  var publications = await extractPublicationData();
  publications = await setDatabase({ publications });
  return { props: { headerData, publications }, };
}

const Publications = ({ publications }) => {
  const { t } = useLocale();

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
        {t.PUBLICATIONS}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {publications.map((publication) => (
          <PublicationCard
            key={publication.content.citationKey}
            publication={publication}
            expanded={expanded === publication.content.entryTags.EPRINT}
            handle={handleChange(publication.content.entryTags.EPRINT)}
          />
        ))}
        <Stack spacing={2} direction="row" sx={{ my: 2 }}>
          <GoBackButton gutterLeft gutterBottom href='../research' />
          <InspireHEPButton />
        </Stack>
      </Box>
    </>
  )
};

export default Publications;