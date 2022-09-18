import fs from "fs";
import { toJSON } from "bibtex-parser-js";
import { Box, Grid } from "@mui/material";
import createHeaderData from "../utils/createHeaderData";
import ArticlesMeta from "../components/meta/articles";
import TemporalAlert from "../components/TemporalAlert";
import PublicationCard from "../components/PublicationCard";

export async function getStaticProps({ params }) {
  const bib = fs.readFileSync(`research/publications.bib`, 'utf-8');
  let publications = toJSON(bib);
  publications = publications.map((publication) => {
    const eprint = publication.entryTags.EPRINT
    const isExist = fs.existsSync(`public/publicationImages/${eprint}.svg`);
    publication.entryTags["imageExist"] = isExist;
    return publication
  });

  const headerData = createHeaderData();
  return { props: { headerData, publications }, };
}

const Research = ({ headerData, publications }) => {
  return (
    <>
      <ArticlesMeta
        title="Research works by So Chigusa"
        description="Summary of research works of So Chigusa: papers, talks, and awards"
        url="/research"
        img=""
      />
      <TemporalAlert />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {publications.map((publication) => (
            <PublicationCard key={publication.citationKey} publication={publication} />
          ))}
        </Grid>
      </Box>
    </>
  )
};

export default Research;