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
        title="Notes and slides by So Chigusa"
        description="Summary of notes and slides written by So Chigusa"
        url=""
        img=""
      />
      Summarize notes and slides here
    </Container>
  )
}