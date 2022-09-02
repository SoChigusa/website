import createHeaderData from "../utils/createHeaderData";
import { Container } from "react-bootstrap";
import Layout from "../components/layout";
import ArticlesMeta from "../components/meta/articles";

export async function getStaticProps({ params }) {
  const headerData = createHeaderData();
  return { props: { headerData, }, };
}

export default function Home({ headerData }) {
  return (
    <Layout headerData={headerData}>
      <Container>
        <ArticlesMeta
          title="Notes and slides by So Chigusa"
          description="Summary of notes and slides written by So Chigusa"
          url=""
          img=""
        />
        Summarize notes and slides here
      </Container>
    </Layout>
  )
}