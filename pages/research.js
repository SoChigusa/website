import createHeaderData from "../utils/createHeaderData";
import { Container } from "react-bootstrap";
import ArticlesMeta from "../components/meta/articles";

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
        url=""
        img=""
      />
      Summarize research works here
    </Container>
  )
}