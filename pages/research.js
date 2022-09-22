import fs from "fs";
import { toJSON } from "bibtex-parser-js";
import { Box, Button, Typography } from "@mui/material";
import createHeaderData from "../utils/createHeaderData";
import ArticlesMeta from "../components/meta/articles";
import TemporalAlert from "../components/TemporalAlert";
import PublicationCard from "../components/PublicationCard";
import parse from "node-html-parser";

export async function getStaticProps({ params }) {
  const bib = fs.readFileSync(`research/publications.bib`, 'utf-8');
  let publications = toJSON(bib).slice(0, 6);
  publications = await Promise.all(
    publications.map(async (publication) => {
      const eprint = publication.entryTags.EPRINT
      const isExist = fs.existsSync(`public/publicationImages/${eprint}.svg`);
      publication.entryTags["imageExist"] = isExist;

      const html = await fetch(`https://arxiv.org/abs/${publication.entryTags.EPRINT}`).then((data) => {
        return data.text();
      });
      const root = parse(html);
      const metas = root.querySelectorAll('meta');
      const meta_date = metas.filter(meta => meta.rawAttributes.name == 'citation_date')[0];
      const date = meta_date.rawAttributes.content;
      const meta_abstract = metas.filter(meta => meta.rawAttributes.name == 'citation_abstract')[0];
      const abstract = meta_abstract.rawAttributes.content;
      publication.entryTags["date"] = date;
      publication.entryTags["abstract"] = abstract;
      return publication;
    })
  );

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
      <Typography gutterBottom variant="h4">
        Recent research activities
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Papers
        </Typography>
        {publications.map((publication) => (
          <PublicationCard key={publication.citationKey} publication={publication} />
        ))}
        <Button variant="contained" sx={{ my: 2 }}>
          See More
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Invited Seminars
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Talks
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5">
          Awards
        </Typography>
      </Box>
    </>
  )
};

export default Research;