import { NextRouter, useRouter } from "next/router";
import { useState } from "react";
import useLocale from "../../utils/useLocale";
import createHeaderData from "../../utils/createHeaderData";
import extractPublicationData from "../../utils/extractPublicationData";
// import setDatabase from "../../utils/db/setDatabase";
import { Box, Stack, Typography } from "@mui/material";
import ArticlesMeta from "../../components/meta/articles";
import PublicationCard from "../../components/PublicationCard";
import GoBackButton from "../../components/GoBackButton";
import InspireHEPButton from "../../components/InspireHEPButton";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const headerData: HeaderData = createHeaderData();
  const publications: Publication[] = await extractPublicationData({});
  // await setDatabase({ collection: 'publications', publications });
  return { props: { headerData, publications }, };
}

const Publications = ({ publications }: MyPageProps) => {
  const { t } = useLocale();

  // state to organize accordions
  const router: NextRouter = useRouter();
  const [expanded, setExpanded] = useState(router.query.expanded);
  type HandlePanelOnChange = (panel: string) => AccordionOnChange;
  const handlePanelOnChange: HandlePanelOnChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : '');
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
            handle={handlePanelOnChange(publication.entryTags.EPRINT)}
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