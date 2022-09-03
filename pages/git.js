import createHeaderData from "../utils/createHeaderData";
import { Container, Stack } from "react-bootstrap";
import ArticlesMeta from "../components/meta/articles";
import TemporalAlert from "../components/TemporalAlert";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  return { props: { headerData, }, };
}

export default function Home({ headerData }) {
  return (
    <Container>
      <ArticlesMeta
        title="Github repositories of So Chigusa"
        description="Summary of projects shared on github by So Chigusa"
        url=""
        img=""
      />
      <Stack gp={3}>
        <TemporalAlert />
        <span>Summarize github repositories here</span>
      </Stack>
    </Container>
  )
}