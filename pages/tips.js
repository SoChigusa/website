import { Container } from "react-bootstrap";
import ArticlesMeta from "../components/meta/articles";

export default function Home() {
  return (
    <Container>
      <ArticlesMeta
        title="Tips by So Chigusa"
        description="Summary of tips written by So Chigusa"
        url=""
        img=""
      />
      Summarize tips here
    </Container>
  )
}