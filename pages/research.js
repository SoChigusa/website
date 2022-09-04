import fs from "fs";
import { toJSON } from "bibtex-parser-js";
import createHeaderData from "../utils/createHeaderData";
import { Container, Row, Stack } from "react-bootstrap";
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
    <Container>
      <ArticlesMeta
        title="Research works by So Chigusa"
        description="Summary of research works of So Chigusa: papers, talks, and awards"
        url="/research"
        img=""
      />
      <Stack gap={3}>
        <TemporalAlert />
        <Row className='justify-content-center'>
          {publications.map((publication) => (
            <PublicationCard key={publication.citationKey} publication={publication} />
          ))}
        </Row>
        {/* <Row>
          <PaginationBar pages={pages} />
        </Row> */}
      </Stack>
    </Container>
  )
};

export default Research;