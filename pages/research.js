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
        title="Research works by So Chigusa"
        description="Summary of research works of So Chigusa: papers, talks, and awards"
        url="/research"
        img=""
      />
      <Stack gap={3}>
        <TemporalAlert />
        <span>Summarize research works here</span>
      </Stack>
    </Container>
  )
}