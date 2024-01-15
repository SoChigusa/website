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
import { GetStaticPropsContext } from "next";

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const headerData = createHeaderData();
  const publications = await extractPublicationData();
  await setDatabase({ collection: 'publications', publications });
  return { props: { headerData, publications }, };
}

const Publications = ({ publications }: { publications: any }) => {
  const { t } = useLocale();

  // state to organize accordions
  const router = useRouter();
  const [expanded, setExpanded] = useState(router.query.expanded);
  const handleChange = (panel: any) => (event: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <ArticlesMeta
        title={t.PUBLICATIONS_TITLE}
        description={t.PUBLICATIONS_DESCRIPTION}
        url="/research/publications"
        img=""
      />
      <Typography gutterBottom variant="h4">
        {t.PUBLICATIONS}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {publications.map((publication: any) => (
          <PublicationCard
            key={publication.citationKey}
            publication={publication}
            expanded={expanded === publication.entryTags.EPRINT}
            handle={handleChange(publication.entryTags.EPRINT)}
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