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
        title="Github repositories of So Chigusa"
        description="Summary of projects shared on github by So Chigusa"
        url=""
        img=""
      />
      Summarize github repositories here
    </Container>
  )
}